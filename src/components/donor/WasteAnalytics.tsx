import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#059669', '#7C3AED', '#2563EB', '#DC2626'];

const wasteByCategory = [
  { name: 'Prepared Meals', value: 35 },
  { name: 'Fresh Produce', value: 25 },
  { name: 'Bakery Items', value: 20 },
  { name: 'Others', value: 20 }
];

const monthlyTrends = [
  { month: 'Jan', saved: 120, potential: 150 },
  { month: 'Feb', saved: 180, potential: 200 },
  { month: 'Mar', saved: 250, potential: 280 },
  { month: 'Apr', saved: 300, potential: 320 },
  { month: 'May', saved: 280, potential: 310 },
  { month: 'Jun', saved: 350, potential: 380 }
];

const optimizationTips = [
  {
    title: 'Inventory Management',
    description: 'Track expiry dates more effectively to reduce waste of perishable items.',
    potential: '15% reduction'
  },
  {
    title: 'Portion Control',
    description: 'Optimize serving sizes based on consumption patterns.',
    potential: '20% reduction'
  },
  {
    title: 'Storage Conditions',
    description: 'Maintain optimal temperature and humidity levels.',
    potential: '10% reduction'
  }
];

const WasteAnalytics = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-6">Waste Reduction Analytics</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Waste by Category */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold mb-4">Waste Distribution by Category</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {wasteByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold mb-4">Monthly Waste Reduction Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="saved" name="Food Saved (kg)" fill="#059669" />
                <Bar dataKey="potential" name="Potential Savings (kg)" fill="#D1D5DB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="mt-8">
        <h4 className="font-semibold mb-4">Optimization Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {optimizationTips.map((tip, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-medium text-lg mb-2">{tip.title}</h5>
              <p className="text-gray-600 text-sm mb-3">{tip.description}</p>
              <div className="flex items-center">
                <span className="text-green-600 font-medium">Potential Impact:</span>
                <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  {tip.potential}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="mt-8 bg-green-50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-gray-600 mb-1">Total Waste Reduced</p>
            <p className="text-2xl font-bold text-green-600">1,480 kg</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-1">Cost Savings</p>
            <p className="text-2xl font-bold text-green-600">₹24,500</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-1">Efficiency Rate</p>
            <p className="text-2xl font-bold text-green-600">87%</p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p className="font-medium">Pro Tips:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Schedule pickups during off-peak hours to optimize logistics</li>
          <li>Use eco-friendly packaging for food storage</li>
          <li>Implement a first-in-first-out (FIFO) inventory system</li>
        </ul>
      </div>
    </div>
  );
};

export default WasteAnalytics;
