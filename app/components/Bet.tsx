import React, { useState } from 'react';
import { PhantomWalletCard } from './Phantom';
import Image from 'next/image';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface Agent {
  id: number;
  name: string;
  avatar: string; // image path
  winRate: number;
  odds: number;
}

interface BetProps {
  userAgent: Agent;
  enemyAgent: Agent;
  walletAddress: string;
  balance: string;
  onBattle: (betAgentId: number, amount: number) => void;
}

const presetAmounts = [0.1, 0.5, 1, 2];
const VAULT_ADDRESS = "GSWRs4nTNQMgePRpiC57tPxLBo9XpywoUcs5MqvGrHjq";

const Bet: React.FC<BetProps> = ({ userAgent, enemyAgent, walletAddress, balance, onBattle }) => {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [isStaked, setIsStaked] = useState<boolean>(false);
  const [transactionSignature, setTransactionSignature] = useState<string>('');

  const handleAmountClick = (amt: number) => {
    setBetAmount(amt.toString());
    setError('');
    setIsStaked(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBetAmount(e.target.value);
    setError('');
    setIsStaked(false);
  };

  const handleStakeBet = async () => {
    const amount = parseFloat(betAmount);
    if (!selectedAgent) {
      setError('Please select an agent to bet on.');
      return;
    }
    if (!amount || amount <= 0) {
      setError('Please enter a valid bet amount.');
      return;
    }
    if (parseFloat(balance) < amount) {
      setError('Insufficient balance.');
      return;
    }

    try {
      setIsStaking(true);
    setError('');

      const { solana } = window as any;
      if (!solana || !solana.isPhantom) {
        setError('Phantom wallet not found. Please install Phantom.');
        setIsStaking(false);
        return;
      }

      // Create connection to devnet
      const connection = new Connection("https://api.devnet.solana.com");
      
      // Create transaction
      const transaction = new Transaction();
      
      // Add transfer instruction to transaction
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(walletAddress),
          toPubkey: new PublicKey(VAULT_ADDRESS),
          lamports: amount * LAMPORTS_PER_SOL, // Convert SOL to lamports
        })
      );
      
      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey(walletAddress);
      
      // Send transaction to wallet for signing and broadcast
      const signed = await solana.signAndSendTransaction(transaction);
      setTransactionSignature(signed.signature);
      
      // Confirm transaction
      await connection.confirmTransaction(signed.signature);
      
      setIsStaked(true);
      setIsStaking(false);
    } catch (err: any) {
      console.error("Transaction error:", err);
      setError(err.message || 'Transaction failed. Please try again.');
      setIsStaking(false);
    }
  };

  const handleBattle = () => {
    if (!isStaked) {
      setError('Please stake your bet first before starting the battle.');
      return;
    }
    const amount = parseFloat(betAmount);
    onBattle(selectedAgent as number, amount);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
      {/* Wallet Card */}
      <PhantomWalletCard walletAddress={walletAddress} balance={balance} />

      {/* Agents Display */}
      <div className="flex w-full justify-between items-center my-8 gap-8">
        {/* User Agent */}
        <div
          className={`flex-1 bg-gray-800 rounded-xl p-6 flex flex-col items-center border-4 transition-all cursor-pointer ${selectedAgent === userAgent.id ? 'border-purple-500 shadow-lg' : 'border-transparent'}`}
          onClick={() => setSelectedAgent(userAgent.id)}
        >
          <Image src={userAgent.avatar} alt={userAgent.name} width={80} height={80} className="rounded-full mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">{userAgent.name}</h3>
          <div className="text-gray-400 mb-1">Win Rate: <span className="text-green-400 font-bold">{userAgent.winRate}%</span></div>
          <div className="text-gray-400">Odds: <span className="text-yellow-400 font-bold">{userAgent.odds}x</span></div>
          <div className={`mt-4 px-4 py-1 rounded-full text-sm font-semibold ${selectedAgent === userAgent.id ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}>Bet on {userAgent.name}</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-gray-400 font-bold text-lg mb-2">VS</span>
        </div>
        {/* Enemy Agent */}
        <div
          className={`flex-1 bg-gray-800 rounded-xl p-6 flex flex-col items-center border-4 transition-all cursor-pointer ${selectedAgent === enemyAgent.id ? 'border-purple-500 shadow-lg' : 'border-transparent'} relative`}
          onClick={() => setSelectedAgent(enemyAgent.id)}
        >
          <div className="absolute -top-3 right-0 z-10">
            <div className="bg-gradient-to-r from-purple-600 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-purple-300 badge-pulse">
              <span className="mr-1">⚔️</span> Random Enemy
            </div>
          </div>
          <Image src={enemyAgent.avatar} alt={enemyAgent.name} width={80} height={80} className="rounded-full mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">{enemyAgent.name}</h3>
          <div className="text-gray-400 mb-1">Win Rate: <span className="text-green-400 font-bold">{enemyAgent.winRate}%</span></div>
          <div className="text-gray-400">Odds: <span className="text-yellow-400 font-bold">{enemyAgent.odds}x</span></div>
          <div className={`mt-4 px-4 py-1 rounded-full text-sm font-semibold ${selectedAgent === enemyAgent.id ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}>Bet on {enemyAgent.name}</div>
        </div>
      </div>

      {/* Bet Amount Selection */}
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl p-6 flex flex-col items-center mb-6">
        <div className="flex items-center mb-4 w-full justify-between">
          <span className="text-white font-bold text-lg">Bet Amount (SOL)</span>
          <span className="text-gray-400 text-sm">Balance: {balance}</span>
        </div>
        <div className="flex gap-4 mb-4 w-full justify-center">
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              className={`px-4 py-2 rounded-lg font-bold border-2 transition-all ${betAmount === amt.toString() ? 'bg-purple-600 border-purple-400 text-white' : 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-700'}`}
              onClick={() => handleAmountClick(amt)}
              disabled={isStaked}
            >
              {amt} SOL
            </button>
          ))}
        </div>
        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter custom amount"
          className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border-2 border-gray-700 focus:border-purple-500 focus:outline-none text-center font-bold text-lg mb-2"
          value={betAmount}
          onChange={handleInputChange}
          disabled={isStaked}
        />
        {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        {isStaked && (
          <div className="text-green-400 text-sm mt-2 flex items-center">
            <span className="mr-2">✓ Bet staked successfully!</span>
            <a 
              href={`https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 underline"
            >
              View transaction
            </a>
          </div>
        )}
      </div>

      {/* Stake Bet Button */}
      <button
        className={`w-full max-w-md mx-auto px-8 py-4 rounded-xl text-lg font-bold transition-colors mb-4 ${
          selectedAgent && betAmount && !isStaked 
            ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer' 
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!(selectedAgent && betAmount) || isStaking || isStaked}
        onClick={handleStakeBet}
      >
        {isStaking ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : isStaked ? 'Bet Staked' : 'Stake Your Bet'}
      </button>

      {/* Battle Button */}
      <button
        className={`w-full max-w-md mx-auto px-8 py-4 rounded-xl text-lg font-bold transition-colors ${
          isStaked 
            ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer' 
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!isStaked}
        onClick={handleBattle}
      >
        Battle
      </button>
    </div>
  );
};

export default Bet; 