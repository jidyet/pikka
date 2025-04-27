import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageProvider'; // ✅

const availablePlans = [
  { name: 'Basic', price: '$0/mo', description: 'Good for casual users.' },
  { name: 'Pro', price: '$19/mo', description: 'Perfect for busy workers.' },
  { name: 'Elite', price: '$49/mo', description: 'For serious earners who want full power.' },
];

const Upgrade = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentPlan, setCurrentPlan] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      if (!auth.currentUser) return;

      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setCurrentPlan(userData.subscription?.name || '');
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentPlan();
  }, []);

  const handleSelectPlan = (planName) => {
    localStorage.setItem('selectedPlan', planName);
    navigate('/confirm-plan');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center">
        <GoToDashboardButton />

        <h1 className="text-3xl font-bold mb-6">{t.upgradePlan || "Upgrade Your Plan"}</h1>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">{t.loading || "Loading current plan..."}</p>
        ) : (
          <>
            {currentPlan ? (
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                {t.yourCurrentPlan || "Your current plan:"} <span className="text-blue-500 font-semibold">{currentPlan}</span>
              </p>
            ) : (
              <p className="mb-6 text-red-500 font-semibold">{t.noSubscription || "You have no active subscription."}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
              {availablePlans
                .filter(plan => plan.name !== currentPlan)
                .map((plan) => (
                  <div
                    key={plan.name}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                  >
                    <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
                    <p className="text-lg text-blue-500 mb-4">{plan.price}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>

                    <button
                      onClick={() => handleSelectPlan(plan.name)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
                    >
                      {t.choosePlan || "Choose"} {plan.name}
                    </button>
                  </div>
                ))}
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Upgrade;
