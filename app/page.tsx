import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import TokenInfo from './components/TokenInfo';
import CTA from './components/CTA';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <main className="flex flex-col w-full">
        <Hero />
        <Features />
        <TokenInfo />
        <CTA />
      </main>
      <Footer />
    </>
  );
}