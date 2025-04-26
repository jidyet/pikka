import React from 'react';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import { useNavigate } from 'react-router-dom';

const plans = [
  { name: 'Basic Plan', price: '$9.99/mo', description: 'Good for starters' },
  { name: 'Pro Plan', price: '$19.99/mo', description: 'Better for freelancers' },
  { name: 'Ultimate Plan', price: '$29.99/mo', description: 'Perfect for heavy users' },
];

const PlanSelector = () => {
  const navigate = useNavigate();

  const handleSelect = (planName) => {
    // 🚀 In future, save selected plan to state or backend
    console.log('Selected Plan:', planName);
    navigate('/confirm-plan');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col">
      <Topbar />

      <main className="flex-1 p-6">
        <GoToDashboardButton />

        <h1 className="text-2xl font-bold mb-6">Choose Your Plan</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
              </div>
              <div className="mt-auto">
                <p className="text-2xl font-bold mb-4">{plan.price}</p>
                <button
                  onClick={() => handleSelect(plan.name)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default PlanSelector;
