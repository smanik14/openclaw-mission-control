import { Bell, Search, User } from 'lucide-react';

export function Header() {
  return (
    <header 
      className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
      style={{
        background: 'linear-gradient(180deg, rgba(74,144,217,0.15) 0%, rgba(107,163,224,0.1) 100%)',
        backdropFilter: 'blur(24px)',
        borderBottom: '2px solid rgba(255,255,255,0.15)',
        boxShadow: '0 4px 20px rgba(74,144,217,0.15), inset 0 1px 0 rgba(255,255,255,0.2)'
      }}
    >
      {/* Reflective shine */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 40%)'
        }}
      />

      <div className="flex items-center gap-4 flex-1 relative z-10">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            type="text"
            placeholder="Search agents, jobs, logs..."
            className="pl-10 w-80 rounded-xl px-4 py-2 text-sm text-white placeholder-white/40 outline-none transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            onFocus={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.15)';
              e.target.style.borderColor = 'rgba(74,144,217,0.5)';
            }}
            onBlur={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <button 
          className="relative p-2 rounded-xl transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(255,255,255,0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          }}
        >
          <Bell className="w-5 h-5 text-white/70" />
          <span 
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{
              background: '#F97316',
              boxShadow: '0 0 6px rgba(249,115,22,0.6)'
            }}
          />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right">
            <p className="text-sm font-medium text-white">Sai</p>
            <p className="text-xs text-white/50">Administrator</p>
          </div>
          <div 
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #4A90D9 0%, #8B5CF6 100%)',
              boxShadow: '0 4px 15px rgba(74,144,217,0.4)'
            }}
          >
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
