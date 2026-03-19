import React, { useState } from 'react';
import type { Agent, AgentCost } from '../types';
import { modelPricing } from '../mockData';

interface AgentWorkstationProps {
  agent: Agent;
  position: { x: number; y: number };
  deskRotation?: number;
  onClick?: () => void;
}

const statusColors: Record<string, string> = {
  idle: '#10B981',
  busy: '#F59E0B',
  running: '#3B82F6',
  failed: '#EF4444',
};

const statusGlow: Record<string, string> = {
  idle: 'rgba(16, 185, 129, 0.4)',
  busy: 'rgba(245, 158, 11, 0.4)',
  running: 'rgba(59, 130, 246, 0.4)',
  failed: 'rgba(239, 68, 68, 0.4)',
};

export const AgentWorkstation: React.FC<AgentWorkstationProps> = ({
  agent,
  position,
  deskRotation = 0,
  onClick,
}) => {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cost = agent.costData;
  const modelColor = modelPricing.find(m => m.modelId === agent.currentModel)?.color || '#6B7280';

  // Calculate cost percentage for meter (max $50 for 100%)
  const costPercent = cost ? Math.min((cost.estimatedCost / 50) * 100, 100) : 0;

  return (
    <div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        transform: `rotate(${deskRotation}deg)`,
      }}
    >
      {/* Desk Shadow */}
      <div
        className="absolute rounded-lg"
        style={{
          width: 100,
          height: 60,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%)',
          transform: 'translate(8px, 8px)',
          filter: 'blur(4px)',
        }}
      />

      {/* Desk */}
      <div
        className="absolute rounded-lg border-2"
        style={{
          width: 100,
          height: 60,
          background: 'linear-gradient(135deg, #A67B2D 0%, #8B6914 100%)',
          borderColor: '#6B4E0A',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.2)',
        }}
      >
        {/* Desk surface detail */}
        <div
          className="absolute rounded"
          style={{
            width: 80,
            height: 40,
            left: 8,
            top: 8,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Monitor */}
      <div
        className="absolute"
        style={{
          width: 40,
          height: 30,
          left: 30,
          top: -25,
        }}
      >
        {/* Monitor stand */}
        <div
          className="absolute"
          style={{
            width: 8,
            height: 12,
            left: 16,
            top: 20,
            background: '#4B5563',
            borderRadius: '2px',
          }}
        />
        {/* Monitor base */}
        <div
          className="absolute"
          style={{
            width: 20,
            height: 4,
            left: 10,
            top: 30,
            background: '#374151',
            borderRadius: '2px',
          }}
        />
        {/* Monitor screen */}
        <div
          className="absolute rounded-md border-2"
          style={{
            width: 40,
            height: 28,
            background: '#1F2937',
            borderColor: '#374151',
            boxShadow: `0 0 12px ${statusGlow[agent.status]}`,
            overflow: 'hidden',
          }}
        >
          {/* Screen content - status indicator */}
          <div
            className="absolute"
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(180deg, ${statusGlow[agent.status]} 0%, transparent 60%)`,
            }}
          />
          {/* Code lines on screen */}
          <div className="absolute top-1 left-1 right-1 space-y-1">
            <div className="h-1 bg-gray-600 rounded" style={{ width: '80%' }} />
            <div className="h-1 bg-gray-600 rounded" style={{ width: '60%' }} />
            <div className="h-1 bg-gray-600 rounded" style={{ width: '70%' }} />
          </div>
        </div>
      </div>

      {/* Agent Badge */}
      <div
        className="absolute cursor-pointer transition-transform duration-200"
        style={{
          left: 35,
          top: -70,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          zIndex: 10,
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          setShowSpeechBubble(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowSpeechBubble(false);
        }}
        onClick={onClick}
      >
        {/* Avatar shadow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 44,
            height: 44,
            left: 2,
            top: 4,
            background: 'rgba(0,0,0,0.3)',
            filter: 'blur(4px)',
          }}
        />

        {/* Status ring background */}
        <div
          className="absolute rounded-full"
          style={{
            width: 48,
            height: 48,
            background: statusColors[agent.status],
            padding: 3,
          }}
        >
          {/* Avatar circle */}
          <div
            className="w-full h-full rounded-full flex items-center justify-center text-2xl"
            style={{
              background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
              border: '2px solid #fff',
            }}
          >
            {agent.avatar}
          </div>
        </div>

        {/* Status dot */}
        <div
          className="absolute rounded-full border-2 border-white"
          style={{
            width: 14,
            height: 14,
            right: -2,
            bottom: -2,
            background: statusColors[agent.status],
            boxShadow: `0 0 8px ${statusColors[agent.status]}`,
          }}
        />

        {/* Model indicator */}
        <div
          className="absolute rounded-full border border-white"
          style={{
            width: 16,
            height: 16,
            left: -4,
            top: -4,
            background: modelColor,
          }}
        />
      </div>

      {/* Speech Bubble */}
      {showSpeechBubble && (
        <div
          className="absolute z-20 animate-fade-in"
          style={{
            left: 60,
            top: -100,
            minWidth: 180,
            maxWidth: 240,
          }}
        >
          <div
            className="rounded-xl p-3 shadow-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            {/* Speech bubble tail */}
            <div
              className="absolute"
              style={{
                width: 0,
                height: 0,
                left: -8,
                bottom: 20,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderRight: '8px solid rgba(255, 255, 255, 0.95)',
              }}
            />

            {/* Agent name */}
            <div className="font-semibold text-gray-800 text-sm mb-1">
              {agent.name}
            </div>

            {/* Status badge */}
            <div
              className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2"
              style={{
                background: statusGlow[agent.status],
                color: statusColors[agent.status],
              }}
            >
              {agent.status.toUpperCase()}
            </div>

            {/* Task summary */}
            <div className="text-xs text-gray-600 mb-2 line-clamp-2">
              {agent.lastTaskSummary}
            </div>

            {/* Cost meter */}
            {cost && (
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-gray-500">Cost</span>
                  <span className="font-semibold text-gray-700">
                    ${cost.estimatedCost.toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${costPercent}%`,
                      background: `linear-gradient(90deg, ${modelColor} 0%, ${statusColors[agent.status]} 100%)`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{(cost.tokensIn / 1000).toFixed(0)}k in</span>
                  <span>{(cost.tokensOut / 1000).toFixed(0)}k out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
