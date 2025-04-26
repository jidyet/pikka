import React from 'react';

const SettingsMenu = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h3 className="font-semibold mb-4">Settings</h3>
      <div className="space-y-2">
        <label className="block">
          <span className="text-sm">Email Notifications</span>
          <select className="mt-1 w-full rounded border p-2 dark:bg-gray-700 dark:text-white">
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm">Language</span>
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
