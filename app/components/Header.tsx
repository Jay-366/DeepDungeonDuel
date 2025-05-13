
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link href="/roadmap" className="text-gray-300 hover:text-purple-400">Roadmap</Link>
            <Link href="/marketplace" className="text-gray-300 hover:text-purple-400">Marketplace</Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <Link 
              href="/play" 
              className="px-4 py-2 text-sm font-medium text-white transition-all bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Play Now
            </Link>
            <Link 
              href="/wallet" 
              className="px-4 py-2 text-sm font-medium text-white transition-all border border-white/20 rounded-lg hover:bg-white/10"
            >
              Connect Wallet
            </Link>
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="px-4 pt-2 pb-4 bg-black md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link href="/about" className="text-gray-300 hover:text-purple-400">About</Link>
            <Link href="/features" className="text-gray-300 hover:text-purple-400">Features</Link>
            <Link href="/roadmap" className="text-gray-300 hover:text-purple-400">Roadmap</Link>
            <Link href="/marketplace" className="text-gray-300 hover:text-purple-400">Marketplace</Link>
            <div className="flex flex-col pt-4 mt-4 space-y-2 border-t border-gray-800">
              <Link 
                href="/play" 
                className="px-4 py-2 text-sm font-medium text-white text-center transition-all bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Play Now
              </Link>
              <Link 
                href="/wallet" 
                className="px-4 py-2 text-sm font-medium text-white text-center transition-all border border-white/20 rounded-lg hover:bg-white/10"
              >
                Connect Wallet
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 