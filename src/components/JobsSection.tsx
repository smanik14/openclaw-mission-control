import { mockJobs } from '../mockData';
import { Play, Pause, RotateCcw, Clock, Users, MoreVertical } from 'lucide-react';

function StatusBadge({ status }: { status: string }) {
  const styles = {
    queued: 'glass-badge-neutral',
    running: 'glass-badge-info',
    success: 'glass-badge-success',
    failed: 'glass-badge-error',
  };
  
  return (
    <span className={styles[status as keyof typeof styles] || 'glass-badge-neutral'}>
      {status}
    </span>
  );
}

function formatDuration(start: Date, end?: Date) {
  const endTime = end || new Date();
  const diff = endTime.getTime() - start.getTime();
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

export function JobsSection() {
  const runningJobs = mockJobs.filter(j => j.status === 'running');
  const queuedJobs = mockJobs.filter(j => j.status === 'queued');
  const completedJobs = mockJobs.filter(j => j.status === 'success' || j.status === 'failed');
  
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="vista-glass rounded-xl p-4">
          <p className="text-2xl font-bold text-white">{mockJobs.length}</p>
          <p className="text-sm text-white/50">Total Jobs</p>
        </div>
        <div className="vista-glass rounded-xl p-4">
          <p className="text-2xl font-bold text-blue-400">{runningJobs.length}</p>
          <p className="text-sm text-white/50">Running</p>
        </div>
        <div className="vista-glass rounded-xl p-4">
          <p className="text-2xl font-bold text-gray-400">{queuedJobs.length}</p>
          <p className="text-sm text-white/50">Queued</p>
        </div>
        <div className="vista-glass rounded-xl p-4">
          <p className="text-2xl font-bold text-green-400">
            {mockJobs.filter(j => j.status === 'success').length}
          </p>
          <p className="text-sm text-white/50">Successful</p>
        </div>
      </div>

      {/* Running Jobs */}
      {runningJobs.length > 0 && (
        <div className="vista-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-blue-400" />
            Running Jobs
          </h3>
          
          <div className="space-y-3">
            {runningJobs.map((job) => (
              <div 
                key={job.id}
                className="p-4 rounded-lg bg-glass-medium border border-blue-500/20"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-white">{job.description}</p>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                      <Users className="w-3 h-3" />
                      {job.agentChain.join(' → ')}
                    </p>
                  </div>
                  <StatusBadge status={job.status} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{job.progress}%</span>
                  </div>
                  <div className="h-2 bg-glass-light rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500 animate-pulse"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Started {formatDuration(job.startTime)} ago
                  </span>
                  <span>ID: {job.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Queued Jobs */}
      {queuedJobs.length > 0 && (
        <div className="vista-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Pause className="w-5 h-5 text-gray-400" />
            Queued Jobs
          </h3>
          
          <div className="space-y-2">
            {queuedJobs.map((job) => (
              <div 
                key={job.id}
                className="flex items-center justify-between p-3 rounded-lg bg-glass-light hover:bg-glass-medium transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-white">{job.description}</p>
                    <p className="text-xs text-gray-500">
                      Assigned to: {job.agentChain.join(' → ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={job.status} />
                  <button className="p-1.5 rounded-lg hover:bg-glass-heavy text-gray-400 hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Jobs */}
      <div className="vista-glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-gray-400" />
          Recent Completed Jobs
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-glass-border">
                <th className="pb-3 font-medium">Job</th>
                <th className="pb-3 font-medium">Agents</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Duration</th>
                <th className="pb-3 font-medium">Started</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {completedJobs.map((job) => (
                <tr 
                  key={job.id}
                  className="border-b border-glass-border last:border-0 hover:bg-glass-light transition-colors"
                >
                  <td className="py-3">
                    <p className="text-white">{job.description}</p>
                    <p className="text-xs text-gray-500">{job.id}</p>
                  </td>
                  <td className="py-3 text-gray-400">
                    {job.agentChain.join(' → ')}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="py-3 text-gray-400">
                    {job.endTime ? formatDuration(job.startTime, job.endTime) : '-'}
                  </td>
                  <td className="py-3 text-gray-500">
                    {job.startTime.toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
