import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFolder, FiClock, FiUsers, FiMoreHorizontal } = FiIcons;

const ProjectsOverview = () => {
  const projects = [
    {
      name: 'E-commerce Platform',
      status: 'In Progress',
      progress: 75,
      team: 4,
      dueDate: '2024-02-15',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Mobile Banking App',
      status: 'Review',
      progress: 90,
      team: 3,
      dueDate: '2024-01-30',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Analytics Dashboard',
      status: 'Planning',
      progress: 25,
      team: 2,
      dueDate: '2024-03-10',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'CRM Integration',
      status: 'In Progress',
      progress: 60,
      team: 5,
      dueDate: '2024-02-28',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Review': return 'bg-green-100 text-green-700';
      case 'Planning': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Projects Overview</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <SafeIcon icon={FiMoreHorizontal} className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`bg-gradient-to-br ${project.color} p-2 rounded-lg`}>
                  <SafeIcon icon={FiFolder} className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div className="flex items-center space-x-1 mb-1">
                  <SafeIcon icon={FiUsers} className="h-3 w-3" />
                  <span>{project.team}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiClock} className="h-3 w-3" />
                  <span>{project.dueDate}</span>
                </div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${project.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className="text-right mt-1">
              <span className="text-sm font-medium text-gray-600">{project.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsOverview;