import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../components/common/SafeIcon';
import MetricsGrid from '../components/dashboard/MetricsGrid';
import ProjectsOverview from '../components/dashboard/ProjectsOverview';
import ComponentUsage from '../components/dashboard/ComponentUsage';
import TeamActivity from '../components/dashboard/TeamActivity';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiZap, FiSettings, FiBell } = FiIcons;

const DashboardPage = () => {
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
                <span className="text-xl font-bold text-gray-900">Kubrick Dashboard</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <SafeIcon icon={FiBell} className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <SafeIcon icon={FiSettings} className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, Alex
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your development projects today.
            </p>
          </div>

          {/* Metrics Grid */}
          <MetricsGrid />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <ProjectsOverview />
              <ComponentUsage />
            </div>
            <div>
              <TeamActivity />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;