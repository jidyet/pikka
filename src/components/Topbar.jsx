import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();

  const toggleTheme = () => {
    const root = window.document.documentElement;
    root.classList.toggle('dark');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const navStyle = "text-sm px-3 py-1 rounded transition-colors duration-300";
  const activeStyle = "bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white"; // corrected
  const linkStyle = "text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300"; // corrected

  return (
    <div className="w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">🦊 PIKKA</h1>

      <div className="flex items-center gap-2 flex-wrap">
        <NavLink to="/dashboard" className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : linkStyle}`}>Dashboard</NavLink>
        <NavLink to="/account" className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : linkStyle}`}>Account</NavLink>
        <NavLink to="/usage" className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : linkStyle}`}>Usage</NavLink>
        <NavLink to="/linked" className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : linkStyle}`}>Accounts</NavLink>
        <NavLink to="/upgrade" className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : linkStyle}`}>Upgrade</NavLink>
        <NavLink to="/select-plan" className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : linkStyle}`}>Plans</NavLink>

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
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
