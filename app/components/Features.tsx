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
      icon: "/assets/sword.svg",
      title: "Epic Battles",
      description: "Battle monsters and other players in thrilling turn-based combat with strategic depth.",
    },
    {
      icon: "/assets/shield.svg",
      title: "Collect Heroes",
      description: "Discover and collect unique heroes with different abilities and rarities as NFTs.",
    },
    {
      icon: "/assets/potion.svg",
      title: "Item Crafting",
      description: "Craft powerful items and equipment to strengthen your heroes for tougher challenges.",
    },
    {
      icon: "/assets/chest.svg",
      title: "Earn Rewards",
      description: "Complete quests and dungeons to earn valuable tokens and rare treasure chests.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Game Features</h2>
          <p className="text-xl text-gray-400">
            Discover what makes DeepDungeonDuel a unique gaming experience
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