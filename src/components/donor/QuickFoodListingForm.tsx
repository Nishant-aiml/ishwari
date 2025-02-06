import React, { useState } from 'react';

interface FoodListing {
  category: string;
  quantity: string;
  unit: string;
  expiryDate: string;
  storageConditions: string;
  photos: File[];
  qualityCertification: string;
  description: string;
}

const QuickFoodListingForm = () => {
  const [listing, setListing] = useState<FoodListing>({
    category: '',
    quantity: '',
    unit: 'kg',
    expiryDate: '',
    storageConditions: '',
    photos: [],
    qualityCertification: '',
    description: ''
  });

  const foodCategories = [
    'Prepared Meals',
    'Fresh Produce',
    'Bakery Items',
    'Dairy Products',
    'Canned Goods',
    'Beverages',
    'Dry Goods',
    'Others'
  ];

  const storageTypes = [
    'Room Temperature',
    'Refrigerated',
    'Frozen',
    'Need Immediate Pickup'
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setListing(prev => ({
        ...prev,
        photos: [...Array.from(e.target.files!)]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save the listing
    console.log('Submitting listing:', listing);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-6">Quick Food Listing</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Food Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Food Category*
            </label>
            <select
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              value={listing.category}
              onChange={e => setListing(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="">Select Category</option>
              {foodCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity*
              </label>
              <input
                type="number"
                required
                min="0"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                value={listing.quantity}
                onChange={e => setListing(prev => ({ ...prev, quantity: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <select
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                value={listing.unit}
                onChange={e => setListing(prev => ({ ...prev, unit: e.target.value }))}
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="items">Items</option>
                <option value="meals">Meals</option>
                <option value="liters">Liters</option>
              </select>
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date*
            </label>
            <input
              type="datetime-local"
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              value={listing.expiryDate}
              onChange={e => setListing(prev => ({ ...prev, expiryDate: e.target.value }))}
            />
          </div>

          {/* Storage Conditions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Storage Conditions*
            </label>
            <select
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              value={listing.storageConditions}
              onChange={e => setListing(prev => ({ ...prev, storageConditions: e.target.value }))}
            >
              <option value="">Select Storage Type</option>
              {storageTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Photos Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photos
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                >
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Quality Certification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quality Certification
          </label>
          <input
            type="text"
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            value={listing.qualityCertification}
            onChange={e => setListing(prev => ({ ...prev, qualityCertification: e.target.value }))}
            placeholder="e.g., FSSAI License Number"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Details
          </label>
          <textarea
            rows={3}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            value={listing.description}
            onChange={e => setListing(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Any special handling instructions or additional information..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            List Food Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickFoodListingForm;
