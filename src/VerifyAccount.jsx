import React from 'react';

const VerifyAccount = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Verify Your Account
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We’ve sent a verification link to your email. Click the link to activate your account.
        </p>
        <button className="btn bg-green-600 hover:bg-green-700 text-white">
          Resend Verification
        </button>
      </div>
    </div>
  );
};

export default VerifyAccount;
