// src/components/GoToDashboardButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const GoToDashboardButton = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <button
      onClick={() => navigate('/dashboard')}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-6"
    >
      {t.goToDashboard}
    </button>
  );
};

export default GoToDashboardButton;