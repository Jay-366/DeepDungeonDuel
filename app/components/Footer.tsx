import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFire } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full backdrop-blur-xl shadow-md flex flex-col items-center justify-center px-8 py-6 mt-12 rounded-t-3xl relative z-20" style={{ boxShadow: '0 -6px 32px 0 rgba(0,0,0,0.35)' }}>
      {/* Subtle gradient overlay for integration */}
      <div className="absolute inset-0 pointer-events-none rounded-t-3xl" style={{ background: 'linear-gradient(to top, rgba(20,18,34,0.85) 80%, rgba(20,18,34,0.0))' }} />
      {/* Optional: torch glow vignette */}
      <div className="absolute left-0 bottom-0 h-full w-16 pointer-events-none" style={{ background: 'radial-gradient(circle at 0% 50%, rgba(251,191,36,0.10) 0%, rgba(0,0,0,0) 80%)' }} />
      <div className="absolute right-0 bottom-0 h-full w-16 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 50%, rgba(251,191,36,0.10) 0%, rgba(0,0,0,0) 80%)' }} />
      <div className="flex items-center space-x-2 mb-2 z-10">
        <FaFire className="text-yellow-400 text-xl torch-icon" />
        <span className="fantasy-title text-xl text-purple-300 drop-shadow-lg">Deep Dungeon Duel</span>
      </div>
      <div className="text-gray-400 text-sm mb-2 z-10">© 2025 All game assets and characters are owned by their respective players</div>
      <div className="flex space-x-6 mt-2 z-10">
        <a href="/terms" className="fantasy-title text-2xl text-purple-300 drop-shadow-lg hover:text-yellow-300 px-3 py-1 rounded-md transition">Terms</a>
        <a href="/privacy" className="fantasy-title text-2xl text-purple-300 drop-shadow-lg hover:text-yellow-300 px-3 py-1 rounded-md transition">Privacy</a>
        <a href="/support" className="fantasy-title text-2xl text-purple-300 drop-shadow-lg hover:text-yellow-300 px-3 py-1 rounded-md transition">Support</a>
      </div>
      {/* Pixel/stone edge at the top for organic integration */}
      <div className="absolute left-0 right-0 top-0 h-4 pointer-events-none rounded-t-3xl" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.18), rgba(0,0,0,0.0))' }} />
    </footer>
  );
};

export default Footer; 