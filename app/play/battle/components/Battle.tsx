'use client';

import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import BattleScene from '../scenes/BattleScene';
import ChatInterface from './ChatInterface';
import { useRouter } from 'next/navigation';

export default function Battle() {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (containerRef.current && !gameRef.current) {
      // Configure the game
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: containerRef.current,
        width: 800,
        height: 400,
        backgroundColor: '#000',
        scene: [BattleScene],
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
          }
        },
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH
        },
        pixelArt: true,
        roundPixels: true
      };

      // Initialize the game
      gameRef.current = new Phaser.Game(config);

      // Clean up function
      return () => {
        if (gameRef.current) {
          gameRef.current.destroy(true);
          gameRef.current = null;
        }
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).goToBattleResult = (resultData: any) => {
        const { winner, loser, bet, odds, history } = resultData;
        const params = new URLSearchParams({
          winner,
          loser,
          bet: String(bet),
          odds: String(odds),
          history: JSON.stringify(history),
        });
        router.push(`/play/result?${params.toString()}`);
      };
      return () => {
        delete (window as any).goToBattleResult;
      };
    }
  }, [router]);

  return (
    <div className="w-full h-full flex items-center justify-start gap-30 px-4">
      <div 
        ref={containerRef} 
        className="w-[800px] h-[400px] border-2 border-purple-800 rounded-lg overflow-hidden shadow-lg shadow-purple-900/30"
      />
      
      {/* Chat Interface */}
      <div className="w-[350px] h-[400px] ml-4">
        <ChatInterface gameRef={gameRef} />
      </div>
    </div>
  );
}
