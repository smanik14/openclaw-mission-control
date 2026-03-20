import { useState, useEffect } from 'react';
import { mockAgents, teamCostSummary, modelPricing } from '../mockData';
import { DollarSign, X } from 'lucide-react';
import type { Agent } from '../types';

// Status colors for pixel characters
const statusColors = {
  idle: '#64748B',
  busy: '#F59E0B',
  running: '#3B82F6',
  failed: '#EF4444',
};

// Agent colors for body
const agentColors: Record<string, string> = {
  'Documentation': '#8B5CF6',
  'Main Orchestrator': '#3B82F6',
  'Security Scanner': '#EF4444',
  'Code Reviewer': '#10B981',
  'Debugger': '#F59E0B',
};

// Pixel character component (8-bit style)
function PixelCharacter({ 
  color, 
  status,
  name,
  isMoving,
}: { 
  color: string; 
  status: string;
  name: string;
  isMoving: boolean;
}) {
  const headColor = statusColors[status as keyof typeof statusColors] || '#64748B';
  
  return (
    <div className="relative flex flex-col items-center">
      {/* Name label */}
      <div className="absolute -top-6 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
        {name}
      </div>
      
      {/* Pixel character - 4x scale for visibility */}
      <div 
        className={`relative ${isMoving ? 'animate-bounce' : ''}`}
        style={{ 
          width: '32px', 
          height: '40px',
          imageRendering: 'pixelated',
        }}
      >
        {/* Head - 12x12 */}
        <div 
          className="absolute top-0 left-[10px] w-3 h-3"
          style={{ 
            backgroundColor: headColor,
            boxShadow: `
              0 0 0 1px ${headColor},
              1px 0 0 1px ${headColor},
              2px 0 0 1px ${headColor},
              0 1px 0 1px ${headColor},
              1px 1px 0 1px ${headColor},
              2px 1px 0 1px ${headColor},
              0 2px 0 1px ${headColor},
              1px 2px 0 1px ${headColor},
              2px 2px 0 1px ${headColor}
            `,
          }}
        />
        
        {/* Eyes */}
        <div className="absolute top-[4px] left-[11px] w-[1px] h-[1px] bg-white" />
        <div className="absolute top-[4px] left-[14px] w-[1px] h-[1px] bg-white" />
        
        {/* Body - 10x14 */}
        <div 
          className="absolute top-[14px] left-[11px]"
          style={{ 
            width: '10px',
            height: '14px',
            backgroundColor: color,
            boxShadow: `
              0 0 0 1px ${color},
              1px 0 0 1px ${color},
              2px 0 0 1px ${color},
              3px 0 0 1px ${color},
              0 1px 0 1px ${color},
              1px 1px 0 1px ${color},
              2px 1px 0 1px ${color},
              3px 1px 0 1px ${color},
              0 2px 0 1px ${color},
              1px 2px 0 1px ${color},
              2px 2px 0 1px ${color},
              3px 2px 0 1px ${color},
              0 3px 0 1px ${color},
              1px 3px 0 1px ${color},
              2px 3px 0 1px ${color},
              3px 3px 0 1px ${color}
            `,
          }}
        />
        
        {/* Arms */}
        <div 
          className="absolute top-[16px] left-[7px] w-[2px] h-[8px]"
          style={{ backgroundColor: color }}
        />
        <div 
          className="absolute top-[16px] right-[7px] w-[2px] h-[8px]"
          style={{ backgroundColor: color }}
        />
        
        {/* Legs */}
        <div className="absolute bottom-0 left-[11px] w-[3px] h-[8px] bg-slate-800" />
        <div className="absolute bottom-0 right-[11px] w-[3px] h-[8px] bg-slate-800" />
      </div>
    </div>
  );
}

// Pixel desk with monitor
function PixelDesk({ label }: { label: string }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Desk - pixel art style */}
      <div 
        className="relative"
        style={{
          width: '80px',
          height: '50px',
        }}
      >
        {/* Desk top */}
        <div 
          className="absolute top-[20px] left-0 w-full h-[20px]"
          style={{ backgroundColor: '#A67B2D' }}
        />
        {/* Desk legs */}
        <div className="absolute top-[40px] left-[10px] w-[8px] h-[10px] bg-amber-900" />
        <div className="absolute top-[40px] right-[10px] w-[8px] h-[10px] bg-amber-900" />
        
        {/* Monitor */}
        <div className="absolute top-0 left-[20px]">
          {/* Monitor stand */}
          <div className="absolute top-[14px] left-[8px] w-[4px] h-[6px] bg-slate-600" />
          {/* Monitor screen */}
          <div 
            className="absolute top-0 left-0 w-[20px] h-[14px] bg-slate-800 border-2 border-slate-600"
          >
            {/* Code lines on screen */}
            <div className="absolute top-[2px] left-[2px] w-[4px] h-[1px] bg-green-400" />
            <div className="absolute top-[4px] left-[2px] w-[6px] h-[1px] bg-green-400" />
            <div className="absolute top-[6px] left-[2px] w-[3px] h-[1px] bg-green-400" />
            <div className="absolute top-[8px] left-[2px] w-[5px] h-[1px] bg-green-400" />
          </div>
        </div>
        
        {/* Chair */}
        <div 
          className="absolute top-[30px] left-[35px] w-[12px] h-[16px]"
          style={{ backgroundColor: '#3B82F6' }}
        />
      </div>
      
      {/* Label */}
      <span className="text-[10px] text-green-800/70 mt-1 font-mono">{label}</span>
    </div>
  );
}

// Water cooler
function WaterCooler() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[24px] h-[32px]">
        {/* Cooler body */}
        <div className="absolute bottom-0 w-full h-[20px] bg-slate-300 rounded-sm" />
        {/* Water bottle */}
        <div className="absolute top-0 left-[4px] w-[16px] h-[16px] bg-blue-400/50 rounded-t-sm" />
      </div>
      <span className="text-[8px] text-green-800/50 mt-1">WATER COOLER</span>
    </div>
  );
}

// Yoga mat
function YogaMat() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[40px] h-[24px] bg-purple-400/60 rounded-sm" />
      <span className="text-[8px] text-green-800/50 mt-1">YOGA MAT</span>
    </div>
  );
}

// Pool table
function PoolTable() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[60px] h-[40px] bg-green-700 rounded-sm border-4 border-amber-800">
        {/* Pockets */}
        <div className="absolute top-0 left-0 w-[6px] h-[6px] bg-black rounded-full" />
        <div className="absolute top-0 right-0 w-[6px] h-[6px] bg-black rounded-full" />
        <div className="absolute bottom-0 left-0 w-[6px] h-[6px] bg-black rounded-full" />
        <div className="absolute bottom-0 right-0 w-[6px] h-[6px] bg-black rounded-full" />
      </div>
      <span className="text-[8px] text-green-800/50 mt-1">POOL TABLE</span>
    </div>
  );
}

// Cost bar
function CostBar({ cost, max = 25 }: { cost: number; max?: number }) {
  const pct = Math.min((cost / max) * 100, 100);
  return (
    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
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

// Agent modal
function AgentModal({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  const cost = agent.costData;
  const model = modelPricing.find(m => m.modelId === agent.currentModel);
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/20 rounded-xl p-5 max-w-sm w-full shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white">{agent.name}</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-xs text-white/60 mb-1">Current Task</p>
            <p className="text-white text-sm">{agent.lastTaskSummary}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded-lg p-2">
              <p className="text-[10px] text-white/60">Model</p>
              <p className="text-white text-sm font-medium">{model?.name || agent.currentModel}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2">
              <p className="text-[10px] text-white/60">Status</p>
              <p className="text-white text-sm font-medium capitalize">{agent.status}</p>
            </div>
          </div>
          
          {cost && (
            <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <h4 className="font-semibold text-white text-sm">Cost Today</h4>
              </div>
              <p className="text-2xl font-bold text-green-400">${cost.estimatedCost.toFixed(2)}</p>
              <div className="flex justify-between text-xs text-white/60 mt-2">
                <span>In: {(cost.tokensIn / 1000).toFixed(1)}K</span>
                <span>Out: {(cost.tokensOut / 1000).toFixed(1)}K</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Stats panel
function StatsPanel() {
  const summary = teamCostSummary;
  
  return (
    <div className="bg-slate-800/90 backdrop-blur border border-white/10 rounded-xl p-3 w-44">
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="w-4 h-4 text-green-400" />
        <span className="text-white text-xs font-bold">TODAY</span>
      </div>
      
      <p className="text-2xl font-bold text-green-400">${summary.totalCost.toFixed(2)}</p>
      <CostBar cost={summary.totalCost} max={50} />
      
      <div className="mt-3 space-y-1 text-[10px]">
        <div className="flex justify-between text-white/60">
          <span>Tokens</span>
          <span className="text-white">{((summary.totalTokensIn + summary.totalTokensOut) / 1000).toFixed(0)}K</span>
        </div>
        {Object.entries(summary.modelBreakdown).slice(0, 3).map(([model, cost]) => (
          <div key={model} className="flex justify-between text-white/60">
            <span>{model}</span>
            <span className="text-white">${cost.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Status bar at top
function StatusBar() {
  const agents = mockAgents;
  
  return (
    <div className="flex gap-1 mb-4">
      {agents.map((agent) => (
        <div 
          key={agent.id}
          className="flex-1 h-12 rounded-lg flex flex-col items-center justify-center text-white text-[10px] font-bold"
          style={{ 
            backgroundColor: agentColors[agent.name] || '#64748B',
            opacity: agent.status === 'idle' ? 0.6 : 1,
          }}
        >
          <span className="truncate w-full text-center px-1">{agent.name.split(' ')[0]}</span>
          <div className="flex gap-1 mt-0.5">
            <div className="w-1.5 h-1.5 bg-white/30 rounded-sm" />
            <div className="w-1.5 h-1.5 bg-white/30 rounded-sm" />
          </div>
        </div>
      ))}
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

  return (
    <div className="relative">
      {/* Status bar */}
      <StatusBar />
      
      {/* Main office area - green checkered floor */}
      <div 
        className="relative rounded-xl overflow-hidden"
        style={{
          minHeight: '500px',
          backgroundColor: '#2D5016',
          backgroundImage: `
            linear-gradient(45deg, #264212 25%, transparent 25%),
            linear-gradient(-45deg, #264212 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #264212 75%),
            linear-gradient(-45deg, transparent 75%, #264212 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
        }}
      >
        {/* Wood wall at top */}
        <div 
          className="absolute top-0 left-0 right-0 h-16"
          style={{
            background: 'repeating-linear-gradient(90deg, #C49A3B 0px, #C49A3B 20px, #A67B2D 20px, #A67B2D 22px)',
          }}
        />
        
        {/* Office content */}
        <div className="relative p-6 pt-20">
          
          {/* Top row - 3 desks */}
          <div className="flex justify-around mb-16">
            <div className="flex flex-col items-center gap-4">
              {agents.docs && (
                <PixelCharacter
                  color={agentColors['Documentation']}
                  status={agents.docs.status}
                  name="Docs"
                  isMoving={agents.docs.status === 'running'}
                />
              )}
              <PixelDesk label="DESIGN STUDIO" />
            </div>
            
            <div className="flex flex-col items-center gap-4">
              {agents.main && (
                <PixelCharacter
                  color={agentColors['Main Orchestrator']}
                  status={agents.main.status}
                  name="Main"
                  isMoving={agents.main.status === 'running'}
                />
              )}
              <PixelDesk label="COMMAND DESK" />
            </div>
            
            <div className="flex flex-col items-center gap-4">
              {agents.security && (
                <PixelCharacter
                  color={agentColors['Security Scanner']}
                  status={agents.security.status}
                  name="Security"
                  isMoving={agents.security.status === 'running'}
                />
              )}
              <PixelDesk label="CODE FORGE" />
            </div>
          </div>
          
          {/* Middle - meeting table */}
          <div className="flex justify-center mb-16">
            <div className="bg-amber-700/80 w-32 h-20 rounded-lg flex items-center justify-center border-4 border-amber-800">
              <span className="text-amber-200/50 text-xs font-mono">MEETING TABLE</span>
            </div>
          </div>
          
          {/* Bottom row - 2 desks + amenities */}
          <div className="flex justify-around items-end">
            <div className="flex flex-col items-center gap-4">
              {agents.reviewer && (
                <PixelCharacter
                  color={agentColors['Code Reviewer']}
                  status={agents.reviewer.status}
                  name="Reviewer"
                  isMoving={agents.reviewer.status === 'running'}
                />
              )}
              <PixelDesk label="REVIEW CORNER" />
            </div>
            
            {/* Center amenities */}
            <div className="flex flex-col items-center gap-4">
              <WaterCooler />
              <YogaMat />
            </div>
            
            <div className="flex flex-col items-center gap-4">
              {agents.debugger && (
                <PixelCharacter
                  color={agentColors['Debugger']}
                  status={agents.debugger.status}
                  name="Debugger"
                  isMoving={agents.debugger.status === 'running'}
                />
              )}
              <PixelDesk label="DEBUG LAB" />
            </div>
            
            {/* Pool table */}
            <div className="flex flex-col items-center">
              <PoolTable />
            </div>
          </div>
          
        </div>
        
        {/* Stats panel - top right */}
        <div className="absolute top-20 right-4">
          <StatsPanel />
        </div>
        
      </div>
      
      {/* Modal */}
      {selectedAgent && (
        <AgentModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}
    </div>
  );
}
