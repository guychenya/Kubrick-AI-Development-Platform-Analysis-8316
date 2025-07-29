import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiCode, FiBrain, FiLayers, FiArrowRight, FiCpu } = FiIcons;

const AIShowcase = () => {
  const aiFeatures = [
    {
      icon: FiBrain,
      title: 'Local AI Models',
      description: 'Powered by Ollama with Llama 3.1 and other cutting-edge models',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiCode,
      title: 'Intelligent Code Generation',
      description: 'Generate production-ready React components from natural language',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiLayers,
      title: 'Component Architecture',
      description: 'AI understands your design system and maintains consistency',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiCpu,
      title: 'Real-time Processing',
      description: 'Stream responses and see your components come to life instantly',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const generationExamples = [
    {
      prompt: "Create a modern pricing card with gradient background",
      preview: "PricingCard.jsx",
      lines: 45
    },
    {
      prompt: "Build a responsive navigation with smooth animations",
      preview: "Navigation.jsx", 
      lines: 62
    },
    {
      prompt: "Design a dashboard widget with live metrics",
      preview: "MetricsWidget.jsx",
      lines: 38
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
            <SafeIcon icon={FiZap} className="mr-2 h-4 w-4" />
            AI-Powered Development
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Generate Components with
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {' '}Local AI
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Harness the power of local AI models through Ollama integration. Create beautiful, 
            functional React components using natural language descriptions.
          </p>

          <Link to="/ai-generator">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-lg font-medium hover:shadow-xl transition-all duration-200"
            >
              Try AI Generator
              <SafeIcon icon={FiArrowRight} className="ml-2 h-5 w-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-xl w-fit mb-4`}>
                <SafeIcon icon={feature.icon} className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Generation Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              See AI Generation in Action
            </h3>
            <p className="text-gray-600">
              Real examples of components generated from simple descriptions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {generationExamples.map((example, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
              >
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between text-white text-sm mb-3">
                    <span>{example.preview}</span>
                    <span>{example.lines} lines</span>
                  </div>
                  <div className="bg-gray-700 rounded p-3 text-green-400 text-xs font-mono">
                    <div className="h-2 bg-green-400 rounded w-3/4 mb-1"></div>
                    <div className="h-2 bg-blue-400 rounded w-1/2 mb-1"></div>
                    <div className="h-2 bg-yellow-400 rounded w-5/6"></div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic">
                  "{example.prompt}"
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/ai-generator">
              <button className="inline-flex items-center px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-200">
                Start Generating
                <SafeIcon icon={FiCode} className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIShowcase;