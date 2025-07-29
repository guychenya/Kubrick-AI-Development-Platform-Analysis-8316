import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowRight, FiPlay, FiCode, FiZap, FiLayers } = FiIcons;

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <SafeIcon icon={FiZap} className="mr-2 h-4 w-4" />
              AI-Powered Development Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Streamline Your
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                {' '}Development
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Kubrick leverages AI and component-based architecture to accelerate development cycles, 
              bridge designer-developer gaps, and enable rapid prototyping with microservices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-lg font-medium hover:shadow-xl transition-all duration-200"
            >
              Start Building
              <SafeIcon icon={FiArrowRight} className="ml-2 h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg text-lg font-medium hover:border-primary-500 hover:text-primary-600 transition-all duration-200"
            >
              <SafeIcon icon={FiPlay} className="mr-2 h-5 w-5" />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                icon: FiCode,
                title: 'AI Code Generation',
                description: 'Generate production-ready components with AI assistance'
              },
              {
                icon: FiLayers,
                title: 'Component Library',
                description: 'Reusable modules for faster development cycles'
              },
              {
                icon: FiZap,
                title: 'Microservices Ready',
                description: 'Built for scalable, modern architecture patterns'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <SafeIcon icon={feature.icon} className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;