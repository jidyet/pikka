import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('✅ Password reset link sent! Check your email.');
    } catch (err) {
      console.error('Reset error:', err);
      setError('❌ Failed to send reset link. Please check your email.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center justify-center">
        <GoToDashboardButton />

        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Forgot Password
        </h1>

        <form onSubmit={handlePasswordReset} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-2">
              Enter your email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            Send Reset Link
          </button>
        </form>

        <button
          onClick={() => navigate('/login')}
          className="text-blue-400 text-sm mt-4"
        >
          Back to Login
        </button>
      </main>

      <BottomNav />
    </div>
  );
};

export default ForgotPassword;
