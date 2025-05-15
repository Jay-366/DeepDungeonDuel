import React from 'react';

const TokenInfo = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-purple-900/50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Game Token Economy</h2>
          <p className="text-xl text-gray-300">
            The SOL token powers all aspects of the DeepDungeonDuel ecosystem
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 transition-all bg-gray-800/70 rounded-xl hover:bg-gray-800">
            <div className="flex items-center justify-center w-12 h-12 mb-4 text-2xl font-bold text-white bg-purple-600 rounded-full">
              1
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">In-Game Currency</h3>
            <p className="text-gray-400">
              Use SOL tokens to purchase heroes, equipment, and items within the game marketplace.
            </p>
          </div>
          
          <div className="p-6 transition-all bg-gray-800/70 rounded-xl hover:bg-gray-800">
            <div className="flex items-center justify-center w-12 h-12 mb-4 text-2xl font-bold text-white bg-purple-600 rounded-full">
              2
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Staking Rewards</h3>
            <p className="text-gray-400">
              Stake your SOL tokens to earn passive income and exclusive in-game benefits.
            </p>
          </div>
          
          <div className="p-6 transition-all bg-gray-800/70 rounded-xl hover:bg-gray-800">
            <div className="flex items-center justify-center w-12 h-12 mb-4 text-2xl font-bold text-white bg-purple-600 rounded-full">
              3
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Governance</h3>
            <p className="text-gray-400">
              Participate in game development decisions through our DAO voting system.
            </p>
          </div>
          
          <div className="p-6 transition-all bg-gray-800/70 rounded-xl hover:bg-gray-800">
            <div className="flex items-center justify-center w-12 h-12 mb-4 text-2xl font-bold text-white bg-purple-600 rounded-full">
              4
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Play-to-Earn</h3>
            <p className="text-gray-400">
              Complete quests, win battles, and participate in tournaments to earn SOL tokens.
            </p>
          </div>
        </div>
        
        <div className="p-6 mt-12 text-center bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl">
          <p className="mb-4 text-lg text-white">
            Token Contract Address
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-lg">
            <code className="text-purple-300">0x1234...5678</code>
            <button 
              className="ml-2 text-gray-400 hover:text-purple-400"
              aria-label="Copy to clipboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenInfo; 