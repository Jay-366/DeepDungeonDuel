import React from 'react';
import Image from 'next/image';

const FeatureCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="flex flex-col items-center p-6 transition-all bg-gray-800/70 rounded-xl hover:bg-gray-800">
    <div className="flex items-center justify-center w-16 h-16 mb-4 bg-purple-600 rounded-full">
      <Image src={icon} alt={title} width={32} height={32} className="text-white" />
    </div>
    <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
    <p className="text-center text-gray-400">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: "/Phantom-Icon_Transparent_Purple.png",
      title: "Phantom Wallet Integration",
      description: "Seamlessly connect your Phantom wallet to start playing. Your account is auto-generated and securely linked to your wallet.",
    },
    {
      icon: "/assets/agent.svg",
      title: "Agent Selection & Stats",
      description: "Choose from a variety of unique agents, each with their own stats and abilities. Check the leaderboard to see which agents are strongest.",
    },
    {
      icon: "/assets/game-mode.svg",
      title: "Multiple Game Modes",
      description: "Pick your preferred battle format. Each mode offers unique rules, challenges, and rewards.",
    },
    {
      icon: "/assets/ai.svg",
      title: "AI Matchmaking",
      description: "Get matched with a challenging AI agent for a fair and exciting battle experience.",
    },
    {
      icon: "/assets/bet.svg",
      title: "Betting System",
      description: "Predict the winner and place your bet before each battle. Winners receive rewards, while losers pay their bet from their Phantom wallet.",
    },
    {
      icon: "/assets/leaderboard.svg",
      title: "Leaderboard",
      description: "Track the top agents and players. Use the leaderboard to inform your agent selection and betting strategy.",
    },
    {
      icon: "/assets/battle.svg",
      title: "Strategic Battles",
      description: "Engage in turn-based combat. Use your agent's abilities and tactics to outsmart your opponent and claim victory.",
    },
    {
      icon: "/assets/reward.svg",
      title: "Reward System",
      description: "Winners automatically receive rewards. All transactions are handled securely through the Phantom wallet.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Game Features</h2>
          <p className="text-xl text-gray-400">
            Discover the innovative features that power DeepDungeonDuel's unique gameplay flow
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 