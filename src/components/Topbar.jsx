import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useLanguage } from '../contexts/LanguageProvider'; // ✅

const Topbar = () => {
  const navigate = useNavigate();
  const { t } = useLanguage(); // ✅

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <header className="w-full flex flex-wrap justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <Link to="/dashboard" className="text-lg font-bold text-gray-900 dark:text-white">
        🦊 PIKKA
      </Link>

      <nav className="flex flex-wrap gap-2 items-center">
        <Link to="/dashboard" className="text-sm px-3 py-1 rounded text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300">
          {t.dashboard}
        </Link>
        <Link to="/account" className="text-sm px-3 py-1 rounded text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300">
          {t.myAccount}
        </Link>
        <Link to="/usage" className="text-sm px-3 py-1 rounded text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300">
          {t.usage}
        </Link>
        <Link to="/linked" className="text-sm px-3 py-1 rounded text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300">
          {t.linkedAccounts}
        </Link>
        <Link to="/upgrade" className="text-sm px-3 py-1 rounded text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300">
          {t.upgrade}
        </Link>
        <Link to="/select-plan" className="text-sm px-3 py-1 rounded text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300">
          {t.selectPlan}
        </Link>

        <button onClick={toggleTheme} className="text-xs px-3 py-1 rounded bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-white">
          {t.toggleTheme || "Toggle Theme"}
        </button>

        <button onClick={handleLogout} className="text-xs px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white">
          {t.logout || "Logout"}
        </button>
      </nav>
    </header>
  );
};

export default Topbar;
