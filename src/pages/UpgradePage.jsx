// src/pages/UpgradePage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

const UpgradePage = () => {
  const { user, loading: authLoading } = useAuth();
  const { plan, status, loading: subscriptionLoading } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [authLoading, user, navigate]);

  const handleUpgrade = () => {
    navigate('/select-plan');
  };

  if (authLoading || subscriptionLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-white">
        <Topbar />
        <main className="flex-1 flex items-center justify-center">
          Checking subscription details...
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
          <h1 className="text-3xl font-bold mb-6">Manage Subscription</h1>

          {plan ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-2">Current Plan: {plan}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Status:{' '}
                <span className={status === 'Active' ? 'text-green-400' : 'text-red-400'}>
                  {status}
                </span>
              </p>

              {status === 'Inactive' && (
                <p className="text-sm text-yellow-400 mb-4">
                  Plan expired. Renew now to regain access!
                </p>
              )}

              <button
                onClick={handleUpgrade}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-semibold"
              >
                {status === 'Inactive' ? 'Renew Plan' : 'Manage Plan'}
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">No Active Subscription</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Choose a plan and unlock premium features today!
              </p>
              <button
                onClick={handleUpgrade}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold"
              >
                View Available Plans
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
