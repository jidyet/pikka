import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, CreditCard, TrendingUp, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageProvider'; // ✅ Import Language hook

const BottomNav = () => {
  const location = useLocation();
  const { t } = useLanguage(); // ✅ Grab translation object
  const navItemStyle = "flex flex-col items-center justify-center text-xs";

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex justify-around items-center h-16 z-50">
      <Link to="/dashboard" className={`${navItemStyle} ${isActive('/dashboard') ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <Home size={20} />
        <span>{t.dashboard}</span> {/* ✅ Translated */}
      </Link>

      <Link to="/account" className={`${navItemStyle} ${isActive('/account') ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <User size={20} />
        <span>{t.myAccount}</span> {/* ✅ Translated */}
      </Link>

      <Link to="/billing" className={`${navItemStyle} ${isActive('/billing') ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <CreditCard size={20} />
        <span>{t.billingInfo}</span> {/* ✅ Translated */}
      </Link>

      <Link to="/upgrade" className={`${navItemStyle} ${isActive('/upgrade') ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <TrendingUp size={20} />
        <span>{t.upgrade}</span> {/* ✅ Translated */}
      </Link>

      <Link to="/usage" className={`${navItemStyle} ${isActive('/usage') ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <Settings size={20} />
        <span>{t.usage}</span> {/* ✅ Translated */}
      </Link>
    </div>
  );
};

export default BottomNav;
