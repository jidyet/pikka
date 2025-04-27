// src/pages/Welcome.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import { useLanguage } from '../hooks/useLanguage'; // 🛜 Now working correctly
import { auth } from '../firebaseConfig'; // ⬅️ Import auth

const slides = [
  {
    titleKey: 'dashboard',
    description: 'Analyzes and prioritizes higher-paying gigs to maximize your earnings.',
    image: '/assets/slide1-ai.png',
  },
  {
    titleKey: 'usage',
    description: 'Seamless experience across iOS and Android devices.',
    image: '/assets/slide4-mobile.png',
  },
  {
    titleKey: 'linkedAccounts',
    description: 'Manage offers from anywhere without missing opportunities.',
    image: '/assets/slide5-checkin.png',
  },
  {
    titleKey: 'upgrade',
    description: 'Filter gigs based on price, time, or preferences.',
    image: '/assets/slide3-filters.png',
  },
  {
    titleKey: 'selectPlan',
    description: 'Organize your upcoming offers with our integrated calendar.',
    image: '/assets/slide2-schedule.png',
  },
];

const Welcome = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Redirect handler for Topbar/BottomNav
  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-white">
      <Topbar onNavigate={handleProtectedNavigation} />
      
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
            alt={slides[current].titleKey}
            className="w-52 h-52 object-contain mx-auto mb-4 transition-all duration-500"
          />

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {t[slides[current].titleKey]}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            {slides[current].description}
          </p>

          {/* Dots Indicator */}
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
              {t.continue} (Login)
            </button>
            <button
              onClick={() => navigate('/register')}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded"
            >
              {t.continue} (Register)
            </button>
          </div>
        </div>
      </main>

      <BottomNav onNavigate={handleProtectedNavigation} />
    </div>
  );
};

export default Welcome;
