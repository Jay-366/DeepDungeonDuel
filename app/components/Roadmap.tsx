import React from 'react';

const RoadmapItem = ({ title, description, quarter }: { title: string, description: string, quarter: string }) => (
  <div className="relative flex flex-col items-center">
    <div className="absolute top-0 left-1/2 -ml-[1px] h-full w-[2px] bg-purple-900"></div>
    <div className="relative z-10 flex items-center justify-center w-12 h-12 mb-4 text-white bg-purple-700 rounded-full">
      {quarter}
    </div>
    <div className="relative z-10 p-6 mb-10 bg-gray-800 rounded-lg w-full md:w-80">
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

const Roadmap = () => {
  const roadmapItems = [
    {
      quarter: "Q3",
      title: "Game Launch",
      description: "Initial release with core gameplay features, hero collection, and basic dungeon exploration.",
    },
    {
      quarter: "Q4",
      title: "Multiplayer Battles",
      description: "Introducing PvP battles, tournaments, and leaderboards with seasonal rewards.",
    },
    {
      quarter: "Q1",
      title: "Guilds & Alliances",
      description: "Form guilds with other players, participate in guild wars, and unlock exclusive rewards.",
    },
    {
      quarter: "Q2",
      title: "Marketplace & Trading",
      description: "Fully decentralized marketplace for trading heroes, items, and other game assets.",
    },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Game Roadmap</h2>
          <p className="text-xl text-gray-400">
            Our development plans for DeepDungeonDuel in the coming months
          </p>
        </div>
        
        <div className="flex flex-col items-center max-w-3xl mx-auto">
          {roadmapItems.map((item, index) => (
            <RoadmapItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap; 