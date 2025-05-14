'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';

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
      className={`relative bg-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer border-4 ${selected ? 'border-purple-400' : 'border-transparent'}`}
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
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-purple-300 mb-3">{role}</p>
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

export default function Play() {
  const [selectedChampion, setSelectedChampion] = useState<number | null>(null);
  const [selectedGameMode, setSelectedGameMode] = useState<string | null>(null);
  const router = useRouter();

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
      router.push('/play/battle');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/30 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center text-purple-300 hover:text-purple-100 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Enter the Dungeon</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your champion and prepare for battle. Connect your wallet to access your existing heroes or start with a new champion.
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-12 max-w-xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Connect Your Wallet</h2>
              <p className="text-gray-400">Access your collection and game progress</p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Connect Wallet
            </button>
          </div>
        </div>

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
                onClick={() => setSelectedChampion(character.id)}
                ModelComponent={character.ModelComponent}
                modelProps={character.modelProps}
              />
            ))}
          </div>
        </div>

        {/* Play Modes */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Game Modes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gameModes.map((mode) => (
              <div
                key={mode.id}
                className={`bg-gray-800/70 rounded-xl p-6 transition-colors cursor-pointer border-4 flex flex-col items-center hover:bg-gray-800 ${selectedGameMode === mode.id ? 'border-purple-400 bg-purple-900/40' : 'border-transparent'}`}
                onClick={() => setSelectedGameMode(mode.id)}
              >
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  {mode.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{mode.name}</h3>
                <p className="text-gray-400 mb-4">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Start Play Button */}
        <div className="flex justify-center mt-12">
          <button
            className={`px-10 py-4 rounded-xl text-lg font-bold transition-colors ${selectedChampion && selectedGameMode ? 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
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