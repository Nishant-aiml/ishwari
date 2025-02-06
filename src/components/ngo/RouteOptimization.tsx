import React, { useState } from 'react';

interface PickupLocation {
  id: string;
  name: string;
  address: string;
  timeWindow: string;
  items: string[];
  status: 'pending' | 'assigned' | 'completed';
}

interface Route {
  id: string;
  name: string;
  stops: PickupLocation[];
  estimatedTime: string;
  totalDistance: string;
  vehicleType: string;
}

const RouteOptimization = () => {
  const [routes] = useState<Route[]>([
    {
      id: '1',
      name: 'Route A',
      stops: [
        {
          id: '1',
          name: 'GreenMart Supermarket',
          address: '123 Main St',
          timeWindow: '9:00 AM - 10:00 AM',
          items: ['Fresh Produce', 'Dairy Products'],
          status: 'pending'
        },
        {
          id: '2',
          name: 'Hotel Grand',
          address: '456 Oak Ave',
          timeWindow: '10:30 AM - 11:30 AM',
          items: ['Prepared Meals'],
          status: 'pending'
        }
      ],
      estimatedTime: '2.5 hours',
      totalDistance: '12 km',
      vehicleType: 'Refrigerated Van'
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Route Optimization</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Generate New Route
        </button>
      </div>

      {/* Route Cards */}
      <div className="space-y-6">
        {routes.map(route => (
          <div key={route.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">{route.name}</h4>
                <p className="text-gray-600">
                  {route.estimatedTime} • {route.totalDistance}
                </p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {route.vehicleType}
              </span>
            </div>

            {/* Route Timeline */}
            <div className="relative pb-8">
              {route.stops.map((stop, index) => (
                <div key={stop.id} className="ml-6">
                  <div className="relative flex items-center mb-4">
                    <div className="absolute left-[-1.5rem] w-3 h-3 bg-green-600 rounded-full"></div>
                    {index !== route.stops.length - 1 && (
                      <div className="absolute left-[-1.25rem] top-3 bottom-[-1rem] w-0.5 bg-gray-200"></div>
                    )}
                    <div className="flex-1 ml-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{stop.name}</h5>
                          <p className="text-gray-600 text-sm">{stop.address}</p>
                        </div>
                        <span className="text-sm text-gray-500">{stop.timeWindow}</span>
                      </div>
                      <div className="mt-2">
                        <div className="text-sm text-gray-600">Items:</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {stop.items.map((item, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-4">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Optimize Route
              </button>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                Start Navigation
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                Assign Driver
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Suggestions */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">AI Route Suggestions</h4>
        <ul className="space-y-2 text-sm text-blue-600">
          <li className="flex items-start">
            <span className="mr-2">💡</span>
            Rearranging stops could save 15 minutes in travel time
          </li>
          <li className="flex items-start">
            <span className="mr-2">🕒</span>
            Recommended pickup window: 9:00 AM - 11:30 AM (low traffic)
          </li>
          <li className="flex items-start">
            <span className="mr-2">🚛</span>
            Consider splitting into two routes during peak hours
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RouteOptimization;
