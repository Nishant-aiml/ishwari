import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, MapPin, Clock, Package, X, Search, ChevronDown } from 'lucide-react';

interface FoodDonation {
  id: string;
  foodType: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  expiryDate: string;
  donorName: string;
  distance: number;
}

const RecipientPage = () => {
  const [donations, setDonations] = useState<FoodDonation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<FoodDonation[]>([]);
  const [filters, setFilters] = useState({
    foodType: '',
    location: '',
    expiring: false
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<FoodDonation | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Load dummy data from localStorage or initialize if not present
  useEffect(() => {
    const storedDonations = localStorage.getItem('availableDonations');
    if (storedDonations) {
      setDonations(JSON.parse(storedDonations));
    } else {
      const dummyDonations: FoodDonation[] = [
        {
          id: '1',
          foodType: 'Fresh Vegetables',
          category: 'produce',
          quantity: 25,
          unit: 'kg',
          location: 'Downtown Food Market',
          expiryDate: '2025-02-08',
          donorName: 'Green Grocers',
          distance: 2.5
        },
        {
          id: '2',
          foodType: 'Prepared Meals',
          category: 'prepared',
          quantity: 50,
          unit: 'meals',
          location: 'Community Kitchen',
          expiryDate: '2025-02-07',
          donorName: 'Local Restaurant',
          distance: 1.8
        },
        {
          id: '3',
          foodType: 'Bread and Pastries',
          category: 'bakery',
          quantity: 30,
          unit: 'items',
          location: 'Fresh Bakery',
          expiryDate: '2025-02-07',
          donorName: 'Daily Bread',
          distance: 3.2
        }
      ];
      setDonations(dummyDonations);
      localStorage.setItem('availableDonations', JSON.stringify(dummyDonations));
    }
  }, []);

  // Filter donations based on selected filters
  useEffect(() => {
    let filtered = [...donations];
    
    if (filters.foodType) {
      filtered = filtered.filter(d => 
        d.foodType.toLowerCase().includes(filters.foodType.toLowerCase()) ||
        d.category.toLowerCase().includes(filters.foodType.toLowerCase())
      );
    }
    
    if (filters.location) {
      filtered = filtered.filter(d => 
        d.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.expiring) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      filtered = filtered.filter(d => new Date(d.expiryDate) <= tomorrow);
    }
    
    setFilteredDonations(filtered);
  }, [donations, filters]);

  const handleRequest = (donation: FoodDonation) => {
    setSelectedDonation(donation);
    setShowModal(true);
  };

  const confirmRequest = () => {
    if (selectedDonation) {
      // Store request in localStorage
      const requests = JSON.parse(localStorage.getItem('foodRequests') || '[]');
      requests.push({
        donationId: selectedDonation.id,
        requestTime: new Date().toISOString(),
        status: 'pending'
      });
      localStorage.setItem('foodRequests', JSON.stringify(requests));
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Available Food Donations</h1>
          <p className="text-gray-600 dark:text-gray-300">Find and request available food donations in your area</p>
        </div>

        {/* Filters Section */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8"
          initial={false}
          animate={{ height: showFilters ? 'auto' : '64px' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-green-500" />
              <span className="font-medium text-gray-700 dark:text-gray-200">Filters</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <motion.div
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Food Type"
                    value={filters.foodType}
                    onChange={(e) => setFilters({ ...filters, foodType: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.expiring}
                    onChange={(e) => setFilters({ ...filters, expiring: e.target.checked })}
                    className="w-4 h-4 text-green-500 rounded border-gray-300 dark:border-gray-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700 dark:text-gray-200">Expiring Soon</span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Donations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <motion.div
              key={donation.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{donation.foodType}</h3>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    {donation.quantity} {donation.unit}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{donation.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Expires: {new Date(donation.expiryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Package className="w-4 h-4 mr-2" />
                    <span>From: {donation.donorName}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRequest(donation)}
                  className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
                >
                  Request Food
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showModal && selectedDonation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Confirm Request</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Are you sure you want to request {selectedDonation.quantity} {selectedDonation.unit} of {selectedDonation.foodType} from {selectedDonation.donorName}?
                </p>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmRequest}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-green-700"
                  >
                    Confirm
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RecipientPage;
