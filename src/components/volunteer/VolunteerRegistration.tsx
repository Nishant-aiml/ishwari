import React, { useState } from 'react';

interface VolunteerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  availability: string[];
  interests: string[];
  hasVehicle: boolean;
  experience: string;
  languages: string[];
}

const VolunteerRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<VolunteerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    availability: [],
    interests: [],
    hasVehicle: false,
    experience: '',
    languages: []
  });

  const availabilityOptions = [
    'Weekday Mornings',
    'Weekday Afternoons',
    'Weekday Evenings',
    'Weekend Mornings',
    'Weekend Afternoons',
    'Weekend Evenings',
    'On-Call Emergency'
  ];

  const interestOptions = [
    'Food Pickup & Delivery',
    'Food Sorting & Packaging',
    'Kitchen Help',
    'Event Organization',
    'Community Outreach',
    'Administrative Support',
    'Emergency Response'
  ];

  const languageOptions = [
    'English',
    'Hindi',
    'Tamil',
    'Telugu',
    'Kannada',
    'Malayalam',
    'Bengali',
    'Marathi'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Availability
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {availabilityOptions.map(option => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.availability.includes(option)}
                onChange={() => handleCheckboxChange('availability', option)}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Areas of Interest
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {interestOptions.map(option => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.interests.includes(option)}
                onChange={() => handleCheckboxChange('interests', option)}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Languages Spoken
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {languageOptions.map(option => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.languages.includes(option)}
                onChange={() => handleCheckboxChange('languages', option)}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.hasVehicle}
            onChange={(e) => setFormData(prev => ({ ...prev, hasVehicle: e.target.checked }))}
            className="rounded text-green-600 focus:ring-green-500"
          />
          <span className="text-sm text-gray-700">I have access to a vehicle for food pickup/delivery</span>
        </label>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Previous Volunteer Experience
        </label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          placeholder="Tell us about your previous volunteer experience..."
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">What Happens Next?</h4>
        <ul className="space-y-2 text-sm text-blue-600">
          <li>• We'll review your application within 24-48 hours</li>
          <li>• You'll receive an email with orientation details</li>
          <li>• Complete a brief online training module</li>
          <li>• Start making a difference in your community!</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-8">
        <h3 className="text-xl font-bold">Volunteer Registration</h3>
        <p className="text-gray-600 mt-1">Join our community of food heroes</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex-1">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`flex-1 h-1 ${
                    step > stepNumber ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
              <p className="text-xs mt-2">
                {stepNumber === 1 && 'Personal Info'}
                {stepNumber === 2 && 'Preferences'}
                {stepNumber === 3 && 'Experience'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (step < 3) setStep(step + 1);
              else {
                // Submit form
                console.log('Form submitted:', formData);
              }
            }}
            className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {step === 3 ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerRegistration;
