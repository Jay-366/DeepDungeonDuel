"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Image from "next/image";

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
      // Fetch balance (optional, mock for now)
      setBalance("1.23 SOL");
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
  <div className="flex flex-col items-center w-full max-w-md mx-auto bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg space-y-4 animate-fade-in">
    <h2 className="text-xl font-bold text-white mb-1 text-center">Your Phantom Wallet</h2>
    <div className="flex flex-col items-center space-y-2 w-full">
      <div className="flex items-center space-x-2">
        <span className="text-gray-400">Wallet:</span>
        <span className="text-white font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-gray-400">Balance:</span>
        <span className="text-white font-bold">{balance || 'Loading...'}</span>
      </div>
    </div>
  </div>
);

// Wallet Info component (mock win rate and amount)
export const PhantomWalletInfo = () => {
  const { walletAddress } = usePhantom();
  if (!walletAddress) return null;
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-12 max-w-xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Your Deep Dungeon Duel Account</h2>
        <p className="text-gray-400 mb-2">Phantom wallet is your game account</p>
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-gray-400">Wallet:</span>
          <span className="text-white font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-gray-400">Win Rate:</span>
          <span className="text-white font-bold">72.5%</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Amount:</span>
          <span className="text-white font-bold">1.23 SOL</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image src="/Phantom-Icon_Transparent_Purple.png" alt="Phantom Icon" width={60} height={60} className="rounded-full border-4 border-purple-500 shadow-lg" />
        <span className="text-xs text-gray-400 mt-2">Phantom Wallet</span>
      </div>
    </div>
  );
}; 