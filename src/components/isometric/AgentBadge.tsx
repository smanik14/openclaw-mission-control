import type { Agent } from '../../types';

interface AgentBadgeProps {
  agent: Agent;
}

export function AgentBadge({ agent }: AgentBadgeProps) {
  // Determine status color
  const statusColor = agent.status === 'idle'
    ? '#94A3B8'
    : agent.status === 'busy'
    ? '#F59E0B'
    : agent.status === 'running'
    ? '#3B82F6'
    : '#EF4444';

  // Calculate agent cost percentage
  const costProgress = Math.min((agent.costData?.estimatedCost || 0) / 50 * 100, 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {/* Circular avatar */}
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{
            background: 'linear-gradient(135deg, #E8F0FE 0%, #A0C3FF 100%)',
            border: `3px solid ${statusColor}`,
          }}
        >
          {agent.avatar}
        </div>
        {/* Status ring */}
        <div
          className="absolute inset-0 rounded-full border-2"
          style={{
            boxShadow: `0 0 10px ${statusColor}`,
            borderColor: statusColor,
            boxSizing: 'border-box',
            animation: agent.status === 'running' ? 'pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1)' : 'none',
          }}
        />
      </div>
      {/* Cost meter */}
      <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-green-400" style={{ width: `${costProgress}%` }}></div>
      </div>
    </div>
  );
}

// Keyframes for the pulse animation
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}