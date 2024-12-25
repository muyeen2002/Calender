import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function CommunicationMethodList() {
  const { communicationMethods } = useStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Communication Methods
      </h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sequence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mandatory
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {communicationMethods
              .sort((a, b) => a.sequence - b.sequence)
              .map((method) => (
                <motion.tr
                  key={method.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {method.sequence}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {method.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {method.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        method.isMandatory
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {method.isMandatory ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button
                        disabled={method.sequence === 1}
                        className="text-gray-600 hover:text-gray-800 disabled:opacity-50"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        disabled={
                          method.sequence === communicationMethods.length
                        }
                        className="text-gray-600 hover:text-gray-800 disabled:opacity-50"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}