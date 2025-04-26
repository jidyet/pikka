import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const UsageChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Actions',
        data: [12, 19, 7, 14, 21, 10, 16],
        fill: false,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.3,
        pointRadius: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#374151', // light mode text
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#6b7280' // Tailwind gray-500
        },
        grid: {
          color: '#e5e7eb'
        }
      },
      y: {
        ticks: {
          color: '#6b7280'
        },
        grid: {
          color: '#e5e7eb'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col">
      <Topbar />

      <main className="flex-1 p-6">
        <GoToDashboardButton />

        <h1 className="text-2xl font-bold mb-6">Weekly Usage Chart</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full">
          <Line data={data} options={options} />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default UsageChart;
