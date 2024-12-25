import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store';
import { format, subDays } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsDashboard() {
  const { communications, communicationMethods, companies } = useStore();
  const [dateRange, setDateRange] = React.useState(30); // days

  const methodStats = communicationMethods.map((method) => {
    const methodComms = communications.filter(
      (c) =>
        c.methodId === method.id &&
        new Date(c.date) > subDays(new Date(), dateRange)
    );

    return {
      name: method.name,
      count: methodComms.length,
    };
  });

  const overdueCompanies = companies.filter((company) => {
    const lastComm = communications
      .filter((c) => c.companyId === company.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    if (!lastComm) return true;

    const nextDue =
      new Date(lastComm.date).getTime() +
      company.communicationPeriodicity * 24 * 60 * 60 * 1000;
    return nextDue < new Date().getTime();
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Communication Methods
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={methodStats}>
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Time Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(Number(e.target.value))}
              className="mt-1 input"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Overdue Communications
          </h3>
          <div className="text-3xl font-bold text-red-600">
            {overdueCompanies.length}
          </div>
          <div className="text-sm text-gray-500">companies need attention</div>
          <div className="mt-4 space-y-2">
            {overdueCompanies.slice(0, 5).map((company) => (
              <div
                key={company.id}
                className="text-sm text-gray-600 flex justify-between"
              >
                <span>{company.name}</span>
                <span className="text-red-500">Overdue</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {communications
              .sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .slice(0, 5)
              .map((comm) => {
                const company = companies.find((c) => c.id === comm.companyId);
                const method = communicationMethods.find(
                  (m) => m.id === comm.methodId
                );
                return (
                  <div key={comm.id} className="text-sm">
                    <div className="font-medium text-gray-900">
                      {company?.name}
                    </div>
                    <div className="text-gray-500">
                      {method?.name} - {format(new Date(comm.date), 'PPP')}
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}