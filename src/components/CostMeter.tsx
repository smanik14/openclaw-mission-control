import type { Agent } from '../types';

interface CostMeterProps {
  agent: Agent;
}

export function CostMeter({ agent }: CostMeterProps) {
  const costPercentage = Math.min((agent.costData?.estimatedCost || 0) / 50 * 100, 100);
  return (
    <div className="w-full h-2 bg-gray-400 rounded-full shadow-inner">
      <div 
        className="h-full bg-green-500"
        style={{ width: `${costPercentage}%` }}
      />
    </div>
  );
}