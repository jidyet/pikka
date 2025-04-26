import React from 'react';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import UsageChart from '../components/UsageChart';
import UsageTable from '../components/UsageTable';

const Usage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center">
        <GoToDashboardButton />

        <div className="w-full max-w-4xl mt-8">
          <h1 className="text-3xl font-bold text-center mb-8">Your Usage</h1>

          {/* Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <UsageChart />
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <UsageTable />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Usage;
