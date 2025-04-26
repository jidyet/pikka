import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

const PlanConfirm = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const plan = localStorage.getItem('selectedPlan');
    if (plan) {
      setSelectedPlan(plan);
    } else {
      navigate('/select-plan'); // if no plan selected, redirect back
    }
  }, [navigate]);

  const handleConfirm = () => {
    // 🚀 Save to backend later if needed
    navigate('/checkout');
  };

  const handleGoBack = () => {
    navigate('/select-plan');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <GoToDashboardButton />

        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Confirm Your Plan</h1>

          <p className="text-lg mb-4 text-gray-600 dark:text-gray-400">
            You selected: <span className="font-bold text-blue-500">{selectedPlan}</span>
          </p>

          <div className="flex flex-col gap-4 mt-6">
            <button
              onClick={handleConfirm}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md"
            >
              Confirm & Continue
            </button>

            <button
              onClick={handleGoBack}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-md"
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
