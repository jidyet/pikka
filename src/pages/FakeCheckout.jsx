import React from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

const FakeCheckout = () => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <GoToDashboardButton />

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md mb-6">
          <h1 className="text-3xl font-bold mb-4 text-green-500">🎉 Payment Successful!</h1>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Thank you for upgrading your plan. You can now enjoy full access.
          </p>

          <button
            onClick={handleDone}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold"
          >
            Go to Dashboard
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default FakeCheckout;
