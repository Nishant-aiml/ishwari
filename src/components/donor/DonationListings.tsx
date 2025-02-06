import React, { useState } from 'react';
import { Clock, Package, Truck, CheckCircle, Filter } from 'lucide-react';

interface Donation {
  id: string;
  foodType: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  status: 'pending' | 'scheduled' | 'in_transit' | 'delivered';
  pickupDate: string;
  recipient?: string;
}

const DonationListings = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Sample data - in real app, this would come from an API
  const donations: Donation[] = [
    {
      id: '1',
      foodType: 'Prepared Meals',
      category: 'prepared',
      quantity: 50,
      unit: 'meals',
      expiryDate: '2025-02-07T18:00:00',
      status: 'pending',
      pickupDate: '2025-02-06T15:00:00'
    },
    {
      id: '2',
      foodType: 'Fresh Vegetables',
      category: 'fresh',
      quantity: 25,
      unit: 'kg',
      expiryDate: '2025-02-08T18:00:00',
      status: 'scheduled',
      pickupDate: '2025-02-07T10:00:00',
      recipient: 'Local Food Bank'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'scheduled':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'in_transit':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Awaiting Pickup';
      case 'scheduled':
        return 'Pickup Scheduled';
      case 'in_transit':
        return 'In Transit';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Filters */}
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-1"
          >
            <option value="all">All Donations</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-1"
          >
            <option value="date">Sort by Date</option>
            <option value="status">Sort by Status</option>
            <option value="quantity">Sort by Quantity</option>
          </select>
        </div>
        <button className="text-green-600 hover:text-green-700">
          Export List
        </button>
      </div>

      {/* Listings */}
      <div className="divide-y">
        {donations.map((donation) => (
          <div key={donation.id} className="p-6 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold">{donation.foodType}</h3>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    {donation.quantity} {donation.unit}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p>Expires: {new Date(donation.expiryDate).toLocaleDateString()}</p>
                  {donation.recipient && (
                    <p className="mt-1">Recipient: {donation.recipient}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(donation.status)}
                  <span className="text-sm font-medium">
                    {getStatusText(donation.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Pickup: {new Date(donation.pickupDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-4">
              <button className="text-sm text-blue-600 hover:text-blue-700">
                View Details
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-700">
                Edit
              </button>
              <button className="text-sm text-green-600 hover:text-green-700">
                Generate Receipt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationListings;
