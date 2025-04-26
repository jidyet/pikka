// src/components/Upgrade.jsx
import React from 'react';
import Topbar from './Topbar';
import BottomNav from './BottomNav';
import GoToDashboardButton from './GoToDashboardButton';

const Upgrade = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center">
        <GoToDashboardButton />

        <h1 className="text-3xl font-bold mt-10 mb-6">Upgrade Plan</h1>

        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <p className="text-center mb-4">Upgrade to enjoy more features!</p>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md">
            Upgrade Now
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Upgrade;
