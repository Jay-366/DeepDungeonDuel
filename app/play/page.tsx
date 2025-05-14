'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { PlayPhantomWalletCard } from '../components/Phantom';
import { FaShieldAlt, FaUsers, FaTrophy } from 'react-icons/fa';
import { Connection } from "@solana/web3.js";

const Grog = dynamic(() => import('../../public/model/Grog_the_adventurer').then(mod => mod.Model), { ssr: false });
const Batman = dynamic(() => import('../../public/model/Marvel_rivals_-_batman_beyond_fanart').then(mod => mod.Model), { ssr: false });
const Repo = dynamic(() => import('../../public/model/O_realistic_character_free_download').then(mod => mod.Model), { ssr: false });
const Knight = dynamic(() => import('../../public/model/The_forgotten_knight').then(mod => mod.Model), { ssr: false });

const modelComponents = [Grog, Batman, Repo, Knight];

// Game character selection component
const CharacterCard = ({ name, role, level, rarity, selected, onClick, ModelComponent, modelProps }: {
  name: string;
  role: string;
  level: number;
  rarity: string;
  selected: boolean;
  onClick: () => void;
  ModelComponent: React.ComponentType<any>;
  modelProps: any;
}) => {
  return (
    <div
      className={`relative bg-black/60 rounded-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer border-4 ${selected ? 'border-purple-400' : 'border-transparent'}`}
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold">
        {rarity}
      </div>
      <div className="p-6">
        <div style={{ width: '100%', height: 192 }}>
          <Canvas camera={{ position: [0, 0, 2.5] }}>
            <ambientLight />
            <ModelComponent {...modelProps} />
          </Canvas>
        </div>
        <h3 className="text-xl font-bold text-white mb-1 fantasy-title">{name}</h3>
        <p className="text-purple-300 mb-3 fantasy-title">{role}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Level <span className="text-white font-bold">{level}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const gameModes = [
  {
    id: 'campaign',
    name: 'Campaign',
    icon: <Image src="/assets/trophy.png" alt="Trophy" width={30} height={30} />,
    description: 'Battle through the dungeon levels and defeat the boss to earn rewards.',
    disabled: false,
    href: '/play/battle',
  },
  {
    id: 'pvp',
    name: 'PvP Arena',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    description: 'Challenge other players in the arena to climb the leaderboard.',
    disabled: false,
    href: '#',
  },
];

// Simple Phantom wallet connection hook
function usePhantomWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);

  const fetchBalance = async (publicKey: any) => {
    try {
      const connection = new Connection("https://api.devnet.solana.com");
      const balanceInLamports = await connection.getBalance(publicKey);
      const solBalance = (balanceInLamports / 1000000000).toFixed(3);
      setBalance(`${solBalance} SOL`);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance("Error");
    }
  };

  useEffect(() => {
    const { solana } = window as any;
    if (solana && solana.isPhantom && solana.isConnected && solana.publicKey) {
      setWalletAddress(solana.publicKey.toString());
      fetchBalance(solana.publicKey);
    }
  }, []);

  const connect = async () => {
    setConnecting(true);
    try {
      const { solana } = window as any;
      if (solana && solana.isPhantom) {
        const resp = await solana.connect();
        setWalletAddress(resp.publicKey.toString());
        fetchBalance(resp.publicKey);
      } else {
        alert('Phantom wallet not found. Please install Phantom.');
      }
    } catch (e) {
      // User rejected or error
    } finally {
      setConnecting(false);
    }
  };

  return { walletAddress, connect, connecting, balance };
}

export default function Play() {
  const [selectedChampion, setSelectedChampion] = useState<number | null>(null);
  const [selectedGameMode, setSelectedGameMode] = useState<string | null>(null);
  const router = useRouter();
  const { walletAddress, connect, connecting, balance } = usePhantomWallet();

  // Placeholder characters
  const characters = [
    {
      id: 1,
      name: "Eldric",
      role: "Warrior",
      level: 1,
      rarity: "Common",
      ModelComponent: Grog,
      modelProps: { scale: 6, position: [0, -1.1, 0] }
    },
    {
      id: 2,
      name: "Lyra",
      role: "Mage",
      level: 1,
      rarity: "Common",
      ModelComponent: Batman,
      modelProps: { scale: 1.5, position: [0, -1.3, 0] }
    },
    {
      id: 3,
      name: "Thorne",
      role: "Rogue",
      level: 1,
      rarity: "Common",
      ModelComponent: Repo,
      modelProps: { scale: 2, position: [0, -1.3, 0] }
    },
    {
      id: 4,
      name: "Aeliana",
      role: "Healer",
      level: 1,
      rarity: "Common",
      ModelComponent: Knight,
      modelProps: { scale: 1.1, position: [0, -1.1, 0] }
    },
  ];

  const handleStartPlay = () => {
    if (selectedChampion && selectedGameMode === 'campaign') {
      router.push('/bet');
    }
  };

  // If not connected, show only connect button
  if (!walletAddress) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-purple-900/30">
        <div className="bg-gray-900 rounded-xl shadow-lg p-10 flex flex-col items-center">
          <Image src="/Phantom-Icon_Transparent_Purple.png" alt="Phantom Icon" width={60} height={60} className="mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Connect Phantom Wallet</h2>
          <button
            onClick={connect}
            disabled={connecting}
            className="flex items-center space-x-2 px-8 py-4 text-lg font-bold text-white bg-purple-600 border-2 border-purple-500 rounded-xl shadow-lg transition-all hover:bg-purple-700 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <Image src="/Phantom-Icon_Transparent_Purple.png" alt="Phantom Icon" width={28} height={28} />
            <span>{connecting ? 'Connecting...' : 'Connect Phantom'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "url('/assets/DungeonBackground.png') center center / cover no-repeat, linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(88,28,135,0.6))" }} className="min-h-screen bg-gradient-to-b from-black to-purple-900/30 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back button */}
        <button
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-purple-600 font-bold hover:bg-purple-700 transition mb-6 fantasy-title text-2xl text-purple-300 drop-shadow-lg hover:text-yellow-300"
        >
          <Image src="/assets/chevron-left.png" alt="Back Arrow" width={28} height={28} />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Enter the Dungeon</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your champion and prepare for battle. Connect your wallet to access your existing heroes or start with a new champion.
          </p>
        </div>

        {/* Wallet Connection */}
        <PlayPhantomWalletCard walletAddress={walletAddress} winRate={72.5} amount={"1.23"} />

        {/* Character Selection */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Choose Your Champion</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                name={character.name}
                role={character.role}
                level={character.level}
                rarity={character.rarity}
                selected={selectedChampion === character.id}
                onClick={() => setSelectedChampion(selectedChampion === character.id ? null : character.id)}
                ModelComponent={character.ModelComponent}
                modelProps={character.modelProps}
              />
            ))}
          </div>
        </div>

        {/* Play Modes */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Game Modes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center max-w-3xl mx-auto">
            {gameModes.map((mode) => (
              <div
                key={mode.id}
                className={`bg-black/60 rounded-2xl p-8 w-full flex-1 transition-colors cursor-pointer border-4 flex flex-col items-center hover:bg-gray-800 shadow-xl backdrop-blur-sm ${selectedGameMode === mode.id ? 'border-purple-400 bg-purple-900/40' : 'border-transparent'}`}
                onClick={() => setSelectedGameMode(selectedGameMode === mode.id ? null : mode.id)}
                style={{ minHeight: 240 }}
              >
                <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mb-5">
                  {mode.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 fantasy-title">{mode.name}</h3>
                <p className="text-gray-400 mb-4 text-center fantasy-title">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Start Play Button */}
        <div className="flex justify-center mt-12">
          <button
            className={`px-10 py-4 rounded-xl text-lg font-bold transition-colors ${selectedChampion && selectedGameMode ? 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer' : 'bg-gray-700 text-gray-400 cursor-not-allowed'} fantasy-title text-2xl text-purple-300 drop-shadow-lg hover:text-yellow-300`}
            disabled={!(selectedChampion && selectedGameMode)}
            onClick={handleStartPlay}
          >
            Start Play
          </button>
        </div>
      </div>
    </div>
  );
} 