import { Bell, Search, User } from 'lucide-react';

export function Header() {
  return (
    <header className="header">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search agents, jobs, logs..."
            className="glass-input pl-10 w-80"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-glass-light transition-colors">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-glass-border">
          <div className="text-right">
            <p className="text-sm font-medium text-white">Sai</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}