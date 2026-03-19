export interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'busy' | 'running' | 'failed';
  currentModel: string;
  lastTaskSummary: string;
  uptime: string;
  tasksCompleted: number;
}

export interface Job {
  id: string;
  status: 'queued' | 'running' | 'success' | 'failed';
  startTime: Date;
  endTime?: Date;
  agentChain: string[];
  description: string;
  progress: number;
}

export interface Log {
  id: string;
  message: string;
  timestamp: Date;
  type: 'error' | 'debug' | 'info';
  source: string;
}

export interface GitStatus {
  repoName: string;
  branch: string;
  recentCommits: Commit[];
  isDirty: boolean;
  ahead: number;
  behind: number;
}

export interface Commit {
  hash: string;
  message: string;
  author: string;
  timestamp: Date;
}

export interface Port {
  portNumber: number;
  inUseBy: string | null;
  conflictStatus: 'free' | 'in-use' | 'conflict';
  service?: string;
}

export interface Service {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  uptime: string;
  memory: string;
  cpu: string;
  port: number;
}

export interface Action {
  id: string;
  name: string;
  description: string;
  category: string;
  lastRun?: Date;
  runCount: number;
}

export type Section = 'overview' | 'jobs' | 'logs' | 'git' | 'services' | 'actions' | 'settings';