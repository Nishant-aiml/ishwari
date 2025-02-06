import React from 'react';

interface PickupStatus {
  id: string;
  foodItem: string;
  status: 'pending' | 'accepted' | 'in-transit' | 'completed';
  ngo: string;
  pickupTime: string;
  location: string;
  quantity: string;
}

const pickups: PickupStatus[] = [
  {
    id: '1',
    foodItem: 'Fresh Produce',
    status: 'in-transit',
    ngo: 'Food For All Foundation',
    pickupTime: '2:30 PM Today',
    location: '123 Main St, City',
    quantity: '25 kg'
  },
  {
    id: '2',
    foodItem: 'Prepared Meals',
    status: 'pending',
    ngo: 'City Food Bank',
    pickupTime: '4:00 PM Today',
    location: '456 Oak Ave, City',
    quantity: '50 meals'
  }
];

const PickupTracker = () => {
  const getStatusColor = (status: PickupStatus['status']) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'accepted': 'bg-blue-100 text-blue-800',
      'in-transit': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800'
    };
    return colors[status];
  };

  const getStatusWidth = (status: PickupStatus['status']) => {
    const widths = {
      'pending': 'w-1/4',
      'accepted': 'w-2/4',
      'in-transit': 'w-3/4',
      'completed': 'w-full'
    };
    return widths[status];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-6">Pickup Status Tracking</h3>
      
      <div className="space-y-6">
        {pickups.map(pickup => (
          <div key={pickup.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">{pickup.foodItem}</h4>
                <p className="text-gray-600">{pickup.quantity}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(pickup.status)}`}>
                {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative pt-1 mb-4">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    Progress
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500 ${getStatusWidth(pickup.status)}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Pickup Time</p>
                <p className="font-medium">{pickup.pickupTime}</p>
              </div>
              <div>
                <p className="text-gray-600">NGO Partner</p>
                <p className="font-medium">{pickup.ngo}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Pickup Location</p>
                <p className="font-medium">{pickup.location}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                Contact NGO
              </button>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickupTracker;
