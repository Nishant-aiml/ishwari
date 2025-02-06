import React, { useState, useEffect } from 'react';

interface CounterProps {
  endValue: number;
  label: string;
  duration: number;
}

const Counter: React.FC<CounterProps> = ({ endValue, label, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const step = endValue / (duration / 16); // 60 FPS
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + step;
        return next >= endValue ? endValue : next;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [endValue, duration]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-green-600 mb-2">
        {Math.round(count).toLocaleString()}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const ImpactCounter = () => {
  const metrics = [
    { value: 5000, label: 'Meals Saved', duration: 2000 },
    { value: 2500, label: 'kg Food Rescued', duration: 2000 },
    { value: 100, label: 'Active Donors', duration: 1500 },
    { value: 50, label: 'Partner NGOs', duration: 1500 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-white rounded-lg shadow-lg">
      {metrics.map((metric, index) => (
        <Counter
          key={index}
          endValue={metric.value}
          label={metric.label}
          duration={metric.duration}
        />
      ))}
    </div>
  );
};

export default ImpactCounter;
