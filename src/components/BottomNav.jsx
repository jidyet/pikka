import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Settings, LogOut, Users } from 'lucide-react';

const BottomNav = () => {
  const navClass = "flex flex-col items-center text-xs";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1d1f29] border-t border-gray-800 text-white py-3 flex justify-around z-50">
      <NavLink to="/dashboard" className={navClass}>
        <Home size={20} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/linked" className={navClass}>
        <Users size={20} />
        <span>Linked</span>
      </NavLink>
      <NavLink to="/account" className={navClass}>
        <User size={20} />
        <span>Account</span>
      </NavLink>
      <NavLink to="/upgrade" className={navClass}>
        <Settings size={20} />
        <span>Upgrade</span>
      </NavLink>
      <NavLink to="/login" className={navClass}>
        <LogOut size={20} />
        <span>Logout</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
