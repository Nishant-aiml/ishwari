import React, { useState } from 'react';
import { Thermometer, CheckCircle, AlertTriangle, TrendingUp, FileText, Shield } from 'lucide-react';

interface TemperatureLog {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  timestamp: string;
  status: 'normal' | 'warning' | 'critical';
}

interface ComplianceCheck {
  id: string;
  name: string;
  status: 'passed' | 'pending' | 'failed';
  lastChecked: string;
  nextCheck: string;
  criteria: string[];
}

const FoodSafetyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const temperatureLogs: TemperatureLog[] = [
    {
      id: '1',
      location: 'Cold Storage A',
      temperature: 2.5,
      humidity: 85,
      timestamp: '2025-02-06 17:45:00',
      status: 'normal'
    },
    {
      id: '2',
      location: 'Freezer Unit B',
      temperature: -18.2,
      humidity: 78,
      timestamp: '2025-02-06 17:45:00',
      status: 'normal'
    },
    {
      id: '3',
      location: 'Transport Van 103',
      temperature: 5.8,
      humidity: 82,
      timestamp: '2025-02-06 17:45:00',
      status: 'warning'
    }
  ];

  const complianceChecks: ComplianceCheck[] = [
    {
      id: '1',
      name: 'Food Storage Temperature',
      status: 'passed',
      lastChecked: '2025-02-06 16:00:00',
      nextCheck: '2025-02-06 20:00:00',
      criteria: [
        'Temperature between 2-4°C for refrigerated items',
        'Temperature below -18°C for frozen items',
        'No temperature fluctuations exceeding 2°C'
      ]
    },
    {
      id: '2',
      name: 'Food Packaging Integrity',
      status: 'pending',
      lastChecked: '2025-02-06 14:00:00',
      nextCheck: '2025-02-06 18:00:00',
      criteria: [
        'No damaged or compromised packaging',
        'Proper sealing of all containers',
        'Clear labeling with expiry dates'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      normal: 'text-green-600',
      warning: 'text-yellow-600',
      critical: 'text-red-600',
      passed: 'text-green-600',
      pending: 'text-yellow-600',
      failed: 'text-red-600'
    };
    return colors[status] || 'text-gray-600';
  };

  const getStatusBg = (status: string) => {
    const colors = {
      normal: 'bg-green-100',
      warning: 'bg-yellow-100',
      critical: 'bg-red-100',
      passed: 'bg-green-100',
      pending: 'bg-yellow-100',
      failed: 'bg-red-100'
    };
    return colors[status] || 'bg-gray-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Food Safety & Compliance</h2>
          <p className="text-gray-600">Monitor and maintain food safety standards</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Generate Report
        </button>
      </div>

      {/* Safety Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold">Safety Score</h3>
            </div>
            <span className="text-2xl font-bold text-green-600">94%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold">Compliance Rate</h3>
            </div>
            <span className="text-2xl font-bold text-blue-600">98%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '98%' }}></div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold">Health Certificates</h3>
            </div>
            <span className="text-2xl font-bold text-purple-600">45</span>
          </div>
          <p className="text-sm text-purple-600">Valid certificates this month</p>
        </div>
      </div>

      {/* Temperature Monitoring */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Temperature Monitoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {temperatureLogs.map(log => (
            <div key={log.id} className={`${getStatusBg(log.status)} rounded-lg p-4`}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{log.location}</h4>
                <span className={`px-2 py-1 rounded text-sm ${getStatusBg(log.status)} ${getStatusColor(log.status)}`}>
                  {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-lg font-semibold">{log.temperature}°C</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-lg font-semibold">{log.humidity}%</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Last updated: {log.timestamp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Checks */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Compliance Checks</h3>
        <div className="space-y-4">
          {complianceChecks.map(check => (
            <div key={check.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium">{check.name}</h4>
                  <p className="text-sm text-gray-600">
                    Last checked: {check.lastChecked}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusBg(check.status)} ${getStatusColor(check.status)}`}>
                  {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                </span>
              </div>
              <div className="space-y-2">
                {check.criteria.map((criterion, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span>{criterion}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Next scheduled check: {check.nextCheck}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodSafetyDashboard;
