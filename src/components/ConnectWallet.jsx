import React from 'react';
import { Wallet2 } from 'lucide-react';

function ConnectWallet() {
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error('Failed to connect wallet', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="flex flex-col items-center gap-4">
        <Wallet2 className="w-16 h-16 text-gray-400" />
        <p className="text-gray-400">Connect your wallet to start swapping tokens</p>
      </div>
      <button 
        onClick={connectMetaMask}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <Wallet2 className="w-5 h-5" />
        <span>Connect Wallet</span>
      </button>
    </div>
  );
}

export default ConnectWallet;
