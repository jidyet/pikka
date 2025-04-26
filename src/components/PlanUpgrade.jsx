import React from 'react';
import Topbar from './Topbar';
import BottomNav from './BottomNav';
import GoToDashboardButton from './GoToDashboardButton';
import { useNavigate } from 'react-router-dom';

const PlanUpgrade = () => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/select-plan');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-white">
      <Topbar />

      <main className="flex-1 p-6">
        <GoToDashboardButton />

        <h1 className="text-2xl font-bold mb-6">Upgrade Your Plan</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Basic Plan</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">$0 / month</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Good for casual use.</p>
            <button
              onClick={handleUpgrade}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
            >
              Choose Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Premium Plan</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">$19 / month</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">All features unlocked!</p>
            <button
              onClick={handleUpgrade}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
            >
              Choose Plan
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default PlanUpgrade;
