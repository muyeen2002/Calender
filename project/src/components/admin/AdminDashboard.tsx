import React from 'react';
import { motion } from 'framer-motion';
import CompanyList from './CompanyList';
import CommunicationMethodList from './CommunicationMethodList';

export default function AdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <CompanyList />
      <CommunicationMethodList />
    </motion.div>
  );
}