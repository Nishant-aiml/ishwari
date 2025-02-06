import React, { useState } from 'react';

interface Route {
  id: string;
  name: string;
  type: 'pickup' | 'delivery';
  date: string;
  timeSlot: string;
  locations: {
    name: string;
    address: string;
    time: string;
  }[];
  distance: string;
  duration: string;
  requirements: string[];
  status: 'available' | 'assigned' | 'completed';
  points: number;
}

const DeliveryRouteMatching = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'pickup' | 'delivery'>('all');
  const [selectedDate, setSelectedDate] = useState('2025-02-07');

  const [routes] = useState<Route[]>([
    {
      id: '1',
      name: 'Morning Pickup Route A',
      type: 'pickup',
      date: '2025-02-07',
      timeSlot: '09:00 AM - 11:00 AM',
      locations: [
        {
          name: 'GreenMart Supermarket',
          address: '123 Main St',
          time: '09:00 AM'
        },
        {
          name: 'Fresh Foods Market',
          address: '456 Oak Ave',
          time: '10:00 AM'
        }
      ],
      distance: '8 km',
      duration: '2 hours',
      requirements: ['Vehicle Required', 'Heavy Lifting'],
      status: 'available',
      points: 100
    },
    {
      id: '2',
      name: 'Afternoon Delivery Route B',
      type: 'delivery',
      date: '2025-02-07',
      timeSlot: '02:00 PM - 04:00 PM',
      locations: [
        {
          name: 'Hope Shelter',
          address: '789 Pine St',
          time: '02:00 PM'
        },
        {
          name: 'Community Center',
          address: '321 Maple Rd',
          time: '03:00 PM'
        }
      ],
      distance: '12 km',
      duration: '2 hours',
      requirements: ['Vehicle Required'],
      status: 'available',
      points: 120
    }
  ]);

  const getStatusColor = (status: Route['status']) => {
    const colors = {
      available: 'bg-green-100 text-green-800',
      assigned: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  const filteredRoutes = routes.filter(route => {
    if (selectedType !== 'all' && route.type !== selectedType) return false;
    if (selectedDate && route.date !== selectedDate) return false;
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold">AI Route Matching</h3>
          <p className="text-gray-600 mt-1">Find the perfect route based on your schedule and location</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          View My Routes
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Route Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as 'all' | 'pickup' | 'delivery')}
            className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Routes</option>
            <option value="pickup">Pickup Routes</option>
            <option value="delivery">Delivery Routes</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Preference
          </label>
          <select
            className="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          >
            <option>Any Time</option>
            <option>Morning (6 AM - 12 PM)</option>
            <option>Afternoon (12 PM - 5 PM)</option>
            <option>Evening (5 PM - 10 PM)</option>
          </select>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-blue-800 mb-2">🤖 AI Recommendations</h4>
        <div className="text-sm text-blue-600">
          Based on your profile and past activities:
          <ul className="mt-2 space-y-1">
            <li>• Route A matches your morning availability</li>
            <li>• You're experienced in handling fresh produce pickups</li>
            <li>• These routes are within your preferred 10km radius</li>
          </ul>
        </div>
      </div>

      {/* Routes List */}
      <div className="space-y-4">
        {filteredRoutes.map(route => (
          <div key={route.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">{route.name}</h4>
                <p className="text-gray-600">{route.timeSlot}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(route.status)}`}>
                  {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  {route.points} points
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
              <div>
                <p className="text-gray-600">Type</p>
                <p className="font-medium capitalize">{route.type}</p>
              </div>
              <div>
                <p className="text-gray-600">Distance</p>
                <p className="font-medium">{route.distance}</p>
              </div>
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="font-medium">{route.duration}</p>
              </div>
              <div>
                <p className="text-gray-600">Date</p>
                <p className="font-medium">{route.date}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 text-sm mb-2">Stops:</p>
              <div className="space-y-2">
                {route.locations.map((location, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{location.name}</p>
                      <p className="text-sm text-gray-600">
                        {location.address} • {location.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {route.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                  >
                    {req}
                  </span>
                ))}
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                Sign Up
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Route Map Preview */}
      <div className="mt-6">
        <h4 className="font-semibold mb-4">Route Map Preview</h4>
        <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
          Map Integration (Coming Soon)
        </div>
      </div>
    </div>
  );
};

export default DeliveryRouteMatching;
