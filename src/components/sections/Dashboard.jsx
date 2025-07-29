import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowRight, FiActivity, FiUsers, FiCode, FiTrendingUp } = FiIcons;

const Dashboard = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                {' '}Analytics Dashboard
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Monitor your development workflow, track component usage, and optimize team productivity 
              with real-time insights and AI-driven recommendations.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { icon: FiActivity, text: 'Real-time development metrics' },
                { icon: FiUsers, text: 'Team collaboration insights' },
                { icon: FiCode, text: 'Component usage analytics' },
                { icon: FiTrendingUp, text: 'Performance optimization suggestions' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-primary-100 p-2 rounded-lg mr-4">
                    <SafeIcon icon={item.icon} className="h-4 w-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>

            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-lg font-medium hover:shadow-xl transition-all duration-200"
              >
                View Dashboard
                <SafeIcon icon={FiArrowRight} className="ml-2 h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Development Overview</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Components Generated</span>
                  <span className="text-2xl font-bold text-primary-600">247</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Active Projects</span>
                  <span className="text-2xl font-bold text-accent-600">12</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Team Members</span>
                  <span className="text-2xl font-bold text-green-600">8</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Development Efficiency</span>
                  <span>+24% this week</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;