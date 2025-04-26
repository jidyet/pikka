import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import { useLanguage } from '../hooks/useLanguage'; // ✅ Language hook

const plans = [
  { name: 'Basic', price: '$0', features: ['Limited Access', 'Basic Support'] },
  { name: 'Pro', price: '$19.99', features: ['Full Access', 'Priority Support', 'Early Updates'] },
  { name: 'Ultimate', price: '$49.99', features: ['Everything in Pro', 'Dedicated Manager', 'Custom Features'] },
];

const PlanSelector = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) {
      alert('Please select a plan first.');
      return;
    }
    localStorage.setItem('selectedPlan', selected.name);
    navigate('/confirm-plan');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center">
        <GoToDashboardButton />

        <div className="w-full max-w-5xl text-center mt-8">
          <h1 className="text-3xl font-bold mb-6">{t.selectPlan}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                onClick={() => setSelected(plan)}
                className={`cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center transition-all ${
                  selected?.name === plan.name
                    ? 'border-2 border-blue-500 scale-105'
                    : 'border border-transparent'
                }`}
              >
                <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
                <p className="text-2xl font-bold text-blue-500 mb-4">{plan.price}</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>- {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            onClick={handleContinue}
            className="mt-8 w-full max-w-xs bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold"
          >
            {t.continue || 'Continue'}
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default PlanSelector;
