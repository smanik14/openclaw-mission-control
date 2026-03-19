import type { TeamCostSummary } from '../types';

interface CostPanelProps {
  costSummary: TeamCostSummary;
}

export function CostPanel({ costSummary }: CostPanelProps) {
  return (
    <div className="p-6 rounded-lg bg-gray-800 text-white shadow-md">
      <h2 className="text-lg font-bold mb-4">Cost Summary</h2>
      <div className="space-y-2">
        <div>Total Cost: ${costSummary.totalCost.toFixed(2)}</div>
        <div>Total Tokens In: {costSummary.totalTokensIn}</div>
        <div>Total Tokens Out: {costSummary.totalTokensOut}</div>
        <div>Daily Average Cost: ${costSummary.dailyAverage.toFixed(2)}</div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Model Breakdown</h3>
        <ul className="list-disc list-inside">
          {Object.entries(costSummary.modelBreakdown).map(([model, cost]) => (
            <li key={model}>{model}: ${cost.toFixed(2)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}