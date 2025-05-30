"use client";
import React, { useState, useEffect } from 'react';
import Bet from '../components/Bet';
import { useRouter } from 'next/navigation';
import { Connection } from "@solana/web3.js";

// Mock agent data
const userAgent = {
  id: 1,
  name: 'Eldric',
  avatar: '/assets/character1.png',
  winRate: 72,
  odds: 1.5,
};
const enemyAgent = {
  id: 2,
  name: 'Blue Witch',
  avatar: '/assets/bluewitch.png',
  winRate: 65,
  odds: 2.1,
};

export default function BetPage() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    // Check if wallet is connected and fetch balance
    const checkWallet = async () => {
      const { solana } = window as any;
      if (solana && solana.isPhantom) {
        try {
          // Get wallet address
          if (solana.isConnected && solana.publicKey) {
            const publicKey = solana.publicKey.toString();
            setWalletAddress(publicKey);
            
            // Fetch real SOL balance from devnet
            try {
              const connection = new Connection("https://api.devnet.solana.com");
              const balanceInLamports = await connection.getBalance(solana.publicKey);
              const solBalance = (balanceInLamports / 1000000000).toFixed(3);
              setBalance(solBalance);
            } catch (balanceError) {
              console.error("Error fetching SOL balance:", balanceError);
              setBalance("0");
            }
          } else {
            const resp = await solana.connect();
            setWalletAddress(resp.publicKey.toString());
            
            // Fetch real SOL balance from devnet
            try {
              const connection = new Connection("https://api.devnet.solana.com");
              const balanceInLamports = await connection.getBalance(resp.publicKey);
              const solBalance = (balanceInLamports / 1000000000).toFixed(3);
              setBalance(solBalance);
            } catch (balanceError) {
              console.error("Error fetching SOL balance:", balanceError);
              setBalance("0");
            }
          }
        } catch (error) {
          console.error('Error connecting to wallet:', error);
          router.push('/');
        }
      } else {
        router.push('/');
      }
    };
    
    checkWallet();
  }, [router]);

  const handleBattle = (betAgentId: number, amount: number) => {
    // Store bet information in localStorage to access it in the battle/result page
    localStorage.setItem('betAmount', amount.toString());
    localStorage.setItem('betAgentId', betAgentId.toString());
    localStorage.setItem('betAgentName', betAgentId === userAgent.id ? userAgent.name : enemyAgent.name);
    localStorage.setItem('odds', betAgentId === userAgent.id ? userAgent.odds.toString() : enemyAgent.odds.toString());
    
    // Navigate to battle page
    router.push('/play/battle');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/30 flex flex-col">
      <main className="flex flex-1 flex-col items-center justify-center py-12 px-4">
        <Bet
          userAgent={userAgent}
          enemyAgent={enemyAgent}
          walletAddress={walletAddress}
          balance={balance}
          onBattle={handleBattle}
        />
      </main>
    </div>
  );
} 