import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

const LinkedAccounts = () => {
  const { user, loading } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    if (user) {
      const fetchAccounts = async () => {
        const q = query(collection(db, 'linkedAccounts'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        setAccounts(querySnapshot.docs.map(doc => doc.data()));
      };
      fetchAccounts();
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />
      <main className="flex-1 p-6 flex flex-col items-center">
        <GoToDashboardButton />
        <h1 className="text-2xl font-bold mb-6">Linked Accounts</h1>

        <div className="w-full max-w-2xl">
          {accounts.length === 0 ? (
            <p className="text-center">No linked accounts yet.</p>
          ) : (
            accounts.map((account, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                <h2 className="text-lg font-semibold">{account.username}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{account.platform}</p>
              </div>
            ))
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default LinkedAccounts;
