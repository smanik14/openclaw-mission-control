import { mockGitStatus } from '../mockData';
import { GitBranch, GitCommit, GitPullRequest, AlertCircle, Check, RefreshCw, Copy, ExternalLink } from 'lucide-react';

export function GitSection() {
  const { repoName, branch, recentCommits, isDirty, ahead, behind } = mockGitStatus;

  const getTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="space-y-6">
      {/* Repo Header */}
      <div className="glass-card p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <GitBranch className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{repoName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="glass-badge-info flex items-center gap-1">
                  <GitBranch className="w-3 h-3" />
                  {branch}
                </span>
                {isDirty && (
                  <span className="glass-badge-warning flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Uncommitted changes
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="glass-button flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Sync
            </button>
            <button className="glass-button-primary flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Open in GitHub
            </button>
          </div>
        </div>

        {/* Sync Status */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="glass-panel rounded-lg p-4 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Commits ahead</span>
              <span className="text-2xl font-bold text-green-400">{ahead}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Local commits not pushed</p>
          </div>
          <div className="glass-panel rounded-lg p-4 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Commits behind</span>
              <span className="text-2xl font-bold text-blue-400">{behind}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Remote commits to pull</p>
          </div>
        </div>
      </div>

      {/* Recent Commits */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-orange-400" />
            Recent Commits
          </h3>
          <button className="glass-button text-xs">View All History</button>
        </div>

        <div className="space-y-3">
          {recentCommits.map((commit, index) => (
            <div 
              key={commit.hash}
              className="group flex items-start gap-4 p-4 rounded-xl bg-glass-light hover:bg-glass-medium transition-all duration-300 border border-transparent hover:border-white/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-sm font-mono text-gray-400 border border-white/10">
                  {commit.author.charAt(0)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                  {commit.message}
                </p>
                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span className="text-gray-400">{commit.author}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-500">{getTimeAgo(commit.timestamp)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <code className="px-2 py-1 rounded bg-glass-heavy text-xs text-gray-400 font-mono">
                  {commit.hash}
                </code>
                <button className="p-1.5 rounded-lg hover:bg-glass-heavy text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Working Tree Status */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <GitPullRequest className="w-5 h-5 text-purple-400" />
          Working Tree
        </h3>
        
        {isDirty ? (
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-yellow-400 text-sm">M</span>
              <span className="text-gray-300 text-sm flex-1">src/components/Dashboard.tsx</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-green-400 text-sm">A</span>
              <span className="text-gray-300 text-sm flex-1">src/components/GitPanel.tsx</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-red-400 text-sm">D</span>
              <span className="text-gray-300 text-sm flex-1">src/components/OldPanel.tsx</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-6 rounded-xl bg-green-500/5 border border-green-500/20">
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-gray-300">Working tree clean</span>
          </div>
        )}

        {isDirty && (
          <div className="flex gap-3 mt-4">
            <button className="glass-button-primary flex-1">Commit Changes</button>
            <button className="glass-button flex-1">Stash Changes</button>
          </div>
        )}
      </div>
    </div>
  );
}
