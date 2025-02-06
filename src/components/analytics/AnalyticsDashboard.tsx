import React, { useState } from 'react';
import { BarChart3, TrendingUp, Leaf, Award, DollarSign, LineChart } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('month');

  // Sample data for charts
  const impactData = [
    { month: 'Jan', foodSaved: 2500, mealsProvided: 3000, carbonSaved: 1200 },
    { month: 'Feb', foodSaved: 3200, mealsProvided: 3800, carbonSaved: 1500 },
    { month: 'Mar', foodSaved: 2800, mealsProvided: 3300, carbonSaved: 1300 },
    { month: 'Apr', foodSaved: 3500, mealsProvided: 4200, carbonSaved: 1800 }
  ];

  const donorContributions = [
    { name: 'Restaurant A', value: 3500 },
    { name: 'Supermarket B', value: 2800 },
    { name: 'Hotel C', value: 2200 },
    { name: 'Bakery D', value: 1500 }
  ];

  const COLORS = ['#059669', '#0284c7', '#7c3aed', '#db2777'];

  const carbonSavings = {
    totalCO2Saved: '45.2',
    equivalentTrees: '2,260',
    wasteReduction: '85%',
    monthlyTrend: '+12%'
  };

  const financialMetrics = {
    taxBenefits: '$12,500',
    operationalSavings: '$8,200',
    totalValue: '$20,700',
    monthlyGrowth: '+15%'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Impact</h2>
          <p className="text-gray-600">Real-time metrics and insights</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold">Food Saved</h3>
            </div>
          </div>
          <p className="text-3xl font-bold text-green-600">12,000 kg</p>
          <p className="text-sm text-green-600 mt-2">+8% from last month</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold">Meals Provided</h3>
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-600">14,300</p>
          <p className="text-sm text-blue-600 mt-2">+12% from last month</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Leaf className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold">CO₂ Saved</h3>
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-600">{carbonSavings.totalCO2Saved}t</p>
          <p className="text-sm text-purple-600 mt-2">≈ {carbonSavings.equivalentTrees} trees</p>
        </div>

        <div className="bg-pink-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-pink-600 mr-3" />
              <h3 className="text-lg font-semibold">Tax Benefits</h3>
            </div>
          </div>
          <p className="text-3xl font-bold text-pink-600">{financialMetrics.taxBenefits}</p>
          <p className="text-sm text-pink-600 mt-2">{financialMetrics.monthlyGrowth} this month</p>
        </div>
      </div>

      {/* Impact Trends Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Impact Trends</h3>
        <div className="bg-white rounded-lg p-4 border" style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={impactData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="foodSaved"
                stackId="1"
                stroke="#059669"
                fill="#059669"
                name="Food Saved (kg)"
              />
              <Area
                type="monotone"
                dataKey="mealsProvided"
                stackId="2"
                stroke="#0284c7"
                fill="#0284c7"
                name="Meals Provided"
              />
              <Area
                type="monotone"
                dataKey="carbonSaved"
                stackId="3"
                stroke="#7c3aed"
                fill="#7c3aed"
                name="Carbon Saved (kg)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Contributors and Environmental Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Contributors */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Top Contributors</h3>
          <div className="bg-white rounded-lg p-4 border" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donorContributions}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}kg`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {donorContributions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Environmental Impact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Environmental Impact</h3>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Total CO₂ Saved</p>
                <p className="text-2xl font-bold text-green-600">{carbonSavings.totalCO2Saved} tonnes</p>
                <p className="text-sm text-green-600">Monthly trend: {carbonSavings.monthlyTrend}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Equivalent Trees</p>
                <p className="text-2xl font-bold text-green-600">{carbonSavings.equivalentTrees}</p>
                <p className="text-sm text-green-600">Annual impact</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Waste Reduction</p>
                <p className="text-2xl font-bold text-green-600">{carbonSavings.wasteReduction}</p>
                <p className="text-sm text-green-600">From baseline</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Financial Impact</p>
                <p className="text-2xl font-bold text-green-600">{financialMetrics.totalValue}</p>
                <p className="text-sm text-green-600">Total savings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recognition System */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Top Impact Makers</h3>
          <button className="text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'GreenMart', impact: '3,500 kg', badge: '🏆 Platinum Donor' },
            { name: 'Fresh Foods', impact: '2,800 kg', badge: '🥈 Silver Donor' },
            { name: 'City Bakery', impact: '2,200 kg', badge: '🥉 Bronze Donor' }
          ].map((donor, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{donor.name}</h4>
                  <p className="text-sm text-gray-600">Food Donated: {donor.impact}</p>
                </div>
                <Award className="w-6 h-6 text-yellow-500" />
              </div>
              <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded">
                {donor.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
