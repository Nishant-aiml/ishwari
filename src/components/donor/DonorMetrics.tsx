import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, Users, Leaf, DollarSign } from 'lucide-react';

const DonorMetrics = () => {
  // Sample data - in real app, this would come from an API
  const monthlyDonations = [
    { month: 'Jan', meals: 1200, waste: 450, value: 3600 },
    { month: 'Feb', meals: 1500, waste: 580, value: 4500 },
    { month: 'Mar', meals: 1300, waste: 490, value: 3900 },
    { month: 'Apr', meals: 1800, waste: 680, value: 5400 }
  ];

  const impactBreakdown = [
    { name: 'Meals Provided', value: 5800, color: '#059669' },
    { name: 'Food Waste Reduced', value: 2200, color: '#0284c7' },
    { name: 'Carbon Footprint Saved', value: 1500, color: '#7c3aed' }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Package className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600">Total Donations</p>
              <h3 className="text-2xl font-bold text-green-700">5,800</h3>
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+12% from last month</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600">People Helped</p>
              <h3 className="text-2xl font-bold text-blue-700">2,400</h3>
            </div>
          </div>
          <p className="text-sm text-blue-600 mt-2">+8% from last month</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Leaf className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-purple-600">CO₂ Saved</p>
              <h3 className="text-2xl font-bold text-purple-700">1.2 tons</h3>
            </div>
          </div>
          <p className="text-sm text-purple-600 mt-2">+15% from last month</p>
        </div>

        <div className="bg-pink-50 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-8 h-8 text-pink-600" />
            <div>
              <p className="text-sm text-pink-600">Tax Benefits</p>
              <h3 className="text-2xl font-bold text-pink-700">$4,500</h3>
            </div>
          </div>
          <p className="text-sm text-pink-600 mt-2">Estimated savings</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Donation Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDonations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="meals" name="Meals Provided" fill="#059669" />
                <Bar dataKey="waste" name="Waste Reduced (kg)" fill="#0284c7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Impact Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Impact Breakdown</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={impactBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {impactBreakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recognition */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recognition & Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-block p-3 bg-yellow-100 rounded-full mb-3">
              <span className="text-2xl">🏆</span>
            </div>
            <h4 className="font-semibold">Top Donor</h4>
            <p className="text-sm text-gray-600">February 2025</p>
          </div>
          <div className="text-center">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-3">
              <span className="text-2xl">🌱</span>
            </div>
            <h4 className="font-semibold">Sustainability Champion</h4>
            <p className="text-sm text-gray-600">1000kg CO₂ Saved</p>
          </div>
          <div className="text-center">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-3">
              <span className="text-2xl">💝</span>
            </div>
            <h4 className="font-semibold">Community Hero</h4>
            <p className="text-sm text-gray-600">2000+ People Helped</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorMetrics;
