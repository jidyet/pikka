import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import GoToDashboardButton from '../components/GoToDashboardButton';
import BottomNav from '../components/BottomNav';

const slides = [
  {
    title: 'AI-Powered Algorithm',
    description: 'Analyzes and prioritizes higher-paying gigs to maximize your earnings.',
    image: '/assets/slide1-ai.png',
  },
  {
    title: 'Mobile-Friendly',
    description: 'Seamless experience across iOS and Android devices.',
    image: '/assets/slide4-mobile.png',
  },
  {
    title: 'Remote Check-In',
    description: 'Manage offers from anywhere without missing opportunities.',
    image: '/assets/slide5-checkin.png',
  },
  {
    title: 'Advanced Filters',
    description: 'Filter gigs based on price, time, or preferences.',
    image: '/assets/slide3-filters.png',
  },
  {
    title: 'Schedule Manager',
    description: 'Organize your upcoming offers with our integrated calendar.',
    image: '/assets/slide2-schedule.png',
  },
];

const Welcome = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-white">
      <Topbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <GoToDashboardButton />

        <img
          src="/mygrabber-logo.png"
          alt="Logo"
          className="w-24 mb-6"
        />

        <div className="w-full max-w-md text-center">
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-52 h-52 object-contain mx-auto mb-4 transition-all duration-500"
          />

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {slides[current].title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            {slides[current].description}
          </p>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  current === index ? 'bg-blue-500' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded"
            >
              Register
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Welcome;
