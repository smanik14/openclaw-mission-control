import { mockAgents, mockJobs, systemMetrics } from '../mockData';
import { 
  Bot, 
  CheckCircle2, 
  Clock, 
  Activity,
  Cpu,
  HardDrive,
  TrendingUp
} from 'lucide-react';

function StatusBadge({ status }: { status: string }) {
  const styles = {
    idle: 'glass-badge-neutral',
    busy: 'glass-badge-info',
    running: 'glass-badge-info',
    failed: 'glass-badge-error',
  };
  
  return (
    <span className={styles[status as keyof typeof styles] || 'glass-badge-neutral'}>
      {status}
    </span>
  );
}

export function OverviewSection() {
  const agents = mockAgents;
  const activeJobs = mockJobs.filter(j => j.status === 'running');
  
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-value">{systemMetrics.totalAgents}</p>
              <p className="metric-label">Active Agents</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-value">{activeJobs.length}</p>
              <p className="metric-label">Running Jobs</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-value">{systemMetrics.completedJobsToday}</p>
              <p className="metric-label">Completed Today</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-value">{systemMetrics.avgJobDuration}</p>
              <p className="metric-label">Avg Job Time</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* System Resources */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">System Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> CPU Usage
              </span>
              <span className="text-white">{systemMetrics.cpuUsage}%</span>
            </div>
            <div className="h-2 bg-glass-light rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${systemMetrics.cpuUsage}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Memory
              </span>
              <span className="text-white">{systemMetrics.memoryUsage}%</span>
            </div>
            <div className="h-2 bg-glass-light rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
                style={{ width: `${systemMetrics.memoryUsage}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center gap-2">
                <HardDrive className="w-4 h-4" /> Disk
              </span>
              <span className="text-white">{systemMetrics.diskUsage}%</span>
            </div>
            <div className="h-2 bg-glass-light rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                style={{ width: `${systemMetrics.diskUsage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Agents Status */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Agent Status</h3>
          <button className="glass-button text-xs">View All</button>
        </div>
        
        <div className="space-y-3">
          {agents.map((agent) => (
            <div 
              key={agent.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-glass-light hover:bg-glass-medium transition-all duration-300 group"
            >
              <div className={`w-3 h-3 rounded-full ${
                agent.status === 'idle' ? 'bg-gray-500' :
                agent.status === 'busy' || agent.status === 'running' ? 'bg-blue-500 animate-pulse' :
                'bg-red-500'
              }`} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{agent.name}</span>
                  <StatusBadge status={agent.status} />
                </div>
                <p className="text-sm text-gray-400 truncate">{agent.lastTaskSummary}</p>
              </div>
              
              <div className="text-right text-sm">
                <p className="text-gray-400">{agent.currentModel}</p>
                <p className="text-gray-500 text-xs">{agent.uptime}</p>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-semibold text-white">{agent.tasksCompleted}</p>
                <p className="text-xs text-gray-500">tasks</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Jobs</h3>
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-2">
          {mockJobs.slice(0, 4).map((job) => (
            <div 
              key={job.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-glass-light transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${
                job.status === 'success' ? 'bg-green-500' :
                job.status === 'running' ? 'bg-blue-500 animate-pulse' :
                job.status === 'failed' ? 'bg-red-500' :
                'bg-gray-500'
              }`} />
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{job.description}</p>
                <p className="text-xs text-gray-500">
                  {job.agentChain.join(' → ')}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {job.status === 'running' && (
                  <div className="w-24 h-1.5 bg-glass-light rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                )}
                <StatusBadge status={job.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}