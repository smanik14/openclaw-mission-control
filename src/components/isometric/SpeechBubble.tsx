import type { Agent } from '../../types';

interface SpeechBubbleProps {
  agent: Agent;
}

export function SpeechBubble({ agent }: SpeechBubbleProps) {
  return (
    <div className="relative p-2 rounded-lg bg-blue-600 text-white shadow-md"
         style={{ maxWidth: '200px', transform: 'translate(-50%, -100%)' }}>
      <p className="text-sm">
        {agent.lastTaskSummary || 'No current task'}
      </p>
      <div className="absolute bottom-0 left-1/2 transform translate-x-1/2 translate-y-full">
        <svg width="24" height="12" viewBox="0 0 24 12">
          <path fill="#2563EB" d="M12 0 L0 12 L24 12 Z" />
        </svg>
      </div>
    </div>
  );
}