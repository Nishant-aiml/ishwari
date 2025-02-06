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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 sm:pt-20 sm:pb-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Donor Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Manage your donations and track your impact</p>
            </div>
            <button className="w-full sm:w-auto bg-green-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              New Donation
            </button>
          </div>

          <Tabs defaultValue="donations" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 gap-2 mb-6 sm:mb-8 overflow-x-auto">
              <TabsTrigger value="donations" className="text-sm sm:text-base whitespace-nowrap">
                Donations
              </TabsTrigger>
              <TabsTrigger value="metrics" className="text-sm sm:text-base whitespace-nowrap">
                Impact Metrics
              </TabsTrigger>
              <TabsTrigger value="recurring" className="text-sm sm:text-base whitespace-nowrap">
                Recurring
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-sm sm:text-base whitespace-nowrap">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="receipts" className="text-sm sm:text-base whitespace-nowrap">
                Tax Receipts
              </TabsTrigger>
            </TabsList>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
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
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tax Deduction Receipts</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Receipt #{i}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Date: 2025/0{i}/01</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Amount: ${i}00.00</p>
                        <button className="mt-2 text-green-600 dark:text-green-400 text-sm hover:underline">
                          Download PDF
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default DonorDashboard;
