// src/components/Topbar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage'; // 👈 Language support

const Topbar = () => {
  const navigate = useNavigate();
  const { t } = useLanguage(); // 👈 Fetch translation dictionary

  const toggleTheme = () => {
    const root = window.document.documentElement;
    root.classList.toggle('dark');
  };

  const handleLogout = () => {
    navigate('/login'); // Later you can add auth logout too
  };

  const navStyle = "text-sm px-3 py-1 rounded transition-colors duration-300";
  const activeStyle = "bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white";
  const linkStyle = "text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300";

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      {/* Logo / Title */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-0">🦊 PIKKA</h1>

      {/* Navigation Links */}
      <div className="flex flex-wrap items-center gap-2 justify-end w-full sm:w-auto">
        <NavLink to="/dashboard" className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : linkStyle}`}>
          {t.dashboard}
        </NavLink>
        <NavLink to="/account" className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : linkStyle}`}>
          {t.myAccount}
        </NavLink>
        <NavLink to="/usage" className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : linkStyle}`}>
          {t.usage}
        </NavLink>
        <NavLink to="/linked" className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : linkStyle}`}>
          {t.linkedAccounts}
        </NavLink>
        <NavLink to="/upgrade" className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : linkStyle}`}>
          {t.upgrade}
        </NavLink>
        <NavLink to="/select-plan" className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : linkStyle}`}>
          {t.selectPlan}
        </NavLink>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="text-xs px-3 py-1 rounded bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-white"
        >
          Toggle Theme
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-xs px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
        >
          {t.logout}
        </button>
      </div>
    </div>
  );
};

export default Topbar;
