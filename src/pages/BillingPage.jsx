// src/pages/Billing.jsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      if (!auth.currentUser) return;

      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setPlan(userData.subscription || null);
        }
      } catch (error) {
        console.error('Error fetching billing info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  const handleUpgrade = () => {
    navigate('/upgrade');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center text-center">
        <GoToDashboardButton />

        <h1 className="text-3xl font-bold mb-6">Billing Information</h1>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading billing info...</p>
        ) : (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
            {plan ? (
              <>
                <h2 className="text-lg font-bold mb-2">Active Plan:</h2>
                <p className="text-blue-500 text-2xl font-semibold mb-6">{plan.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Status: <span className="font-semibold">{plan.status || 'Active'}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Renewal Date: {plan.renewalDate || 'N/A'}
                </p>
                <button
                  onClick={handleUpgrade}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold"
                >
                  Upgrade Plan
                </button>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-4 text-red-500">No Active Subscription</h2>
                <button
                  onClick={handleUpgrade}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-semibold"
                >
                  Get a Plan
                </button>
              </>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Billing;
