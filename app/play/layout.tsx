import React from 'react';
import Link from 'next/link';

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="game-layout">
      {children}
      
      {/* Game Footer */}
      <footer className="bg-black/80 backdrop-blur-sm py-4 text-center text-gray-500 text-sm">
        <div className="container mx-auto">
          <p>DeepDungeonDuel © 2025 - All game assets and characters are owned by their respective players</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link href="/terms" className="hover:text-purple-400 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy</Link>
            <Link href="/support" className="hover:text-purple-400 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 