"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { 
  PublicKey, 
  Transaction, 
  SystemProgram,
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';
import { Program, AnchorProvider, BN } from '@project-serum/anchor';
import idl from '../../components/idl/game_reward_system.json';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

// The program ID from your Anchor program
const PROGRAM_ID = new PublicKey("AP62gFAAsUSdKqCxhgkzyqGxwbP5Hhs4SBSUb4ARtXyz");

export default function ResultPage() {
  const params = useSearchParams();
  const router = useRouter();

  // Wallet and connection
  const { publicKey, sendTransaction, connected, signTransaction, connect } = useWallet();
  const { connection } = useConnection();
  
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [gameResult, setGameResult] = useState<null | {win: boolean; transaction: string}>(null);
  const [transactionProcessed, setTransactionProcessed] = useState(false);
  const [processingAttempted, setProcessingAttempted] = useState(false);

  // Get data from query params
  const winner = params.get("winner") || "Unknown";
  const loser = params.get("loser") || "Unknown";
  const bet = Number(params.get("bet") || 0).toFixed(3); // Format to 3 decimal places for SOL
  const odds = Number(params.get("odds") || 1);
  const betAgentName = params.get("betAgentName") || "";

  // Check if user won their bet
  const userBetWon = betAgentName === winner;
  
  // Calculate payout
  const payout = (Number(bet) * odds).toFixed(3); // Format payout to 3 decimal places
  
  // Calculate loss amount (5% of bet amount if user lost)
  const lossAmount = (Number(bet) * 0.05).toFixed(3);
  
  // Initialize betAmount with the appropriate value based on win/loss
  const [betAmount] = useState<string>(userBetWon ? payout : lossAmount);

  // Parse damage history with fallback
  let damageHistory: any[] = [];
  try {
    const historyParam = params.get("history") || "[]";
    damageHistory = JSON.parse(historyParam);
    
    // Ensure we have some history even if parsing succeeds but returns empty array
    if (!damageHistory || damageHistory.length === 0) {
      damageHistory = [
        { agent: winner, action: 'Final Strike', amount: 25 },
        { agent: loser, action: 'Defeated', amount: 0 }
      ];
    }
  } catch (error) {
    console.error("Error parsing damage history:", error);
    // Fallback data if parsing fails
    damageHistory = [
      { agent: winner, action: 'Victory Attack', amount: 20 },
      { agent: loser, action: 'Last Stand', amount: 15 }
    ];
  }

  // Get provider
  const getProvider = useCallback(() => {
    if (!publicKey || !signTransaction) {
      return null;
    }
    
    const provider = new AnchorProvider(
      connection,
      {
        publicKey,
        signTransaction,
        signAllTransactions: () => Promise.resolve([]),
      },
      { commitment: 'processed' }
    );
    
    return provider;
  }, [publicKey, signTransaction, connection]);

  const getProgram = useCallback(() => {
    const provider = getProvider();
    if (!provider) return null;
    
    // @ts-expect-error - the IDL is properly formatted but TypeScript doesn't know
    return new Program(idl, PROGRAM_ID, provider);
  }, [getProvider]);

  // Find the vault PDA
  const findVaultPDA = useCallback(() => {
    if (!publicKey) return null;
    
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("vault"), 
        publicKey.toBuffer()
      ],
      PROGRAM_ID
    );
  }, [publicKey]);

  // Find the config PDA
  const findConfigPDA = useCallback(() => {
    if (!publicKey) return null;
    
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("config")
      ],
      PROGRAM_ID
    );
  }, [publicKey]);

  const handleConnectWallet = async () => {
    try {
      if (connect) {
        await connect();
        toast.success("Wallet connected!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet");
    }
  };

  const playGame = useCallback(async () => {
    // Prevent multiple processing attempts
    if (processingAttempted) {
      return;
    }
    
    setProcessingAttempted(true);
    
    if (!publicKey || !connected) {
      setIsLoading(false);
      return;
    }
    
    if (transactionProcessed) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      
      const amountInSol = parseFloat(betAmount);
      // Convert SOL to lamports (1 SOL = 1,000,000,000 lamports)
      const amountInLamports = new BN(amountInSol * LAMPORTS_PER_SOL);
      
      const program = getProgram();
      if (!program) {
        throw new Error("Could not initialize program");
      }
      
      const vaultPDAResult = findVaultPDA();
      if (!vaultPDAResult) {
        throw new Error("Could not find vault PDA");
      }
      
      const [vaultPDA, _] = vaultPDAResult;

      const configPDAResult = findConfigPDA();
      if (!configPDAResult) {
        throw new Error("Could not find config PDA");
  }

      const [configPDA, __] = configPDAResult;
      
      // Prepare the transaction
      const tx = new Transaction();
      
      const ix = await program.methods
        .playGame(userBetWon, amountInLamports)
        .accounts({
          vault: vaultPDA,
          user: publicKey,
          authority: publicKey,
          config: configPDA,
          systemProgram: SystemProgram.programId,
        })
        .instruction();
         
      tx.add(ix);
         
      // Send the transaction
      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, 'processed');
      
      setGameResult({ 
        win: userBetWon, 
        transaction: signature 
      });
      
      toast.success(
        userBetWon 
          ? `You won ${amountInSol} SOL!` 
          : `You lost the bet. You pay only ${amountInSol} SOL (5% of your bet).`
      );
      
      setTransactionProcessed(true);
       
    } catch (error) {
      console.error("Game error:", error);
      toast.error(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    betAmount, 
    connected, 
    connection, 
    findConfigPDA, 
    findVaultPDA, 
    getProgram, 
    processingAttempted, 
    publicKey, 
    sendTransaction, 
    transactionProcessed, 
    userBetWon
  ]);
  
  // Run once when component mounts and wallet is connected
  useEffect(() => {
    if (connected && publicKey && !processingAttempted && !transactionProcessed) {
      // Add a small delay to ensure the UI renders first
      const timer = setTimeout(() => {
        playGame();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [connected, publicKey, processingAttempted, playGame, transactionProcessed]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-purple-900/30 px-4 py-12">
      <div className="bg-gray-900/90 rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Battle Result</h1>
        
        {/* Show bet win/loss status */}
        <div className={`text-center mb-6 font-bold text-xl ${userBetWon ? 'text-green-400' : 'text-red-400'}`}>
          {userBetWon
            ? "Congratulations, You Won!"
            : "You Lost, But Pay Only 5%"}
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-green-400">{winner}</h2>
            <p className="text-gray-400">Winner</p>
          </div>
          <span className="text-2xl font-bold text-white">VS</span>
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-400">{loser}</h2>
            <p className="text-gray-400">Loser</p>
          </div>
        </div>
        
        {/* Battle History Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-2">Battle History</h3>
          <div className="bg-gray-800 rounded-lg p-4 max-h-48 overflow-y-auto text-sm">
            {damageHistory.map((entry: any, idx: number) => (
              <div 
                key={idx} 
                className={`mb-2 p-2 rounded-lg ${
                  entry.agent === winner 
                    ? 'bg-green-900/30 border-l-2 border-green-500' 
                    : entry.agent === loser
                      ? 'bg-red-900/30 border-l-2 border-red-500'
                      : 'bg-gray-700/50'
                }`}
              >
                <div className="flex justify-between">
                  <span className={`font-bold ${
                    entry.agent === winner 
                      ? 'text-green-400' 
                      : entry.agent === loser
                        ? 'text-red-400'
                        : 'text-blue-400'
                  }`}>
                    {entry.agent}:
                  </span>
                  {entry.amount > 0 && (
                    <span className="text-yellow-300 font-bold">
                      {entry.amount} dmg
                    </span>
                  )}
                </div>
                <div className="text-gray-300 mt-1">
                  {entry.action}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <div>
            <div className="text-gray-400">Bet Amount</div>
            <div className="text-white font-bold">{bet} SOL</div>
          </div>
          <div>
            <div className="text-gray-400">Odds</div>
            <div className="text-white font-bold">{odds}x</div>
          </div>
          <div>
            <div className="text-gray-400">Payout</div>
            <div className={userBetWon ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
              {userBetWon ? `+${payout}` : `-${lossAmount}`} SOL
            </div>
          </div>
        </div>
        
        {/* Smart contract interaction UI */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-3">Payment Status</h3>
          
          {!connected ? (
            <div className="flex justify-center mb-4">
              <button 
                onClick={handleConnectWallet}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-600 rounded-lg text-white font-bold hover:bg-purple-700 transition"
              >
                <span>Connect Phantom Wallet</span>
                <Image 
                  src="/Phantom-Icon_Transparent_Purple.png" 
                  alt="Phantom" 
                  width={24} 
                  height={24} 
                  className="ml-2"
                />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-3">
                <div className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-white font-bold">
                  {betAmount}
                </div>
                <span className="px-3 py-2 bg-gray-600 rounded-r-lg text-white">SOL</span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-lg overflow-hidden mb-3">
                <div 
                  className={`h-2 transition-all duration-1000 ${
                    isLoading 
                      ? 'bg-yellow-500 animate-pulse' 
                      : (transactionProcessed 
                          ? 'bg-green-500' 
                          : 'bg-gray-600')
                  }`} 
                  style={{ 
                    width: isLoading 
                      ? '70%' 
                      : (transactionProcessed ? '100%' : '0%') 
                  }}
                ></div>
              </div>
              
              <div className="flex items-center justify-center text-sm">
                {isLoading ? (
                  <span className="text-yellow-400">Processing payment...</span>
                ) : transactionProcessed ? (
                  <span className="text-green-400">Payment processed</span>
                ) : (
                  <span className="text-gray-400">Initiating payment...</span>
                )}
              </div>
              
              {/* Manual retry button if payment fails */}
              {processingAttempted && !transactionProcessed && !isLoading && (
                <div className="mt-3 flex justify-center">
                  <button
                    onClick={() => {
                      setProcessingAttempted(false);
                      setTimeout(() => playGame(), 500);
                    }}
                    className="px-4 py-2 bg-purple-600 rounded-lg text-white font-bold hover:bg-purple-700 transition"
                  >
                    Retry Payment
                  </button>
                </div>
              )}
              
              <div className="mt-2 text-xs text-gray-400">
                Connected as: {publicKey?.toString().slice(0, 6)}...{publicKey?.toString().slice(-4)}
              </div>
            </>
          )}
          
          {gameResult && (
            <div className="mt-3 text-sm">
              <p className="text-green-400">
                Payment Successful!
              </p>
              <a 
                href={`https://explorer.solana.com/tx/${gameResult.transaction}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View on Solana Explorer
              </a>
            </div>
          )}
        </div>
        
        <div className="text-center text-gray-400 mt-6">
          {userBetWon 
            ? `Congratulations! You've earned ${payout} SOL.`
            : `You lost the bet. Please pay ${lossAmount} SOL (5% of your bet).`}
        </div>
        <button
          className="mt-8 px-8 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition"
          onClick={() => router.push("/play")}
        >
          Back to Play
        </button>
      </div>
    </div>
  );
} 