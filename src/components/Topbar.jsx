import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { auth } from '../firebaseConfig'; // Import auth

const Topbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle('dark');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleProtectedNavigation = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="w-full flex flex-wrap justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="text-lg font-bold text-gray-900 dark:text-white">
        🦊 PIKKA
      </div>

      <nav className="flex flex-wrap gap-2 items-center">
        <button onClick={() => handleProtectedNavigation('/dashboard')} className="text-sm px-3 py-1 rounded text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300">
          {t.dashboard}
        </button>
        <button onClick={() => handleProtectedNavigation('/account')} className="text-sm px-3 py-1 rounded text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300">
          {t.myAccount}
        </button>
        <button onClick={() => handleProtectedNavigation('/usage')} className="text-sm px-3 py-1 rounded text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300">
          {t.usage}
        </button>
        <button onClick={() => handleProtectedNavigation('/linked')} className="text-sm px-3 py-1 rounded text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300">
          {t.linkedAccounts}
        </button>
        <button onClick={() => handleProtectedNavigation('/upgrade')} className="text-sm px-3 py-1 rounded text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300">
          {t.upgrade}
        </button>
        <button onClick={() => handleProtectedNavigation('/select-plan')} className="text-sm px-3 py-1 rounded text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300">
          {t.selectPlan}
        </button>

        <button onClick={toggleTheme} className="text-xs px-3 py-1 rounded bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-white">
          Toggle Theme
        </button>

        <button onClick={handleLogout} className="text-xs px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white">
          {t.logout || 'Logout'}
        </button>
      </nav>
    </header>
  );
};

export default Topbar;
