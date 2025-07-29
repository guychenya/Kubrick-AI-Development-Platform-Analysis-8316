import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTrendingDown, FiCode, FiUsers, FiLayers, FiActivity } = FiIcons;

const MetricsGrid = () => {
  const metrics = [
    {
      title: 'Components Generated',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: FiCode,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Active Projects',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: FiLayers,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Team Members',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: FiUsers,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Development Velocity',
      value: '94%',
      change: '-2%',
      trend: 'down',
      icon: FiActivity,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`bg-gradient-to-br ${metric.color} p-3 rounded-xl`}>
              <SafeIcon icon={metric.icon} className="h-6 w-6 text-white" />
            </div>
            <div className={`flex items-center space-x-1 ${
              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <SafeIcon 
                icon={metric.trend === 'up' ? FiTrendingUp : FiTrendingDown} 
                className="h-4 w-4" 
              />
              <span className="text-sm font-medium">{metric.change}</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
          <p className="text-gray-600 text-sm">{metric.title}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricsGrid;