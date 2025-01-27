import React, { useState } from "react";
import { ArrowUpDown, Coins, AlertCircle } from "lucide-react";
import BalanceCard from "./BalanceCard";
import SwapInput from "./SwapInput";

function TokenSwap({
  web3,
  account,
  ethSwapContract,
  tokenContract,
  tokenBalance,
  ethBalance,
  refreshBalances
}) {
  const [ethAmount, setEthAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [swapDirection, setSwapDirection] = useState("ethToToken");
  const [valueOfOtherToken, setValueOfOtherToken] = useState(0);

  const handleBuyTokens = async () => {
    try {
      await ethSwapContract.methods.buyTokens().send({
        from: account,
        value: web3.utils.toWei(ethAmount, "ether"),

      });
      refreshBalances()
    } catch (error) {
      console.error("Token purchase failed", error);
    }
  };

  const handleSellTokens = async () => {
    try {
      await tokenContract.methods
        .approve(
          ethSwapContract._address,
          web3.utils.toWei(tokenAmount, "ether")
        )
        .send({ from: account });

      await ethSwapContract.methods
        .sellTokens(web3.utils.toWei(tokenAmount, "ether"))
        .send({ from: account });
        refreshBalances()
    } catch (error) {
      console.error("Token sale failed", error);
    }
  };

  const toggleSwapDirection = () => {
    setSwapDirection(
      swapDirection === "ethToToken" ? "tokenToEth" : "ethToToken"
    );
    setEthAmount("");
    setTokenAmount("");
    setValueOfOtherToken(0)
  };
  function handleEthToToken(amount) {
    setEthAmount(amount);
    setValueOfOtherToken(amount * 100);
  }

  function handleTokenToEth(amount) {
    setTokenAmount(amount);
    setValueOfOtherToken(amount / 100);
  }
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <BalanceCard label="ETH Balance" value={ethBalance} symbol="ETH" />
        <BalanceCard label="HiveCoin Balance" value={tokenBalance} symbol="HiveCoin" />
      </div>

      <div className="bg-gray-700 p-4 rounded-xl space-y-4">
        <SwapInput
          label={swapDirection === "ethToToken" ? "You Pay" : "You Sell"}
          value={swapDirection === "ethToToken" ? ethAmount : tokenAmount}
          onChange={(e) =>
            swapDirection === "ethToToken"
              ? handleEthToToken(e.target.value)
              : handleTokenToEth(e.target.value)
          }
          symbol={swapDirection === "ethToToken" ? "ETH" : "HiveCoin"}
        />

        <button
          onClick={toggleSwapDirection}
          className="mx-auto flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-600 transition-colors duration-200"
        >
          <ArrowUpDown className="w-5 h-5 text-blue-400" />
        </button>

        <SwapInput
          label={swapDirection === "ethToToken" ? "You Receive" : "You Receive"}
          value={valueOfOtherToken}
          readOnly
          symbol={swapDirection === "ethToToken" ? "HiveCoin" : "ETH"}
        />
      </div>

      <button
        onClick={
          swapDirection === "ethToToken" ? handleBuyTokens : handleSellTokens
        }
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <Coins className="w-5 h-5" />
        <span>
          {swapDirection === "ethToToken"
            ? "Swap ETH for HiveCoin"
            : "Swap HiveCoin for ETH"}
        </span>
      </button>

      <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
        <AlertCircle className="w-4 h-4" />
        <span>Review all transaction details before confirming</span>
      </div>
    </div>
  );
}

export default TokenSwap;
