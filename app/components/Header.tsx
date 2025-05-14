'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Leaderboard from './Leaderboard';
import Tutorial from './Tutorial';
import { FaFire } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const navItems = [
    { href: '/about', label: 'About' },
    { href: '/features', label: 'Features' },
    { href: '/marketplace', label: 'Marketplace' },
  ];

  return (
    <header className="w-full bg-gray-900/90 stone-border flex items-center justify-between px-8 py-4 shadow-2xl">
      <div className="flex items-center space-x-3">
        <FaFire className="text-yellow-400 text-2xl torch-icon" />
        <span className="fantasy-title text-3xl text-purple-300 drop-shadow-lg">Deep Dungeon Duel</span>
      </div>
      <nav className="flex space-x-8">
        {navItems.map(item => (
          <Link key={item.href} href={item.href} className="text-lg text-gray-200 hover:text-yellow-300 transition glow px-3 py-1 rounded-md">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header; 