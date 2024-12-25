import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store';
import { Company } from '../../types';
import { Plus, X } from 'lucide-react';

interface CompanyFormProps {
  onClose: () => void;
  editCompany?: Company;
}

export default function CompanyForm({ onClose, editCompany }: CompanyFormProps) {
  const { addCompany, updateCompany } = useStore();
  const [formData, setFormData] = React.useState<Partial<Company>>(
    editCompany || {
      name: '',
      location: '',
      linkedinProfile: '',
      emails: [''],
      phoneNumbers: [''],
      comments: '',
      communicationPeriodicity: 14,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editCompany) {
      updateCompany({ ...editCompany, ...formData } as Company);
    } else {
      addCompany({
        ...formData,
        id: crypto.randomUUID(),
      } as Company);
    }
    onClose();
  };

  const addField = (field: 'emails' | 'phoneNumbers') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ''],
    }));
  };

  const removeField = (field: 'emails' | 'phoneNumbers', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6">
          {editCompany ? 'Edit Company' : 'Add New Company'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="input mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="input mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn Profile
            </label>
            <input
              type="url"
              required
              value={formData.linkedinProfile}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  linkedinProfile: e.target.value,
                }))
              }
              className="input mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Addresses
            </label>
            {formData.emails?.map((email, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    const newEmails = [...(formData.emails || [])];
                    newEmails[index] = e.target.value;
                    setFormData((prev) => ({ ...prev, emails: newEmails }));
                  }}
                  className="input"
                />
                <button
                  type="button"
                  onClick={() => removeField('emails', index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField('emails')}
              className="btn btn-secondary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Email
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Numbers
            </label>
            {formData.phoneNumbers?.map((phone, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    const newPhones = [...(formData.phoneNumbers || [])];
                    newPhones[index] = e.target.value;
                    setFormData((prev) => ({ ...prev, phoneNumbers: newPhones }));
                  }}
                  className="input"
                />
                <button
                  type="button"
                  onClick={() => removeField('phoneNumbers', index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField('phoneNumbers')}
              className="btn btn-secondary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Phone
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Communication Periodicity (days)
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.communicationPeriodicity}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  communicationPeriodicity: parseInt(e.target.value),
                }))
              }
              className="input mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, comments: e.target.value }))
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
              {editCompany ? 'Update Company' : 'Add Company'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}