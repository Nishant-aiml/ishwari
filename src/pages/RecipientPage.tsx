import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FoodListing {
  id: string;
  title: string;
  description: string;
  quantity: string;
  expiryDate: string;
  location: string;
  distance: string;
  type: string;
  imageUrl: string;
}

const RecipientPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Dummy data for food listings
  const foodListings: FoodListing[] = [
    {
      id: '1',
      title: 'Fresh Vegetables',
      description: 'Assorted fresh vegetables including carrots, tomatoes, and lettuce',
      quantity: '10 kg',
      expiryDate: '2025-02-08',
      location: 'Local Farm Market',
      distance: '2.5 km',
      type: 'vegetables',
      imageUrl: 'https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&w=300',
    },
    {
      id: '2',
      title: 'Bread and Pastries',
      description: 'Freshly baked bread and assorted pastries',
      quantity: '20 pieces',
      expiryDate: '2025-02-07',
      location: 'Downtown Bakery',
      distance: '1.8 km',
      type: 'bakery',
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300',
    },
    {
      id: '3',
      title: 'Canned Goods',
      description: 'Various canned foods including beans, corn, and soup',
      quantity: '15 cans',
      expiryDate: '2025-08-01',
      location: 'Food Bank Central',
      distance: '3.2 km',
      type: 'canned',
      imageUrl: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7?auto=format&fit=crop&w=300',
    },
  ];

  const foodTypes = ['all', 'vegetables', 'bakery', 'canned', 'dairy', 'meat'];

  const filteredListings = foodListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || listing.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:py-12 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Available Food Donations
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Browse through available food donations in your area. All items are verified for quality and safety.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search for food items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="w-full sm:w-48">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {foodTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Food Listings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map(listing => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="object-cover w-full h-48"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {listing.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {listing.distance}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {listing.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Quantity:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{listing.quantity}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Expires:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(listing.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                      Request Food
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">
                No food listings found matching your criteria.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RecipientPage;
