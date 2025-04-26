import React, { useEffect, useState } from 'react';
import { auth, db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Topbar from './components/Topbar';
import { useLanguage } from './hooks/useLanguage'; // 👈 Import useLanguage
import BottomNav from './components/BottomNav';
import GoToDashboardButton from './components/GoToDashboardButton';

const Dashboard = () => {
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [botActive, setBotActive] = useState(false);
  const { t } = useLanguage(); // 👈 useLanguage hook here

  const firstName = auth.currentUser?.displayName
    ? auth.currentUser.displayName.split(' ')[0]
    : '';

  useEffect(() => {
    const fetchLinkedAccounts = async () => {
      if (!auth.currentUser) return;

      try {
        const q = query(
          collection(db, 'linkedAccounts'),
          where('userId', '==', auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const accounts = querySnapshot.docs.map(doc => doc.data());
        setLinkedAccounts(accounts);
      } catch (error) {
        console.error('Error fetching linked accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinkedAccounts();
  }, []);

  const handleToggle = () => {
    setBotActive((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0f111a] text-white">
        <Topbar />
        <div className="flex-grow flex items-center justify-center">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0f111a] text-white">
      <Topbar />

      <div className="flex flex-col items-center px-6 py-10">
        {/* Welcome */}
        <h1 className="text-2xl font-bold mb-2">{t.welcome} {firstName}</h1>

        {/* Linked Account Card */}
        {linkedAccounts.length > 0 && (
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg w-full max-w-sm mb-8 mt-6">
            <img
              src="/default-avatar.png"
              alt="User Avatar"
              className="w-16 h-16 rounded-full mb-2"
            />
            <h2 className="text-lg font-semibold">{linkedAccounts[0].username}</h2>
            <p className="text-sm text-gray-400">{linkedAccounts[0].platform}</p>
          </div>
        )}

        {/* Center Power Button */}
        <div className="relative my-10">
          <div className="w-48 h-48 bg-[#1d1f29] rounded-full flex items-center justify-center shadow-lg relative">
            <button
              onClick={handleToggle}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300 ${
                botActive
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              ⏻
            </button>
            <p
              className={`absolute bottom-4 text-xs ${
                botActive ? 'text-green-400' : 'text-gray-500'
              }`}
            >
              {botActive ? 'Bot Activated' : 'Tap to Start'}
            </p>
          </div>
        </div>

        {/* Usage stats */}
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-bold mb-4">{t.usage || "Bot Usage (Last 24 Hours)"}</h3>
          <div className="flex justify-between text-center text-sm">
            <div className="flex-1">
              <p className="text-green-400">Good</p>
              <p className="text-2xl mt-2">0</p>
              <p className="text-gray-400 mt-1">Accepted</p>
            </div>
            <div className="flex-1">
              <p className="text-yellow-400">Caution</p>
              <p className="text-2xl mt-2">0</p>
              <p className="text-gray-400 mt-1">Missed</p>
            </div>
            <div className="flex-1">
              <p className="text-red-500">Danger</p>
              <p className="text-2xl mt-2">0</p>
              <p className="text-gray-400 mt-1">Ignored</p>
            </div>
          </div>
        </div>

        {/* Payment expired */}
        <div className="w-full max-w-md flex justify-between items-center bg-gray-700 p-4 rounded-md">
          <p className="text-sm">{t.paymentExpired || "Payment is now expired."}</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
            + ADD TIME
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
