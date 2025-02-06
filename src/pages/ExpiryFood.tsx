import React from 'react';
import { motion } from 'framer-motion';

interface FoodItem {
  id: string;
  name: string;
  expiryDate: string;
  quantity: string;
  type: string;
  repurposingMethods: string[];
  imageUrl: string;
}

const ExpiryFood: React.FC = () => {
  const foodItems: FoodItem[] = [
    {
      id: '1',
      name: 'Ripe Bananas',
      expiryDate: '2025-02-08',
      quantity: '5 kg',
      type: 'Fruit',
      repurposingMethods: [
        'Make banana bread',
        'Freeze for smoothies',
        'Create banana chips',
        'Use in baking recipes'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300'
    },
    {
      id: '2',
      name: 'Day-Old Bread',
      expiryDate: '2025-02-07',
      quantity: '10 loaves',
      type: 'Bakery',
      repurposingMethods: [
        'Make breadcrumbs',
        'Create croutons',
        'French toast',
        'Bread pudding'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300'
    },
    {
      id: '3',
      name: 'Mixed Vegetables',
      expiryDate: '2025-02-07',
      quantity: '3 kg',
      type: 'Vegetables',
      repurposingMethods: [
        'Make vegetable stock',
        'Create pickles',
        'Blend into soup',
        'Compost if inedible'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&w=300'
    }
  ];

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
              Food Expiry Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover creative ways to repurpose food items approaching their expiry date and reduce waste.
            </p>
          </div>

          {/* Food Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-cover w-full h-48"
                  />
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                        {item.type}
                      </span>
                      <span className="text-sm px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                        Expires: {new Date(item.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Quantity: {item.quantity}
                    </h4>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Repurposing Methods:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {item.repurposingMethods.map((method, index) => (
                          <li key={index}>{method}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 flex space-x-2">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                      Donate
                    </button>
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                      Get Recipe
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Tips to Reduce Food Waste
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">Proper Storage</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Learn the best ways to store different types of food to maximize their shelf life.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">Meal Planning</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Plan your meals in advance and buy only what you need to avoid excess food.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">Creative Reuse</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Transform leftover ingredients into new, delicious meals instead of throwing them away.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExpiryFood;
