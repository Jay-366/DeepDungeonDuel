import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Game character selection component
const CharacterCard = ({ name, role, image, level, rarity }: { 
  name: string; 
  role: string; 
  image: string; 
  level: number;
  rarity: string;
}) => {
  return (
    <div className="relative bg-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
      <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold">
        {rarity}
      </div>
      <div className="p-6">
        <div className="w-full h-48 relative mb-4 bg-gradient-to-b from-purple-900/50 to-black/50 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-purple-300 mb-3">{role}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Level <span className="text-white font-bold">{level}</span>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Play() {
  // Placeholder characters
  const characters = [
    { 
      id: 1, 
      name: "Eldric", 
      role: "Warrior", 
      image: "/assets/warrior.svg", 
      level: 1,
      rarity: "Common"
    },
    { 
      id: 2, 
      name: "Lyra", 
      role: "Mage", 
      image: "/assets/mage.svg", 
      level: 1,
      rarity: "Common"
    },
    { 
      id: 3, 
      name: "Thorne", 
      role: "Rogue", 
      image: "/assets/rogue.svg", 
      level: 1,
      rarity: "Common"
    },
    { 
      id: 4, 
      name: "Aeliana", 
      role: "Healer", 
      image: "/assets/healer.svg", 
      level: 1,
      rarity: "Common"
    },
  ];

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
            <div className="text-purple-300 cursor-pointer hover:text-purple-100">
              View All Heroes
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterCard 
                key={character.id}
                name={character.name}
                role={character.role}
                image={character.image}
                level={character.level}
                rarity={character.rarity}
              />
            ))}
          </div>
        </div>

        {/* Play Modes */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Game Modes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/70 rounded-xl p-6 hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Campaign</h3>
              <p className="text-gray-400 mb-4">Battle through the dungeon levels and defeat the boss to earn rewards.</p>
              <Link href="/play/battle" className="text-purple-300 font-medium hover:text-purple-100 transition-colors">Play Now</Link>
            </div>
            
            <div className="bg-gray-800/70 rounded-xl p-6 hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">PvP Arena</h3>
              <p className="text-gray-400 mb-4">Challenge other players in the arena to climb the leaderboard.</p>
              <div className="text-purple-300 font-medium">Coming Soon</div>
            </div>
            
            <div className="bg-gray-800/70 rounded-xl p-6 hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Guild Raids</h3>
              <p className="text-gray-400 mb-4">Team up with your guild to defeat powerful raid bosses.</p>
              <div className="text-purple-300 font-medium">Coming Soon</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 