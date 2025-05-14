import React from 'react';
import Image from 'next/image';

interface TutorialStep {
  title: string;
  description: string;
  icon: string;
  details?: string[];
}

const Tutorial = () => {
  const tutorialSteps: TutorialStep[] = [
    {
      title: "Connect Your Wallet",
      description: "Start your journey by connecting your Phantom wallet",
      icon: "👛",
      details: [
        "Click 'Connect Wallet' button in the header",
        "Approve the connection request in your Phantom wallet",
        "Your game account will be automatically created and linked to your wallet"
      ]
    },
    {
      title: "Choose Your Agent",
      description: "Select your champion from our diverse roster of agents",
      icon: "🎮",
      details: [
        "Browse through available agents in the selection screen",
        "Check agent stats, abilities, and win rates",
        "Review the leaderboard to see which agents are performing best",
        "Confirm your agent selection to proceed"
      ]
    },
    {
      title: "Select Game Mode",
      description: "Pick your preferred battle format",
      icon: "🎯",
      details: [
        "Choose between different game modes",
        "Each mode has unique rules and rewards",
        "Select your preferred battle duration and difficulty"
      ]
    },
    {
      title: "Place Your Bet",
      description: "Make your prediction and stake your claim",
      icon: "💰",
      details: [
        "Review the match details and odds",
        "Enter the amount you want to bet",
        "Confirm your bet using your Phantom wallet",
        "Wait for the system to match you with an opponent"
      ]
    },
    {
      title: "Battle Time",
      description: "Engage in strategic combat",
      icon: "⚔️",
      details: [
        "Watch the battle unfold in real-time",
        "Use your agent's abilities strategically",
        "Monitor health bars and special moves",
        "React to your opponent's tactics"
      ]
    },
    {
      title: "Claim Rewards",
      description: "Collect your winnings or settle your bet",
      icon: "🏆",
      details: [
        "If you win: Rewards are automatically sent to your wallet",
        "If you lose: Approve the transfer from your Phantom wallet to the winner",
        "Check your updated wallet balance",
        "Review your battle history and statistics"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">How to Play</h2>
          <p className="text-xl text-gray-400">
            Follow these simple steps to start your DeepDungeonDuel adventure
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tutorialSteps.map((step, index) => (
            <div 
              key={index}
              className="relative p-6 bg-gray-800 rounded-lg border border-purple-500/30 hover:border-purple-500/50 transition-all"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 flex items-center justify-center text-2xl bg-purple-600 rounded-full">
                {step.icon}
              </div>
              <div className="mt-4">
                <h3 className="mb-3 text-xl font-bold text-white">
                  {index + 1}. {step.title}
                </h3>
                <p className="mb-4 text-gray-400">
                  {step.description}
                </p>
                {step.details && (
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-300">
                        <span className="mr-2 text-purple-400">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-16 p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
          <h3 className="mb-4 text-xl font-bold text-white">Pro Tips</h3>
          <ul className="space-y-3">
            <li className="flex items-start text-gray-300">
              <span className="mr-2 text-yellow-400">💡</span>
              Always check the leaderboard before choosing your agent to understand their performance
            </li>
            <li className="flex items-start text-gray-300">
              <span className="mr-2 text-yellow-400">💡</span>
              Start with smaller bets while learning the game mechanics
            </li>
            <li className="flex items-start text-gray-300">
              <span className="mr-2 text-yellow-400">💡</span>
              Keep your Phantom wallet funded to ensure smooth gameplay
            </li>
            <li className="flex items-start text-gray-300">
              <span className="mr-2 text-yellow-400">💡</span>
              Review your battle history to improve your strategy
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Tutorial; 