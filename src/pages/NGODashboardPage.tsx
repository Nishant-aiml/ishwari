import React, { useState } from 'react';
import FoodAvailabilityFeed from '../components/ngo/FoodAvailabilityFeed';
import RouteOptimization from '../components/ngo/RouteOptimization';
import BeneficiaryManagement from '../components/ngo/BeneficiaryManagement';
import FoodSafetyCompliance from '../components/ngo/FoodSafetyCompliance';
import DistributionPlanning from '../components/ngo/DistributionPlanning';
import DemandForecasting from '../components/ngo/DemandForecasting';

const NGODashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'food', label: 'Food Availability' },
    { id: 'distribution', label: 'Distribution' },
    { id: 'beneficiaries', label: 'Beneficiaries' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'forecasting', label: 'Forecasting' }
  ];

  // Quick stats for the overview
  const stats = [
    { label: 'Active Pickups', value: '12', change: '+2 from yesterday' },
    { label: 'Food Collected', value: '250 kg', change: '+45 kg this week' },
    { label: 'Beneficiaries Served', value: '450', change: '+28 this month' },
    { label: 'Volunteer Hours', value: '120', change: '+8 today' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">NGO Dashboard</h1>
            <p className="text-gray-600">Welcome back, Food For All Foundation!</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-white text-gray-600 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors">
              Generate Report
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Request Pickup
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-gray-600 text-sm font-medium">{stat.label}</h3>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="mt-2 text-sm text-green-600">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                    <span className="block font-medium">Schedule Pickup</span>
                    <span className="text-sm text-gray-600">Create new pickup request</span>
                  </button>
                  <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                    <span className="block font-medium">Add Beneficiary</span>
                    <span className="text-sm text-gray-600">Register new organization</span>
                  </button>
                  <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                    <span className="block font-medium">Manage Routes</span>
                    <span className="text-sm text-gray-600">Optimize delivery routes</span>
                  </button>
                  <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                    <span className="block font-medium">View Reports</span>
                    <span className="text-sm text-gray-600">Analytics and insights</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                        <span className="text-sm font-medium text-green-600">P</span>
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">Pickup Completed</p>
                      <p className="text-sm text-gray-600">50kg of fresh produce collected from GreenMart</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                        <span className="text-sm font-medium text-blue-600">D</span>
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">Distribution Completed</p>
                      <p className="text-sm text-gray-600">100 meals delivered to Hope Shelter</p>
                      <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'food' && <FoodAvailabilityFeed />}
        {activeTab === 'distribution' && (
          <div className="space-y-6">
            <RouteOptimization />
            <DistributionPlanning />
          </div>
        )}
        {activeTab === 'beneficiaries' && <BeneficiaryManagement />}
        {activeTab === 'compliance' && <FoodSafetyCompliance />}
        {activeTab === 'forecasting' && <DemandForecasting />}
      </div>
    </div>
  );
};

export default NGODashboardPage;
