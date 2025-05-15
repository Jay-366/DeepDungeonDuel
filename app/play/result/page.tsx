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
import { ConnectPhantomButton } from '../../components/Phantom';

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
  const [walletReady, setWalletReady] = useState(false);
  const [manualWalletConnected, setManualWalletConnected] = useState(false);

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

  // Handle manual wallet connection
  const handleManualConnect = () => {
    setManualWalletConnected(true);
    setWalletReady(true);
  };

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

  // Get the Phantom wallet directly
  const getPhantomWallet = useCallback(async () => {
    const { solana } = window as any;
    if (!solana || !solana.isPhantom) {
      return null;
    }
    
    if (!solana.isConnected) {
      try {
        const resp = await solana.connect();
        return resp.publicKey;
      } catch (error) {
        console.error("Error connecting to Phantom wallet:", error);
        return null;
      }
    } else {
      return solana.publicKey;
    }
  }, []);

  // Get provider
  const getProvider = useCallback(async () => {
    try {
      // Get wallet from Phantom directly
      const phantomPublicKey = await getPhantomWallet();
      
      if (!phantomPublicKey) {
        return null;
      }
      
      // Create a custom signer
      const signer = {
        publicKey: phantomPublicKey,
        signTransaction: async (transaction: Transaction) => {
          try {
            const { solana } = window as any;
            const signedTransaction = await solana.signTransaction(transaction);
            return signedTransaction;
          } catch (error) {
            console.error("Error signing transaction:", error);
            throw error;
          }
        },
        signAllTransactions: async (transactions: Transaction[]) => {
          try {
            const { solana } = window as any;
            const signedTransactions = await solana.signAllTransactions(transactions);
            return signedTransactions;
          } catch (error) {
            console.error("Error signing transactions:", error);
            throw error;
          }
        },
      };
      
      const provider = new AnchorProvider(
        connection,
        signer,
        { commitment: 'processed' }
      );
      
      return provider;
    } catch (error) {
      console.error("Error creating provider:", error);
      return null;
    }
  }, [connection, getPhantomWallet]);

  const getProgram = useCallback(async () => {
    try {
      const provider = await getProvider();
      if (!provider) return null;
      
      // @ts-expect-error - the IDL is properly formatted but TypeScript doesn't know
      return new Program(idl, PROGRAM_ID, provider);
    } catch (error) {
      console.error("Error getting program:", error);
      return null;
    }
  }, [getProvider]);

  // Find the vault PDA
  const findVaultPDA = useCallback(async () => {
    const phantomPublicKey = await getPhantomWallet();
    if (!phantomPublicKey) return null;
    
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("vault"), 
        phantomPublicKey.toBuffer()
      ],
      PROGRAM_ID
    );
  }, [getPhantomWallet]);

  // Find the config PDA
  const findConfigPDA = useCallback(() => {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("config")
      ],
      PROGRAM_ID
    );
  }, []);

  const playGame = useCallback(async () => {
    // Prevent multiple processing attempts
    if (processingAttempted) {
      return;
    }
    
    setProcessingAttempted(true);
    
    try {
      setIsLoading(true);
      
      // Get wallet from Phantom directly
      const phantomPublicKey = await getPhantomWallet();
      if (!phantomPublicKey) {
        console.log("Wallet not connected or public key not available");
        setIsLoading(false);
        setProcessingAttempted(false); // Reset so user can try again
        toast.error("Please connect your Phantom wallet");
        return;
      }
      
      const amountInSol = parseFloat(betAmount);
      // Convert SOL to lamports (1 SOL = 1,000,000,000 lamports)
      const amountInLamports = new BN(amountInSol * LAMPORTS_PER_SOL);
      
      const program = await getProgram();
      if (!program) {
        throw new Error("Could not initialize program");
      }
      
      const vaultPDAResult = await findVaultPDA();
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
          user: phantomPublicKey,
          authority: phantomPublicKey,
          config: configPDA,
          systemProgram: SystemProgram.programId,
        })
        .instruction();
         
      tx.add(ix);
      
      // Sign and send the transaction directly with Phantom
      const { solana } = window as any;
      
      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = phantomPublicKey;
      
      const signed = await solana.signAndSendTransaction(tx);
      await connection.confirmTransaction(signed.signature, 'processed');
      
      setGameResult({ 
        win: userBetWon, 
        transaction: signed.signature 
      });
      
      toast.success(
        userBetWon 
          ? `You won ${amountInSol} SOL!` 
          : `You lost the bet. You pay only ${amountInSol} SOL (5% of your bet).`
      );
      
      setTransactionProcessed(true);
       
    } catch (error) {
      console.error("Game error:", error);
      
      // Check if it's a wallet-related error and provide appropriate message
      let errorMessage = "Unknown error";
      
      if (error instanceof Error) {
        if (error.message.includes("Wallet not selected")) {
          errorMessage = "Please connect your Phantom wallet";
          setProcessingAttempted(false); // Allow retry
        } else if (error.message.includes("User rejected")) {
          errorMessage = "Transaction was rejected in your wallet";
          setProcessingAttempted(false); // Allow retry
        } else {
          errorMessage = error.message;
        }
      }
      
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [
    betAmount, 
    connection, 
    findConfigPDA, 
    findVaultPDA, 
    getPhantomWallet, 
    getProgram, 
    processingAttempted, 
    userBetWon
  ]);
  
  // Check if transaction should be processed after manual wallet connection
  useEffect(() => {
    if (manualWalletConnected && !processingAttempted && !transactionProcessed) {
      // Add a delay to ensure wallet is fully ready
      const timer = setTimeout(() => {
        try {
          playGame();
        } catch (error) {
          console.error("Error initiating transaction:", error);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [manualWalletConnected, processingAttempted, playGame, transactionProcessed]);

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
          
          {!manualWalletConnected ? (
            <div className="flex flex-col items-center mb-4">
              <p className="text-yellow-400 mb-3 text-center">
                Please connect your Phantom wallet to process the payment.
              </p>
              <ConnectPhantomButton onConnect={handleManualConnect} />
              <p className="text-gray-400 mt-3 text-xs text-center">
                If you don't have Phantom wallet installed, please install it from <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">phantom.app</a>
              </p>
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
          className="mt-8 px-8 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition w-full"
          onClick={() => router.push("/play")}
        >
          Back to Play
        </button>
      </div>
    </div>
  );
} 