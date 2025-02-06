import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Leaf, Apple, FlaskConical, Send, X } from 'lucide-react';

interface RepurposeMethod {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
}

const ExpiryFood = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<RepurposeMethod | null>(null);
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    location: '',
    description: ''
  });

  const repurposeMethods: RepurposeMethod[] = [
    {
      id: 'biogas',
      title: 'Biogas Production',
      description: 'Convert expired food into renewable energy through anaerobic digestion',
      icon: <Beaker className="w-12 h-12" />,
      color: 'from-purple-500 to-indigo-600',
      benefits: [
        'Renewable energy generation',
        'Reduced methane emissions',
        'Organic fertilizer production'
      ]
    },
    {
      id: 'compost',
      title: 'Composting',
      description: 'Transform food waste into nutrient-rich soil for agriculture',
      icon: <Leaf className="w-12 h-12" />,
      color: 'from-green-500 to-emerald-600',
      benefits: [
        'Natural fertilizer creation',
        'Soil enrichment',
        'Zero waste solution'
      ]
    },
    {
      id: 'animal-feed',
      title: 'Animal Feed',
      description: 'Process expired food into nutritious animal feed',
      icon: <Apple className="w-12 h-12" />,
      color: 'from-orange-500 to-red-600',
      benefits: [
        'Sustainable livestock feed',
        'Reduced feed costs',
        'Circular economy support'
      ]
    },
    {
      id: 'research',
      title: 'Research & Development',
      description: 'Utilize expired food for scientific research and innovation',
      icon: <FlaskConical className="w-12 h-12" />,
      color: 'from-blue-500 to-cyan-600',
      benefits: [
        'Scientific advancement',
        'New product development',
        'Food preservation research'
      ]
    }
  ];

  const handleMethodClick = (method: RepurposeMethod) => {
    setSelectedMethod(method);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store the donation in localStorage
    const donations = JSON.parse(localStorage.getItem('expiryFoodDonations') || '[]');
    donations.push({
      ...formData,
      method: selectedMethod?.id,
      date: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('expiryFoodDonations', JSON.stringify(donations));
    setShowModal(false);
    setFormData({ foodType: '', quantity: '', location: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4"
          >
            Expired Food Utilization
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 text-lg"
          >
            Give expired food a second life through sustainable repurposing methods
          </motion.p>
        </div>

        {/* Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {repurposeMethods.map((method) => (
            <motion.div
              key={method.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMethodClick(method)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300"
            >
              <div className={`p-6 bg-gradient-to-br ${method.color} text-white`}>
                <div className="flex justify-center mb-4">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{method.title}</h3>
                <p className="text-sm opacity-90 text-center">{method.description}</p>
              </div>
              <div className="p-4 bg-opacity-50">
                <ul className="space-y-2">
                  {method.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && selectedMethod && (
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
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Donate for {selectedMethod.title}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Food Type
                    </label>
                    <input
                      type="text"
                      value={formData.foodType}
                      onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Quantity (kg)
                    </label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Additional Details
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      rows={3}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className={`w-full py-3 rounded-lg bg-gradient-to-r ${selectedMethod.color} text-white flex items-center justify-center space-x-2`}
                  >
                    <Send className="w-5 h-5" />
                    <span>Submit Donation</span>
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ExpiryFood;
