'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Leaderboard from './Leaderboard';
import Tutorial from './Tutorial';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">DeepDungeonDuel</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/about" className="text-gray-300 hover:text-purple-400">About</Link>
            <Link href="/features" className="text-gray-300 hover:text-purple-400">Features</Link>
            <Link href="/marketplace" className="text-gray-300 hover:text-purple-400">Marketplace</Link>
            <button 
              onClick={() => {
                setIsTutorialOpen(!isTutorialOpen);
                setIsLeaderboardOpen(false);
              }}
              className="text-gray-300 hover:text-purple-400 flex items-center space-x-1"
            >
              <span>How to Play</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isTutorialOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button 
              onClick={() => {
                setIsLeaderboardOpen(!isLeaderboardOpen);
                setIsTutorialOpen(false);
              }}
              className="text-gray-300 hover:text-purple-400 flex items-center space-x-1"
            >
              <span>Leaderboard</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isLeaderboardOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {/* No Connect Phantom button here anymore */}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="flex items-center md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Tutorial Dropdown */}
      {isTutorialOpen && (
        <div className="absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800">
          <div className="container px-4 mx-auto py-6">
            <Tutorial />
          </div>
        </div>
      )}

      {/* Leaderboard Dropdown */}
      {isLeaderboardOpen && (
        <div className="absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800">
          <div className="container px-4 mx-auto py-6">
            <Leaderboard />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="px-4 pt-2 pb-4 bg-black md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link href="/about" className="text-gray-300 hover:text-purple-400">About</Link>
            <Link href="/features" className="text-gray-300 hover:text-purple-400">Features</Link>
            <Link href="/marketplace" className="text-gray-300 hover:text-purple-400">Marketplace</Link>
            <button 
              onClick={() => {
                setIsTutorialOpen(!isTutorialOpen);
                setIsLeaderboardOpen(false);
              }}
              className="text-gray-300 hover:text-purple-400 flex items-center justify-between"
            >
              <span>How to Play</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isTutorialOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button 
              onClick={() => {
                setIsLeaderboardOpen(!isLeaderboardOpen);
                setIsTutorialOpen(false);
              }}
              className="text-gray-300 hover:text-purple-400 flex items-center justify-between"
            >
              <span>Leaderboard</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isLeaderboardOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="flex flex-col pt-4 mt-4 space-y-2 border-t border-gray-800">
              {/* No Connect Phantom button here anymore */}
            </div>
          </nav>
        </div>
      )}

      {/* Mobile Tutorial */}
      {isMenuOpen && isTutorialOpen && (
        <div className="px-4 pt-2 pb-4 bg-black md:hidden">
          <div className="mt-4 border-t border-gray-800 pt-4">
            <Tutorial />
          </div>
        </div>
      )}

      {/* Mobile Leaderboard */}
      {isMenuOpen && isLeaderboardOpen && (
        <div className="px-4 pt-2 pb-4 bg-black md:hidden">
          <div className="mt-4 border-t border-gray-800 pt-4">
            <Leaderboard />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 