export interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'busy' | 'running' | 'failed';
  currentModel: string;
  lastTaskSummary: string;
  uptime: string;
  tasksCompleted: number;
  avatar?: string;
  costData?: AgentCost;
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

export interface ModelPricing {
  modelId: string;
  name: string;
  provider: string;
  inputPricePer1K: number;  // in USD
  outputPricePer1K: number; // in USD
  color: string;
}

export interface AgentCost {
  agentId: string;
  agentName: string;
  currentModel: string;
  tokensIn: number;
  tokensOut: number;
  estimatedCost: number; // in USD
  costHistory: CostSnapshot[];
}

export interface CostSnapshot {
  timestamp: Date;
  tokensIn: number;
  tokensOut: number;
  cost: number;
}

export interface TeamCostSummary {
  totalCost: number;
  totalTokensIn: number;
  totalTokensOut: number;
  agentCosts: AgentCost[];
  modelBreakdown: Record<string, number>;
  dailyAverage: number;
}

export type Section = 'overview' | 'jobs' | 'logs' | 'git' | 'services' | 'actions' | 'settings';

// Isometric office types
export interface FurnitureItem {
  id: string;
  type: 'desk' | 'chair' | 'monitor' | 'coffeeMachine' | 'waterCooler' | 'beanBag' | 'plant' | 'bookshelf' | 'lamp' | 'rug';
  x: number;
  y: number;
  z: number;
  rotation?: number;
  variant?: number;
}

export interface AgentPosition {
  agentId: string;
  x: number;
  y: number;
  z: number;
  facing: 'north' | 'south' | 'east' | 'west';
  zone: 'coffee' | 'main' | 'architect' | 'developer' | 'reviewer' | 'debugger';
}

export interface OfficeZone {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}
