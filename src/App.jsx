import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Dashboard from './components/sections/Dashboard';
import ComponentLibrary from './components/sections/ComponentLibrary';
import Partnerships from './components/sections/Partnerships';
import Footer from './components/layout/Footer';
import DashboardPage from './pages/DashboardPage';

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <Navbar />
      <Hero />
      <Features />
      <Dashboard />
      <ComponentLibrary />
      <Partnerships />
      <Footer />
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;