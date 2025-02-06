import React, { useState } from 'react';
import { Camera, Upload } from 'lucide-react';

interface DonationFormData {
  foodType: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  storageTemp: number;
  storageConditions: string;
  photo: File | null;
  qualityCertification: boolean;
  pickupAddress: string;
  pickupDate: string;
  pickupTimeSlot: string;
  additionalNotes: string;
}

const DonationForm = () => {
  const [formData, setFormData] = useState<DonationFormData>({
    foodType: '',
    category: '',
    quantity: 0,
    unit: 'kg',
    expiryDate: '',
    storageTemp: 4,
    storageConditions: '',
    photo: null,
    qualityCertification: false,
    pickupAddress: '',
    pickupDate: '',
    pickupTimeSlot: '',
    additionalNotes: ''
  });

  const foodCategories = [
    { value: 'prepared', label: 'Prepared Meals' },
    { value: 'fresh', label: 'Fresh Produce' },
    { value: 'packaged', label: 'Packaged Foods' },
    { value: 'bakery', label: 'Bakery Items' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'frozen', label: 'Frozen Foods' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        photo: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">List New Donation</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Food Type and Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Food Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select Category</option>
              {foodCategories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Quantity and Unit */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2"
                min="0"
              />
            </div>
            <div className="w-24">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="kg">kg</option>
                <option value="items">items</option>
                <option value="meals">meals</option>
              </select>
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="datetime-local"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Storage Conditions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Storage Temperature (°C)
            </label>
            <input
              type="number"
              name="storageTemp"
              value={formData.storageTemp}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Photo Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Food Photos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm text-gray-600">
                  Upload photos of the food
                </span>
              </label>
            </div>
          </div>

          {/* Pickup Details */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Address
            </label>
            <textarea
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Date
            </label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Pickup Time
            </label>
            <select
              name="pickupTimeSlot"
              value={formData.pickupTimeSlot}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select Time Slot</option>
              <option value="morning">Morning (9 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
              <option value="evening">Evening (3 PM - 6 PM)</option>
            </select>
          </div>
        </div>

        {/* Quality Certification */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="qualityCertification"
            checked={formData.qualityCertification}
            onChange={handleInputChange}
            className="h-4 w-4 text-green-600"
          />
          <label className="text-sm text-gray-700">
            I certify that this food meets all safety and quality standards
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            List Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;
