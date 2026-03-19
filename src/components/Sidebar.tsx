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
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'jobs', label: 'Jobs', icon: ListTodo },
  { id: 'logs', label: 'Logs', icon: ScrollText },
  { id: 'git', label: 'Git', icon: GitBranch },
  { id: 'services', label: 'Services', icon: Server },
  { id: 'actions', label: 'Actions', icon: Zap },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="p-6 border-b border-glass-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Mission Control</h1>
            <p className="text-xs text-gray-500">OpenClaw Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`nav-item w-full relative ${isActive ? 'active' : ''}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : ''}`} />
              <span>{item.label}</span>
              {item.id === 'jobs' && (
                <span className="ml-auto glass-badge-info">3</span>
              )}
              {item.id === 'logs' && (
                <span className="ml-auto glass-badge-error">1</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-glass-border">
        <div className="glass-card p-3">
          <div className="flex items-center gap-3">
            <div className="status-dot-online animate-pulse" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">System Online</p>
              <p className="text-xs text-gray-500">5d 12h 30m uptime</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}