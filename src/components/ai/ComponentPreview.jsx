import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAlertTriangle, FiRefreshCw } = FiIcons;

const ComponentPreview = ({ code }) => {
  const [PreviewComponent, setPreviewComponent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    renderComponent();
  }, [code]);

  const renderComponent = async () => {
    if (!code) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create a safe environment for component execution
      const componentCode = processCode(code);
      const ComponentFunction = await createComponentFromCode(componentCode);
      setPreviewComponent(() => ComponentFunction);
    } catch (err) {
      setError(err.message);
      console.error('Component rendering error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const processCode = (rawCode) => {
    // Clean and prepare the code for execution
    let processedCode = rawCode;

    // Ensure React import
    if (!processedCode.includes('import React')) {
      processedCode = `import React from 'react';\n${processedCode}`;
    }

    // Ensure react-icons import
    if (processedCode.includes('react-icons') && !processedCode.includes('import * as FiIcons')) {
      processedCode = `import * as FiIcons from 'react-icons/fi';\n${processedCode}`;
    }

    // Add SafeIcon import if needed
    if (processedCode.includes('SafeIcon') && !processedCode.includes('import SafeIcon')) {
      processedCode = `import SafeIcon from '../common/SafeIcon';\n${processedCode}`;
    }

    return processedCode;
  };

  const createComponentFromCode = async (code) => {
    return new Promise((resolve, reject) => {
      try {
        // Extract component name
        const componentMatch = code.match(/(?:const|function)\s+(\w+)/);
        const componentName = componentMatch ? componentMatch[1] : 'GeneratedComponent';

        // Create a module-like environment
        const moduleExports = {};
        const require = (moduleName) => {
          if (moduleName === 'react') {
            return React;
          }
          if (moduleName === 'react-icons/fi') {
            return FiIcons;
          }
          if (moduleName.includes('SafeIcon')) {
            return SafeIcon;
          }
          throw new Error(`Module ${moduleName} not found`);
        };

        // Execute the code in a controlled environment
        const func = new Function(
          'React',
          'FiIcons', 
          'SafeIcon',
          'require',
          'module',
          'exports',
          `
          ${code}
          
          // Return the component
          if (typeof ${componentName} !== 'undefined') {
            return ${componentName};
          } else {
            // Try to find any function component
            const funcMatch = this.toString().match(/function\\s+(\\w+)/g);
            if (funcMatch) {
              const funcName = funcMatch[funcMatch.length - 1].split(' ')[1];
              return eval(funcName);
            }
            throw new Error('No component found');
          }
          `
        );

        const Component = func(React, FiIcons, SafeIcon, require, moduleExports, moduleExports);
        
        if (typeof Component === 'function') {
          resolve(Component);
        } else {
          reject(new Error('Generated code did not return a valid React component'));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const retryRender = () => {
    renderComponent();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <SafeIcon icon={FiRefreshCw} className="h-8 w-8 text-primary-500" />
        </motion.div>
        <span className="ml-3 text-gray-600">Rendering component...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <SafeIcon icon={FiAlertTriangle} className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">
            Preview Error
          </h3>
          <p className="text-red-700 mb-4">
            {error}
          </p>
          <button
            onClick={retryRender}
            className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className="h-4 w-4 mr-2" />
            Retry Render
          </button>
        </div>
      </div>
    );
  }

  if (!PreviewComponent) {
    return (
      <div className="flex items-center justify-center p-12 text-gray-500">
        No component to preview
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-200">
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700">Live Preview:</span>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <ErrorBoundary>
            <PreviewComponent />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component preview error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-6">
          <SafeIcon icon={FiAlertTriangle} className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-700">Component failed to render</p>
          <p className="text-sm text-gray-600 mt-2">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ComponentPreview;