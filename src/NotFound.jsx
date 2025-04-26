import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-lg mt-4">Page not found</p>
        <p className="text-sm text-gray-500 mt-2">The page you’re looking for doesn’t exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
