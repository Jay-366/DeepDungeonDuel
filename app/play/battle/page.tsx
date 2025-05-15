'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// We need to use dynamic import for Phaser since it uses browser APIs
const Battle = dynamic(() => import('./components/Battle'), {
  ssr: false,
  loading: () => <BattleLoading />
});

// Loading component while the battle game initializes
const BattleLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-purple-900/30">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Loading Battle...</h2>
        <div className="w-32 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default function BattlePage() {
  const [betAmount, setBetAmount] = useState<string>('0');
  const [betAgentId, setBetAgentId] = useState<string>('1');
  const [betAgentName, setBetAgentName] = useState<string>('');
  const [odds, setOdds] = useState<string>('1.5');
  const router = useRouter();

  useEffect(() => {
    // Retrieve bet information from localStorage
    const storedBetAmount = localStorage.getItem('betAmount');
    const storedBetAgentId = localStorage.getItem('betAgentId');
    const storedBetAgentName = localStorage.getItem('betAgentName');
    const storedOdds = localStorage.getItem('odds');
    
    if (storedBetAmount) setBetAmount(storedBetAmount);
    if (storedBetAgentId) setBetAgentId(storedBetAgentId);
    if (storedBetAgentName) setBetAgentName(storedBetAgentName);
    if (storedOdds) setOdds(storedOdds);
  }, []);

  const handleBattleComplete = (winner: string, loser: string, damageHistory: any[]) => {
    // Navigate to result page with battle outcome
    const historyJson = JSON.stringify(damageHistory);
    router.push(`/play/result?winner=${encodeURIComponent(winner)}&loser=${encodeURIComponent(loser)}&bet=${betAmount}&odds=${odds}&history=${encodeURIComponent(historyJson)}&betAgentName=${encodeURIComponent(betAgentName)}`);
  };

  return (
    <div style={{ background: "url('/assets/DungeonBackground.png') center center / cover no-repeat, linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(88,28,135,0.6))" }} className="min-h-screen flex flex-col bg-gradient-to-b from-black to-purple-900/30 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl flex flex-col flex-grow">
        
        {/* Battle area */}
        <div className="flex-grow flex flex-col">
          <div className="bg-gray-900/70 rounded-xl p-4 mb-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Deep Dungeon Battle</h1>
              <div className="text-purple-300">Bet: {betAmount} SOL on {betAgentName}</div>
          </div>
        </div>

          {/* Game canvas will be mounted here */}
          <div className="flex-grow flex items-start">
            <Battle onBattleComplete={handleBattleComplete} betAmount={betAmount} />
          </div>
        </div>
      </div>
    </div>
  );
} 