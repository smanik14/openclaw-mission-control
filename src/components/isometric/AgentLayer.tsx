import { AgentBadge } from './AgentBadge';
import { SpeechBubble } from './SpeechBubble';
import type { Agent, AgentPosition } from '../../types';

interface AgentLayerProps {
  agents: Agent[];
  positions: AgentPosition[];
}

function getPositionStyle(position: AgentPosition) {
  const { x, y, z } = position;
  return {
    position: 'absolute',
    left: x,
    top: y,
    zIndex: Math.floor(y + z),
    transform: 'translate(-50%, -100%)'
  };
}

export function AgentLayer({ agents, positions }: AgentLayerProps) {
  return (
    <>
      {agents.map(agent => {
        const position = positions.find(pos => pos.agentId === agent.id);
        if (!position) return null;

        return (
          <div key={agent.id} style={getPositionStyle(position)}>
            <AgentBadge agent={agent} />
            <SpeechBubble agent={agent} />
          </div>
        );
      })}
    </>
  );
}