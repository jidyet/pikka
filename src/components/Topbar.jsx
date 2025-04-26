// src/components/Topbar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const Topbar = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle('dark');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const navLinkBase = "text-sm px-3 py-1 rounded transition-colors duration-300";
  const activeLink = "bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white";
  const inactiveLink = "text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300";

  return (
    <header className="w-full flex flex-wrap justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="text-lg font-bold text-gray-900 dark:text-white">
        🦊 PIKKA
      </div>

      <nav className="flex flex-wrap gap-2 items-center">
        <NavLink to="/dashboard" className={({ isActive }) => `${navLinkBase} ${isActive ? activeLink : inactiveLink}`}>
          {t.dashboard}
        </NavLink>
        <NavLink to="/account" className={({ isActive }) => `${navLinkBase} ${isActive ? activeLink : inactiveLink}`}>
          {t.myAccount}
        </NavLink>
        <NavLink to="/usage" className={({ isActive }) => `${navLinkBase} ${isActive ? activeLink : inactiveLink}`}>
          {t.usage}
        </NavLink>
        <NavLink to="/linked" className={({ isActive }) => `${navLinkBase} ${isActive ? activeLink : inactiveLink}`}>
          {t.linkedAccounts}
        </NavLink>
        <NavLink to="/upgrade" className={({ isActive }) => `${navLinkBase} ${isActive ? activeLink : inactiveLink}`}>
          {t.upgrade}
        </NavLink>
        <NavLink to="/select-plan" className={({ isActive }) => `${navLinkBase} ${isActive ? activeLink : inactiveLink}`}>
          {t.selectPlan}
        </NavLink>

        {/* Small utilities buttons */}
        <button
          onClick={toggleTheme}
          className="text-xs px-3 py-1 rounded bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-white"
        >
          Toggle Theme
        </button>

        <button
          onClick={handleLogout}
          className="text-xs px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
        >
          {t.logout || 'Logout'}
        </button>
      </nav>
    </header>
  );
};

export default Topbar;
