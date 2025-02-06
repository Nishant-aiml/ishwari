import React, { useState } from 'react';

interface DonationReceipt {
  id: string;
  date: string;
  items: {
    name: string;
    quantity: string;
    value: number;
  }[];
  totalValue: number;
  ngo: string;
  status: 'generated' | 'pending' | 'downloaded';
}

const TaxReceiptGenerator = () => {
  const [receipts] = useState<DonationReceipt[]>([
    {
      id: 'REC-2025-001',
      date: '2025-02-01',
      items: [
        { name: 'Fresh Produce', quantity: '25 kg', value: 750 },
        { name: 'Prepared Meals', quantity: '50 meals', value: 1500 }
      ],
      totalValue: 2250,
      ngo: 'Food For All Foundation',
      status: 'generated'
    },
    {
      id: 'REC-2025-002',
      date: '2025-02-05',
      items: [
        { name: 'Bakery Items', quantity: '15 kg', value: 450 },
        { name: 'Dairy Products', quantity: '10 kg', value: 800 }
      ],
      totalValue: 1250,
      ngo: 'City Food Bank',
      status: 'pending'
    }
  ]);

  const getStatusBadge = (status: DonationReceipt['status']) => {
    const styles = {
      'generated': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'downloaded': 'bg-blue-100 text-blue-800'
    };
    return styles[status];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Tax Deduction Receipts</h3>
        <div className="flex space-x-3">
          <button className="text-green-600 hover:text-green-700 font-medium">
            Download All
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Generate New
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {receipts.map(receipt => (
          <div key={receipt.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">Receipt #{receipt.id}</h4>
                <p className="text-gray-600">
                  {new Date(receipt.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(receipt.status)}`}>
                {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h5 className="font-medium mb-3">Donated Items</h5>
              <div className="space-y-2">
                {receipt.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} ({item.quantity})
                    </span>
                    <span className="font-medium">{formatCurrency(item.value)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                  <span>Total Value</span>
                  <span className="text-green-600">{formatCurrency(receipt.totalValue)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div>
                <span className="text-gray-600">NGO Partner:</span>
                <span className="ml-2 font-medium">{receipt.ngo}</span>
              </div>
              <div className="flex space-x-3">
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Preview
                </button>
                <button className="text-green-600 hover:text-green-700 font-medium">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Tax Benefit Information</h4>
        <p className="text-sm text-blue-600">
          All donations are eligible for tax deduction under Section 80G of the Income Tax Act.
          Receipts are generated automatically and can be downloaded for your records.
        </p>
      </div>
    </div>
  );
};

export default TaxReceiptGenerator;
