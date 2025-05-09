import React from 'react';
import { useLanguage } from '../contexts/LanguageProvider'; // ✅ Import Language hook

const LinkedAccountCard = ({ platform, status }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow flex justify-between items-center">
      <h4 className="font-medium">{platform}</h4>
      <span
        className={`text-sm px-2 py-1 rounded ${
          status === 'Connected' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}
      >
        {status === 'Connected' ? t.connected || "Connected" : t.disconnected || "Disconnected"}
      </span>
    </div>
  );
};

export default LinkedAccountCard;
