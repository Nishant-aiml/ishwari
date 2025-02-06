import React, { useState } from 'react';

interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  description: string;
  required: boolean;
  status: 'pending' | 'completed' | 'failed';
  lastChecked?: string;
  nextCheck?: string;
}

const FoodSafetyCompliance = () => {
  const [checklist] = useState<ChecklistItem[]>([
    {
      id: '1',
      category: 'Storage',
      item: 'Temperature Monitoring',
      description: 'Check and log temperatures of all storage units',
      required: true,
      status: 'completed',
      lastChecked: '2025-02-06 09:00 AM',
      nextCheck: '2025-02-06 03:00 PM'
    },
    {
      id: '2',
      category: 'Transport',
      item: 'Vehicle Cleanliness',
      description: 'Ensure delivery vehicles are sanitized',
      required: true,
      status: 'pending',
      lastChecked: '2025-02-05 05:00 PM',
      nextCheck: '2025-02-06 05:00 PM'
    },
    {
      id: '3',
      category: 'Handling',
      item: 'Personal Hygiene',
      description: 'Staff following proper hygiene protocols',
      required: true,
      status: 'completed',
      lastChecked: '2025-02-06 08:00 AM',
      nextCheck: '2025-02-07 08:00 AM'
    }
  ]);

  const categories = ['All', 'Storage', 'Transport', 'Handling', 'Documentation'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getStatusColor = (status: ChecklistItem['status']) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Food Safety Compliance Checklist</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Download Report
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        {checklist
          .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
          .map(item => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center">
                    <h4 className="font-semibold text-lg">{item.item}</h4>
                    {item.required && (
                      <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Category</p>
                  <p className="font-medium">{item.category}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Checked</p>
                  <p className="font-medium">{item.lastChecked || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Next Check</p>
                  <p className="font-medium">{item.nextCheck || 'N/A'}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View History
                </button>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  Add Note
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Update Status
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Compliance Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">Compliance Rate</h4>
          <p className="text-3xl font-bold text-green-600">92%</p>
          <p className="text-sm text-green-700 mt-1">+5% from last week</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Pending Checks</h4>
          <p className="text-3xl font-bold text-yellow-600">3</p>
          <p className="text-sm text-yellow-700 mt-1">Due within 24 hours</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Total Inspections</h4>
          <p className="text-3xl font-bold text-blue-600">128</p>
          <p className="text-sm text-blue-700 mt-1">This month</p>
        </div>
      </div>

      {/* Guidelines */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Food Safety Guidelines</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            All temperature checks must be logged every 6 hours
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Vehicles must be sanitized before and after food transport
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Staff must wear appropriate PPE when handling food
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FoodSafetyCompliance;
