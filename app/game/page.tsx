"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GamePage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [solBalance, setSolBalance] = useState('0');
  const [tokenBalance, setTokenBalance] = useState('0');

  useEffect(() => {
    // Check if wallet is connected
    const checkWallet = async () => {
      const { solana } = window as any;
      if (solana && solana.isPhantom) {
        try {
          const response = await solana.connect();
          setWalletAddress(response.publicKey.toString());
          // Here you would typically fetch SOL and token balances
          // setSolBalance(...);
          // setTokenBalance(...);
        } catch (error) {
          console.error('Error connecting to wallet:', error);
          window.location.href = '/';
        }
      } else {
        window.location.href = '/';
      }
    };
    checkWallet();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Bar / Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/game" className="text-2xl font-bold text-purple-400">
                Deep Dungeon Duel
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/game" className="hover:text-purple-400">Home</Link>
                <Link href="/game/battles" className="hover:text-purple-400">Battles</Link>
                <Link href="/game/agents" className="hover:text-purple-400">My Agents</Link>
                <Link href="/game/leaderboard" className="hover:text-purple-400">Leaderboard</Link>
                <Link href="/game/replays" className="hover:text-purple-400">Replay Vault</Link>
                <Link href="/game/faq" className="hover:text-purple-400">FAQ</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-700 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-300">SOL:</span>
                <span className="ml-2 font-semibold">{solBalance}</span>
              </div>
              <div className="bg-gray-700 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-300">DDD:</span>
                <span className="ml-2 font-semibold">{tokenBalance}</span>
              </div>
              <div className="bg-gray-700 px-4 py-2 rounded-lg flex items-center">
                <span className="text-sm text-gray-300 mr-2">Wallet:</span>
                <span className="font-mono">{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Player Overview Panel */}
            <section className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Player Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Username</span>
                  <span className="font-semibold">Player123</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rank</span>
                  <span className="font-semibold">#42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Win/Loss</span>
                  <span className="font-semibold">12/5</span>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                  View My Agents
                </button>
              </div>
            </section>

            {/* Betting Panel */}
            <section className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Upcoming Battles</h2>
              <div className="space-y-4">
                {/* Battle Item */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Agent A vs Agent B</span>
                    <span className="text-sm text-gray-400">2h 30m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-gray-400">Odds:</span>
                      <span className="ml-2">1.5x</span>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded transition-colors">
                      Bet Now
                    </button>
                  </div>
                </div>
                {/* Add more battle items here */}
              </div>
            </section>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            {/* Live Dungeon Battles */}
            <section className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Live Battles</h2>
              <div className="space-y-4">
                {/* Live Battle Item */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold">Agent X</span>
                      <span className="text-gray-400">vs</span>
                      <span className="font-semibold">Agent Y</span>
                    </div>
                    <span className="text-sm text-gray-400">Turn 3/10</span>
                  </div>
                  <div className="bg-gray-600 rounded-lg p-4 mb-4">
                    {/* Battle animation/visualization would go here */}
                    <div className="h-32 flex items-center justify-center text-gray-400">
                      Battle Visualization
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                      Spectate
                    </button>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors">
                      Place Bet
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Match History / Replays */}
            <section className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Recent Matches</h2>
              <div className="space-y-4">
                {/* Match Item */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Agent P vs Agent Q</span>
                    <span className="text-sm text-gray-400">2h ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400">Winner: Agent P</span>
                    <button className="text-purple-400 hover:text-purple-300">
                      Watch Replay
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Submit/Manage AI Agents */}
            <section className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">My Agents</h2>
              <div className="space-y-4">
                {/* Agent Item */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Agent Alpha</span>
                    <span className="text-sm text-green-400">Win Rate: 75%</span>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    Skills: Fireball, Shield, Teleport
                  </div>
                  <div className="flex justify-between">
                    <button className="text-blue-400 hover:text-blue-300">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Withdraw</button>
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                  Submit New Agent
                </button>
              </div>
            </section>

            {/* Leaderboards */}
            <section className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Leaderboards</h2>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Top Agents</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>1. Agent Master</span>
                      <span className="text-green-400">95% WR</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>2. Battle King</span>
                      <span className="text-green-400">92% WR</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>3. Dungeon Lord</span>
                      <span className="text-green-400">90% WR</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA + Notification Center */}
            <section className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-yellow-400">⚡</span>
                    <span className="font-semibold">Tournament Starting</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    The next tournament begins in 2 hours. Register your agent now!
                  </p>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                  Claim Rewards
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              Deep Dungeon Duel ©️ 2025
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="https://github.com" className="text-gray-400 hover:text-white">GitHub</Link>
              <Link href="/docs" className="text-gray-400 hover:text-white">Docs</Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white">Twitter</Link>
              <Link href="https://discord.com" className="text-gray-400 hover:text-white">Discord</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 