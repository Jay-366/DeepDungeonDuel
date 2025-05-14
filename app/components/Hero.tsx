import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 to-purple-900/60"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl mx-auto text-center">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
          <span className="block text-purple-400">Deep</span>
          <span className="block">Dungeon Duel</span>
        </h1>
        
        <p className="max-w-2xl mb-10 text-lg text-gray-300 md:text-xl">
          Battle your way through treacherous dungeons, collect legendary heroes, 
          and earn valuable treasures in this immersive blockchain adventure.
        </p>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Link 
            href="/play"
            className="px-8 py-3 text-lg font-medium text-white transition-all bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-500/50"
          >
            Play Now
          </Link>
          <Link 
            href="/about"
            className="px-8 py-3 text-lg font-medium text-white transition-all border border-white/30 rounded-lg hover:bg-white/10 focus:ring-4 focus:ring-white/20"
          >
            Learn More
          </Link>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute bottom-10 left-10 animate-float hidden md:block">
        <Image src="/assets/sword.svg" alt="Sword" width={80} height={80} className="opacity-60" />
      </div>
      <div className="absolute top-20 right-10 animate-float-delayed hidden md:block">
        <Image src="/assets/shield.svg" alt="Shield" width={70} height={70} className="opacity-60" />
      </div>
    </div>
  );
};

export default Hero; 