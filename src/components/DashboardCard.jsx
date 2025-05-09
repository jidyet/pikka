import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import { useLanguage } from '../contexts/LanguageProvider'; // ✅ Import Language hook

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const { t } = useLanguage(); // ✅ Grab translation object

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">
          {t.dashboard} {user?.displayName ? `, ${user.displayName}` : '👋'}
        </h1>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
          {t.welcomeMessage || "Let's get started managing your account!"}
        </p>

        <GoToDashboardButton />
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
