"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Image from "next/image";
import { Connection } from "@solana/web3.js";

// Context type
interface PhantomContextType {
  walletAddress: string | null;
  connecting: boolean;
  connect: () => Promise<void>;
}

const PhantomContext = createContext<PhantomContextType>({
  walletAddress: null,
  connecting: false,
  connect: async () => {},
});

export const PhantomProvider = ({ children }: { children: React.ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const { solana } = window as any;
    if (solana && solana.isPhantom && solana.isConnected && solana.publicKey) {
      setWalletAddress(solana.publicKey.toString());
    }
  }, []);

  const connect = async () => {
    setConnecting(true);
    try {
      const { solana } = window as any;
      if (solana && solana.isPhantom) {
        const resp = await solana.connect();
        setWalletAddress(resp.publicKey.toString());
      } else {
        alert("Phantom wallet not found. Please install Phantom.");
      }
    } catch (e) {
      // User rejected or error
    } finally {
      setConnecting(false);
    }
  };

  return (
    <PhantomContext.Provider value={{ walletAddress, connecting, connect }}>
      {children}
    </PhantomContext.Provider>
  );
};

export const usePhantom = () => useContext(PhantomContext);

// Connect Phantom Button
export const ConnectPhantomButton = ({ onConnect }: { onConnect?: () => void }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const connectPhantom = async () => {
    setConnecting(true);
    try {
      const { solana } = window as any;
      if (!solana || !solana.isPhantom) {
        alert("Phantom wallet not found. Please install Phantom.");
        setConnecting(false);
        return;
      }
      const resp = await solana.connect();
      setWalletAddress(resp.publicKey.toString());
      setShowCard(true);
      
      // Fetch real balance from Phantom wallet
      try {
        const connection = new Connection("https://api.devnet.solana.com");
        const balance = await connection.getBalance(resp.publicKey);
        // Convert lamports to SOL (1 SOL = 10^9 lamports)
        const solBalance = (balance / 1000000000).toFixed(3);
        setBalance(`${solBalance} SOL`);
      } catch (balanceError) {
        console.error("Error fetching balance:", balanceError);
        setBalance("Error fetching balance");
      }
      
      if (onConnect) onConnect();
    } catch (e) {
      // User rejected or error
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-4">
      <button
        onClick={connectPhantom}
        disabled={!!walletAddress || connecting}
        className="flex items-center justify-center space-x-2 px-8 py-4 text-lg font-bold text-white bg-purple-600 border-2 border-purple-500 rounded-xl shadow-lg transition-all hover:bg-purple-700 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <Image src="/Phantom-Icon_Transparent_Purple.png" alt="Phantom Icon" width={28} height={28} />
        <span>{walletAddress ? 'Phantom Connected' : (connecting ? 'Connecting...' : 'Connect Phantom')}</span>
      </button>
      {showCard && walletAddress && (
        <PhantomWalletCard walletAddress={walletAddress} balance={balance} />
      )}
    </div>
  );
};

// Phantom Wallet Card
export const PhantomWalletCard = ({ walletAddress, balance }: { walletAddress: string; balance: string | null }) => (
  <div className="flex flex-col items-center w-full max-w-md mx-auto bg-black/60 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg border-4 border-purple-700/40 space-y-4 animate-fade-in">
    <h2 className="text-2xl font-bold text-white mb-1 text-center fantasy-title">Your Phantom Wallet</h2>
    <div className="flex flex-col items-center space-y-2 w-full">
      <div className="flex items-center space-x-2">
      <span className="text-gray-400 fantasy-title">Wallet:</span>
      <span className="text-white font-mono fantasy-title">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
      </div>
      <div className="flex items-center space-x-2">
      <span className="text-gray-400 fantasy-title">Balance:</span>
      <span className="text-white font-bold fantasy-title">{balance || 'Loading...'}</span>
      </div>
    </div>
  </div>
);

export const PlayPhantomWalletCard = ({ walletAddress, winRate, amount, balance }: { walletAddress: string; winRate: number; amount?: string; balance?: string | null }) => (
  <div className="relative flex flex-col items-center w-full max-w-md mx-auto bg-black/60 backdrop-blur-sm rounded-xl p-6 mb-12 shadow-lg border-4 border-purple-700/40 space-y-2 animate-fade-in text-center">
    <button className="absolute top-3 right-3 p-2 bg-purple-400/90 rounded-full shadow-lg ring-2 ring-purple-600 hover:bg-purple-300 transition z-20" aria-label="Edit Wallet Info">
      <Image src="/assets/edit.png" alt="Edit" width={25} height={25} />
    </button>
    <h2 className="text-2xl font-bold text-white mb-2 fantasy-title">Your Phantom Wallet</h2>
    <div className="flex flex-col items-center space-y-2 w-full">
      <div className="flex flex-col items-center">
        <span className="text-gray-400 fantasy-title">Wallet:</span>
        <span className="text-white font-mono fantasy-title">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
        </div>
      <div className="flex flex-col items-center">
        <span className="text-gray-400 fantasy-title">Win Rate:</span>
        <span className="text-white font-bold fantasy-title">{winRate}%</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-gray-400 fantasy-title">Amount:</span>
        <span className="text-white font-bold fantasy-title">{balance || amount || 'Loading...'} SOL</span>
      </div>
      </div>
    </div>
  );