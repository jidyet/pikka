import React from 'react';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

const actions = [
  { time: '2 mins ago', action: 'Linked Twitter', result: 'Success' },
  { time: '10 mins ago', action: 'Upgraded Plan', result: 'Success' },
  { time: '1 hour ago', action: 'Exported Usage', result: 'Pending' },
];

const UsageTable = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col">
      <Topbar />

      <main className="flex-1 p-6">
        <GoToDashboardButton />

        <h1 className="text-2xl font-bold mb-6">Recent Activity</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="p-4 text-gray-700 dark:text-gray-300">Time</th>
                <th className="p-4 text-gray-700 dark:text-gray-300">Action</th>
                <th className="p-4 text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4">{item.time}</td>
                  <td className="p-4">{item.action}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        item.result === 'Success'
                          ? 'bg-green-500 text-white'
                          : 'bg-yellow-500 text-white'
                      }`}
                    >
                      {item.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default UsageTable;
