// src/App.jsx
import React, { useState, useEffect, use } from "react";
import Web3 from "web3";
import { Coins } from "lucide-react";
import TokenSwap from "./components/TokenSwap";
import ConnectWallet from "./components/ConnectWallet";
import Layout from "./components/Layout";
import { EthSwapABI, TokenABI } from "./config/contractConfig";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [ethSwapContract, setEthSwapContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [tokenBalance, setTokenBalance] = useState("0");
  const [ethBalance, setEthBalance] = useState("0");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const networkId = await web3Instance.eth.net.getId();
          const ethSwapAddress = EthSwapABI.networks[networkId].address;
          const tokenAddress = TokenABI.networks[networkId].address;

          const ethSwapContractInstance = new web3Instance.eth.Contract(
            EthSwapABI.abi,
            ethSwapAddress
          );
          const tokenContractInstance = new web3Instance.eth.Contract(
            TokenABI.abi,
            tokenAddress
          );

          setEthSwapContract(ethSwapContractInstance);
          setTokenContract(tokenContractInstance);

          const tokenBalanceWei = await tokenContractInstance.methods
            .balanceOf(accounts[0])
            .call();
          const ethBalanceWei = await web3Instance.eth.getBalance(accounts[0]);

          setTokenBalance(web3Instance.utils.fromWei(tokenBalanceWei, "ether"));
          setEthBalance(web3Instance.utils.fromWei(ethBalanceWei, "ether"));
        } catch (error) {
          console.error("User denied account access");
        }
      }
    };

    initWeb3();
  }, []);

  const refreshTokenAmounts = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setWeb3(web3Instance);
      const networkId = await web3Instance.eth.net.getId();
      const tokenAddress = TokenABI.networks[networkId].address;
      const tokenContractInstance = new web3Instance.eth.Contract(
        TokenABI.abi,
        tokenAddress
      );
      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);
      const tokenBalanceWei = await tokenContractInstance.methods
        .balanceOf(accounts[0])
        .call();
      const ethBalanceWei = await web3Instance.eth.getBalance(accounts[0]);
      setTokenBalance(web3Instance.utils.fromWei(tokenBalanceWei, "ether"));
      setEthBalance(web3Instance.utils.fromWei(ethBalanceWei, "ether"));
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Coins className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            HiveCoin Instant Exchange
          </h1>
        </div>

        {account ? (
          <TokenSwap
            web3={web3}
            account={account}
            ethSwapContract={ethSwapContract}
            tokenContract={tokenContract}
            tokenBalance={tokenBalance}
            ethBalance={ethBalance}
            refreshBalances={refreshTokenAmounts}
          />
        ) : (
          <ConnectWallet />
        )}
      </div>
    </Layout>
  );
}

export default App;
