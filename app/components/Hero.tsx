'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ConnectPhantomButton } from './Phantom';

const Hero = () => {
  const [connected, setConnected] = useState(false);
  const router = useRouter();

  const handleConnect = () => {
    setConnected(true);
  };

  const handleStart = () => {
    router.push('/play');
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen p-8 overflow-hidden bg-gradient-to-b from-black/80 to-purple-900/60">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center space-y-8">
        <div>
          <h1 className="mb-4 text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            <span className="block text-purple-400">Deep</span>
            <span className="block">Dungeon Duel</span>
          </h1>
          <p className="max-w-lg mx-auto text-lg md:text-xl text-gray-300">
            Battle your way through treacherous dungeons, collect legendary heroes, and earn valuable treasures in this immersive blockchain adventure.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 w-full">
          <ConnectPhantomButton onConnect={handleConnect} />
          {connected && (
            <button
              onClick={handleStart}
              className="w-full max-w-xs mt-2 px-8 py-4 text-lg font-bold text-white bg-green-600 border-2 border-green-500 rounded-xl shadow-lg transition-all hover:bg-green-700 hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Start
            </button>
          )}
        </div>
      </div>
      {/* Floating elements */}
      <div className="absolute bottom-10 left-10 animate-float hidden md:block">
        <Image src="/assets/sword.svg" alt="Sword" width={80} height={80} className="opacity-60" />
      </div>
      <div className="absolute bottom-10 right-10 animate-float hidden md:block">
        <Image src="/assets/shield.svg" alt="Shield" width={70} height={70} className="opacity-60" />
      </div>
    </section>
  );
};

export default Hero; 