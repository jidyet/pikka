import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

const PlanConfirm = () => {
  const navigate = useNavigate();
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
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        subscription: {
          name: selectedPlan,
          activatedAt: serverTimestamp(),
          price: selectedPlan === 'Pro' ? '$19/mo' : selectedPlan === 'Elite' ? '$49/mo' : '$0/mo',
        }
      }, { merge: true });

      navigate('/checkout');
    } catch (error) {
      console.error('Error confirming plan:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/select-plan');
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-white">
      <Topbar />
      <main className="flex-1 p-6 flex flex-col items-center justify-center">
        <GoToDashboardButton />
        <h1 className="text-2xl font-bold mb-4">Confirm Your Plan</h1>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-lg mb-2 text-gray-900 dark:text-white">Selected Plan:</h2>
          <p className="text-xl font-bold text-blue-400 mb-6">{selectedPlan}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleConfirm}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
            >
              Confirm
            </button>
            <button
              onClick={handleGoBack}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
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
