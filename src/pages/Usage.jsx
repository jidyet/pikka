import React from 'react';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import UsageTable from '../components/UsageTable';

const Usage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-white">
      <Topbar />

      <main className="flex-1 p-6">
        <GoToDashboardButton />

        <h1 className="text-2xl font-bold mb-6">Your Usage History</h1>

        <UsageTable />
      </main>

      <BottomNav />
    </div>
  );
};

export default Usage;
