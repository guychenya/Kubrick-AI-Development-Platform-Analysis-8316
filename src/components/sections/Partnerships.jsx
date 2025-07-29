import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCloud, FiCode, FiLayers, FiUsers, FiTool, FiTrendingUp } = FiIcons;

const Partnerships = () => {
  const partnerCategories = [
    {
      icon: FiCode,
      title: 'Design Tool Providers',
      description: 'Seamless integration with Figma, Adobe XD, Sketch, and Miro for direct design-to-code export',
      partners: ['Figma', 'Adobe XD', 'Sketch', 'Miro'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiCloud,
      title: 'Cloud Platform Providers',
      description: 'Optimized deployment with AWS, Azure, and Google Cloud for microservices management',
      partners: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Vercel'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiLayers,
      title: 'Low-Code/No-Code Platforms',
      description: 'Advanced component building within existing LCNC ecosystems for enhanced customization',
      partners: ['Webflow', 'Bubble', 'OutSystems', 'Mendix'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiTool,
      title: 'Developer Tool Integrations',
      description: 'Seamless workflow integration with IDEs, version control, and testing frameworks',
      partners: ['VS Code', 'GitHub', 'GitLab', 'Cypress'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: FiUsers,
      title: 'Enterprise Software',
      description: 'Integration with enterprise platforms for large-scale development lifecycle management',
      partners: ['IBM', 'SAP', 'Salesforce', 'Atlassian'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: FiTrendingUp,
      title: 'Digital Transformation Agencies',
      description: 'Partnership with agencies to accelerate client digital transformation initiatives',
      partners: ['Accenture', 'Deloitte', 'McKinsey', 'PwC'],
      color: 'from-teal-500 to-blue-500'
    }
  ];

  return (
    <section id="partnerships" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Strategic
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              {' '}Partnerships
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kubrick integrates with leading platforms and tools to provide a seamless development experience 
            across your entire technology stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnerCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className={`bg-gradient-to-br ${category.color} p-3 rounded-xl mr-4`}>
                  <SafeIcon icon={category.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Key Partners:</h4>
                <div className="flex flex-wrap gap-2">
                  {category.partners.map((partner, partnerIndex) => (
                    <span
                      key={partnerIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Become a Partner</h3>
            <p className="text-gray-600 mb-6">
              Join our ecosystem and help shape the future of development tooling. 
              Partner with Kubrick to reach new audiences and enhance your platform's capabilities.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-lg font-medium hover:shadow-xl transition-all duration-200">
              Partner With Us
              <SafeIcon icon={FiUsers} className="ml-2 h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;