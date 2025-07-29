import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCpu, FiLayers, FiUsers, FiTrendingUp, FiGitBranch, FiMonitor } = FiIcons;

const Features = () => {
  const features = [
    {
      icon: FiCpu,
      title: 'AI-Powered Development',
      description: 'Leverage AI to automate code generation, enhance quality, and accelerate development cycles.',
      stats: '82% developer adoption by 2025'
    },
    {
      icon: FiLayers,
      title: 'Component-Based Architecture',
      description: 'Build with reusable, isolated, and scalable components for faster and more reliable development.',
      stats: 'Reduce development time by 60%'
    },
    {
      icon: FiUsers,
      title: 'Designer-Developer Bridge',
      description: 'Seamless handoff with design visualization and direct code generation from mockups.',
      stats: '$3.5B market by 2025'
    },
    {
      icon: FiTrendingUp,
      title: 'Low-Code/No-Code Integration',
      description: 'Enable citizen developers with streamlined component creation and rapid prototyping.',
      stats: '70% of new apps use LCNC by 2025'
    },
    {
      icon: FiGitBranch,
      title: 'Microservices Support',
      description: 'Built for modern microservices architecture with seamless deployment and management.',
      stats: '$7.45B market, 18.8% CAGR'
    },
    {
      icon: FiMonitor,
      title: 'Design System Integration',
      description: 'Automated design token management and version control for consistent visual systems.',
      stats: 'Ensure 100% design consistency'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Built for Modern
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              {' '}Development Teams
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kubrick aligns with key market trends to deliver unprecedented development efficiency
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-3 rounded-xl mr-4">
                  <SafeIcon icon={feature.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
              
              <div className="bg-primary-100 px-4 py-2 rounded-lg inline-block">
                <span className="text-primary-700 font-medium text-sm">{feature.stats}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;