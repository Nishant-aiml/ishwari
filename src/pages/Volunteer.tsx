import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Calendar, Clock, Trophy, Medal, Star, Heart, Truck, CheckCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  points: number;
  status: 'available' | 'assigned' | 'completed';
}

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  requirement: string;
}

const Volunteer = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    availability: '',
    experience: ''
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Check if user is already registered
  useEffect(() => {
    const registered = localStorage.getItem('volunteerRegistered') === 'true';
    setIsRegistered(registered);
    const points = parseInt(localStorage.getItem('volunteerPoints') || '0');
    setUserPoints(points);
  }, []);

  const badges: Badge[] = [
    {
      id: 'newbie',
      title: 'Newbie Helper',
      description: 'Complete your first delivery task',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-500',
      requirement: '1 delivery'
    },
    {
      id: 'regular',
      title: 'Regular Volunteer',
      description: 'Complete 5 delivery tasks',
      icon: <Star className="w-8 h-8" />,
      color: 'from-yellow-500 to-amber-500',
      requirement: '5 deliveries'
    },
    {
      id: 'super',
      title: 'Super Volunteer',
      description: 'Earn 100 points',
      icon: <Trophy className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-500',
      requirement: '100 points'
    }
  ];

  const deliveryTasks: Task[] = [
    {
      id: '1',
      title: 'Deliver Fresh Vegetables',
      location: 'Downtown Food Market to Community Center',
      date: '2025-02-07',
      time: '10:00 AM',
      points: 20,
      status: 'available'
    },
    {
      id: '2',
      title: 'Transport Bakery Items',
      location: 'Fresh Bakery to Shelter Home',
      date: '2025-02-07',
      time: '2:00 PM',
      points: 15,
      status: 'available'
    },
    {
      id: '3',
      title: 'Deliver Prepared Meals',
      location: 'Community Kitchen to Senior Center',
      date: '2025-02-08',
      time: '11:30 AM',
      points: 25,
      status: 'available'
    }
  ];

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('volunteerRegistered', 'true');
    localStorage.setItem('volunteerData', JSON.stringify(formData));
    setIsRegistered(true);
    setShowRegistrationModal(false);
  };

  const handleTaskAccept = (task: Task) => {
    setSelectedTask(task);
    // Update task status in local storage
    const tasks = JSON.parse(localStorage.getItem('volunteerTasks') || '[]');
    tasks.push({
      ...task,
      status: 'assigned',
      assignedDate: new Date().toISOString()
    });
    localStorage.setItem('volunteerTasks', JSON.stringify(tasks));
    
    // Update points
    const newPoints = userPoints + task.points;
    setUserPoints(newPoints);
    localStorage.setItem('volunteerPoints', newPoints.toString());
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
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4"
          >
            Volunteer Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 text-lg"
          >
            Join our community of food heroes and make a difference
          </motion.p>
        </div>

        {/* Points and Badges Section */}
        {isRegistered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{userPoints} Points</h3>
                    <p className="text-gray-600 dark:text-gray-300">Keep going! Every delivery counts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className={`p-6 bg-gradient-to-r ${badge.color}`}>
                    <div className="flex justify-center">
                      {React.cloneElement(badge.icon as React.ReactElement, { className: 'w-12 h-12 text-white' })}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{badge.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{badge.description}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Required: {badge.requirement}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Available Tasks Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Available Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveryTasks.map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Truck className="w-6 h-6 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{task.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{new Date(task.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{task.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      {task.points} Points
                    </span>
                    {isRegistered ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTaskAccept(task)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg"
                      >
                        Accept Task
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowRegistrationModal(true)}
                        className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg"
                      >
                        Register First
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Registration Modal */}
        <AnimatePresence>
          {showRegistrationModal && (
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Volunteer Registration</h3>
                
                <form onSubmit={handleRegistration} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Availability
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    >
                      <option value="">Select availability...</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="both">Both</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Previous Experience
                    </label>
                    <textarea
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg"
                    >
                      Register
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setShowRegistrationModal(false)}
                      className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Volunteer;
