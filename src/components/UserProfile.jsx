import React from 'react';
import { useLanguage } from '../contexts/LanguageProvider'; // ✅

const UserProfile = () => {
  const { t } = useLanguage(); // ✅

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
      <img src="https://i.pravatar.cc/100" alt="Profile" className="mx-auto rounded-full mb-2" />
      <h3 className="font-bold text-lg">{t.userName || "Kristina Davis"}</h3> {/* ✅ Optional dynamic name */}
      <p className="text-sm text-gray-500 dark:text-gray-400">{t.userEmail || "kristina@email.com"}</p>
    </div>
  );
};

export default UserProfile;
