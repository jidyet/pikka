import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

const PlanConfirm = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('');

  useEffect(() => {
    const plan = localStorage.getItem('selectedPlan');
    if (plan) {
      setSelectedPlan(plan);
    } else {
      navigate('/select-plan');
    }
  }, [navigate]);

  const handleConfirm = () => {
    navigate('/checkout');
  };

  const handleGoBack = () => {
    navigate('/select-plan');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <GoToDashboardButton />

        <h1 className="text-2xl font-bold mb-4">Confirm Your Plan</h1>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md mb-6">
          <h2 className="text-lg mb-2 text-gray-700 dark:text-white">Selected Plan:</h2>
          <p className="text-xl font-bold text-blue-500 mb-6">{selectedPlan}</p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleConfirm}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-semibold"
            >
              Confirm
            </button>
            <button
              onClick={handleGoBack}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-semibold"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default PlanConfirm;
