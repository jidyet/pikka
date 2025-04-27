// src/pages/PlanSelector.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

// ✅ Plans data
const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Great for casual users. Limited features.',
    features: ['Limited Access', 'Community Support'],
  },
  {
    name: 'Pro',
    price: '$19/mo',
    description: 'Unlock full platform access. Best for active users.',
    features: ['Unlimited Access', 'Priority Support'],
  },
  {
    name: 'Elite',
    price: '$49/mo',
    description: 'Full power unlocked. Best for professionals.',
    features: ['All Pro Features', '1-on-1 Mentorship'],
  },
];

const PlanSelector = () => {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSelect = (planName) => {
    if (!user) {
      navigate('/login');
      return;
    }
    localStorage.setItem('selectedPlan', planName);
    navigate('/confirm-plan');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-white">
        Verifying your account...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center pb-28">
        <GoToDashboardButton />

        <div className="w-full max-w-6xl mt-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            {t.selectPlan || "Select Your Plan"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-xl text-blue-500 mb-2">{plan.price}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{plan.description}</p>

                <ul className="text-sm text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>✅ {feature}</li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelect(plan.name)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold mt-auto"
                >
                  {t.continue || "Continue"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default PlanSelector;
