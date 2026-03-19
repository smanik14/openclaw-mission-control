# OpenClaw Mission Control

A beautiful desktop dashboard for monitoring and controlling your AI agent team. Features a cozy 3D office workspace with Roblox-style characters, real-time cost tracking, and Vista Aero glass aesthetics.

![Mission Control Dashboard](https://github.com/smanik14/openclaw-mission-control/raw/main/screenshot.png)

## Features

### 🏢 3D Office Workspace
- **Cozy office environment** with warm wood tones and plants
- **5 AI agents** as 3D blocky characters (Roblox-style)
- **Animated characters** — walking when busy, idle breathing when waiting
- **Status indicators** — colored heads with glow effects (blue=running, yellow=busy, gray=idle, red=failed)
- **Interactive** — click any agent to see details

### 💰 Cost Tracking
- **Per-agent cost meters** — see daily spending per agent
- **Team cost panel** — total daily cost with breakdown by AI model
- **Token usage** — track input/output tokens per agent
- **Model pricing** — GPT-4o, Claude, etc. with current rates

### 🎨 Vista Aero Glass Design
- Frosted glass panels with backdrop blur
- Blue-tinted transparency and gradients
- Chunky rounded corners
- Reflective shine effects
- Smooth animations and transitions

### 📊 7 Dashboard Sections
1. **Office Workspace** — 3D agent visualization (main view)
2. **Jobs** — Active and recent tasks
3. **Logs** — Errors and debugger events
4. **Git** — Repo status and commits
5. **Services** — Port monitoring
6. **Actions** — Workflow controls
7. **Settings** — Configuration panel

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **CSS 3D Transforms** for depth effects

## Quick Start

```bash
# Clone the repo
git clone https://github.com/smanik14/openclaw-mission-control.git
cd openclaw-mission-control

# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

## AI Agent Team

Your team consists of 5 specialized agents:

| Agent | Role | Color | Location |
|-------|------|-------|----------|
| 🎯 Main Orchestrator | Coordinates all activities | Blue | Center |
| 👁️ Code Reviewer | Reviews PRs and code | Green | Review Corner |
| 🐛 Debugger | Fixes bugs and issues | Amber | Debug Lab |
| 📚 Documentation | Creates docs and plans | Purple | Design Studio |
| 🔒 Security Scanner | Security audits | Red | Code Forge |

## Cost Tracking

The dashboard tracks API costs in real-time:

- **GPT-4o**: $0.0025/1K input, $0.01/1K output
- **Claude Sonnet 4**: $0.003/1K input, $0.015/1K output
- **GPT-4o Mini**: $0.00015/1K input, $0.0006/1K output

## Future Integration

Currently uses mock data. To connect to real OpenClaw:

1. Replace `src/mockData.ts` with API adapters
2. Add WebSocket for real-time updates
3. Implement agent control actions

## License

MIT

---

Built with ❤️ for the OpenClaw ecosystem.
