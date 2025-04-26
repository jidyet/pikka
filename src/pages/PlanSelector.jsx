// src/pages/PlanSelector.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

const plans = [
  {
    name: 'Basic',
    price: '$0/mo',
    description: 'Great for beginners. Limited features.',
    features: ['1 Linked Account', 'Basic Analytics', 'Community Access'],
  },
  {
    name: 'Pro',
    price: '$19/mo',
    description: 'Perfect for regular users. Full access.',
    features: ['Unlimited Accounts', 'Advanced Analytics', 'Priority Support'],
  },
  {
    name: 'Elite',
    price: '$49/mo',
    description: 'For power users. Premium support and features.',
    features: ['Everything in Pro', 'Private Beta Access', 'Dedicated Manager'],
  },
];

const PlanSelector = () => {
  const navigate = useNavigate();

  const handleSelect = (planName) => {
    localStorage.setItem('selectedPlan', planName); // Temporarily store
    navigate('/confirm-plan');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center">
        <GoToDashboardButton />

        <h1 className="text-3xl font-bold mb-8 text-center">Select Your Plan</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-xl text-blue-500 mb-4">{plan.price}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>✅ {feature}</li>
                ))}
              </ul>

              <button
                onClick={() => handleSelect(plan.name)}
                className="mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default PlanSelector;
