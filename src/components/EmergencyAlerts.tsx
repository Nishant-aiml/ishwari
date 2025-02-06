import React, { useState, useEffect } from 'react';

interface Alert {
  id: number;
  message: string;
  location: string;
  urgency: 'high' | 'medium' | 'low';
  timeNeeded: string;
}

const dummyAlerts: Alert[] = [
  {
    id: 1,
    message: "Urgent need for non-perishable food items",
    location: "Downtown Food Bank",
    urgency: "high",
    timeNeeded: "Within 24 hours"
  },
  {
    id: 2,
    message: "Fresh produce needed for community kitchen",
    location: "Hope Community Center",
    urgency: "medium",
    timeNeeded: "Within 48 hours"
  },
  {
    id: 3,
    message: "Baby food and formula needed",
    location: "Family Support Center",
    urgency: "high",
    timeNeeded: "ASAP"
  }
];

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(dummyAlerts);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Simulate receiving new alerts
    const timer = setInterval(() => {
      const shouldAddAlert = Math.random() > 0.7;
      if (shouldAddAlert) {
        const newAlert: Alert = {
          id: Date.now(),
          message: "New emergency food needed",
          location: "Local Shelter",
          urgency: Math.random() > 0.5 ? "high" : "medium",
          timeNeeded: "Within 24 hours"
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 2)]);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const getUrgencyColor = (urgency: Alert['urgency']) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="relative">
      {showNotification && (
        <div className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          New Emergency Alert!
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <span className="mr-2">🚨</span>
          Emergency Food Alerts
        </h3>
        
        <div className="space-y-4">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">{alert.message}</h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(
                    alert.urgency
                  )}`}
                >
                  {alert.urgency.toUpperCase()}
                </span>
              </div>
              
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-1">
                  <span className="mr-2">📍</span>
                  {alert.location}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">⏰</span>
                  {alert.timeNeeded}
                </div>
              </div>
              
              <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Respond to Alert
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlerts;
