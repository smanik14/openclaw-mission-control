import { FurnitureSprite } from './FurnitureSprite';
import { AgentLayer } from './AgentLayer';
import { officeFurniture, mockAgents, agentPositions } from '../../mockData';

// Calculate isometric transform for the room
const isometricTransform = {
  transform: 'scale(0.8) translate(100px, 100px) rotateX(54.7deg) rotateZ(45deg)',
};

export function IsometricRoom() {
  return (
    <div
      className="relative"
      style={{
        width: '100%',
        height: '600px',
        overflow: 'hidden',
        perspective: '800px',
      }}
    >
      <div style={isometricTransform}>
        {/* Render Furniture */}
        {officeFurniture.map(item => (
          <FurnitureSprite key={item.id} item={item} />
        ))}

        {/* Render Agents */}
        <AgentLayer agents={mockAgents} positions={agentPositions} />
      </div>
    </div>
  );
}