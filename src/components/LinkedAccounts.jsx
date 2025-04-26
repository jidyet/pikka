import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import { useLanguage } from '../hooks/useLanguage'; // ✅ Language hook added

const LinkedAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

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
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center">
        <GoToDashboardButton />

        <div className="w-full max-w-5xl text-center mt-8">
          <h1 className="text-3xl font-bold mb-6">{t.linkedAccounts}</h1>

          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">{t.loading || "Loading..."}</p>
          ) : accounts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">{t.noLinkedAccounts || "No linked accounts found."}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center"
                >
                  <img
                    src="/default-avatar.png"
                    alt="Account Avatar"
                    className="w-20 h-20 rounded-full mb-4"
                  />
                  <h2 className="text-lg font-semibold">{account.username}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{account.platform}</p>
                  <p className="text-xs mt-2">
                    {t.status || "Status"}:{' '}
                    <span
                      className={`font-semibold ${
                        account.status === 'Active'
                          ? 'text-green-500'
                          : 'text-gray-400'
                      }`}
                    >
                      {account.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default LinkedAccounts;
