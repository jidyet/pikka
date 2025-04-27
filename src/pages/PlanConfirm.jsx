import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import { useLanguage } from '../contexts/LanguageProvider'; // ✅ correct

const PlanConfirm = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const plan = localStorage.getItem('selectedPlan');
    if (plan) {
      setSelectedPlan(plan);
    } else {
      navigate('/select-plan');
    }
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleConfirm = async () => {
    try {
      if (!auth.currentUser) {
        navigate('/login');
        return;
      }

      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        subscription: {
          name: selectedPlan,
          activatedAt: serverTimestamp(),
          price:
            selectedPlan === 'Pro' ? '$19/mo' :
            selectedPlan === 'Elite' ? '$49/mo' :
            '$0',
        }
      }, { merge: true });

      toast.success(t.planConfirmed || '✅ Plan Confirmed!');
      navigate('/checkout');
    } catch (error) {
      console.error('Error saving subscription:', error);
      toast.error(t.planConfirmFailed || '❌ Failed to confirm plan.');
    }
  };

  const handleGoBack = () => {
    navigate('/select-plan');
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-white">
        {t.verifyingAccount || "Verifying your account..."}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />
      <main className="flex-1 p-6 flex flex-col items-center justify-center pb-28">
        <GoToDashboardButton />

        <h1 className="text-3xl font-bold mb-6">{t.confirmPlan || "Confirm Your Plan"}</h1>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-lg mb-2 text-gray-900 dark:text-white">{t.selectedPlan || "Selected Plan"}:</h2>
          <p className="text-2xl font-bold text-blue-500 mb-6">{selectedPlan}</p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleConfirm}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
            >
              {t.confirm || "Confirm"}
            </button>
            <button
              onClick={handleGoBack}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
            >
              {t.goBack || "Go Back"}
            </button>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default PlanConfirm;
