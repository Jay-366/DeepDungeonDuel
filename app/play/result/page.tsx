"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

export default function ResultPage() {
  const params = useSearchParams();
  const router = useRouter();

  // Get data from query params
  const winner = params.get("winner") || "Unknown";
  const loser = params.get("loser") || "Unknown";
  const bet = Number(params.get("bet") || 0);
  const odds = Number(params.get("odds") || 1);
  let damageHistory: any[] = [];
  try {
    damageHistory = JSON.parse(params.get("history") || "[]");
  } catch {
    damageHistory = [];
  }

  const payout = bet * odds;

  return (
    <div style={{ background: "url('/assets/DungeonBackground.png') center center / cover no-repeat, linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(88,28,135,0.6))" }} className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-purple-900/30 px-4 py-12">
      <div className="bg-gray-900/90 rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Battle Result</h1>
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
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-2">Damage History</h3>
          <div className="bg-gray-800 rounded-lg p-4 max-h-48 overflow-y-auto text-sm text-gray-200">
            {damageHistory.length === 0 ? (
              <div>No history available.</div>
            ) : (
              damageHistory.map((entry: any, idx: number) => (
                <div key={idx} className="mb-1">
                  <span className="font-bold">{entry.agent}:</span> {entry.action} ({entry.amount} dmg)
                </div>
              ))
            )}
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
            <div className="text-green-400 font-bold">{payout.toFixed(3)} SOL</div>
          </div>
        </div>
        <div className="text-center text-gray-400">
          The loser pays <span className="text-red-400 font-bold">{payout.toFixed(3)} SOL</span> to the winner.
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