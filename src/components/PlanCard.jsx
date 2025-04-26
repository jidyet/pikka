import React from 'react';

const PlanCard = ({ name, price, features, isRecommended }) => {
  return (
    <div className={`p-6 rounded-lg border ${isRecommended ? 'border-blue-500' : 'border-gray-300'} bg-white dark:bg-gray-800`}>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-2xl font-semibold mb-4">{price}</p>
      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-4">
        {features.map((f, i) => <li key={i}>✔ {f}</li>)}
      </ul>
      <button className="w-full py-2 rounded bg-blue-600 text-white font-semibold">Choose {name}</button>
    </div>
  );
};

export default PlanCard;
