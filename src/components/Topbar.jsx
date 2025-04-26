// src/components/Topbar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage'; // 🛜 Import Language Hook

const Topbar = () => {
  const navigate = useNavigate();
  const { t } = useLanguage(); // 🛜 Access translations

  const toggleTheme = () => {
    const root = window.document.documentElement;
    root.classList.toggle('dark');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const navStyle = "text-sm px-3 py-1 rounded transition-colors duration-300";
  const activeStyle = "bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white";
  const linkStyle = "text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300";

  return (
    <div className="w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">🦊 PIKKA</h1>

      <div className="flex items-center gap-2 flex-wrap">
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
          {t.logout}
        </button>
      </div>
    </div>
  );
};

export default Topbar;
