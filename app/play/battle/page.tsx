'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

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
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-purple-900/30 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl flex flex-col flex-grow">
        {/* Back button */}
        <Link
          href="/play"
          className="inline-flex items-center text-purple-300 hover:text-purple-100 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Champions
        </Link>
        
        {/* Battle area */}
        <div className="flex-grow flex flex-col">
          <div className="bg-gray-900/70 rounded-xl p-4 mb-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Deep Dungeon Battle</h1>
              <div className="text-sm text-gray-400">Level 1-3</div>
            </div>
          </div>
          
          {/* Game canvas will be mounted here */}
          <div className="flex-grow flex items-start">
            <Battle />
          </div>
        </div>
      </div>
    </div>
  );
} 