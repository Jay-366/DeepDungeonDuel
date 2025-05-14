import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFire } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900/90 stone-border flex flex-col items-center justify-center px-8 py-6 mt-12 shadow-2xl">
      <div className="flex items-center space-x-2 mb-2">
        <FaFire className="text-yellow-400 text-xl torch-icon" />
        <span className="fantasy-title text-xl text-purple-300 drop-shadow-lg">Deep Dungeon Duel</span>
      </div>
      <div className="text-gray-400 text-sm mb-2">© 2025 All game assets and characters are owned by their respective players</div>
      <div className="flex space-x-6 mt-2">
        <a href="/terms" className="text-white hover:text-yellow-300">Terms</a>
        <a href="/privacy" className="text-white hover:text-yellow-300">Privacy</a>
        <a href="/support" className="text-white hover:text-yellow-300">Support</a>
      </div>
    </footer>
  );
};

export default Footer; 