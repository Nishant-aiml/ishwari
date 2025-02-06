import React, { useState } from 'react';

interface Beneficiary {
  id: string;
  name: string;
  type: string;
  members: number;
  requirements: string[];
  lastDelivery: string;
  status: 'active' | 'pending' | 'inactive';
  address: string;
  contact: string;
}

interface FoodAllocation {
  id: string;
  foodType: string;
  quantity: string;
  beneficiary: string;
  status: 'pending' | 'delivered' | 'cancelled';
  scheduledDate: string;
}

const BeneficiaryManagement = () => {
  const [activeTab, setActiveTab] = useState<'beneficiaries' | 'allocations'>('beneficiaries');

  const [beneficiaries] = useState<Beneficiary[]>([
    {
      id: '1',
      name: 'Hope Shelter',
      type: 'Shelter',
      members: 50,
      requirements: ['Prepared Meals', 'Fresh Produce', 'Bread'],
      lastDelivery: '2025-02-05',
      status: 'active',
      address: '789 Pine St',
      contact: '+91 98765 43210'
    },
    {
      id: '2',
      name: 'Care Home',
      type: 'Old Age Home',
      members: 30,
      requirements: ['Prepared Meals', 'Dairy Products'],
      lastDelivery: '2025-02-04',
      status: 'active',
      address: '321 Cedar Rd',
      contact: '+91 98765 43211'
    }
  ]);

  const [allocations] = useState<FoodAllocation[]>([
    {
      id: '1',
      foodType: 'Prepared Meals',
      quantity: '50 meals',
      beneficiary: 'Hope Shelter',
      status: 'pending',
      scheduledDate: '2025-02-07'
    },
    {
      id: '2',
      foodType: 'Fresh Produce',
      quantity: '25 kg',
      beneficiary: 'Care Home',
      status: 'delivered',
      scheduledDate: '2025-02-06'
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Beneficiary Management</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Add Beneficiary
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('beneficiaries')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'beneficiaries'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Beneficiaries
          </button>
          <button
            onClick={() => setActiveTab('allocations')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'allocations'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Food Allocations
          </button>
        </nav>
      </div>

      {/* Beneficiaries List */}
      {activeTab === 'beneficiaries' && (
        <div className="space-y-4">
          {beneficiaries.map(beneficiary => (
            <div key={beneficiary.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{beneficiary.name}</h4>
                  <p className="text-gray-600">{beneficiary.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  beneficiary.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {beneficiary.status.charAt(0).toUpperCase() + beneficiary.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-600">Members</p>
                  <p className="font-medium">{beneficiary.members}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Delivery</p>
                  <p className="font-medium">{beneficiary.lastDelivery}</p>
                </div>
                <div>
                  <p className="text-gray-600">Contact</p>
                  <p className="font-medium">{beneficiary.contact}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 text-sm mb-2">Food Requirements:</p>
                <div className="flex flex-wrap gap-2">
                  {beneficiary.requirements.map((req, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{beneficiary.address}</p>
                <div className="space-x-3">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Edit Details
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Allocate Food
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Allocations List */}
      {activeTab === 'allocations' && (
        <div className="space-y-4">
          {allocations.map(allocation => (
            <div key={allocation.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{allocation.foodType}</h4>
                  <p className="text-gray-600">{allocation.quantity}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  allocation.status === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : allocation.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {allocation.status.charAt(0).toUpperCase() + allocation.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Beneficiary</p>
                  <p className="font-medium">{allocation.beneficiary}</p>
                </div>
                <div>
                  <p className="text-gray-600">Scheduled Date</p>
                  <p className="font-medium">{allocation.scheduledDate}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Update Status
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeneficiaryManagement;
