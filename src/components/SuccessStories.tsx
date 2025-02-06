import React, { useState, useEffect } from 'react';

interface Story {
  id: number;
  title: string;
  content: string;
  author: string;
  role: 'donor' | 'recipient';
  image: string;
}

const stories: Story[] = [
  {
    id: 1,
    title: "Making a Difference in Our Community",
    content: "Thanks to FoodShare, we've been able to help hundreds of families in need. The platform makes it incredibly easy to connect with donors and manage pickups.",
    author: "Sarah Johnson",
    role: "recipient",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 2,
    title: "Reducing Waste, Helping Others",
    content: "As a restaurant owner, I always felt bad about surplus food going to waste. Now we can ensure it reaches those who need it most.",
    author: "Michael Chen",
    role: "donor",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 3,
    title: "Building Stronger Communities",
    content: "The impact we've seen in our neighborhood is incredible. FoodShare has created a bridge between businesses and people in need.",
    author: "Emily Rodriguez",
    role: "recipient",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

const SuccessStories = () => {
  const [currentStory, setCurrentStory] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-full">
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Success Stories
          </h3>
          
          <div className="transition-all duration-500 ease-in-out">
            <div className="flex flex-col items-center mb-6">
              <img
                src={stories[currentStory].image}
                alt={stories[currentStory].author}
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {stories[currentStory].title}
              </h4>
              <p className="text-gray-600 text-center mb-4 max-w-2xl">
                {stories[currentStory].content}
              </p>
              <div className="text-green-600 font-semibold">
                {stories[currentStory].author}
              </div>
              <div className="text-sm text-gray-500 capitalize">
                {stories[currentStory].role}
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentStory === index ? 'bg-green-600 w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
