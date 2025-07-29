import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiGitCommit, FiCode, FiUpload } = FiIcons;

const TeamActivity = () => {
  const activities = [
    {
      user: 'Sarah Chen',
      action: 'deployed new component',
      target: 'Authentication Module v2.1',
      time: '2 hours ago',
      icon: FiUpload,
      color: 'from-green-500 to-emerald-500'
    },
    {
      user: 'Mike Johnson',
      action: 'committed changes to',
      target: 'Payment Gateway Integration',
      time: '4 hours ago',
      icon: FiGitCommit,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      user: 'Emily Rodriguez',
      action: 'generated new component',
      target: 'Data Visualization Charts',
      time: '6 hours ago',
      icon: FiCode,
      color: 'from-purple-500 to-pink-500'
    },
    {
      user: 'David Kim',
      action: 'updated documentation for',
      target: 'File Management System',
      time: '8 hours ago',
      icon: FiUser,
      color: 'from-orange-500 to-red-500'
    },
    {
      user: 'Lisa Wang',
      action: 'reviewed and approved',
      target: 'Search & Filter Component',
      time: '1 day ago',
      icon: FiUpload,
      color: 'from-teal-500 to-green-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Team Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`bg-gradient-to-br ${activity.color} p-2 rounded-lg flex-shrink-0`}>
              <SafeIcon icon={activity.icon} className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span>
                {' '}{activity.action}{' '}
                <span className="font-medium text-primary-600">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 text-center text-primary-600 hover:text-primary-700 font-medium text-sm">
        View All Activity
      </button>
    </motion.div>
  );
};

export default TeamActivity;