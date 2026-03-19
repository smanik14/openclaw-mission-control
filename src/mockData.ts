import type { Agent, Job, Log, GitStatus, Port, Service, Action, ModelPricing, AgentCost, TeamCostSummary, FurnitureItem, AgentPosition } from './types';

// Model pricing data (USD per 1K tokens)
export const modelPricing: ModelPricing[] = [
  {
    modelId: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    inputPricePer1K: 0.003,
    outputPricePer1K: 0.015,
    color: '#D97706',
  },
  {
    modelId: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    inputPricePer1K: 0.0025,
    outputPricePer1K: 0.01,
    color: '#10B981',
  },
  {
    modelId: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    inputPricePer1K: 0.00015,
    outputPricePer1K: 0.0006,
    color: '#3B82F6',
  },
  {
    modelId: 'claude-haiku',
    name: 'Claude Haiku',
    provider: 'Anthropic',
    inputPricePer1K: 0.00025,
    outputPricePer1K: 0.00125,
    color: '#8B5CF6',
  },
];

export const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Main Orchestrator',
    status: 'busy',
    currentModel: 'claude-sonnet-4',
    lastTaskSummary: 'Processing GitHub issue #234 - API endpoint optimization',
    uptime: '3d 12h 45m',
    tasksCompleted: 1247,
    avatar: '🎯',
    costData: {
      agentId: 'agent-001',
      agentName: 'Main Orchestrator',
      currentModel: 'claude-sonnet-4',
      tokensIn: 2450000,
      tokensOut: 890000,
      estimatedCost: 20.67,
      costHistory: [
        { timestamp: new Date(Date.now() - 86400000), tokensIn: 2100000, tokensOut: 750000, cost: 17.55 },
        { timestamp: new Date(Date.now() - 172800000), tokensIn: 1800000, tokensOut: 620000, cost: 14.85 },
      ],
    },
  },
  {
    id: 'agent-002',
    name: 'Code Reviewer',
    status: 'idle',
    currentModel: 'gpt-4o',
    lastTaskSummary: 'Completed PR review for feature/auth-refactor',
    uptime: '5d 2h 18m',
    tasksCompleted: 892,
    avatar: '👁️',
    costData: {
      agentId: 'agent-002',
      agentName: 'Code Reviewer',
      currentModel: 'gpt-4o',
      tokensIn: 1200000,
      tokensOut: 450000,
      estimatedCost: 7.50,
      costHistory: [
        { timestamp: new Date(Date.now() - 86400000), tokensIn: 980000, tokensOut: 380000, cost: 6.25 },
      ],
    },
  },
  {
    id: 'agent-003',
    name: 'Debugger',
    status: 'running',
    currentModel: 'claude-sonnet-4',
    lastTaskSummary: 'Investigating memory leak in worker thread',
    uptime: '1d 8h 33m',
    tasksCompleted: 456,
    avatar: '🐛',
    costData: {
      agentId: 'agent-003',
      agentName: 'Debugger',
      currentModel: 'claude-sonnet-4',
      tokensIn: 890000,
      tokensOut: 320000,
      estimatedCost: 7.47,
      costHistory: [],
    },
  },
  {
    id: 'agent-004',
    name: 'Documentation',
    status: 'idle',
    currentModel: 'gpt-4o-mini',
    lastTaskSummary: 'Generated API docs for v2.3.0',
    uptime: '2d 14h 12m',
    tasksCompleted: 234,
    avatar: '📝',
    costData: {
      agentId: 'agent-004',
      agentName: 'Documentation',
      currentModel: 'gpt-4o-mini',
      tokensIn: 2100000,
      tokensOut: 1800000,
      estimatedCost: 1.40,
      costHistory: [
        { timestamp: new Date(Date.now() - 86400000), tokensIn: 1800000, tokensOut: 1500000, cost: 1.17 },
      ],
    },
  },
  {
    id: 'agent-005',
    name: 'Security Scanner',
    status: 'failed',
    currentModel: 'claude-sonnet-4',
    lastTaskSummary: 'Dependency vulnerability scan failed - timeout',
    uptime: '0d 0h 45m',
    tasksCompleted: 567,
    avatar: '🔒',
    costData: {
      agentId: 'agent-005',
      agentName: 'Security Scanner',
      currentModel: 'claude-sonnet-4',
      tokensIn: 450000,
      tokensOut: 120000,
      estimatedCost: 3.15,
      costHistory: [],
    },
  },
  {
    id: 'agent-006',
    name: 'Architect',
    status: 'busy',
    currentModel: 'claude-sonnet-4',
    lastTaskSummary: 'Designing microservices architecture for new module',
    uptime: '4d 6h 20m',
    tasksCompleted: 178,
    avatar: '🏗️',
    costData: {
      agentId: 'agent-006',
      agentName: 'Architect',
      currentModel: 'claude-sonnet-4',
      tokensIn: 1680000,
      tokensOut: 620000,
      estimatedCost: 14.34,
      costHistory: [
        { timestamp: new Date(Date.now() - 86400000), tokensIn: 1400000, tokensOut: 520000, cost: 11.98 },
      ],
    },
  },
];

export const teamCostSummary: TeamCostSummary = {
  totalCost: 54.53,
  totalTokensIn: 8670000,
  totalTokensOut: 3980000,
  agentCosts: mockAgents.map(a => a.costData!).filter(Boolean),
  modelBreakdown: {
    'claude-sonnet-4': 45.63,
    'gpt-4o': 13.75,
    'gpt-4o-mini': 2.57,
  },
  dailyAverage: 18.21,
};

export const mockJobs: Job[] = [
  {
    id: 'job-001',
    status: 'running',
    startTime: new Date(Date.now() - 1000 * 60 * 15),
    agentChain: ['agent-001', 'agent-003'],
    description: 'Refactor authentication middleware',
    progress: 67,
  },
  {
    id: 'job-002',
    status: 'success',
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    endTime: new Date(Date.now() - 1000 * 60 * 45),
    agentChain: ['agent-002'],
    description: 'Review pull request #445',
    progress: 100,
  },
  {
    id: 'job-003',
    status: 'queued',
    startTime: new Date(Date.now() + 1000 * 60 * 5),
    agentChain: ['agent-004'],
    description: 'Update README with new installation steps',
    progress: 0,
  },
  {
    id: 'job-004',
    status: 'failed',
    startTime: new Date(Date.now() - 1000 * 60 * 30),
    endTime: new Date(Date.now() - 1000 * 60 * 28),
    agentChain: ['agent-005'],
    description: 'Run security audit on dependencies',
    progress: 23,
  },
  {
    id: 'job-005',
    status: 'running',
    startTime: new Date(Date.now() - 1000 * 60 * 45),
    agentChain: ['agent-001', 'agent-002'],
    description: 'Implement rate limiting for API endpoints',
    progress: 34,
  },
  {
    id: 'job-006',
    status: 'success',
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 4),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
    agentChain: ['agent-003'],
    description: 'Fix database connection pooling issue',
    progress: 100,
  },
];

export const mockLogs: Log[] = [
  {
    id: 'log-001',
    message: 'Agent agent-001 started task: Refactor authentication middleware',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: 'info',
    source: 'orchestrator',
  },
  {
    id: 'log-002',
    message: 'GitHub API rate limit approaching: 45 requests remaining',
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    type: 'debug',
    source: 'github',
  },
  {
    id: 'log-003',
    message: 'Security scan failed: Connection timeout to npm registry',
    timestamp: new Date(Date.now() - 1000 * 60 * 28),
    type: 'error',
    source: 'security',
  },
  {
    id: 'log-004',
    message: 'Job job-002 completed successfully in 1h 15m',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: 'info',
    source: 'orchestrator',
  },
  {
    id: 'log-005',
    message: 'Memory usage for agent-003: 512MB / 2GB',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: 'debug',
    source: 'monitor',
  },
  {
    id: 'log-006',
    message: 'Port 8000 conflict detected: Process node (PID 12345) already listening',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    type: 'error',
    source: 'network',
  },
  {
    id: 'log-007',
    message: 'Agent agent-004 idle for 30 minutes',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    type: 'debug',
    source: 'monitor',
  },
  {
    id: 'log-008',
    message: 'New job queued: Update README with new installation steps',
    timestamp: new Date(Date.now() - 1000 * 60),
    type: 'info',
    source: 'orchestrator',
  },
];

export const mockGitStatus: GitStatus = {
  repoName: 'openclaw-core',
  branch: 'feature/mission-control-ui',
  recentCommits: [
    {
      hash: 'a1b2c3d',
      message: 'feat: add glassmorphism styling to dashboard',
      author: 'Sai',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      hash: 'e4f5g6h',
      message: 'fix: resolve port conflict detection logic',
      author: 'Agent-003',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      hash: 'i7j8k9l',
      message: 'refactor: improve agent task scheduling',
      author: 'Agent-001',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
    {
      hash: 'm0n1o2p',
      message: 'docs: update API documentation',
      author: 'Agent-004',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    },
  ],
  isDirty: true,
  ahead: 3,
  behind: 0,
};

export const mockPorts: Port[] = [
  { portNumber: 3000, inUseBy: 'mission-control', conflictStatus: 'in-use', service: 'React Dev Server' },
  { portNumber: 8000, inUseBy: 'simple-rest-api', conflictStatus: 'in-use', service: 'Node.js API' },
  { portNumber: 8080, inUseBy: null, conflictStatus: 'free' },
  { portNumber: 5432, inUseBy: 'postgres', conflictStatus: 'in-use', service: 'PostgreSQL' },
  { portNumber: 6379, inUseBy: 'redis', conflictStatus: 'in-use', service: 'Redis' },
  { portNumber: 9000, inUseBy: 'grafana', conflictStatus: 'in-use', service: 'Grafana' },
];

export const mockServices: Service[] = [
  {
    id: 'svc-001',
    name: 'OpenClaw Gateway',
    status: 'running',
    uptime: '5d 12h 30m',
    memory: '128MB',
    cpu: '2.3%',
    port: 8080,
  },
  {
    id: 'svc-002',
    name: 'Agent Orchestrator',
    status: 'running',
    uptime: '3d 8h 45m',
    memory: '256MB',
    cpu: '5.7%',
    port: 8081,
  },
  {
    id: 'svc-003',
    name: 'Log Aggregator',
    status: 'running',
    uptime: '5d 12h 28m',
    memory: '64MB',
    cpu: '1.2%',
    port: 8082,
  },
  {
    id: 'svc-004',
    name: 'Git Sync Service',
    status: 'error',
    uptime: '0d 0h 15m',
    memory: '32MB',
    cpu: '0%',
    port: 8083,
  },
  {
    id: 'svc-005',
    name: 'Metrics Collector',
    status: 'running',
    uptime: '2d 4h 12m',
    memory: '96MB',
    cpu: '3.1%',
    port: 8084,
  },
];

export const mockActions: Action[] = [
  {
    id: 'action-001',
    name: 'Restart All Agents',
    description: 'Gracefully restart all agent processes',
    category: 'System',
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24),
    runCount: 12,
  },
  {
    id: 'action-002',
    name: 'Clear Job Queue',
    description: 'Remove all queued jobs from the pipeline',
    category: 'Jobs',
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 48),
    runCount: 3,
  },
  {
    id: 'action-003',
    name: 'Export Logs',
    description: 'Download system logs as JSON archive',
    category: 'System',
    runCount: 45,
  },
  {
    id: 'action-004',
    name: 'Sync Git Repositories',
    description: 'Pull latest changes from all tracked repositories',
    category: 'Git',
    lastRun: new Date(Date.now() - 1000 * 60 * 30),
    runCount: 156,
  },
  {
    id: 'action-005',
    name: 'Run Security Audit',
    description: 'Scan all dependencies for vulnerabilities',
    category: 'Security',
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 12),
    runCount: 8,
  },
  {
    id: 'action-006',
    name: 'Backup Configuration',
    description: 'Create backup of all service configurations',
    category: 'System',
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    runCount: 4,
  },
];

export const systemMetrics = {
  totalAgents: mockAgents.length,
  activeJobs: mockJobs.filter(j => j.status === 'running').length,
  queuedJobs: mockJobs.filter(j => j.status === 'queued').length,
  completedJobsToday: 23,
  failedJobsToday: 2,
  avgJobDuration: '12m 34s',
  systemUptime: '5d 12h 30m',
  cpuUsage: 34,
  memoryUsage: 62,
  diskUsage: 45,
};

// Isometric office furniture layout
export const officeFurniture: FurnitureItem[] = [
  // Coffee corner (bottom-left)
  { id: 'furn-001', type: 'coffeeMachine', x: 80, y: 320, z: 0 },
  { id: 'furn-002', type: 'plant', x: 40, y: 360, z: 0, variant: 1 },
  { id: 'furn-003', type: 'beanBag', x: 120, y: 380, z: 0 },
  { id: 'furn-004', type: 'rug', x: 100, y: 350, z: -1 },
  
  // Main center area
  { id: 'furn-005', type: 'desk', x: 300, y: 280, z: 0, rotation: 0 },
  { id: 'furn-006', type: 'chair', x: 300, y: 320, z: 0, rotation: 0 },
  { id: 'furn-007', type: 'monitor', x: 300, y: 270, z: 10, rotation: 0 },
  { id: 'furn-008', type: 'lamp', x: 260, y: 260, z: 10 },
  
  // Architect design corner (top-left)
  { id: 'furn-009', type: 'desk', x: 120, y: 120, z: 0, rotation: 45 },
  { id: 'furn-010', type: 'chair', x: 150, y: 150, z: 0, rotation: 45 },
  { id: 'furn-011', type: 'monitor', x: 110, y: 110, z: 10, rotation: 45 },
  { id: 'furn-012', type: 'bookshelf', x: 60, y: 80, z: 0 },
  { id: 'furn-013', type: 'plant', x: 180, y: 90, z: 0, variant: 2 },
  
  // Developer coding station (top-right)
  { id: 'furn-014', type: 'desk', x: 480, y: 140, z: 0, rotation: -45 },
  { id: 'furn-015', type: 'chair', x: 450, y: 170, z: 0, rotation: -45 },
  { id: 'furn-016', type: 'monitor', x: 490, y: 130, z: 10, rotation: -45 },
  { id: 'furn-017', type: 'monitor', x: 470, y: 120, z: 10, rotation: -30 },
  { id: 'furn-018', type: 'plant', x: 520, y: 100, z: 0, variant: 3 },
  
  // Reviewer quiet corner (middle-right)
  { id: 'furn-019', type: 'desk', x: 500, y: 300, z: 0, rotation: 90 },
  { id: 'furn-020', type: 'chair', x: 460, y: 300, z: 0, rotation: 90 },
  { id: 'furn-021', type: 'monitor', x: 510, y: 300, z: 10, rotation: 90 },
  { id: 'furn-022', type: 'bookshelf', x: 550, y: 250, z: 0 },
  { id: 'furn-023', type: 'plant', x: 540, y: 350, z: 0, variant: 1 },
  
  // Debugger terminal (bottom-right)
  { id: 'furn-024', type: 'desk', x: 450, y: 420, z: 0, rotation: 180 },
  { id: 'furn-025', type: 'chair', x: 450, y: 380, z: 0, rotation: 180 },
  { id: 'furn-026', type: 'monitor', x: 450, y: 430, z: 10, rotation: 180 },
  { id: 'furn-027', type: 'monitor', x: 430, y: 435, z: 10, rotation: 200 },
  { id: 'furn-028', type: 'waterCooler', x: 520, y: 400, z: 0 },
  { id: 'furn-029', type: 'plant', x: 380, y: 440, z: 0, variant: 2 },
];

// Agent positions in isometric space
export const agentPositions: AgentPosition[] = [
  { agentId: 'agent-001', x: 300, y: 300, z: 0, facing: 'north', zone: 'main' },
  { agentId: 'agent-006', x: 135, y: 135, z: 0, facing: 'south', zone: 'architect' },
  { agentId: 'agent-003', x: 465, y: 155, z: 0, facing: 'west', zone: 'developer' },
  { agentId: 'agent-002', x: 480, y: 300, z: 0, facing: 'west', zone: 'reviewer' },
  { agentId: 'agent-005', x: 450, y: 400, z: 0, facing: 'north', zone: 'debugger' },
  { agentId: 'agent-004', x: 140, y: 380, z: 0, facing: 'east', zone: 'coffee' },
];

export const zoneColors: Record<string, string> = {
  coffee: '#D4A574',
  main: '#C49A3B',
  architect: '#8B6914',
  developer: '#A67B2D',
  reviewer: '#6B9E75',
  debugger: '#4A7C59',
};
