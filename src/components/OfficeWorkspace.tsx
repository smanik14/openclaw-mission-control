import { useState } from 'react';
import { mockAgents, mockJobs, systemMetrics } from '../mockData';
import { Workstation } from './Workstation';
import { X, Bot, Clock, Activity, Cpu, CheckCircle2 } from 'lucide-react';
import type { Agent } from '../types';

// Map agent names to positions
const agentPositions: Record<string, 'center' | 'left' | 'right' | 'back-left' | 'back-right'> = {
  'Main Orchestrator': 'center',
  'Code Reviewer': 'back-left',
  'Debugger': 'back-right',
  'Documentation': 'left',
  'Security Scanner': 'right',
};

// Position descriptions for the detail panel
const positionDescriptions: Record<string, string> = {
  'center': 'Central Command Hub - Coordinates all agent activities',
  'left': 'Design Station - Architecture and planning workspace',
  'right': 'Coding Desk - Development and implementation hub',
  'back-left': 'Review Station - Code review and quality assurance',
  'back-right': 'Debug Terminal - Troubleshooting and diagnostics',
};

export function OfficeWorkspace() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const activeJobs = mockJobs.filter(j => j.status === 'running');

  // Calculate connections between agents (for path lines)
  const getAgentPosition = (agentName: string) => agentPositions[agentName] || 'center';

  return (
    <div className="space-y-6">
      {/* Vista Aero Header */}
      <div 
        className="rounded-3xl p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(74,144,217,0.25) 0%, rgba(107,163,224,0.15) 50%, rgba(139,184,232,0.1) 100%)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(74,144,217,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
        }}
      >
        {/* Reflective shine */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, transparent 40%)'
          }}
        />
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Bot className="w-7 h-7 text-blue-400" />
              Agent Office Workspace
            </h2>
            <p className="text-white/70 mt-1">Real-time agent activity visualization</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-3xl font-bold text-white">{systemMetrics.totalAgents}</p>
              <p className="text-sm text-white/60">Active Agents</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-400">{activeJobs.length}</p>
              <p className="text-sm text-white/60">Running Jobs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Office Floor Plan */}
      <div 
        className="rounded-3xl p-8 relative overflow-hidden min-h-[500px]"
        style={{
          background: 'linear-gradient(180deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        {/* Floor grid pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Office Floor Plan Grid */}
        <div className="relative z-10 grid grid-cols-3 grid-rows-2 gap-8 h-full">
          {mockAgents.map((agent) => (
            <Workstation
              key={agent.id}
              agent={agent}
              position={agentPositions[agent.name] || 'center'}
              onClick={() => setSelectedAgent(agent)}
            />
          ))}
        </div>
        
        {/* Connection Lines (SVG overlay) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A90D9" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8BB8E8" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {/* Center to all others */}
          <line x1="50%" y1="60%" x2="20%" y2="60%" stroke="url(#pathGradient)" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="50%" y1="60%" x2="80%" y2="60%" stroke="url(#pathGradient)" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="50%" y1="60%" x2="20%" y2="30%" stroke="url(#pathGradient)" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="50%" y1="60%" x2="80%" y2="30%" stroke="url(#pathGradient)" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
      </div>

      {/* Agent Detail Panel (Vista Glass Card) */}
      {selectedAgent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setSelectedAgent(null)}
        >
          <div 
            className="rounded-3xl p-6 max-w-md w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, rgba(74,144,217,0.3) 0%, rgba(107,163,224,0.2) 50%, rgba(139,184,232,0.15) 100%)',
              backdropFilter: 'blur(24px)',
              border: '2px solid rgba(255,255,255,0.25)',
              boxShadow: '0 8px 32px rgba(74,144,217,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
            }}
          >
            {/* Reflective shine */}
            <div 
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, transparent 40%)'
              }}
            />
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedAgent(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Bot className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedAgent.name}</h3>
                  <p className="text-sm text-white/60">
                    {positionDescriptions[getAgentPosition(selectedAgent.name)]}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span 
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: selectedAgent.status === 'idle' ? '#94A3B8' :
                                        selectedAgent.status === 'busy' ? '#F59E0B' :
                                        selectedAgent.status === 'running' ? '#3B82F6' : '#EF4444',
                        boxShadow: `0 0 8px ${selectedAgent.status === 'idle' ? '#94A3B8' :
                                               selectedAgent.status === 'busy' ? '#F59E0B' :
                                               selectedAgent.status === 'running' ? '#3B82F6' : '#EF4444'}`
                      }}
                    />
                    <span className="text-sm text-white/80 capitalize">{selectedAgent.status}</span>
                  </div>
                </div>
              </div>
              
              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="rounded-2xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                >
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <Cpu className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wide">Model</span>
                  </div>
                  <p className="text-white font-medium text-sm">{selectedAgent.currentModel}</p>
                </div>
                
                <div 
                  className="rounded-2xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                >
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wide">Uptime</span>
                  </div>
                  <p className="text-white font-medium text-sm">{selectedAgent.uptime}</p>
                </div>
                
                <div 
                  className="rounded-2xl p-4 col-span-2"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                >
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <Activity className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wide">Current Task</span>
                  </div>
                  <p className="text-white font-medium text-sm">{selectedAgent.lastTaskSummary}</p>
                </div>
                
                <div 
                  className="rounded-2xl p-4 col-span-2"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                >
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wide">Tasks Completed</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{selectedAgent.tasksCompleted.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'System CPU', value: `${systemMetrics.cpuUsage}%`, color: '#4A90D9' },
          { label: 'Memory', value: `${systemMetrics.memoryUsage}%`, color: '#6BA3E0' },
          { label: 'Disk', value: `${systemMetrics.diskUsage}%`, color: '#8BB8E8' },
          { label: 'Completed Today', value: systemMetrics.completedJobsToday.toString(), color: '#4A90D9' },
        ].map((stat, i) => (
          <div 
            key={i}
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(16px)',
              border: '2px solid rgba(255,255,255,0.15)',
              boxShadow: `0 4px 20px ${stat.color}20`
            }}
          >
            {/* Shine */}
            <div 
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 40%)'
              }}
            />
            <p className="text-xs text-white/60 uppercase tracking-wide relative z-10">{stat.label}</p>
            <p className="text-2xl font-bold text-white relative z-10">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
