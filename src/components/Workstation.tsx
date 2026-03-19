import type { Agent } from '../types';
import { AgentAvatar } from './AgentAvatar';

interface WorkstationProps {
  agent: Agent;
  position: 'center' | 'left' | 'right' | 'back-left' | 'back-right';
  onClick?: () => void;
}

const positionClasses = {
  'center': 'col-start-2 row-start-2',
  'left': 'col-start-1 row-start-2',
  'right': 'col-start-3 row-start-2',
  'back-left': 'col-start-1 row-start-1',
  'back-right': 'col-start-3 row-start-1',
};

const positionLabels = {
  'center': 'Command Desk',
  'left': 'Design Station',
  'right': 'Coding Desk',
  'back-left': 'Review Station',
  'back-right': 'Debug Terminal',
};

const statusGlowColors = {
  idle: 'shadow-[0_0_20px_rgba(148,163,184,0.3)]',
  busy: 'shadow-[0_0_30px_rgba(245,158,11,0.4)]',
  running: 'shadow-[0_0_40px_rgba(59,130,246,0.5)]',
  failed: 'shadow-[0_0_30px_rgba(239,68,68,0.5)]',
};

const statusMonitorColors = {
  idle: 'from-slate-600 to-slate-700',
  busy: 'from-amber-600 to-amber-700',
  running: 'from-blue-600 to-blue-700',
  failed: 'from-red-600 to-red-700',
};

export function Workstation({ agent, position, onClick }: WorkstationProps) {
  const isCenter = position === 'center';
  
  return (
    <div 
      className={`${positionClasses[position]} flex flex-col items-center justify-end pb-4 relative`}
    >
      {/* Workstation Label */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-xs text-white/60 font-medium tracking-wide uppercase">
          {positionLabels[position]}
        </span>
      </div>
      
      {/* Desk Surface */}
      <div 
        className={`
          relative rounded-2xl p-4
          bg-gradient-to-b from-white/10 to-white/5
          backdrop-blur-xl
          border-2 border-white/20
          ${statusGlowColors[agent.status]}
          transition-all duration-500
          ${isCenter ? 'scale-110' : 'scale-100'}
        `}
        style={{
          boxShadow: '0 8px 32px rgba(74,144,217,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}
        onClick={onClick}
      >
        {/* Reflective shine */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 40%)'
          }}
        />
        
        {/* Monitor */}
        <div className="relative mb-3">
          {/* Monitor Stand */}
          <div className="w-4 h-3 bg-gradient-to-b from-slate-400 to-slate-600 mx-auto rounded-sm" />
          
          {/* Monitor Screen */}
          <div 
            className={`
              w-20 h-14 rounded-lg p-2
              bg-gradient-to-br ${statusMonitorColors[agent.status]}
              border border-white/20
              flex flex-col items-center justify-center
              relative overflow-hidden
              ${agent.status === 'running' ? 'animate-pulse' : ''}
            `}
            style={{
              boxShadow: `0 0 20px ${statusGlowColors[agent.status].replace('shadow-[0_0_', '').replace('px_rgba', '').replace(')]', '')}40`
            }}
          >
            {/* Screen content */}
            <span className="text-[8px] text-white/90 font-bold text-center leading-tight truncate w-full">
              {agent.name.split(' ')[0]}
            </span>
            <span className="text-[6px] text-white/60 mt-0.5">
              {agent.status.toUpperCase()}
            </span>
            
            {/* Screen reflection */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)'
              }}
            />
          </div>
        </div>
        
        {/* Agent Avatar */}
        <div className="flex justify-center">
          <AgentAvatar agent={agent} size={isCenter ? 'lg' : 'md'} />
        </div>
        
        {/* Desk items */}
        <div className="absolute bottom-2 right-2 flex gap-1">
          {/* Coffee cup or small desk item */}
          <div className="w-3 h-3 rounded-full bg-white/20" />
        </div>
      </div>
      
      {/* Floor shadow */}
      <div 
        className="w-24 h-4 rounded-full mt-2 opacity-30"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)'
        }}
      />
    </div>
  );
}
