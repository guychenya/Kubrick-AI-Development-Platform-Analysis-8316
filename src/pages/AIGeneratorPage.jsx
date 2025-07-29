import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../components/common/SafeIcon';
import AICodeGenerator from '../components/ai/AICodeGenerator';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiZap } = FiIcons;

const AIGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <SafeIcon icon={FiArrowLeft} className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-2 rounded-lg">
                  <SafeIcon icon={FiZap} className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">AI Generator</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AICodeGenerator />
        </motion.div>
      </main>
    </div>
  );
};

export default AIGeneratorPage;