import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, User, CreditCard, TrendingUp, Settings } from 'lucide-react';

const BottomNav = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleProtectedNavigation = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  const navItemStyle = "flex flex-col items-center justify-center text-xs";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex justify-around items-center h-16 z-50">
      <button onClick={() => handleProtectedNavigation('/dashboard')} className={`${navItemStyle} text-gray-500 dark:text-gray-400`}>
        <Home size={20} />
        <span>Home</span>
      </button>

      <button onClick={() => handleProtectedNavigation('/account')} className={`${navItemStyle} text-gray-500 dark:text-gray-400`}>
        <User size={20} />
        <span>Account</span>
      </button>

      <button onClick={() => handleProtectedNavigation('/billing')} className={`${navItemStyle} text-gray-500 dark:text-gray-400`}>
        <CreditCard size={20} />
        <span>Billing</span>
      </button>

      <button onClick={() => handleProtectedNavigation('/upgrade')} className={`${navItemStyle} text-gray-500 dark:text-gray-400`}>
        <TrendingUp size={20} />
        <span>Upgrade</span>
      </button>

      <button onClick={() => handleProtectedNavigation('/usage')} className={`${navItemStyle} text-gray-500 dark:text-gray-400`}>
        <Settings size={20} />
        <span>Usage</span>
      </button>
    </div>
  );
};

export default BottomNav;
