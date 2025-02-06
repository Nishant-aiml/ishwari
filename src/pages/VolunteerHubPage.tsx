import React, { useState } from 'react';
import VolunteerRegistration from '../components/volunteer/VolunteerRegistration';
import DeliveryRouteMatching from '../components/volunteer/DeliveryRouteMatching';
import GamificationDashboard from '../components/volunteer/GamificationDashboard';
import TrainingModules from '../components/volunteer/TrainingModules';

const VolunteerHubPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRegistered] = useState(true); // This would come from auth context in a real app

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'routes', label: 'Available Routes' },
    { id: 'training', label: 'Training' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'schedule', label: 'My Schedule' },
    { id: 'community', label: 'Community' }
  ];

  // Quick stats for the overview
  const stats = [
    { label: 'Active Routes', value: '3', change: '+1 from yesterday' },
    { label: 'Points Earned', value: '1,250', change: '+150 this week' },
    { label: 'Hours Served', value: '120', change: '+8 today' },
    { label: 'Food Saved', value: '2,500 kg', change: '+45 kg this week' }
  ];

  const upcomingShifts = [
    {
      id: '1',
      type: 'Food Pickup',
      location: 'GreenMart Supermarket',
      date: '2025-02-07',
      time: '09:00 AM',
      status: 'confirmed'
    },
    {
      id: '2',
      type: 'Food Delivery',
      location: 'Hope Shelter',
      date: '2025-02-07',
      time: '02:00 PM',
      status: 'pending'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isRegistered ? (
          <VolunteerRegistration />
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Volunteer Hub</h1>
                <p className="text-gray-600">Welcome back, Sarah!</p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-white text-gray-600 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors">
                  View Calendar
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Find Routes
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

                {/* Upcoming Shifts and Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Upcoming Shifts</h3>
                    <div className="space-y-4">
                      {upcomingShifts.map(shift => (
                        <div key={shift.id} className="flex items-start">
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                              <span className="text-sm font-medium text-green-600">
                                {shift.type === 'Food Pickup' ? 'P' : 'D'}
                              </span>
                            </span>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium">{shift.type}</p>
                            <p className="text-sm text-gray-600">{shift.location}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {shift.date} at {shift.time}
                            </p>
                          </div>
                          <span className={`ml-auto px-2 py-1 rounded text-xs font-medium ${
                            shift.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                        <span className="block font-medium">Find Routes</span>
                        <span className="text-sm text-gray-600">Browse available routes</span>
                      </button>
                      <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                        <span className="block font-medium">Training</span>
                        <span className="text-sm text-gray-600">Complete modules</span>
                      </button>
                      <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                        <span className="block font-medium">My Schedule</span>
                        <span className="text-sm text-gray-600">View upcoming shifts</span>
                      </button>
                      <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                        <span className="block font-medium">Community</span>
                        <span className="text-sm text-gray-600">Connect with others</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Activity and Achievements */}
                <GamificationDashboard />
              </div>
            )}

            {activeTab === 'routes' && <DeliveryRouteMatching />}
            {activeTab === 'training' && <TrainingModules />}
            {activeTab === 'achievements' && <GamificationDashboard />}
            
            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6">My Schedule</h3>
                {/* Add Schedule Management component */}
              </div>
            )}

            {/* Community Tab */}
            {activeTab === 'community' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6">Community Forum</h3>
                {/* Add Community Forum component */}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VolunteerHubPage;
