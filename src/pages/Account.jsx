import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col">
      <Topbar />

      <main className="flex-1 p-6">
        <GoToDashboardButton />

        <h1 className="text-2xl font-bold mb-6">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold">{user?.displayName || 'Guest User'}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || 'No Email'}</p>
          </div>

          {/* Billing Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Billing Info</h3>
            <p className="text-sm mb-2 text-gray-700 dark:text-gray-400">Card ending in **** 4242</p>
            <p className="text-sm mb-4 text-gray-700 dark:text-gray-400">Next payment: May 30, 2025</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Manage Billing
            </button>
          </div>

          {/* Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Settings</h3>

            <div className="mb-4">
              <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Email Notifications</label>
              <select className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Language</label>
              <select className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                <option>English</option>
                <option>Spanish</option>
              </select>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Account;
