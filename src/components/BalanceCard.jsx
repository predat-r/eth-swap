import React from 'react';

function BalanceCard({ label, value, symbol }) {
  return (
    <div className="bg-gray-700 p-4 rounded-xl">
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-lg font-semibold">
        {parseFloat(value).toFixed(4)} {symbol}
      </div>
    </div>
  );
}

export default BalanceCard;