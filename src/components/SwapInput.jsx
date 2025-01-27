import React from 'react';

function SwapInput({ label, value, onChange, symbol, readOnly, tokenLogo }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className="w-full bg-gray-800 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="0.0"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          <img src={tokenLogo} alt={symbol} className="w-5 h-5" />
          <span className="text-gray-300">{symbol}</span>
        </div>
      </div>
    </div>
  );
}

export default SwapInput;