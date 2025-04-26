import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Forgot Password
        </h2>
        <form className="space-y-5">
          <input type="email" placeholder="Enter your email" className="input" />
          <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
