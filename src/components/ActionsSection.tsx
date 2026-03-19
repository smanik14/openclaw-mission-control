import { mockActions } from '../mockData';
import { 
  Zap, 
  Play, 
  Clock, 
  RotateCcw, 
  ChevronRight,
  Terminal,
  Shield,
  GitBranch,
  Database,
  Settings,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const categoryIcons: Record<string, React.ElementType> = {
  'System': Settings,
  'Jobs': Terminal,
  'Git': GitBranch,
  'Security': Shield,
  'Database': Database,
};

const categoryColors: Record<string, string> = {
  'System': 'from-blue-500 to-cyan-500',
  'Jobs': 'from-orange-500 to-amber-500',
  'Git': 'from-purple-500 to-pink-500',
  'Security': 'from-red-500 to-rose-500',
  'Database': 'from-green-500 to-emerald-500',
};

function ActionCard({ action }: { action: typeof mockActions[0] }) {
  const Icon = categoryIcons[action.category] || Zap;
  const gradient = categoryColors[action.category] || 'from-gray-500 to-slate-500';
  
  const getTimeAgo = (date?: Date) => {
    if (!date) return 'Never';
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Recently';
  };

  return (
    <div className="group relative p-5 rounded-xl bg-glass-light hover:bg-glass-medium transition-all duration-300 border border-transparent hover:border-white/10 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="glass-badge-neutral text-xs">{action.category}</span>
        </div>

        <h4 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
          {action.name}
        </h4>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {action.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {getTimeAgo(action.lastRun)}
          </span>
          <span className="flex items-center gap-1">
            <RotateCcw className="w-3.5 h-3.5" />
            {action.runCount} runs
          </span>
        </div>

        <button className="w-full glass-button-primary flex items-center justify-center gap-2 group/btn">
          <Play className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          Run Action
          <ChevronRight className="w-4 h-4 opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
        </button>
      </div>
    </div>
  );
}

export function ActionsSection() {
  const groupedActions = mockActions.reduce((acc, action) => {
    if (!acc[action.category]) acc[action.category] = [];
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, typeof mockActions>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">{mockActions.length}</p>
              <p className="text-sm text-gray-400 mt-1">Total Actions</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">
                {mockActions.reduce((acc, a) => acc + a.runCount, 0)}
              </p>
              <p className="text-sm text-gray-400 mt-1">Total Runs</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">
                {Object.keys(groupedActions).length}
              </p>
              <p className="text-sm text-gray-400 mt-1">Categories</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Settings className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">0</p>
              <p className="text-sm text-gray-400 mt-1">Running Now</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Play className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Available Actions
          </h3>
          <div className="flex gap-2">
            <button className="glass-button text-xs">Filter</button>
            <button className="glass-button text-xs">Sort</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockActions.map((action) => (
            <ActionCard key={action.id} action={action} />
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          Recent Action History
        </h3>

        <div className="space-y-2">
          {mockActions
            .filter(a => a.lastRun)
            .sort((a, b) => (b.lastRun?.getTime() || 0) - (a.lastRun?.getTime() || 0))
            .slice(0, 5)
            .map((action) => (
              <div 
                key={`history-${action.id}`}
                className="flex items-center gap-4 p-3 rounded-lg bg-glass-light hover:bg-glass-medium transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{action.name}</p>
                  <p className="text-xs text-gray-500">Completed successfully</p>
                </div>
                <span className="text-xs text-gray-500">
                  {action.lastRun?.toLocaleTimeString()}
                </span>
              </div>
            ))}
          
          {mockActions.filter(a => a.lastRun).length === 0 && (
            <div className="flex items-center gap-3 p-6 rounded-xl bg-glass-light text-gray-500">
              <AlertCircle className="w-5 h-5" />
              <span>No recent activity</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
