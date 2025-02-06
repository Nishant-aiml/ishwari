import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

interface ChartData {
  name: string;
  meals: number;
  waste: number;
  carbon: number;
}

const dummyData: ChartData[] = [
  { name: 'Jan', meals: 400, waste: 240, carbon: 180 },
  { name: 'Feb', meals: 300, waste: 139, carbon: 220 },
  { name: 'Mar', meals: 520, waste: 280, carbon: 250 },
  { name: 'Apr', meals: 270, waste: 390, carbon: 190 },
  { name: 'May', meals: 600, waste: 380, carbon: 300 },
  { name: 'Jun', meals: 700, waste: 430, carbon: 340 }
];

const metrics: MetricCard[] = [
  {
    title: 'Total Meals Provided',
    value: '2,890',
    change: '+12.5%',
    isPositive: true
  },
  {
    title: 'Food Waste Reduced',
    value: '1,439 kg',
    change: '+23.1%',
    isPositive: true
  },
  {
    title: 'Carbon Footprint Saved',
    value: '2.4 tons',
    change: '+18.2%',
    isPositive: true
  }
];

const ImpactMetrics = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-6">Impact Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-gray-600 text-sm mb-2">{metric.title}</h4>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <span className={`text-sm font-medium ${
                  metric.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Impact Trends</h3>
          <select className="border-gray-300 rounded-md text-sm">
            <option value="6m">Last 6 months</option>
            <option value="1y">Last year</option>
            <option value="all">All time</option>
          </select>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="meals"
                stroke="#059669"
                name="Meals Provided"
              />
              <Line
                type="monotone"
                dataKey="waste"
                stroke="#7C3AED"
                name="Waste Reduced (kg)"
              />
              <Line
                type="monotone"
                dataKey="carbon"
                stroke="#2563EB"
                name="Carbon Saved (kg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-green-600 rounded-full mr-2"></span>
            <span className="text-gray-600">Meals Provided</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-purple-600 rounded-full mr-2"></span>
            <span className="text-gray-600">Waste Reduced</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            <span className="text-gray-600">Carbon Saved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactMetrics;
