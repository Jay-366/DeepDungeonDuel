"use client";
import React from 'react';
import Header from '../components/Header';
import { PhantomWalletCard } from '../components/Phantom';
import Bet from '../components/Bet';
import { useRouter } from 'next/navigation';

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

// Mock wallet info (replace with real context/hook in integration)
const walletAddress = '7Gk3...9f2A';
const balance = '1.23';

export default function BetPage() {
  const router = useRouter();

  const handleBattle = (betAgentId: number, amount: number) => {
    // Here you would handle the bet logic, then redirect
    router.push('/play/battle');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/30 flex flex-col">
      <Header />
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