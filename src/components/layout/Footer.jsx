import React from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiGithub, FiTwitter, FiLinkedin, FiMail } = FiIcons;

const Footer = () => {
  const footerLinks = {
    Product: ['Features', 'Component Library', 'Dashboard', 'Pricing'],
    Company: ['About', 'Careers', 'Blog', 'Press'],
    Resources: ['Documentation', 'Tutorials', 'Community', 'Support'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR']
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-2 rounded-lg">
                <SafeIcon icon={FiZap} className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Kubrick</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              AI-powered development platform that streamlines component-based architecture 
              and microservices for modern development teams.
            </p>
            <div className="flex space-x-4">
              {[FiGithub, FiTwitter, FiLinkedin, FiMail].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                >
                  <SafeIcon icon={Icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Kubrick. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Built with ❤️ for developers worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;