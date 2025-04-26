import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

const LinkedAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'linkedAccounts'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setAccounts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col">
      <Topbar />

      <main className="flex-1 p-6">
        <GoToDashboardButton />

        <h2 className="text-2xl font-bold mb-6">Linked Accounts</h2>

        {loading ? (
          <p>Loading...</p>
        ) : accounts.length === 0 ? (
          <p>No linked accounts found for this user.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <p><span className="font-semibold">Platform:</span> {account.platform}</p>
                <p><span className="font-semibold">Username:</span> {account.username}</p>
                <p>
                  <span className="font-semibold">Status:</span>{' '}
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      account.status === 'Active'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-400 text-white'
                    }`}
                  >
                    {account.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default LinkedAccounts;
