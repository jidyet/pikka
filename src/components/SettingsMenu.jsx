import React from 'react';
import { useLanguage } from '../contexts/LanguageProvider'; // ✅

const SettingsMenu = () => {
  const { t } = useLanguage(); // ✅

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h3 className="font-semibold mb-4">{t.settings || "Settings"}</h3>
      <div className="space-y-2">
        <label className="block">
          <span className="text-sm">{t.emailNotifications || "Email Notifications"}</span>
          <select className="mt-1 w-full rounded border p-2 dark:bg-gray-700 dark:text-white">
            <option>{t.enabled || "Enabled"}</option>
            <option>{t.disabled || "Disabled"}</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm">{t.language || "Language"}</span>
          <select className="mt-1 w-full rounded border p-2 dark:bg-gray-700 dark:text-white">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>Mandarin</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default SettingsMenu;
