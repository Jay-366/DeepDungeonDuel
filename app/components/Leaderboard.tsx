import React from 'react';

interface Agent {
  id: number;
  name: string;
  rank: number;
  winRate: number;
  totalBattles: number;
  wins: number;
}

const mockData: Agent[] = [
  { id: 1, name: "Agent Alpha", rank: 1, winRate: 85.5, totalBattles: 100, wins: 85 },
  { id: 2, name: "Agent Beta", rank: 2, winRate: 78.2, totalBattles: 90, wins: 70 },
  { id: 3, name: "Agent Gamma", rank: 3, winRate: 72.8, totalBattles: 80, wins: 58 },
  { id: 4, name: "Agent Delta", rank: 4, winRate: 68.5, totalBattles: 70, wins: 48 },
  { id: 5, name: "Agent Epsilon", rank: 5, winRate: 65.2, totalBattles: 60, wins: 39 },
  { id: 6, name: "Agent Zeta", rank: 6, winRate: 62.8, totalBattles: 55, wins: 34 },
  { id: 7, name: "Agent Eta", rank: 7, winRate: 60.5, totalBattles: 50, wins: 30 },
  { id: 8, name: "Agent Theta", rank: 8, winRate: 58.2, totalBattles: 45, wins: 26 },
  { id: 9, name: "Agent Iota", rank: 9, winRate: 55.8, totalBattles: 40, wins: 22 },
  { id: 10, name: "Agent Kappa", rank: 10, winRate: 52.4, totalBattles: 35, wins: 18 },
];

const Leaderboard: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-600">Agent Leaderboard</h2>
      
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-purple-500/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-purple-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                  Agent Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                  Win Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                  Total Battles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                  Wins
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/20">
              {mockData.map((agent) => (
                <tr key={agent.id} className="hover:bg-purple-900/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-lg font-semibold ${
                        agent.rank === 1 ? 'text-yellow-400' :
                        agent.rank === 2 ? 'text-gray-300' :
                        agent.rank === 3 ? 'text-amber-500' :
                        'text-gray-200'
                      }`}>
                        #{agent.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-200">{agent.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-200">
                      <span className="font-semibold">{agent.winRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-200">{agent.totalBattles}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-200">{agent.wins}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 