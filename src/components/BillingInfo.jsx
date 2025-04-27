import React from 'react';
import { useLanguage } from '../contexts/LanguageProvider'; // ✅ Import Language hook

const BillingInfo = () => {
  const { t } = useLanguage(); // ✅ Grab translation object

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h3 className="font-semibold mb-4">{t.billingInfo}</h3> {/* ✅ translated */}
      <p className="text-sm">Card ending in **** 4242</p> {/* 🔹 Still fixed for now */}
      <p className="text-sm">Next payment: May 30, 2025</p> {/* 🔹 Still fixed for now */}
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        {t.manageBilling}
      </button> {/* ✅ translated */}
    </div>
  );
};

export default BillingInfo;
