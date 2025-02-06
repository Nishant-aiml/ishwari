import React from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  requirement: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  date: string;
}

const GamificationDashboard = () => {
  const volunteerStats = {
    totalPoints: 1250,
    level: 8,
    deliveries: 45,
    hoursServed: 120,
    peopleImpacted: 850,
    foodSaved: '2,500 kg'
  };

  const badges: Badge[] = [
    {
      id: '1',
      name: 'First Delivery',
      description: 'Complete your first food delivery',
      icon: '🚚',
      earned: true,
      requirement: 'Complete 1 delivery'
    },
    {
      id: '2',
      name: 'Food Hero',
      description: 'Save 1,000 kg of food from waste',
      icon: '🦸',
      earned: true,
      requirement: 'Save 1,000 kg food'
    },
    {
      id: '3',
      name: 'Community Champion',
      description: 'Complete 50 deliveries',
      icon: '👑',
      earned: false,
      progress: 90,
      requirement: '45/50 deliveries'
    }
  ];

  const recentAchievements: Achievement[] = [
    {
      id: '1',
      title: 'Weekend Warrior',
      description: 'Completed 3 deliveries in one weekend',
      points: 150,
      date: '2025-02-05'
    },
    {
      id: '2',
      title: 'Quick Response',
      description: 'Responded to an emergency food rescue',
      points: 200,
      date: '2025-02-03'
    }
  ];

  const currentChallenges = [
    {
      title: 'February Food Hero',
      description: 'Complete 10 deliveries this month',
      reward: '500 points',
      progress: 60
    },
    {
      title: 'Waste Warrior',
      description: 'Save 200kg of food from waste',
      reward: '300 points',
      progress: 75
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold">Volunteer Impact</h3>
          <p className="text-gray-600 mt-1">Level {volunteerStats.level} Food Hero</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-green-600">{volunteerStats.totalPoints}</p>
          <p className="text-sm text-gray-600">Total Points</p>
        </div>
      </div>

      {/* Progress to Next Level */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress to Level {volunteerStats.level + 1}</span>
          <span>750/1000 XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{volunteerStats.deliveries}</p>
          <p className="text-sm text-green-800">Deliveries</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">{volunteerStats.hoursServed}</p>
          <p className="text-sm text-blue-800">Hours Served</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">{volunteerStats.peopleImpacted}</p>
          <p className="text-sm text-purple-800">People Impacted</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-yellow-600">{volunteerStats.foodSaved}</p>
          <p className="text-sm text-yellow-800">Food Saved</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4">Earned Badges</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`border rounded-lg p-4 text-center ${
                badge.earned ? 'bg-green-50' : 'bg-gray-50'
              }`}
            >
              <span className="text-4xl mb-2 block">{badge.icon}</span>
              <h5 className="font-medium">{badge.name}</h5>
              <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
              {badge.progress !== undefined ? (
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${badge.progress}%` }}
                  ></div>
                </div>
              ) : null}
              <span className="text-xs text-gray-500">{badge.requirement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Challenges */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4">Active Challenges</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentChallenges.map((challenge, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium">{challenge.title}</h5>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {challenge.reward}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{challenge.progress}% Complete</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div>
        <h4 className="font-semibold mb-4">Recent Achievements</h4>
        <div className="space-y-4">
          {recentAchievements.map(achievement => (
            <div key={achievement.id} className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <h5 className="font-medium">{achievement.title}</h5>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <p className="text-xs text-gray-500">{achievement.date}</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                +{achievement.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationDashboard;
