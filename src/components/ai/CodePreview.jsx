import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';

const { FiCopy, FiCheck } = FiIcons;

const CodePreview = ({ code, language = 'jsx' }) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    // Map the language to Prism's supported language
    const prismLanguageMap = {
      'jsx': 'jsx',
      'vue': 'markup',
      'svelte': 'markup',
      'typescript': 'typescript',
      'html': 'markup',
      'css': 'css',
      'js': 'javascript'
    };
    
    const prismLanguage = prismLanguageMap[language] || 'jsx';
    
    // Highlight the code
    const highlighted = Prism.highlight(
      code,
      Prism.languages[prismLanguage],
      prismLanguage
    );
    
    setHighlightedCode(highlighted);
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Generated Component</span>
          <span className="px-2 py-1 bg-gray-200 text-xs font-mono rounded text-gray-700">
            {language}
          </span>
        </div>
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
      <div className="bg-gray-900 text-gray-100 p-6 overflow-x-auto max-h-[calc(100vh-300px)]">
        <pre className="text-sm">
          <code 
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }} 
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
          font-family: 'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace;
        }
      `}</style>
    </div>
  );
};

export default CodePreview;