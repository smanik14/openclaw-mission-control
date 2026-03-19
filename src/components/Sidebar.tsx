import type { Section } from '../types';
import { 
  LayoutDashboard, 
  ListTodo, 
  ScrollText, 
  GitBranch, 
  Server, 
  Zap, 
  Settings,
  Bot
} from 'lucide-react';

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const navItems: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Workspace', icon: LayoutDashboard },
  { id: 'jobs', label: 'Jobs', icon: ListTodo },
  { id: 'logs', label: 'Logs', icon: ScrollText },
  { id: 'git', label: 'Git', icon: GitBranch },
  { id: 'services', label: 'Services', icon: Server },
  { id: 'actions', label: 'Actions', icon: Zap },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside 
      className="w-64 h-screen fixed left-0 top-0 z-50 flex flex-col"
      style={{
        background: 'linear-gradient(180deg, rgba(74,144,217,0.2) 0%, rgba(107,163,224,0.15) 50%, rgba(139,184,232,0.1) 100%)',
        backdropFilter: 'blur(24px)',
        borderRight: '2px solid rgba(255,255,255,0.2)',
        boxShadow: '4px 0 32px rgba(74,144,217,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
      }}
    >
      {/* Reflective shine */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 30%)'
        }}
      />

      {/* Logo */}
      <div className="p-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #4A90D9 0%, #6BA3E0 50%, #8BB8E8 100%)',
              boxShadow: '0 4px 15px rgba(74,144,217,0.4)'
            }}
          >
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Mission Control</h1>
            <p className="text-xs text-white/50">OpenClaw Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin relative z-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full relative flex items-center gap-3 px-4 py-3 rounded-2xl
                transition-all duration-300
                ${isActive 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
                }
              `}
              style={isActive ? {
                background: 'linear-gradient(135deg, rgba(74,144,217,0.3) 0%, rgba(107,163,224,0.2) 100%)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 4px 15px rgba(74,144,217,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
              } : {}}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-6 bg-gradient-to-b from-[#4A90D9] to-[#8BB8E8] rounded-r-full" />
              )}
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#8BB8E8]' : ''}`} />
              <span>{item.label}</span>
              {item.id === 'jobs' && (
                <span 
                  className="ml-auto px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(59,130,246,0.3)',
                    border: '1px solid rgba(59,130,246,0.4)',
                    color: '#8BB8E8'
                  }}
                >
                  3
                </span>
              )}
              {item.id === 'logs' && (
                <span 
                  className="ml-auto px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(239,68,68,0.3)',
                    border: '1px solid rgba(239,68,68,0.4)',
                    color: '#FCA5A5'
                  }}
                >
                  1
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 relative z-10">
        <div 
          className="rounded-2xl p-3"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                background: '#22C55E',
                boxShadow: '0 0 8px rgba(34,197,94,0.6)'
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">System Online</p>
              <p className="text-xs text-white/50">5d 12h 30m uptime</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
