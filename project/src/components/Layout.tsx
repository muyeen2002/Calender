import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell, Users, BarChart3 } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { icon: Calendar, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Companies', path: '/companies' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white shadow-lg"
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">CommTracker</h1>
        </div>
        <ul className="mt-8">
          {navItems.map(({ icon: Icon, label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                  location.pathname === path
                    ? 'bg-blue-50 text-blue-600'
                    : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
      <main className="flex-1 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}