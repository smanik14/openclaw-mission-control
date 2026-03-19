import { mockServices, mockPorts } from '../mockData';
import { Server, Activity, Cpu, MemoryStick, AlertTriangle, CheckCircle2, XCircle, Wifi, WifiOff } from 'lucide-react';

function StatusIndicator({ status }: { status: string }) {
  const configs = {
    running: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' },
    stopped: { icon: XCircle, color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30' },
    error: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' },
  };
  
  const config = configs[status as keyof typeof configs] || configs.stopped;
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} ${config.border} border backdrop-blur-sm`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}

export function ServicesSection() {
  return (
    <div className="space-y-6">
      {/* Services Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">
                {mockServices.filter(s => s.status === 'running').length}
              </p>
              <p className="text-sm text-gray-400 mt-1">Running Services</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Wifi className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">
                {mockServices.filter(s => s.status === 'error').length}
              </p>
              <p className="text-sm text-gray-400 mt-1">Errors</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <WifiOff className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>
        
        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">
                {mockPorts.filter(p => p.conflictStatus === 'conflict').length}
              </p>
              <p className="text-sm text-gray-400 mt-1">Port Conflicts</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" />
            Active Services
          </h3>
          <button className="glass-button text-xs">Refresh Status</button>
        </div>

        <div className="space-y-3">
          {mockServices.map((service, index) => (
            <div 
              key={service.id}
              className="group p-4 rounded-xl bg-glass-light hover:bg-glass-medium transition-all duration-300 border border-transparent hover:border-white/10"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    service.status === 'running' 
                      ? 'bg-green-500/20 shadow-lg shadow-green-500/10' 
                      : service.status === 'error'
                      ? 'bg-red-500/20 shadow-lg shadow-red-500/10'
                      : 'bg-gray-500/20'
                  }`}>
                    <Server className={`w-5 h-5 ${
                      service.status === 'running' ? 'text-green-400' : 
                      service.status === 'error' ? 'text-red-400' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-white">{service.name}</span>
                      <StatusIndicator status={service.status} />
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5" />
                        {service.uptime}
                      </span>
                      <span>Port {service.port}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-400">{service.cpu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MemoryStick className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-400">{service.memory}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {service.status === 'running' ? (
                      <button className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors">
                        Stop
                      </button>
                    ) : (
                      <button className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/30 transition-colors">
                        Start
                      </button>
                    )}
                    <button className="px-3 py-1.5 rounded-lg bg-glass-heavy text-gray-400 text-xs font-medium hover:text-white transition-colors">
                      Logs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Port Status */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          Port Allocation
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {mockPorts.map((port) => (
            <div 
              key={port.portNumber}
              className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                port.conflictStatus === 'in-use'
                  ? 'bg-blue-500/10 border-blue-500/30'
                  : port.conflictStatus === 'conflict'
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-glass-light border-white/5'
              }`}
            >
              <div className="text-2xl font-bold text-white mb-1">{port.portNumber}</div>
              <div className="text-xs text-gray-400 truncate">
                {port.inUseBy || 'Free'}
              </div>
              {port.service && (
                <div className="text-xs text-blue-400 mt-1 truncate">{port.service}</div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-glass-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500/50" />
            <span className="text-sm text-gray-400">In Use</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <span className="text-sm text-gray-400">Conflict</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500/30" />
            <span className="text-sm text-gray-400">Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
