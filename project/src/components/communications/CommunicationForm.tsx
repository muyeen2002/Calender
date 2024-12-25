import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store';
import { format } from 'date-fns';

interface CommunicationFormProps {
  onClose: () => void;
  selectedCompanyIds: string[];
}

export default function CommunicationForm({
  onClose,
  selectedCompanyIds,
}: CommunicationFormProps) {
  const { communicationMethods, addCommunication, companies } = useStore();
  const [formData, setFormData] = React.useState({
    methodId: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    selectedCompanyIds.forEach((companyId) => {
      addCommunication({
        id: crypto.randomUUID(),
        companyId,
        methodId: formData.methodId,
        date: formData.date,
        notes: formData.notes,
        completed: true,
      });
    });
    onClose();
  };

  const selectedCompanies = companies.filter((c) =>
    selectedCompanyIds.includes(c.id)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Log Communication</h2>

        <div className="mb-4">
          <h3 className="font-medium text-gray-700 mb-2">Selected Companies:</h3>
          <ul className="text-sm text-gray-600">
            {selectedCompanies.map((company) => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Communication Method
            </label>
            <select
              required
              value={formData.methodId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, methodId: e.target.value }))
              }
              className="input mt-1"
            >
              <option value="">Select a method</option>
              {communicationMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
              className="input mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              className="input mt-1"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Log Communication
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}