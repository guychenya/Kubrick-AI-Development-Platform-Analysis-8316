import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBox, FiDownload, FiStar, FiGithub } = FiIcons;

const ComponentLibrary = () => {
  const components = [
    {
      name: 'Authentication Module',
      description: 'Complete auth system with login, signup, and password reset',
      downloads: '12.4k',
      rating: 4.9,
      category: 'Security',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Data Visualization',
      description: 'Interactive charts and graphs with real-time updates',
      downloads: '8.7k',
      rating: 4.8,
      category: 'UI/UX',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Payment Gateway',
      description: 'Secure payment processing with multiple providers',
      downloads: '15.2k',
      rating: 4.9,
      category: 'E-commerce',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Notification System',
      description: 'Push notifications, email alerts, and in-app messaging',
      downloads: '6.3k',
      rating: 4.7,
      category: 'Communication',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'File Management',
      description: 'Upload, organize, and manage files with cloud storage',
      downloads: '9.1k',
      rating: 4.8,
      category: 'Storage',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      name: 'Search & Filter',
      description: 'Advanced search functionality with smart filtering',
      downloads: '11.6k',
      rating: 4.9,
      category: 'Navigation',
      color: 'from-teal-500 to-green-500'
    }
  ];

  return (
    <section id="components" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Component
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              {' '}Library
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pre-built, production-ready components designed for modern applications. 
            Save time and maintain consistency across your projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {components.map((component, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-primary-200"
            >
              <div className="flex items-center mb-4">
                <div className={`bg-gradient-to-br ${component.color} p-3 rounded-xl mr-4`}>
                  <SafeIcon icon={FiBox} className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {component.name}
                  </h3>
                  <span className="text-sm text-gray-500">{component.category}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{component.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <SafeIcon icon={FiDownload} className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{component.downloads}</span>
                  </div>
                  <div className="flex items-center">
                    <SafeIcon icon={FiStar} className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{component.rating}</span>
                  </div>
                </div>
                <SafeIcon icon={FiGithub} className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </div>

              <button className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                Install Component
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center px-8 py-4 border-2 border-primary-500 text-primary-600 rounded-lg text-lg font-medium hover:bg-primary-500 hover:text-white transition-all duration-200">
            Browse All Components
            <SafeIcon icon={FiBox} className="ml-2 h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ComponentLibrary;