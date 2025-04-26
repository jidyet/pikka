// src/pages/UpgradePage.jsx
import React from 'react';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import { useSubscription } from '../hooks/useSubscription';
import { useNavigate } from 'react-router-dom';

const UpgradePage = () => {
  const { plan, status, loading } = useSubscription();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/select-plan');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-white">
        <Topbar />
        <main className="flex-1 flex items-center justify-center">
          Loading...
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center">
        <GoToDashboardButton />

        <div className="w-full max-w-2xl text-center mt-8">
          <h1 className="text-3xl font-bold mb-6">Upgrade Plan</h1>

          {plan ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-2">Your Current Plan: {plan}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Status: <span className={status === 'Active' ? 'text-green-400' : 'text-red-400'}>{status}</span>
              </p>
              <button
                onClick={handleUpgrade}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-semibold"
              >
                Upgrade to Premium
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">No Active Subscription</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Choose your plan and start using premium features today!
              </p>
              <button
                onClick={handleUpgrade}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-semibold"
              >
                View Plans
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default UpgradePage;
