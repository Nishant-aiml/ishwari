import React, { useState } from 'react';

interface RecurringDonation {
  id: string;
  foodItem: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  quantity: string;
  pickupTime: string;
  nextPickup: string;
  status: 'active' | 'paused' | 'completed';
}

const RecurringDonations = () => {
  const [donations] = useState<RecurringDonation[]>([
    {
      id: '1',
      foodItem: 'Prepared Meals',
      frequency: 'daily',
      quantity: '20 meals',
      pickupTime: '7:00 PM',
      nextPickup: 'Today',
      status: 'active'
    },
    {
      id: '2',
      foodItem: 'Bakery Items',
      frequency: 'weekly',
      quantity: '15 kg',
      pickupTime: '9:00 PM',
      nextPickup: 'Next Monday',
      status: 'active'
    }
  ]);

  const getStatusColor = (status: RecurringDonation['status']) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'paused': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Recurring Donations</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Schedule New
        </button>
      </div>

      <div className="space-y-4">
        {donations.map(donation => (
          <div key={donation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">{donation.foodItem}</h4>
                <p className="text-gray-600">{donation.quantity}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(donation.status)}`}>
                {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Frequency</p>
                <p className="font-medium capitalize">{donation.frequency}</p>
              </div>
              <div>
                <p className="text-gray-600">Pickup Time</p>
                <p className="font-medium">{donation.pickupTime}</p>
              </div>
              <div>
                <p className="text-gray-600">Next Pickup</p>
                <p className="font-medium">{donation.nextPickup}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                Pause
              </button>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule New Donation Modal would go here */}
    </div>
  );
};

export default RecurringDonations;
