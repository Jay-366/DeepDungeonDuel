'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Leaderboard from './Leaderboard';
import Tutorial from './Tutorial';
import { FaFire } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Leaderboard', onClick: () => setShowLeaderboard(true) },
    { label: 'Features', onClick: handleScrollToFeatures },
    { label: 'Tutorial', onClick: () => setShowTutorial(true) },
  ];

  return (
    <header className="w-full backdrop-blur-xl shadow-md flex items-center px-8 py-5 rounded-b-3xl relative z-20" style={{ boxShadow: '0 6px 32px 0 rgba(0,0,0,0.35)' }}>
      {/* Subtle gradient overlay for integration */}
      <div className="absolute inset-0 pointer-events-none rounded-b-3xl" style={{ background: 'linear-gradient(to bottom, rgba(20,18,34,0.85) 80%, rgba(20,18,34,0.0))' }} />
      {/* Optional: torch glow vignette */}
      <div className="absolute left-0 top-0 h-full w-16 pointer-events-none" style={{ background: 'radial-gradient(circle at 0% 50%, rgba(251,191,36,0.10) 0%, rgba(0,0,0,0) 80%)' }} />
      <div className="absolute right-0 top-0 h-full w-16 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 50%, rgba(251,191,36,0.10) 0%, rgba(0,0,0,0) 80%)' }} />
      <div className="flex items-center space-x-3 z-10">
        <FaFire className="text-yellow-400 text-2xl torch-icon" />
        <span className="fantasy-title text-4xl text-purple-300 drop-shadow-lg">Deep Dungeon Duel</span>
      </div>
      <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-8 z-10">
        {navItems.map(item => (
          <button
            key={item.label}
            onClick={item.onClick}
            className="fantasy-title text-2xl text-purple-300 drop-shadow-lg hover:text-yellow-300 px-3 py-1 rounded-md transition bg-transparent border-none outline-none cursor-pointer"
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
      {/* Leaderboard Modal/Dropdown */}
      {showLeaderboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowLeaderboard(false)}>
          <div className="bg-gray-900 rounded-2xl p-8 max-w-3xl w-full relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl" onClick={() => setShowLeaderboard(false)}>&times;</button>
            <Leaderboard />
          </div>
        </div>
      )}
      {/* Tutorial Modal/Dropdown */}
      {showTutorial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowTutorial(false)}>
          <div className="bg-gray-900 rounded-2xl p-8 max-w-3xl w-full relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl" onClick={() => setShowTutorial(false)}>&times;</button>
            <Tutorial />
          </div>
        </div>
      )}
      {/* Pixel/stone edge at the bottom for organic integration */}
      <div className="absolute left-0 right-0 bottom-0 h-4 pointer-events-none rounded-b-3xl" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.0))' }} />
    </header>
  );
};

export default Header; 