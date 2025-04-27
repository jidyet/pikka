// src/pages/Usage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import UsageChart from '../components/UsageChart';
import UsageTable from '../components/UsageTable';

const Usage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        Checking your account...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />
      <main className="flex-1 p-6 flex flex-col items-center">
        <GoToDashboardButton />

        <div className="w-full max-w-4xl mt-8">
          <h1 className="text-3xl font-bold text-center mb-8">Your Usage</h1>

          {/* Usage Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <UsageChart />
          </div>

          {/* Usage Table */}
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
