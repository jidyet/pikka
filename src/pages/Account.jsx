import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const { language, changeLanguage, t } = useLanguage();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center pb-28"> {/* 👈 Add pb-28 here */}
        <GoToDashboardButton />

        <div className="w-full max-w-2xl text-center mt-8">
          <h1 className="text-3xl font-bold mb-4">{t.myAccount}</h1>

          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full mb-8">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold">
              {user?.displayName || 'Guest User'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user?.email || 'No email found'}
            </p>
          </div>

          {/* Billing Info */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full mb-8">
            <h3 className="text-lg font-bold mb-2">{t.billingInfo}</h3>
            <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">
              Card: **** **** **** 4242
            </p>
            <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
              Next Payment: June 30, 2025
            </p>
            <button
              onClick={() => navigate('/billing')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
            >
              {t.manageBilling}
            </button>
          </div>

          {/* Settings */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full mt-8">
            <h3 className="text-lg font-bold mb-4">{t.settings}</h3>

            {/* Email Notifications */}
            <div className="mb-6 text-left">
              <label className="block text-sm font-semibold mb-2">{t.emailNotifications}</label>
              <select
                className="w-full px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>

            {/* Language Selection */}
            <div className="text-left">
              <label className="block text-sm font-semibold mb-2">{t.language}</label>
              <select
                className="w-full px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
              >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Spanish</option>
                <option value="de">🇩🇪 German</option>
                <option value="zh">🇨🇳 Mandarin</option>
                <option value="fr">🇫🇷 French</option>
              </select>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Account;
