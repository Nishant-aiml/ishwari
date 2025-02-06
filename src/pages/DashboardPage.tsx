import React, { useState } from 'react';
import { FaBox, FaCalendarAlt, FaTruck, FaChartLine, FaMapMarkerAlt } from 'react-icons/fa';
import QuickFoodListingForm from '../components/donor/QuickFoodListingForm';
import PickupTracker from '../components/donor/PickupTracker';
import ImpactMetrics from '../components/donor/ImpactMetrics';
import RecurringDonations from '../components/donor/RecurringDonations';
import TaxReceiptGenerator from '../components/donor/TaxReceiptGenerator';
import WasteAnalytics from '../components/donor/WasteAnalytics';

// Types for our data structures
interface DonationStatus {
  id: string;
  type: string;
  status: 'pending' | 'accepted' | 'in-transit' | 'completed';
  quantity: string;
  pickupTime: string;
  location: string;
}

interface ImpactMetrics {
  mealsProvided: number;
  foodSaved: number;
  impactPoints: number;
}

const DashboardPage = () => {
  // Simulated user role - in real app, this would come from auth context
  const [userRole] = useState<'donor' | 'recipient' | 'volunteer'>('donor');

  // Dummy data for active donations
  const [activeDonations] = useState<DonationStatus[]>([
    {
      id: '1',
      type: 'Prepared Meals',
      status: 'pending',
      quantity: '25 meals',
      pickupTime: '2:00 PM Today',
      location: '123 Main St, City',
    },
    {
      id: '2',
      type: 'Fresh Produce',
      status: 'in-transit',
      quantity: '15 kg',
      pickupTime: '3:30 PM Today',
      location: '456 Oak Ave, City',
    },
  ]);

  // Dummy impact metrics
  const [impactMetrics] = useState<ImpactMetrics>({
    mealsProvided: 250,
    foodSaved: 125,
    impactPoints: 1500,
  });

  const getStatusColor = (status: DonationStatus['status']) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'accepted': 'bg-blue-100 text-blue-800',
      'in-transit': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800',
    };
    return colors[status];
  };

  const QuickActions = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <button className="flex items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
        <FaBox className="mr-2" />
        Quick Donation
      </button>
      <button className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <FaCalendarAlt className="mr-2" />
        Schedule Event Donation
      </button>
      <button className="flex items-center justify-center p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
        <FaTruck className="mr-2" />
        Urgent Pickup Request
      </button>
    </div>
  );

  const ImpactMetricsSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Meals Provided</h3>
        <p className="text-3xl font-bold text-green-600">{impactMetrics.mealsProvided}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Food Saved (kg)</h3>
        <p className="text-3xl font-bold text-green-600">{impactMetrics.foodSaved}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Impact Points</h3>
        <p className="text-3xl font-bold text-green-600">{impactMetrics.impactPoints}</p>
      </div>
    </div>
  );

  const ActiveDonationsSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Active Donations</h2>
      <div className="space-y-4">
        {activeDonations.map((donation) => (
          <div key={donation.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{donation.type}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(donation.status)}`}>
                {donation.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <FaTruck className="mr-2" />
                {donation.quantity}
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                {donation.pickupTime}
              </div>
              <div className="flex items-center col-span-2">
                <FaMapMarkerAlt className="mr-2" />
                {donation.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'donations', label: 'Donations' },
    { id: 'impact', label: 'Impact' },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {userRole.charAt(0).toUpperCase() + userRole.slice(1)}!
          </h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Quick Donate
          </button>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickFoodListingForm />
              <PickupTracker />
            </div>
            <ImpactMetrics />
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="space-y-6">
            <RecurringDonations />
            <TaxReceiptGenerator />
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="space-y-6">
            <ImpactMetricsSection />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <WasteAnalytics />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
