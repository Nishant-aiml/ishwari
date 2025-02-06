import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import DonorDashboard from './pages/DonorDashboard';
import RecipientPage from './pages/RecipientPage';
import ExpiryFood from './pages/ExpiryFood';
import Volunteer from './pages/Volunteer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Heart, Utensils, Building2, Users, ArrowRight, Clock, Leaf } from 'lucide-react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={
                <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
                  {/* Hero Section */}
                  <header className="relative h-screen">
                    <div className="absolute inset-0">
                      <img
                        src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80"
                        alt="Food Background"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
                    </div>
                    
                    <nav className="relative z-10 container mx-auto px-6 py-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Heart className="w-8 h-8 text-green-500" />
                          <span className="text-white text-2xl font-bold">FoodShare</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                          <a href="#how-it-works" className="text-white hover:text-green-400 transition">How It Works</a>
                          <a href="#partners" className="text-white hover:text-green-400 transition">Partners</a>
                          <a href="#impact" className="text-white hover:text-green-400 transition">Impact</a>
                          <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">
                            Join Now
                          </button>
                        </div>
                      </div>
                    </nav>

                    <div className="relative z-10 container mx-auto px-6 h-[calc(100vh-120px)] flex items-center">
                      <div className="max-w-2xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                          Reducing Food Waste, Feeding Communities
                        </h1>
                        <p className="text-xl text-gray-200 mb-8">
                          Connect restaurants and supermarkets with food banks and NGOs to redistribute surplus food and fight hunger together.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link
                            to="/donor"
                            className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition flex items-center justify-center"
                          >
                            Donate Food
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Link>
                          <Link
                            to="/recipient"
                            className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
                          >
                            Find Food
                          </Link>
                        </div>
                      </div>
                    </div>
                  </header>

                  {/* How It Works Section */}
                  <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
                    <div className="container mx-auto px-6">
                      <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
                      <div className="grid md:grid-cols-3 gap-12">
                        {[
                          {
                            icon: <Clock className="w-12 h-12 text-green-500" />,
                            title: "List Surplus Food",
                            description: "Restaurants and stores can easily list their surplus food items with just a few taps."
                          },
                          {
                            icon: <Heart className="w-12 h-12 text-green-500" />,
                            title: "Connect & Coordinate",
                            description: "NGOs and food banks get notified and can claim available donations in their area."
                          },
                          {
                            icon: <Leaf className="w-12 h-12 text-green-500" />,
                            title: "Reduce & Redistribute",
                            description: "Food gets picked up and redistributed to those in need, reducing waste and helping communities."
                          }
                        ].map((item, index) => (
                          <div key={index} className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-md transition">
                            <div className="mb-6">{item.icon}</div>
                            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Partners Section */}
                  <section id="partners" className="py-20">
                    <div className="container mx-auto px-6">
                      <h2 className="text-4xl font-bold text-center mb-16">Our Partners</h2>
                      <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center">
                          <Utensils className="w-16 h-16 text-green-500 mx-auto mb-6" />
                          <h3 className="text-2xl font-bold mb-4">Restaurants</h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            Join hundreds of restaurants reducing waste and making a difference in their communities.
                          </p>
                        </div>
                        <div className="text-center">
                          <Building2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
                          <h3 className="text-2xl font-bold mb-4">Supermarkets</h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            Partner with us to ensure surplus food reaches those who need it most.
                          </p>
                        </div>
                        <div className="text-center">
                          <Users className="w-16 h-16 text-green-500 mx-auto mb-6" />
                          <h3 className="text-2xl font-bold mb-4">NGOs & Food Banks</h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            Access a reliable network of food donors to support your community programs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Impact Section */}
                  <section id="impact" className="py-20 bg-green-500 text-white dark:bg-green-600 transition-colors duration-200">
                    <div className="container mx-auto px-6">
                      <h2 className="text-4xl font-bold text-center mb-16">Our Impact</h2>
                      <div className="grid md:grid-cols-3 gap-12">
                        {[
                          { number: "50K+", label: "Meals Saved" },
                          { number: "200+", label: "Active Partners" },
                          { number: "1000+", label: "People Fed Daily" }
                        ].map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-5xl font-bold mb-4">{stat.number}</div>
                            <div className="text-xl">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Footer */}
                  <footer className="bg-gray-900 text-white py-12 dark:bg-gray-800 transition-colors duration-200">
                    <div className="container mx-auto px-6">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-8 md:mb-0">
                          <Heart className="w-8 h-8 text-green-500" />
                          <span className="text-2xl font-bold">FoodShare</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                          <a href="#how-it-works" className="hover:text-green-400 transition">How It Works</a>
                          <a href="#partners" className="hover:text-green-400 transition">Partners</a>
                          <a href="#impact" className="hover:text-green-400 transition">Impact</a>
                          <a href="#" className="hover:text-green-400 transition">Contact</a>
                        </div>
                      </div>
                      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        &copy; 2025 FoodShare. All rights reserved.
                      </div>
                    </div>
                  </footer>
                </div>
              } />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              } />
              <Route path="/donor" element={
                <PrivateRoute>
                  <DonorDashboard />
                </PrivateRoute>
              } />
              <Route path="/recipient" element={
                <PrivateRoute>
                  <RecipientPage />
                </PrivateRoute>
              } />
              <Route path="/expiry-food" element={
                <PrivateRoute>
                  <ExpiryFood />
                </PrivateRoute>
              } />
              <Route path="/volunteer" element={
                <PrivateRoute>
                  <Volunteer />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;