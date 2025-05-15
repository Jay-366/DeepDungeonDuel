'use client';

import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import BattleScene from '../scenes/BattleScene';
import ChatInterface from './ChatInterface';
import { useRouter } from 'next/navigation';

interface BattleProps {
  onBattleComplete?: (winner: string, loser: string, damageHistory: any[]) => void;
  betAmount?: string;
}

export default function Battle({ onBattleComplete, betAmount = '0' }: BattleProps) {
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

      // Send bet amount to game scene
      gameRef.current.events.once('ready', () => {
        const battleScene = gameRef.current?.scene.getScene('BattleScene') as any;
        if (battleScene) {
          battleScene.setBetAmount(betAmount);
        }
      });

      // Clean up function
      return () => {
        if (gameRef.current) {
          gameRef.current.destroy(true);
          gameRef.current = null;
        }
      };
    }
  }, [betAmount]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).goToBattleResult = (resultData: any) => {
        const { winner, loser, bet, odds, history } = resultData;
        
        // Get bet agent name from localStorage if available
        const betAgentName = localStorage.getItem('betAgentName') || '';
        
        if (onBattleComplete) {
          onBattleComplete(winner, loser, history);
        } else {
          // Handle damage history - ensure it's a valid array
          let validHistory = [];
          try {
            if (Array.isArray(history)) {
              validHistory = history;
            } else if (typeof history === 'string') {
              validHistory = JSON.parse(history);
            }
          } catch (e) {
            console.error('Failed to parse damage history:', e);
            // Create fallback history
            validHistory = [
              { agent: winner, action: 'Attack', amount: 20 },
              { agent: loser, action: 'Attack', amount: 15 }
            ];
          }
          
          // Ensure we have at least some history to display
          if (validHistory.length === 0) {
            validHistory = [
              { agent: winner, action: 'Attack', amount: 20 },
              { agent: loser, action: 'Attack', amount: 15 }
            ];
          }
          
          // Fallback to the old approach
        const params = new URLSearchParams({
          winner,
          loser,
            bet: String(bet || betAmount),
          odds: String(odds),
            history: JSON.stringify(validHistory),
            betAgentName,
        });
        router.push(`/play/result?${params.toString()}`);
        }
      };
      return () => {
        delete (window as any).goToBattleResult;
      };
    }
  }, [router, onBattleComplete, betAmount]);

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
