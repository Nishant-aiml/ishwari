import React, { useState } from 'react';

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  points: number;
  status: 'not_started' | 'in_progress' | 'completed';
  progress?: number;
  sections: {
    title: string;
    completed: boolean;
  }[];
  required: boolean;
}

const TrainingModules = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const modules: Module[] = [
    {
      id: '1',
      title: 'Food Safety Basics',
      description: 'Learn essential food safety guidelines and handling procedures',
      duration: '45 mins',
      points: 100,
      status: 'completed',
      required: true,
      sections: [
        { title: 'Food Safety Introduction', completed: true },
        { title: 'Temperature Control', completed: true },
        { title: 'Safe Handling Practices', completed: true },
        { title: 'Storage Guidelines', completed: true }
      ]
    },
    {
      id: '2',
      title: 'Delivery Best Practices',
      description: 'Master the art of efficient and safe food delivery',
      duration: '30 mins',
      points: 75,
      status: 'in_progress',
      progress: 60,
      required: true,
      sections: [
        { title: 'Vehicle Requirements', completed: true },
        { title: 'Loading Techniques', completed: true },
        { title: 'Route Planning', completed: false },
        { title: 'Contactless Delivery', completed: false }
      ]
    },
    {
      id: '3',
      title: 'Community Engagement',
      description: 'Learn how to effectively engage with the community',
      duration: '25 mins',
      points: 50,
      status: 'not_started',
      required: false,
      sections: [
        { title: 'Communication Skills', completed: false },
        { title: 'Cultural Sensitivity', completed: false },
        { title: 'Conflict Resolution', completed: false },
        { title: 'Building Relationships', completed: false }
      ]
    }
  ];

  const getStatusColor = (status: Module['status']) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      not_started: 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  const getStatusText = (status: Module['status']) => {
    const text = {
      completed: 'Completed',
      in_progress: 'In Progress',
      not_started: 'Not Started'
    };
    return text[status];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold">Training Modules</h3>
          <p className="text-gray-600 mt-1">Complete training to unlock more opportunities</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-green-600">225</p>
          <p className="text-sm text-gray-600">Points Earned</p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-2xl font-bold text-green-600">2/3</p>
          <p className="text-sm text-green-800">Modules Completed</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-2xl font-bold text-blue-600">8/12</p>
          <p className="text-sm text-blue-800">Sections Completed</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-2xl font-bold text-purple-600">1.5h</p>
          <p className="text-sm text-purple-800">Time Invested</p>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map(module => (
          <div key={module.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center">
                  <h4 className="font-semibold text-lg">{module.title}</h4>
                  {module.required && (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-1">{module.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(module.status)}`}>
                {getStatusText(module.status)}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="font-medium">{module.duration}</p>
              </div>
              <div>
                <p className="text-gray-600">Points</p>
                <p className="font-medium">{module.points} pts</p>
              </div>
              <div>
                <p className="text-gray-600">Sections</p>
                <p className="font-medium">{module.sections.length}</p>
              </div>
              <div>
                <p className="text-gray-600">Progress</p>
                <p className="font-medium">
                  {module.sections.filter(s => s.completed).length}/{module.sections.length}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{
                  width: `${(module.sections.filter(s => s.completed).length / module.sections.length) * 100}%`
                }}
              ></div>
            </div>

            {/* Module Sections */}
            {selectedModule === module.id && (
              <div className="mt-4 space-y-2">
                {module.sections.map((section, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={section.completed}
                      readOnly
                      className="rounded text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{section.title}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {selectedModule === module.id ? 'Hide Details' : 'Show Details'}
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  module.status === 'completed'
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                disabled={module.status === 'completed'}
              >
                {module.status === 'completed'
                  ? 'Completed'
                  : module.status === 'in_progress'
                  ? 'Continue'
                  : 'Start Module'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certification Progress */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Certification Progress</h4>
        <div className="flex items-center">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-blue-600 mb-1">
              <span>Progress to Food Safety Certification</span>
              <span>2/3 Modules</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '66%' }}></div>
            </div>
          </div>
          <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            View Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingModules;
