'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the wallet provider to avoid SSR issues
const SolanaWalletProviderWithNoSSR = dynamic(
  () => import('./WalletProvider'),
  { ssr: false }
);

export default function ClientWalletProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <SolanaWalletProviderWithNoSSR>
      {children}
    </SolanaWalletProviderWithNoSSR>
  );
} 