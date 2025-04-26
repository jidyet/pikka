import React from 'react';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import { useNavigate } from 'react-router-dom';

const FakeCheckout = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <GoToDashboardButton />

        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Payment Successful 🎉</h1>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for upgrading your plan! You now have full access.
          </p>

          <button
            onClick={handleFinish}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md"
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
