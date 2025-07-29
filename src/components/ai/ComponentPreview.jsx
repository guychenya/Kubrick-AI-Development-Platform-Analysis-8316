import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAlertTriangle, FiRefreshCw, FiMaximize2, FiMinimize2 } = FiIcons;

const ComponentPreview = ({ code, technology = 'react' }) => {
  const [PreviewComponent, setPreviewComponent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [iframeContent, setIframeContent] = useState('');

  useEffect(() => {
    renderComponent();
  }, [code, technology]);

  const renderComponent = async () => {
    if (!code) return;

    setIsLoading(true);
    setError(null);

    try {
      if (technology === 'react') {
        // React component rendering
        const componentCode = processReactCode(code);
        const ComponentFunction = await createReactComponentFromCode(componentCode);
        setPreviewComponent(() => ComponentFunction);
        setIframeContent(''); // Clear iframe content when using React
      } else {
        // For non-React technologies, use iframe rendering
        const htmlContent = await generatePreviewHtml(code, technology);
        setIframeContent(htmlContent);
        setPreviewComponent(null); // Clear React component when using iframe
      }
    } catch (err) {
      setError(err.message);
      console.error('Component rendering error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const processReactCode = (rawCode) => {
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

  const createReactComponentFromCode = async (code) => {
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

  const generatePreviewHtml = async (code, technology) => {
    // Create appropriate HTML content based on the technology
    switch (technology) {
      case 'vue':
        return createVuePreview(code);
      case 'svelte':
        return createSveltePreview(code);
      case 'angular':
        return createAngularPreview(code);
      case 'html':
        return code.includes('<!DOCTYPE html>') ? code : wrapHtmlComponent(code);
      default:
        return wrapHtmlComponent(code);
    }
  };

  const createVuePreview = (code) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vue Component Preview</title>
        <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://unpkg.com/feather-icons/dist/feather.min.css" rel="stylesheet">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        </style>
      </head>
      <body>
        <div id="app"></div>
        <script>
          ${code.replace(/<script.*?>(.*?)<\/script>/gs, '$1')}
          
          // Extract template
          const templateMatch = \`${code.replace(/`/g, '\\`')}\`.match(/<template>(.*?)<\\/template>/s);
          const template = templateMatch ? templateMatch[1] : '<div>Component Preview</div>';
          
          // Extract style
          const styleMatch = \`${code.replace(/`/g, '\\`')}\`.match(/<style.*?>(.*?)<\\/style>/s);
          if (styleMatch) {
            const style = document.createElement('style');
            style.textContent = styleMatch[1];
            document.head.appendChild(style);
          }
          
          // Create Vue app
          const { createApp } = Vue;
          const app = createApp({
            template: template
          });
          app.mount('#app');
        </script>
      </body>
      </html>
    `;
  };

  const createSveltePreview = (code) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Svelte Component Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://unpkg.com/feather-icons/dist/feather.min.css" rel="stylesheet">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          /* Extract component styles */
          ${code.match(/<style.*?>(.*?)<\/style>/s)?.[1] || ''}
        </style>
      </head>
      <body>
        <div id="app">
          <!-- Extract HTML from component -->
          ${code.replace(/<script.*?>.*?<\/script>/gs, '')
                .replace(/<style.*?>.*?<\/style>/gs, '')}
        </div>
        <script>
          // Initialize feather icons if used
          if (window.feather) {
            window.feather.replace();
          }
        </script>
      </body>
      </html>
    `;
  };

  const createAngularPreview = (code) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Angular Component Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://unpkg.com/feather-icons/dist/feather.min.css" rel="stylesheet">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        </style>
      </head>
      <body>
        <div class="p-4">
          <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            <p>Angular components require compilation and cannot be fully previewed in this sandbox.</p>
          </div>
          
          <h2 class="text-lg font-bold mb-2">HTML Template:</h2>
          <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm">
${extractAngularTemplate(code)}
          </pre>
        </div>
      </body>
      </html>
    `;
  };

  const extractAngularTemplate = (code) => {
    const templateMatch = code.match(/template:\s*`(.*?)`/s);
    if (templateMatch) {
      return templateMatch[1].replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    return '<p>No template found in component</p>';
  };

  const wrapHtmlComponent = (code) => {
    // If it's already a complete HTML document
    if (code.includes('<!DOCTYPE html>') || code.includes('<html')) {
      return code;
    }
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Component Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://unpkg.com/feather-icons/dist/feather.min.css" rel="stylesheet">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        </style>
      </head>
      <body>
        <div class="p-4">
          ${code}
        </div>
        <script>
          // Initialize feather icons if used
          if (window.feather) {
            window.feather.replace();
          }
        </script>
      </body>
      </html>
    `;
  };

  const retryRender = () => {
    renderComponent();
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
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

  if (!PreviewComponent && !iframeContent) {
    return (
      <div className="flex items-center justify-center p-12 text-gray-500">
        No component to preview
      </div>
    );
  }

  return (
    <div className={`p-6 ${fullscreen ? 'fixed inset-0 bg-white z-50' : ''}`}>
      <div className={`${fullscreen ? 'h-full flex flex-col' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">Live Preview:</span>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-gray-100 text-xs font-mono rounded">
              {technology}
            </span>
            <button
              onClick={toggleFullscreen}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <SafeIcon icon={fullscreen ? FiMinimize2 : FiMaximize2} className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className={`bg-white rounded-lg border border-gray-200 ${fullscreen ? 'flex-grow overflow-auto' : ''}`}>
          {iframeContent ? (
            <div className="relative bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg">
              <iframe
                srcDoc={iframeContent}
                title="Component Preview"
                className={`w-full ${fullscreen ? 'h-full min-h-[500px]' : 'min-h-[300px]'}`}
                sandbox="allow-scripts"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="p-6 shadow-sm">
              <ErrorBoundary>
                <PreviewComponent />
              </ErrorBoundary>
            </div>
          )}
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