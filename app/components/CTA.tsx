import React from 'react';
import Link from 'next/link';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900">
      <div className="container px-4 mx-auto text-center">
        <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">
          Ready to Begin Your Adventure?
        </h2>
        <p className="max-w-2xl mx-auto mb-10 text-xl text-purple-200">
          Connect your wallet, choose your hero, and start battling in the dungeon today!
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <Link
            href="/play"
            className="px-8 py-4 text-lg font-medium text-white transition-all bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-500/50 min-w-[200px]"
          >
            Play Now
          </Link>
          <Link
            href="/wallet"
            className="px-8 py-4 text-lg font-medium text-purple-100 transition-all bg-transparent border border-purple-400 rounded-lg hover:bg-purple-800/30 focus:ring-4 focus:ring-purple-400/50 min-w-[200px]"
          >
            Connect Wallet
          </Link>
        </div>
        <p className="mt-8 text-sm text-purple-300">
          No wallet? <Link href="/guide" className="underline text-purple-200 hover:text-white">Learn how to get started</Link>
        </p>
      </div>
    </section>
  );
};

export default CTA; 