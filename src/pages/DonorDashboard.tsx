import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import DonationForm from '../components/donor/DonationForm';
import DonationListings from '../components/donor/DonationListings';
import DonorMetrics from '../components/donor/DonorMetrics';
import RecurringDonations from '../components/donor/RecurringDonations';
import WasteAnalytics from '../components/donor/WasteAnalytics';
import { motion } from 'framer-motion';

const DonorDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Donor Dashboard</h1>
              <p className="text-gray-600">Manage your donations and track your impact</p>
            </div>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              New Donation
            </button>
          </div>

          <Tabs defaultValue="donations" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="metrics">Impact Metrics</TabsTrigger>
              <TabsTrigger value="recurring">Recurring</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="receipts">Tax Receipts</TabsTrigger>
            </TabsList>

            <TabsContent value="donations" className="space-y-6">
              <DonationForm />
              <DonationListings />
            </TabsContent>

            <TabsContent value="metrics">
              <DonorMetrics />
            </TabsContent>

            <TabsContent value="recurring">
              <RecurringDonations />
            </TabsContent>

            <TabsContent value="analytics">
              <WasteAnalytics />
            </TabsContent>

            <TabsContent value="receipts">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Tax Deduction Receipts</h2>
                {/* Tax receipt content will be implemented here */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default DonorDashboard;
