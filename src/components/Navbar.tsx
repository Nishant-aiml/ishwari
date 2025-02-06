import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      setIsOpen(false); // Close menu after logout
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link 
              to="/" 
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">FoodShare</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {currentUser ? (
              <>
                <Link
                  to="/donor"
                  className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400"
                >
                  Donate
                </Link>
                <Link
                  to="/recipient"
                  className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400"
                >
                  Find Food
                </Link>
                <Link
                  to="/expiry-food"
                  className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400"
                >
                  Expiry Food
                </Link>
                <Link
                  to="/volunteer"
                  className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400"
                >
                  Volunteer
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden bg-white dark:bg-gray-800 shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {currentUser ? (
            <>
              <Link
                to="/donor"
                className="block text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Donate
              </Link>
              <Link
                to="/recipient"
                className="block text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Find Food
              </Link>
              <Link
                to="/expiry-food"
                className="block text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Expiry Food
              </Link>
              <Link
                to="/volunteer"
                className="block text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Volunteer
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 px-3 py-2 rounded-md text-base font-medium bg-green-500 text-white"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
          <button
            onClick={toggleDarkMode}
            className="block w-full text-left text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 px-3 py-2 rounded-md text-base font-medium"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
