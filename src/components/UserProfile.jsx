import React from 'react';

const UserProfile = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
      <img src="https://i.pravatar.cc/100" className="mx-auto rounded-full mb-2" />
      <h3 className="font-bold text-lg">Kristina Davis</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">kristina@email.com</p>
    </div>
  );
};

export default UserProfile;
