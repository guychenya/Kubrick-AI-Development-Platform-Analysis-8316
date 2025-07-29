import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCopy, FiCheck } = FiIcons;

const CodePreview = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const highlightSyntax = (code) => {
    // Simple syntax highlighting for JSX/JavaScript
    return code
      .replace(/(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|default)/g, '<span class="text-purple-600 font-semibold">$1</span>')
      .replace(/('.*?'|".*?")/g, '<span class="text-green-600">$1</span>')
      .replace(/(\{.*?\})/g, '<span class="text-blue-600">$1</span>')
      .replace(/(<\/?[a-zA-Z][^>]*>)/g, '<span class="text-red-600">$1</span>')
      .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="text-gray-500 italic">$1</span>');
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-700">Generated Component</span>
        <motion.button
          onClick={copyToClipboard}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-colors ${
            copied 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <SafeIcon icon={copied ? FiCheck : FiCopy} className="h-4 w-4" />
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </motion.button>
      </div>

      {/* Code Content */}
      <div className="bg-gray-900 text-gray-100 p-6 overflow-x-auto max-h-96">
        <pre className="text-sm">
          <code 
            dangerouslySetInnerHTML={{ 
              __html: highlightSyntax(code) 
            }} 
          />
        </pre>
      </div>

      {/* Line Numbers */}
      <div className="absolute left-0 top-12 bottom-0 w-12 bg-gray-800 text-gray-400 text-xs pt-6 pl-2 select-none overflow-hidden">
        {code.split('\n').map((_, index) => (
          <div key={index} className="h-5 leading-5">
            {index + 1}
          </div>
        ))}
      </div>
      
      {/* Code with left margin for line numbers */}
      <style jsx>{`
        pre code {
          margin-left: 3rem;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default CodePreview;