// src/pages/BillingPage.jsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import { useNavigate } from 'react-router-dom';

const BillingPage = () => {
  const [subscription, setSubscription] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBillingInfo = async () => {
      if (!auth.currentUser) {
        navigate('/login');
        return;
      }

      try {
        const userId = auth.currentUser.uid;

        // Fetch user's active subscription
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setSubscription(userDoc.data().subscription || null);
        }

        // Fetch user's transactions history
        const q = query(collection(db, 'transactions'), where('userId', '==', userId));
        const snapshot = await getDocs(q);
        const txns = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTransactions(txns);
      } catch (error) {
        console.error('Error fetching billing info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingInfo();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-white">
        <Topbar />
        <main className="flex-1 flex items-center justify-center">
          Loading billing info...
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center">
        <GoToDashboardButton />

        <div className="w-full max-w-2xl text-center mt-8">
          <h1 className="text-3xl font-bold mb-6">Billing Information</h1>

          {/* Active Subscription */}
          {subscription ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-2">Current Plan: {subscription.plan}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-2">Price: {subscription.price}</p>
              <p className="text-gray-500 dark:text-gray-400">Card: **** **** **** {subscription.cardLast4}</p>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 mb-8">No active subscription found.</p>
          )}

          {/* Transactions */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

            {transactions.length > 0 ? (
              <div className="space-y-4 text-sm">
                {transactions.map(txn => (
                  <div key={txn.id} className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-semibold">{txn.plan}</p>
                      <p className="text-gray-500 dark:text-gray-400">{new Date(txn.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${txn.amount}</p>
                      <p className={txn.status === 'Success' ? 'text-green-400' : 'text-red-400'}>{txn.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No past transactions found.</p>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default BillingPage;
