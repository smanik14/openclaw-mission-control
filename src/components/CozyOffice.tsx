import { useState, useEffect } from 'react';
import { mockAgents, teamCostSummary, modelPricing } from '../mockData';
import { DollarSign, X, Monitor, BookOpen, Zap, Eye, Bug } from 'lucide-react';
import type { Agent } from '../types';

// Status colors
const statusConfig = {
  idle: { color: '#64748B', glow: '0 0 20px #64748B' },
  busy: { color: '#F59E0B', glow: '0 0 20px #F59E0B' },
  running: { color: '#3B82F6', glow: '0 0 20px #3B82F6' },
  failed: { color: '#EF4444', glow: '0 0 20px #EF4444' },
};

// Agent colors
const agentColors: Record<string, string> = {
  'Documentation': '#8B5CF6',
  'Main Orchestrator': '#3B82F6',
  'Security Scanner': '#EF4444',
  'Code Reviewer': '#10B981',
  'Debugger': '#F59E0B',
};

// 3D Roblox-style character with movement
function Character3D({ 
  color, 
  status, 
  isMoving,
  direction = 1,
}: { 
  color: string; 
  status: string;
  isMoving: boolean;
  direction: number;
}) {
  const statusColor = statusConfig[status as keyof typeof statusConfig]?.color || '#64748B';
  const glow = statusConfig[status as keyof typeof statusConfig]?.glow || 'none';
  
  return (
    <div 
      className="relative transition-transform duration-500"
      style={{
        transform: `perspective(500px) rotateY(${direction * 15}deg) ${isMoving ? 'translateY(-5px)' : ''}`,
        animation: isMoving ? 'walk 0.5s ease-in-out infinite alternate' : 'idle 2s ease-in-out infinite',
      }}
    >
      {/* Head */}
      <div 
        className="w-10 h-10 mx-auto mb-1 relative"
        style={{ 
          backgroundColor: statusColor,
          boxShadow: glow,
          borderRadius: '8px',
          transform: 'translateZ(10px)',
        }}
      >
        {/* Face */}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full" />
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      </div>
      
      {/* Body */}
      <div 
        className="w-9 h-11 mx-auto relative"
        style={{ 
          backgroundColor: color,
          borderRadius: '6px',
          transform: 'translateZ(5px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        }}
      />
      
      {/* Arms */}
      <div className="absolute top-12 left-0 right-0 flex justify-between px-0.5">
        <div 
          className="w-3 h-9"
          style={{ 
            backgroundColor: color,
            borderRadius: '4px',
            transform: `rotateZ(${isMoving ? '20deg' : '0deg'})`,
            transition: 'transform 0.3s',
          }}
        />
        <div 
          className="w-3 h-9"
          style={{ 
            backgroundColor: color,
            borderRadius: '4px',
            transform: `rotateZ(${isMoving ? '-20deg' : '0deg'})`,
            transition: 'transform 0.3s',
          }}
        />
      </div>
      
      {/* Legs */}
      <div className="flex justify-center gap-1 mt-0.5">
        <div 
          className="w-3.5 h-10"
          style={{ 
            backgroundColor: '#1E293B',
            borderRadius: '4px',
            transform: isMoving ? 'rotateZ(-10deg)' : 'none',
            transition: 'transform 0.3s',
          }}
        />
        <div 
          className="w-3.5 h-10"
          style={{ 
            backgroundColor: '#1E293B',
            borderRadius: '4px',
            transform: isMoving ? 'rotateZ(10deg)' : 'none',
            transition: 'transform 0.3s',
          }}
        />
      </div>
      
      {/* Shadow */}
      <div 
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/20 rounded-full"
        style={{ filter: 'blur(4px)' }}
      />
    </div>
  );
}

// Cost bar
function CostBar({ cost, max = 25 }: { cost: number; max?: number }) {
  const pct = Math.min((cost / max) * 100, 100);
  return (
    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mt-1">
      <div 
        className="h-full rounded-full transition-all duration-500"
        style={{ 
          width: `${pct}%`,
          background: `linear-gradient(90deg, #22C55E 0%, #EAB308 50%, #EF4444 100%)`
        }}
      />
    </div>
  );
}

// Agent card with 3D positioning
function AgentCard({ 
  agent, 
  deskIcon: DeskIcon,
  deskName,
  position,
  onClick,
}: { 
  agent: Agent;
  deskIcon: React.ElementType;
  deskName: string;
  position: { x: number; y: number };
  onClick: () => void;
}) {
  const cost = agent.costData?.estimatedCost || 0;
  const characterColor = agentColors[agent.name] || '#3B82F6';
  const isMoving = agent.status === 'running' || agent.status === 'busy';
  
  return (
    <div 
      className="absolute flex flex-col items-center gap-2"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Character */}
      <button 
        onClick={onClick}
        className="group relative p-2"
      >
        {/* Hover tooltip */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none w-48">
          <div className="bg-slate-800 text-white text-xs p-3 rounded-xl shadow-2xl border border-white/10">
            <p className="font-bold mb-1">{agent.name}</p>
            <p className="text-white/70 line-clamp-2">{agent.lastTaskSummary}</p>
          </div>
        </div>
        
        <Character3D 
          color={characterColor}
          status={agent.status}
          isMoving={isMoving}
          direction={position.x > 50 ? -1 : 1}
        />
      </button>
      
      {/* Name */}
      <div className="text-center bg-slate-800/80 backdrop-blur-sm rounded-lg px-2 py-1">
        <p className="text-white text-xs font-medium">{agent.name}</p>
        <p className="text-white/50 text-[10px]">{agent.status}</p>
      </div>
      
      {/* Cost */}
      <div className="w-20 bg-slate-800/80 rounded-lg px-2 py-1">
        <div className="flex justify-between text-[10px]">
          <span className="text-white/60">${cost.toFixed(2)}</span>
        </div>
        <CostBar cost={cost} />
      </div>
      
      {/* Desk */}
      <div className="mt-1 flex flex-col items-center">
        <div 
          className="w-16 h-10 flex items-center justify-center shadow-lg"
          style={{
            background: 'linear-gradient(180deg, #A67B2D 0%, #8B6914 100%)',
            borderRadius: '6px',
            borderTop: '2px solid #C49A3B',
            transform: 'perspective(100px) rotateX(10deg)',
          }}
        >
          <DeskIcon className="w-4 h-4 text-amber-950/50" />
        </div>
        <p className="text-amber-950/70 text-[10px] mt-1 font-medium">{deskName}</p>
      </div>
    </div>
  );
}

// Agent detail modal
function AgentModal({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  const cost = agent.costData;
  const model = modelPricing.find(m => m.modelId === agent.currentModel);
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">{agent.name}</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/60 mb-1">Current Task</p>
            <p className="text-white">{agent.lastTaskSummary}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-white/60">Model</p>
              <p className="text-white font-medium">{model?.name || agent.currentModel}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-white/60">Uptime</p>
              <p className="text-white font-medium">{agent.uptime}</p>
            </div>
          </div>
          
          {cost && (
            <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-green-400" />
                <h4 className="font-semibold text-white">Cost</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Today</span>
                  <span className="text-green-400 font-bold">${cost.estimatedCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Tokens In</span>
                  <span className="text-white">{(cost.tokensIn / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Tokens Out</span>
                  <span className="text-white">{(cost.tokensOut / 1000).toFixed(1)}K</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Team cost panel
function CostPanel() {
  const summary = teamCostSummary;
  
  return (
    <div className="bg-slate-800/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl w-56">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
          <DollarSign className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">Team Costs</h3>
          <p className="text-xs text-white/60">Today</p>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-white/60 text-xs">Total</span>
          <span className="text-xl font-bold text-green-400">${summary.totalCost.toFixed(2)}</span>
        </div>
        <CostBar cost={summary.totalCost} max={50} />
      </div>
      
      <div className="space-y-1 text-xs">
        {Object.entries(summary.modelBreakdown).map(([model, cost]) => (
          <div key={model} className="flex justify-between">
            <span className="text-white/60">{model}</span>
            <span className="text-white">${cost.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3D Room with CSS transforms
function Room3D({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="relative w-full h-[600px] rounded-3xl overflow-hidden"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Floor */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #D4A574 0%, #A67B2D 100%)',
          transform: 'rotateX(60deg) translateZ(-100px)',
          transformOrigin: 'center bottom',
        }}
      />
      
      {/* Back wall */}
      <div 
        className="absolute top-0 left-0 right-0 h-1/2"
        style={{
          background: 'linear-gradient(180deg, #F5E6D3 0%, #E8D4C0 100%)',
          transform: 'translateZ(-200px)',
        }}
      />
      
      {/* Content layer */}
      <div 
        className="absolute inset-0"
        style={{
          transform: 'rotateX(20deg) translateZ(50px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
      
      {/* CSS animations */}
      <style>{`
        @keyframes idle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes walk {
          0% { transform: translateY(0) rotateZ(-2deg); }
          100% { transform: translateY(-8px) rotateZ(2deg); }
        }
      `}</style>
    </div>
  );
}

export function CozyOffice() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  const agents = {
    docs: mockAgents.find(a => a.name === 'Documentation'),
    main: mockAgents.find(a => a.name === 'Main Orchestrator'),
    security: mockAgents.find(a => a.name === 'Security Scanner'),
    reviewer: mockAgents.find(a => a.name === 'Code Reviewer'),
    debugger: mockAgents.find(a => a.name === 'Debugger'),
  };

  // 3D positions for agents
  const positions = {
    docs: { x: 20, y: 35 },
    main: { x: 50, y: 30 },
    security: { x: 80, y: 35 },
    reviewer: { x: 30, y: 70 },
    debugger: { x: 70, y: 70 },
  };

  return (
    <div className="relative min-h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#F5E6D3] to-[#D4A574]">
      {/* 3D Scene */}
      <div className="relative w-full h-full p-8" style={{ perspective: '800px' }}>
        <div style={{ transform: 'rotateX(10deg)', transformStyle: 'preserve-3d' }}>
          
          {/* Agents */}
          {agents.docs && (
            <AgentCard
              agent={agents.docs}
              deskIcon={BookOpen}
              deskName="Design Studio"
              position={positions.docs}
              onClick={() => setSelectedAgent(agents.docs!)}
            />
          )}
          
          {agents.main && (
            <AgentCard
              agent={agents.main}
              deskIcon={Monitor}
              deskName="Command Desk"
              position={positions.main}
              onClick={() => setSelectedAgent(agents.main!)}
            />
          )}
          
          {agents.security && (
            <AgentCard
              agent={agents.security}
              deskIcon={Zap}
              deskName="Code Forge"
              position={positions.security}
              onClick={() => setSelectedAgent(agents.security!)}
            />
          )}
          
          {agents.reviewer && (
            <AgentCard
              agent={agents.reviewer}
              deskIcon={Eye}
              deskName="Review Corner"
              position={positions.reviewer}
              onClick={() => setSelectedAgent(agents.reviewer!)}
            />
          )}
          
          {agents.debugger && (
            <AgentCard
              agent={agents.debugger}
              deskIcon={Bug}
              deskName="Debug Lab"
              position={positions.debugger}
              onClick={() => setSelectedAgent(agents.debugger!)}
            />
          )}
          
          {/* Decor */}
          <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="bg-white/80 rounded-xl p-3 shadow-lg">
              <p className="text-slate-600 text-xs font-medium">📋 Team Board</p>
            </div>
          </div>
          
          <div className="absolute text-3xl" style={{ left: '10%', top: '50%' }}>🪴</div>
          <div className="absolute text-2xl" style={{ left: '90%', top: '50%' }}>🌿</div>
          
          {/* Coffee corner */}
          <div className="absolute flex flex-col items-center" style={{ left: '5%', top: '85%' }}>
            <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center text-lg shadow-lg">
              ☕
            </div>
            <span className="text-xs text-slate-700 mt-1">Coffee</span>
          </div>
          
        </div>
      </div>
      
      {/* Cost panel - fixed position */}
      <div className="absolute top-4 right-4 z-20">
        <CostPanel />
      </div>
      
      {/* Modal */}
      {selectedAgent && (
        <AgentModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}
    </div>
  );
}
