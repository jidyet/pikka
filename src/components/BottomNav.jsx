// src/components/BottomNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, CreditCard, TrendingUp, Settings } from 'lucide-react'; // or any icons you use

const BottomNav = () => {
  const navItemStyle = "flex flex-col items-center justify-center text-xs";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex justify-around items-center h-16 z-50">
      <NavLink to="/dashboard" className={({ isActive }) => `${navItemStyle} ${isActive ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <Home size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/account" className={({ isActive }) => `${navItemStyle} ${isActive ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <User size={20} />
        <span>Account</span>
      </NavLink>

      <NavLink to="/billing" className={({ isActive }) => `${navItemStyle} ${isActive ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <CreditCard size={20} />
        <span>Billing</span>
      </NavLink>

      <NavLink to="/upgrade" className={({ isActive }) => `${navItemStyle} ${isActive ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <TrendingUp size={20} />
        <span>Upgrade</span>
      </NavLink>

      <NavLink to="/usage" className={({ isActive }) => `${navItemStyle} ${isActive ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <Settings size={20} />
        <span>Usage</span>
      </NavLink>
    </div>
  );
};

export default BottomNav;
