import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const { companies, communications } = useStore();

  const getCompanyStatus = (companyId: string) => {
    const lastComm = communications
      .filter((c) => c.companyId === companyId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    if (!lastComm) return 'overdue';
    const daysSinceLastComm = Math.floor(
      (new Date().getTime() - new Date(lastComm.date).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return daysSinceLastComm > 14 ? 'overdue' : 'active';
  };

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-8"
      >
        Communication Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Overdue Communications
              </h2>
              <p className="text-gray-600">
                {
                  companies.filter(
                    (company) => getCompanyStatus(company.id) === 'overdue'
                  ).length
                }{' '}
                companies need attention
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-green-50 p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Active Companies
              </h2>
              <p className="text-gray-600">
                {
                  companies.filter(
                    (company) => getCompanyStatus(company.id) === 'active'
                  ).length
                }{' '}
                companies are up to date
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Communication
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => {
              const status = getCompanyStatus(company.id);
              const lastComm = communications
                .filter((c) => c.companyId === company.id)
                .sort(
                  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                )[0];

              return (
                <motion.tr
                  key={company.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {company.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {lastComm
                        ? format(new Date(lastComm.date), 'MMM d, yyyy')
                        : 'No communications'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {status === 'active' ? 'Active' : 'Overdue'}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}