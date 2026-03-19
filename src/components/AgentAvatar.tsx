import type { Agent } from '../types';

interface AgentAvatarProps {
  agent: Agent;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const statusColors = {
  idle: '#94A3B8',
  busy: '#F59E0B',
  running: '#3B82F6',
  failed: '#EF4444',
};

export function AgentAvatar({ agent, size = 'md', onClick }: AgentAvatarProps) {
  const color = statusColors[agent.status];
  
  const sizeClasses = {
    sm: { container: 'w-12 h-16', head: 'w-6 h-6', body: 'w-8 h-8' },
    md: { container: 'w-16 h-22', head: 'w-8 h-8', body: 'w-11 h-11' },
    lg: { container: 'w-20 h-28', head: 'w-10 h-10', body: 'w-14 h-14' },
  };
  
  const s = sizeClasses[size];

  return (
    <div 
      className={`${s.container} relative cursor-pointer transition-transform hover:scale-110`}
      onClick={onClick}
    >
      {/* Error icon for failed status */}
      {agent.status === 'failed' && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#EF4444" />
            <path d="M5 5L11 11M11 5L5 11" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )}
      
      {/* Agent Head */}
      <div 
        className={`${s.head} rounded-full absolute top-0 left-1/2 -translate-x-1/2 z-10`}
        style={{ 
          backgroundColor: color,
          boxShadow: `0 0 15px ${color}60`,
          animation: agent.status === 'idle' ? 'breathe 3s ease-in-out infinite' : 
                     agent.status === 'failed' ? 'alertPulse 1s ease-in-out infinite' : 'none'
        }}
      />
      
      {/* Agent Body */}
      <div 
        className={`${s.body} rounded-2xl absolute bottom-0 left-1/2 -translate-x-1/2`}
        style={{ 
          backgroundColor: color,
          opacity: 0.85,
          boxShadow: `0 0 20px ${color}40`,
          animation: agent.status === 'idle' ? 'breathe 3s ease-in-out infinite 0.5s' : 
                     agent.status === 'failed' ? 'alertPulse 1s ease-in-out infinite' : 'none'
        }}
      />
      
      {/* Typing hands for busy/running */}
      {(agent.status === 'busy' || agent.status === 'running') && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          <div 
            className="w-2 h-2 rounded-full bg-white/80"
            style={{ animation: 'typing 0.5s ease-in-out infinite' }}
          />
          <div 
            className="w-2 h-2 rounded-full bg-white/80"
            style={{ animation: 'typing 0.5s ease-in-out infinite 0.1s' }}
          />
        </div>
      )}
      
      {/* Screen glow for running status */}
      {agent.status === 'running' && (
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ 
            background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
            animation: 'screenGlow 1.5s ease-in-out infinite alternate',
            transform: 'scale(2)'
          }}
        />
      )}
    </div>
  );
}
