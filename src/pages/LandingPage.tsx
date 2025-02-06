import React from 'react';
import { Link } from 'react-router-dom';
import ImpactCounter from '../components/ImpactCounter';
import SuccessStories from '../components/SuccessStories';
import EmergencyAlerts from '../components/EmergencyAlerts';
import FeaturedPartners from '../components/FeaturedPartners';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-800 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Reducing Food Waste,<br />Feeding Communities
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our mission to reduce food waste and help those in need. Every meal saved is a step towards a better future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/donate"
                className="px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                I Want to Donate
              </Link>
              <Link
                to="/receive"
                className="px-8 py-3 bg-green-700 text-white rounded-full font-semibold hover:bg-green-800 transition-colors inline-flex items-center justify-center"
              >
                I Need Food
              </Link>
            </div>
          </div>

          {/* Impact Counter in Hero */}
          <div className="max-w-5xl mx-auto">
            <ImpactCounter />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Success Stories */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Success Stories</h2>
              <SuccessStories />
            </section>

            {/* Featured Partners */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Partners</h2>
              <FeaturedPartners />
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Emergency Alerts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Emergency Alerts</h2>
              <EmergencyAlerts />
            </section>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Today's Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Donations</span>
                  <span className="font-semibold text-green-600">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Food Rescued Today</span>
                  <span className="font-semibold text-green-600">156 kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Pickups</span>
                  <span className="font-semibold text-green-600">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of donors and partners working together to create positive change.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
