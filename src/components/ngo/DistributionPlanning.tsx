import React, { useState } from 'react';

interface DistributionPlan {
  id: string;
  date: string;
  location: string;
  beneficiaries: number;
  foodItems: {
    type: string;
    quantity: string;
    source: string;
  }[];
  volunteers: number;
  vehicles: number;
  status: 'planned' | 'in-progress' | 'completed';
}

const DistributionPlanning = () => {
  const [plans] = useState<DistributionPlan[]>([
    {
      id: '1',
      date: '2025-02-07',
      location: 'Community Center A',
      beneficiaries: 200,
      foodItems: [
        { type: 'Fresh Produce', quantity: '100 kg', source: 'GreenMart' },
        { type: 'Prepared Meals', quantity: '150 meals', source: 'Hotel Grand' }
      ],
      volunteers: 8,
      vehicles: 2,
      status: 'planned'
    },
    {
      id: '2',
      date: '2025-02-08',
      location: 'Hope Shelter',
      beneficiaries: 150,
      foodItems: [
        { type: 'Bakery Items', quantity: '75 kg', source: 'Daily Bread' },
        { type: 'Dairy Products', quantity: '50 kg', source: 'Farm Fresh' }
      ],
      volunteers: 6,
      vehicles: 1,
      status: 'in-progress'
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Distribution Planning</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Create New Plan
        </button>
      </div>

      {/* Distribution Calendar */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4">Upcoming Distributions</h4>
        <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
          <div className="flex space-x-4 min-w-max">
            {[...Array(7)].map((_, index) => {
              const date = new Date('2025-02-07');
              date.setDate(date.getDate() + index);
              return (
                <div
                  key={index}
                  className="w-40 bg-white rounded-lg p-4 border hover:shadow-md transition-shadow"
                >
                  <p className="font-medium text-gray-600">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className="text-2xl font-bold mb-2">
                    {date.toLocaleDateString('en-US', { day: 'numeric' })}
                  </p>
                  <div className="space-y-1">
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      2 Distributions
                    </div>
                    <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      8 Volunteers
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Distribution Plans */}
      <div className="space-y-4">
        {plans.map(plan => (
          <div key={plan.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">{plan.location}</h4>
                <p className="text-gray-600">
                  {new Date(plan.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                plan.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : plan.status === 'in-progress'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {plan.status.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
              <div>
                <p className="text-gray-600">Beneficiaries</p>
                <p className="font-medium">{plan.beneficiaries}</p>
              </div>
              <div>
                <p className="text-gray-600">Volunteers</p>
                <p className="font-medium">{plan.volunteers} assigned</p>
              </div>
              <div>
                <p className="text-gray-600">Vehicles</p>
                <p className="font-medium">{plan.vehicles} required</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <p className="font-medium capitalize">{plan.status}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 text-sm mb-2">Food Items:</p>
              <div className="space-y-2">
                {plan.foodItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                    <span>{item.type} ({item.quantity})</span>
                    <span className="text-gray-600">Source: {item.source}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Edit Plan
              </button>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Assign Volunteers
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                Start Distribution
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resource Planning */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Resource Requirements</h4>
          <ul className="space-y-2 text-sm text-blue-600">
            <li>8 Volunteers needed for tomorrow</li>
            <li>2 Refrigerated vehicles required</li>
            <li>3 Distribution coordinators</li>
          </ul>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">Distribution Tips</h4>
          <ul className="space-y-2 text-sm text-green-600">
            <li>Schedule high-volume distributions early</li>
            <li>Coordinate volunteer breaks</li>
            <li>Keep backup volunteers on standby</li>
          </ul>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Weather Alert</h4>
          <p className="text-sm text-yellow-600">
            Light rain expected tomorrow. Ensure proper coverage for outdoor distributions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DistributionPlanning;
