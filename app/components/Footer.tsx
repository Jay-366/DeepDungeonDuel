import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="py-12 bg-black">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="mb-8 md:mb-0">
            <h2 className="mb-4 text-2xl font-bold text-white">DeepDungeonDuel</h2>
            <p className="text-gray-400">
              The ultimate blockchain dungeon battling experience. Collect, battle, and earn in the depths.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/play" className="text-gray-400 hover:text-purple-400">Play Now</Link></li>
              <li><Link href="/marketplace" className="text-gray-400 hover:text-purple-400">Marketplace</Link></li>
              <li><Link href="/leaderboard" className="text-gray-400 hover:text-purple-400">Leaderboard</Link></li>
              <li><Link href="/docs" className="text-gray-400 hover:text-purple-400">Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/whitepaper" className="text-gray-400 hover:text-purple-400">Whitepaper</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-purple-400">FAQ</Link></li>
              <li><Link href="/guides" className="text-gray-400 hover:text-purple-400">Guides</Link></li>
              <li><Link href="/support" className="text-gray-400 hover:text-purple-400">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400">
                <Image src="/assets/twitter.svg" alt="Twitter" width={24} height={24} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400">
                <Image src="/assets/discord.svg" alt="Discord" width={24} height={24} />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400">
                <Image src="/assets/telegram.svg" alt="Telegram" width={24} height={24} />
              </a>
              <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400">
                <Image src="/assets/medium.svg" alt="Medium" width={24} height={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-gray-500">© 2025 DeepDungeonDuel. All rights reserved.</p>
            <div className="flex mt-4 space-x-6 md:mt-0">
              <Link href="/privacy" className="text-gray-500 hover:text-purple-400">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-500 hover:text-purple-400">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 