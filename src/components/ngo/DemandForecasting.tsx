import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ForecastData {
  date: string;
  predicted: number;
  actual: number;
  variance: number;
}

interface CategoryDemand {
  category: string;
  current: number;
  predicted: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

const DemandForecasting = () => {
  const weeklyForecast: ForecastData[] = [
    { date: 'Mon', predicted: 250, actual: 245, variance: -2 },
    { date: 'Tue', predicted: 280, actual: 290, variance: 3.5 },
    { date: 'Wed', predicted: 300, actual: 310, variance: 3.3 },
    { date: 'Thu', predicted: 270, actual: 265, variance: -1.9 },
    { date: 'Fri', predicted: 320, actual: 315, variance: -1.6 },
    { date: 'Sat', predicted: 350, actual: null, variance: null },
    { date: 'Sun', predicted: 290, actual: null, variance: null }
  ];

  const categoryDemand: CategoryDemand[] = [
    {
      category: 'Fresh Produce',
      current: 450,
      predicted: 500,
      trend: 'up',
      percentage: 11.1
    },
    {
      category: 'Prepared Meals',
      current: 300,
      predicted: 320,
      trend: 'up',
      percentage: 6.7
    },
    {
      category: 'Bakery Items',
      current: 200,
      predicted: 180,
      trend: 'down',
      percentage: -10
    },
    {
      category: 'Dairy Products',
      current: 150,
      predicted: 150,
      trend: 'stable',
      percentage: 0
    }
  ];

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    const colors = {
      up: 'text-green-600',
      down: 'text-red-600',
      stable: 'text-blue-600'
    };
    return colors[trend];
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    const icons = {
      up: '↑',
      down: '↓',
      stable: '→'
    };
    return icons[trend];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">AI-Powered Demand Forecasting</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Generate Report
        </button>
      </div>

      {/* Weekly Forecast Chart */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4">Weekly Demand Forecast</h4>
        <div className="h-64 bg-gray-50 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#059669"
                name="Predicted Demand (kg)"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#2563EB"
                name="Actual Demand (kg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category-wise Demand */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4">Category-wise Demand Predictions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-64 bg-gray-50 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDemand}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="current" name="Current Demand (kg)" fill="#2563EB" />
                <Bar dataKey="predicted" name="Predicted Demand (kg)" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-4">
              {categoryDemand.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.category}</p>
                    <p className="text-sm text-gray-600">
                      Current: {item.current}kg • Predicted: {item.predicted}kg
                    </p>
                  </div>
                  <div className={`flex items-center ${getTrendColor(item.trend)}`}>
                    <span className="text-2xl mr-1">{getTrendIcon(item.trend)}</span>
                    <span className="font-medium">
                      {item.percentage > 0 ? '+' : ''}{item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Demand Drivers</h4>
          <ul className="space-y-2 text-sm text-blue-600">
            <li>• Local events increasing prepared meals demand</li>
            <li>• Seasonal produce availability shift</li>
            <li>• New shelter opening next week</li>
          </ul>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">Recommendations</h4>
          <ul className="space-y-2 text-sm text-green-600">
            <li>• Increase fresh produce collection by 10%</li>
            <li>• Plan for extra storage capacity</li>
            <li>• Schedule additional volunteers</li>
          </ul>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Potential Risks</h4>
          <ul className="space-y-2 text-sm text-yellow-600">
            <li>• Storage capacity constraint for dairy</li>
            <li>• Volunteer availability during weekend</li>
            <li>• Transportation bottleneck expected</li>
          </ul>
        </div>
      </div>

      {/* Accuracy Metrics */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Forecast Accuracy Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-600 text-sm">Mean Absolute Error</p>
            <p className="text-2xl font-bold text-gray-900">2.3%</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Forecast Accuracy</p>
            <p className="text-2xl font-bold text-gray-900">94.8%</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Data Points Analyzed</p>
            <p className="text-2xl font-bold text-gray-900">1,248</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandForecasting;
