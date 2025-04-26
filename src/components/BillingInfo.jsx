import React from 'react';

const BillingInfo = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h3 className="font-semibold mb-4">Billing Info</h3>
      <p className="text-sm">Card ending in **** 4242</p>
      <p className="text-sm">Next payment: May 30, 2025</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Manage Billing</button>
    </div>
  );
};

export default BillingInfo;
