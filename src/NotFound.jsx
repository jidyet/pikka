// src/NotFound.jsx
import React from 'react';
import { useLanguage } from './hooks/useLanguage'; // useLanguage is inside the Provider

const NotFound = () => {
  const { t } = useLanguage(); // ✅ Get translations

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-lg mt-4">{t.pageNotFound || "Page not found"}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t.pageNotExist || "The page you’re looking for doesn’t exist."}</p>
      </div>
    </div>
  );
};

export default NotFound;
