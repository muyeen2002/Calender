import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import CommunicationForm from './CommunicationForm';

export default function CommunicationList() {
  const { companies, communications, communicationMethods } = useStore();
  const [selectedCompanyIds, setSelectedCompanyIds] = React.useState<string[]>(
    []
  );
  const [showForm, setShowForm] = React.useState(false);

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanyIds((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const getLastFiveCommunications = (companyId: string) => {
    return communications
      .filter((c) => c.companyId === companyId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Communications</h2>
        <button
          onClick={() => setShowForm(true)}
          disabled={selectedCompanyIds.length === 0}
          className="btn btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" /> Log Communication
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-6 py-3">
                <input
                  type="checkbox"
                  checked={
                    selectedCompanyIds.length === companies.length &&
                    companies.length > 0
                  }
                  onChange={(e) =>
                    setSelectedCompanyIds(
                      e.target.checked ? companies.map((c) => c.id) : []
                    )
                  }
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Five Communications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Due
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => {
              const lastFive = getLastFiveCommunications(company.id);
              const lastComm = lastFive[0];
              const nextDue = lastComm
                ? new Date(lastComm.date).getTime() +
                  company.communicationPeriodicity * 24 * 60 * 60 * 1000
                : new Date().getTime();

              const isOverdue = nextDue < new Date().getTime();
              const isDueToday =
                format(nextDue, 'yyyy-MM-dd') ===
                format(new Date(), 'yyyy-MM-dd');

              return (
                <motion.tr
                  key={company.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  className={`${
                    isOverdue
                      ? 'bg-red-50'
                      : isDueToday
                      ? 'bg-yellow-50'
                      : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedCompanyIds.includes(company.id)}
                      onChange={() => handleCompanySelect(company.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {company.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {lastFive.map((comm) => {
                        const method = communicationMethods.find(
                          (m) => m.id === comm.methodId
                        );
                        return (
                          <span
                            key={comm.id}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            title={comm.notes}
                          >
                            {method?.name} -{' '}
                            {format(new Date(comm.date), 'MMM d')}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        isOverdue
                          ? 'bg-red-100 text-red-800'
                          : isDueToday
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {format(nextDue, 'MMM d, yyyy')}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      {showForm && (
        <CommunicationForm
          onClose={() => setShowForm(false)}
          selectedCompanyIds={selectedCompanyIds}
        />
      )}
    </div>
  );
}