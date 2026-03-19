import { mockLogs } from '../mockData';
import { AlertCircle, Info, Bug, MoreVertical } from 'lucide-react';

function LogEntry({ log }: { log: typeof mockLogs[0] }) {
  const styles = {
    error: 'log-error',
    debug: 'log-debug',
    info: 'log-info',
  };
  
  const icons = {
    error: <AlertCircle className="w-4 h-4 text-red-500" />, 
    debug: <Bug className="w-4 h-4 text-blue-500" />,
    info: <Info className="w-4 h-4 text-gray-400" />,
  };

  return (
    <div className={`log-entry ${styles[log.type]}`}>
      <div className="flex items-center gap-3">
        {icons[log.type]}
        <div className="flex-1 min-w-0">
          <p className="truncate">{log.message}</p>
          <p className="text-xs text-gray-500 truncate">{log.timestamp.toLocaleString()}</p>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-glass-heavy text-gray-400 hover:text-white transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function LogsSection() {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-gray-400" />
        System Logs
      </h3>

      <div className="text-sm divide-y divide-glass-border">
        {mockLogs.map(log => (
          <LogEntry key={log.id} log={log} />
        ))}
      </div>
    </div>
  );
}