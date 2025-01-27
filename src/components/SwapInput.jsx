import React from 'react';

function SwapInput({ label, value, onChange, symbol, readOnly = false }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">{label}</label>
      <input 
        type="number" 
        placeholder="0.0"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="text-sm text-gray-400">{symbol}</div>
    </div>
  );
}

export default SwapInput;