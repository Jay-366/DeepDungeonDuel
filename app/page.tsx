import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import TokenInfo from './components/TokenInfo';
import CTA from './components/CTA';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div style={{ background: "url('/assets/DungeonBackground.png') center center / cover no-repeat, linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(88,28,135,0.6))" }} className="min-h-screen w-full overflow-x-hidden">
      <main className="flex flex-col w-full">
        <Hero />
        <Features />
        <TokenInfo />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}