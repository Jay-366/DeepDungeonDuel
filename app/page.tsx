import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Roadmap from './components/Roadmap';
import TokenInfo from './components/TokenInfo';
import CTA from './components/CTA';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col w-full">
        <Hero />
        <Features />
        <TokenInfo />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
    </>
  );
}