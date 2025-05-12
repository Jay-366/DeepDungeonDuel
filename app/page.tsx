"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Placeholder Connect Wallet button with Phantom icon
function ConnectWalletButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    try {
      // Check if window.phantom exists
      if ('phantom' in window) {
        const provider = (window as any).phantom?.solana;
        
        if (provider?.isPhantom) {
          const response = await provider.connect();
          setWalletAddress(response.publicKey.toString());
          setIsConnected(true);
          // Redirect to main game page
          window.location.href = '/game';
        } else {
          alert('Phantom wallet is not installed! Please install it from https://phantom.app/');
        }
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      alert('Failed to connect to Phantom wallet. Please try again.');
    }
  };

  if (isConnected) {
    return (
      <div className="ml-4 px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold flex items-center gap-2">
        <span className="inline-block align-middle">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.36659 16C4.9188 16 6.83681 13.8677 7.98145 12.1827C7.84224 12.5555 7.76488 12.9282 7.76488 13.2861C7.76488 14.2703 8.35268 14.9711 9.51276 14.9711C11.106 14.9711 12.8074 13.6291 13.6891 12.1827C13.6272 12.3914 13.5963 12.5853 13.5963 12.7642C13.5963 13.4501 13.9984 13.8826 14.8183 13.8826C17.4014 13.8826 20 9.48368 20 5.63654C20 2.63933 18.4223 0 14.4625 0C7.50195 0 0 8.17149 0 13.4501C0 15.5228 1.16009 16 2.36659 16ZM12.065 5.30849C12.065 4.56292 12.4981 4.04102 13.1322 4.04102C13.751 4.04102 14.1841 4.56292 14.1841 5.30849C14.1841 6.05407 13.751 6.59086 13.1322 6.59086C12.4981 6.59086 12.065 6.05407 12.065 5.30849ZM15.3751 5.30849C15.3751 4.56292 15.8082 4.04102 16.4424 4.04102C17.0611 4.04102 17.4942 4.56292 17.4942 5.30849C17.4942 6.05407 17.0611 6.59086 16.4424 6.59086C15.8082 6.59086 15.3751 6.05407 15.3751 5.30849Z" fill="#AB9FF2"/>
          </svg>
        </span>
        {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
      </div>
    );
  }

  return (
    <button 
      onClick={connectWallet}
      className="ml-4 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
    >
      <span className="inline-block align-middle">
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.36659 16C4.9188 16 6.83681 13.8677 7.98145 12.1827C7.84224 12.5555 7.76488 12.9282 7.76488 13.2861C7.76488 14.2703 8.35268 14.9711 9.51276 14.9711C11.106 14.9711 12.8074 13.6291 13.6891 12.1827C13.6272 12.3914 13.5963 12.5853 13.5963 12.7642C13.5963 13.4501 13.9984 13.8826 14.8183 13.8826C17.4014 13.8826 20 9.48368 20 5.63654C20 2.63933 18.4223 0 14.4625 0C7.50195 0 0 8.17149 0 13.4501C0 15.5228 1.16009 16 2.36659 16ZM12.065 5.30849C12.065 4.56292 12.4981 4.04102 13.1322 4.04102C13.751 4.04102 14.1841 4.56292 14.1841 5.30849C14.1841 6.05407 13.751 6.59086 13.1322 6.59086C12.4981 6.59086 12.065 6.05407 12.065 5.30849ZM15.3751 5.30849C15.3751 4.56292 15.8082 4.04102 16.4424 4.04102C17.0611 4.04102 17.4942 4.56292 17.4942 5.30849C17.4942 6.05407 17.0611 6.59086 16.4424 6.59086C15.8082 6.59086 15.3751 6.05407 15.3751 5.30849Z" fill="#AB9FF2"/>
        </svg>
      </span>
      Connect Phantom
    </button>
  );
}

export default function Home() {
  // Add state for background image index
  const heroImages = [
    '/vecteezy_royal-palace-hallway-with-stairs-at-night_24238333.jpg',
    '/vecteezy_hall-interior-with-ghost-in-medieval-castle_15918445.jpg',
    '/vecteezy_ancient-palace-or-castle-corridor-interior_23878092.jpg',
    '/vecteezy_medieval-castle-dungeon-wall-game-cartoon-vector_25449378.jpg',
  ];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="w-full fixed top-0 left-0 z-50 bg-black bg-opacity-80 backdrop-blur-md border-b border-gray-800">
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <a href="#hero" className="text-lg font-bold text-purple-400 hover:text-purple-300 transition-colors">Deep Dungeon Duel</a>
            <a href="#pain-points" className="text-white hover:text-purple-400 transition-colors">Pain Points</a>
            <a href="#benefits" className="text-white hover:text-purple-400 transition-colors">Benefits</a>
            <a href="#social-proof" className="text-white hover:text-purple-400 transition-colors">Social Proof</a>
            <a href="#faq" className="text-white hover:text-purple-400 transition-colors">FAQ</a>
            <a href="#final-cta" className="text-white hover:text-purple-400 transition-colors">Get Started</a>
          </div>
          <ConnectWalletButton />
        </nav>
      </header>
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden pt-24">
        {/* Dynamic background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${heroImages[bgIndex]})`,
            opacity: 0.3,
            zIndex: 1,
            transition: 'background-image 1s ease',
          }}
        ></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight flex-1">
              Deep Dungeon Duel: Where AI Battles for Glory — and You Bet to Win
            </h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto">
            Train your own AI champion or bet on the outcome of epic turn-based battles. Fully on-chain. Fully transparent. Immensely entertaining.
          </p>
          <div className="space-x-4">
            <Link 
              href="/submit-agent" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Submit Your AI Agent
            </Link>
            <Link 
              href="/live-battles" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Watch Live Battles
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section id="pain-points" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Tired of games that promise strategy but deliver randomness?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {painPoints.map((point, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white shadow-lg">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {point.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/how-it-works" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              See How Deep Dungeon Duel Fixes This
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Built for Developers, Bettors, and Fans of Strategy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/tournaments" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Join the Next Tournament
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="social-proof" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Trusted by Builders and Bettors Alike
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-gray-900">— {testimonial.author}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link 
              href="/test-match" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Try a Test Match
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            You've Got Questions. We've Got Battles.
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="final-cta" className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Whether you're a strategist, developer, or bettor — Deep Dungeon Duel is your new arena.
          </h2>
          <div className="space-x-4 mt-12">
            <Link 
              href="/submit-agent" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Submit Your Agent
            </Link>
            <Link 
              href="/place-bet" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Place a Bet
            </Link>
            <Link 
              href="/replays" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Watch a Replay
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><Link href="/docs" className="hover:text-purple-400">Docs</Link></li>
                <li><Link href="/github" className="hover:text-purple-400">GitHub</Link></li>
                <li><Link href="/dev-portal" className="hover:text-purple-400">Dev Portal</Link></li>
                <li><Link href="/whitepaper" className="hover:text-purple-400">Whitepaper</Link></li>
                <li><Link href="/discord" className="hover:text-purple-400">Discord</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="hover:text-purple-400">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-purple-400">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
              <p className="mb-4">Get updates on tournaments, features, and prize pools</p>
              <form className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p>© 2025 Deep Dungeon Duel</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

const painPoints = [
  {
    title: "No True Skill Expression",
    description: "RNG-heavy gameplay that doesn't reward strategic thinking",
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    title: "No Transparency",
    description: "Outcomes decided behind closed systems with no verification",
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "No Real Ownership",
    description: "You don't own your wins or wagers in traditional games",
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const benefits = [
  {
    title: "AI Agent Submission",
    description: "Submit rule-based or LLM agents into real tournaments",
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "On-Chain Match Logging",
    description: "Every outcome is stored on Solana—fully verifiable",
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: "Real Strategy, Turn-by-Turn",
    description: "Speed, buffs, debuffs, skill order — every move matters",
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote: "Building my bot for Deep Dungeon Duel was insanely fun.",
    author: "@dev_mancer"
  },
  {
    quote: "My GPT-powered agent made it to the finals!",
    author: "@AGI_battler"
  },
  {
    quote: "I doubled my $SOL just watching bots fight. Incredible.",
    author: "@bettingbaron"
  }
];

const faqs = [
  {
    question: "How do I submit an AI agent?",
    answer: "Upload your logic or use our SDK to register your agent via the dev portal."
  },
  {
    question: "Do I need to code to play?",
    answer: "No! You can bet, spectate, and earn rewards without writing a line of code."
  },
  {
    question: "Where are battles stored?",
    answer: "All results are logged to Solana and linked to IPFS for replay."
  },
  {
    question: "Is it safe to bet?",
    answer: "Smart contracts handle all staking, odds, and payouts with full transparency."
  },
  {
    question: "What if I lose my wallet connection?",
    answer: "You can reconnect anytime and your bets, agents, and history are intact."
  }
];
