import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { auth, db } from '../firebaseConfig'; // ✅ import db
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // ✅ firestore imports
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

const FakeCheckout = () => {
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

  const handleFakePayment = async () => {
    try {
      if (!auth.currentUser) {
        toast.error('User not authenticated.');
        return;
      }

      // Save subscription to Firestore
      await addDoc(collection(db, 'subscriptions'), {
        userId: auth.currentUser.uid,
        plan: selectedPlan,
        createdAt: serverTimestamp(),
      });

      toast.success('✅ Payment Successful!');
      console.log(`Fake payment complete for: ${selectedPlan}`);
      
      localStorage.removeItem('selectedPlan');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving subscription:', error);
      toast.error('❌ Failed to save subscription.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center text-center">
        <GoToDashboardButton />

        <h1 className="text-3xl font-bold mb-6">Complete Your Payment</h1>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl mb-4">
            Selected Plan: <span className="text-blue-500 font-semibold">{selectedPlan}</span>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please proceed to finalize your subscription.
          </p>

          <button
            onClick={handleFakePayment}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md"
          >
            Complete Payment
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default FakeCheckout;
