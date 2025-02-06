import React, { useState } from 'react';

interface FoodItem {
  id: string;
  type: string;
  quantity: string;
  expiryDate: string;
  location: string;
  donor: string;
  storageType: string;
  distance: string;
  timePosted: string;
}

const FoodAvailabilityFeed = () => {
  const [filters, setFilters] = useState({
    foodType: '',
    distance: '',
    expiryTime: '',
    storageType: ''
  });

  const [foodItems] = useState<FoodItem[]>([
    {
      id: '1',
      type: 'Fresh Produce',
      quantity: '50 kg',
      expiryDate: '2025-02-08',
      location: 'Central Market',
      donor: 'GreenMart Supermarket',
      storageType: 'Refrigerated',
      distance: '2.5 km',
      timePosted: '30 minutes ago'
    },
    {
      id: '2',
      type: 'Prepared Meals',
      quantity: '100 meals',
      expiryDate: '2025-02-07',
      location: 'Downtown',
      donor: 'Hotel Grand',
      storageType: 'Hot',
      distance: '1.2 km',
      timePosted: '15 minutes ago'
    }
  ]);

  const foodTypes = [
    'All Types',
    'Fresh Produce',
    'Prepared Meals',
    'Bakery Items',
    'Dairy Products',
    'Canned Goods'
  ];

  const distanceOptions = [
    'Any Distance',
    'Within 2 km',
    'Within 5 km',
    'Within 10 km'
  ];

  const expiryOptions = [
    'Any Time',
    'Within 24 hours',
    'Within 48 hours',
    'Within a week'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Available Food Donations</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Refresh Feed
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          className="border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          value={filters.foodType}
          onChange={(e) => setFilters({ ...filters, foodType: e.target.value })}
        >
          {foodTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          className="border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          value={filters.distance}
          onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
        >
          {distanceOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <select
          className="border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          value={filters.expiryTime}
          onChange={(e) => setFilters({ ...filters, expiryTime: e.target.value })}
        >
          {expiryOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          More Filters
        </button>
      </div>

      {/* Food Items List */}
      <div className="space-y-4">
        {foodItems.map(item => (
          <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">{item.type}</h4>
                <p className="text-gray-600">{item.quantity}</p>
              </div>
              <span className="text-sm text-gray-500">{item.timePosted}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
              <div>
                <p className="text-gray-600">Expiry</p>
                <p className="font-medium">{item.expiryDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Location</p>
                <p className="font-medium">{item.location}</p>
              </div>
              <div>
                <p className="text-gray-600">Distance</p>
                <p className="font-medium">{item.distance}</p>
              </div>
              <div>
                <p className="text-gray-600">Storage</p>
                <p className="font-medium">{item.storageType}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Donated by: <span className="font-medium">{item.donor}</span>
              </div>
              <div className="space-x-3">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Request Pickup
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Preview */}
      <div className="mt-6 border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold">Nearby Donations</h4>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            Open Full Map
          </button>
        </div>
        <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
          Map Preview (Integration Required)
        </div>
      </div>
    </div>
  );
};

export default FoodAvailabilityFeed;
