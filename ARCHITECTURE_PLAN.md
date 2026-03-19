# Isometric Office Workspace - Architecture Plan

## 1. Isometric CSS/SVG Approach

### 1.1 Isometric Math Fundamentals

The isometric projection uses a **26.565° angle** (arctan(0.5)) with a **2:1 pixel ratio**.

```
Isometric Transform Matrix:
- rotateX(54.7356°) - elevation angle
- rotateZ(45°) - plan rotation

CSS Approach:
```css
.isometric-container {
  transform-style: preserve-3d;
  transform: rotateX(54.7356deg) rotateZ(45deg);
}
```

Alternative CSS-only approach (simpler, no 3D):
```css
.isometric-flat {
  transform: scaleY(0.5) rotate(-45deg);
}
```

### 1.2 Coordinate System

```typescript
// Isometric coordinate conversion
interface IsoPoint {
  x: number;  // screen X
  y: number;  // screen Y
}

interface WorldPoint {
  x: number;  // grid X (0-10)
  y: number;  // grid Y (0-10)  
  z: number;  // height (0 = floor)
}

// Convert world coordinates to isometric screen coordinates
function worldToIso(world: WorldPoint, tileSize: number = 40): IsoPoint {
  return {
    x: (world.x - world.y) * tileSize,
    y: (world.x + world.y) * (tileSize / 2) - (world.z * tileSize)
  };
}
```

### 1.3 SVG Sprite Strategy

All furniture will be SVG components with isometric perspective built-in:

```typescript
// SVG Sprite Components
interface FurnitureSpriteProps {
  x: number;        // grid X position
  y: number;        // grid Y position
  z?: number;       // height offset
  variant?: string; // style variant
  scale?: number;   // size multiplier
}

// Furniture Types:
// - DeskLShape (main work area)
// - DeskStraight (side desks)
// - OfficeChair (swivel chair)
// - Monitor (single/dual)
// - CoffeeMachine
// - WaterCooler
// - BeanBag
// - Bookshelf
// - Whiteboard
// - PottedPlant
// - Rug
```

### 1.4 Color Palette (Warm Tones)

```typescript
const warmPalette = {
  // Wood tones
  woodLight: '#D4A574',    // Light oak
  woodMedium: '#A67B5B',   // Medium walnut
  woodDark: '#6B4423',     // Dark mahogany
  
  // Greens (plants)
  plantLight: '#7CB342',
  plantMedium: '#558B2F',
  plantDark: '#33691E',
  
  // Pastel accents
  accentBlue: '#90CAF9',
  accentPink: '#F48FB1',
  accentYellow: '#FFF59D',
  accentMint: '#A5D6A7',
  
  // Neutrals
  wall: '#F5F1E8',         // Warm white
  floor: '#E8DCC4',        // Beige tile
  floorDark: '#D4C4A8',    // Floor shadow
  
  // Metals
  metalLight: '#E0E0E0',
  metalDark: '#9E9E9E',
};
```

---

## 2. Component Architecture

### 2.1 Component Hierarchy

```
IsometricOffice (main container)
├── IsometricRoom (3D scene wrapper)
│   ├── FloorGrid (isometric tile floor)
│   ├── Walls (back and side walls)
│   ├── FurnitureLayer (z-index sorted)
│   │   ├── CoffeeCorner
│   │   │   ├── BeanBag x2
│   │   │   ├── CoffeeMachine
│   │   │   ├── WaterCooler
│   │   │   └── PottedPlant
│   │   ├── MainWorkArea
│   │   │   ├── LDesk (center)
│   │   │   ├── OfficeChair
│   │   │   └── DualMonitor
│   │   ├── DesignCorner (Architect)
│   │   │   ├── Desk
│   │   │   ├── Chair
│   │   │   ├── Monitor
│   │   │   └── DrawingTablet
│   │   ├── CodingStation (Developer)
│   │   │   ├── LDesk
│   │   │   ├── Chair
│   │   │   └── MultiMonitor
│   │   ├── ReviewCorner (Reviewer)
│   │   │   ├── Desk
│   │   │   ├── Chair
│   │   │   └── Monitor
│   │   ├── DebugTerminal (Debugger)
│   │   │   ├── StandingDesk
│   │   │   ├── MultipleScreens
│   │   │   └── DebugBoard
│   │   └── Decorations
│   │       ├── Bookshelf x2
│   │       ├── Whiteboard
│   │       ├── Rug
│   │       └── Plants
│   └── AgentLayer (characters on top)
│       └── AgentBadge x5
├── UIOverlay
│   ├── TeamCostPanel (top-right)
│   ├── AgentDetailModal
│   └── SpeechBubbles
```

### 2.2 Core Components

#### IsometricRoom
```typescript
interface IsometricRoomProps {
  children: React.ReactNode;
  width: number;
  height: number;
  tileSize: number;
}

// Renders the 3D transformed container with proper perspective
```

#### FurnitureSprite
```typescript
interface FurnitureSpriteProps {
  type: 'desk-l' | 'desk-straight' | 'chair' | 'monitor' | 
        'coffee-machine' | 'water-cooler' | 'bean-bag' |
        'bookshelf' | 'whiteboard' | 'plant' | 'rug';
  gridX: number;
  gridY: number;
  rotation?: 0 | 90 | 180 | 270;
  variant?: string;
}

// Each furniture type is a detailed SVG with warm color palette
```

#### AgentBadge
```typescript
interface AgentBadgeProps {
  agent: AgentWithCost;
  gridX: number;
  gridY: number;
  onClick: () => void;
}

// Circular avatar with:
// - Agent icon in center
// - Status ring (green/yellow/blue/red)
// - Speech bubble above (current task)
// - Cost meter (spending bar)
```

#### SpeechBubble
```typescript
interface SpeechBubbleProps {
  text: string;
  agentStatus: AgentStatus;
  visible: boolean;
}

// Floating bubble above agent showing current activity
```

---

## 3. Data Model for Cost Tracking

### 3.1 Extended Types

```typescript
// types.ts additions

export interface ModelPricing {
  modelId: string;
  modelName: string;
  inputPricePer1K: number;   // USD per 1K input tokens
  outputPricePer1K: number;  // USD per 1K output tokens
  provider: 'openai' | 'anthropic' | 'google' | 'other';
}

export interface AgentCost {
  agentId: string;
  today: {
    inputTokens: number;
    outputTokens: number;
    cost: number;  // USD
  };
  thisWeek: {
    inputTokens: number;
    outputTokens: number;
    cost: number;
  };
  byModel: Record<string, {
    inputTokens: number;
    outputTokens: number;
    cost: number;
  }>;
}

export interface TeamCostSummary {
  dailyTotal: number;
  weeklyTotal: number;
  monthlyProjection: number;
  byModel: Record<string, number>;
  byAgent: Record<string, number>;
  budgetLimit?: number;  // Optional budget cap
}

export interface AgentWithCost extends Agent {
  cost: AgentCost;
  currentCostRate: number;  // USD/hour based on current model
}
```

### 3.2 Mock Data Additions

```typescript
// mockData.ts additions

export const modelPricing: ModelPricing[] = [
  {
    modelId: 'gpt-4o',
    modelName: 'GPT-4o',
    inputPricePer1K: 0.0025,
    outputPricePer1K: 0.0100,
    provider: 'openai',
  },
  {
    modelId: 'gpt-4o-mini',
    modelName: 'GPT-4o Mini',
    inputPricePer1K: 0.00015,
    outputPricePer1K: 0.00060,
    provider: 'openai',
  },
  {
    modelId: 'claude-sonnet-4',
    modelName: 'Claude Sonnet 4',
    inputPricePer1K: 0.0030,
    outputPricePer1K: 0.0150,
    provider: 'anthropic',
  },
  {
    modelId: 'claude-opus-4',
    modelName: 'Claude Opus 4',
    inputPricePer1K: 0.0150,
    outputPricePer1K: 0.0750,
    provider: 'anthropic',
  },
  {
    modelId: 'gemini-pro',
    modelName: 'Gemini Pro',
    inputPricePer1K: 0.0005,
    outputPricePer1K: 0.0015,
    provider: 'google',
  },
];

export const agentCosts: AgentCost[] = [
  {
    agentId: 'agent-001',
    today: { inputTokens: 45000, outputTokens: 12000, cost: 0.2325 },
    thisWeek: { inputTokens: 285000, outputTokens: 76000, cost: 1.4725 },
    byModel: {
      'claude-sonnet-4': { inputTokens: 285000, outputTokens: 76000, cost: 1.4725 },
    },
  },
  // ... other agents
];

export const teamCostSummary: TeamCostSummary = {
  dailyTotal: 0.89,
  weeklyTotal: 5.23,
  monthlyProjection: 22.80,
  byModel: {
    'claude-sonnet-4': 3.15,
    'gpt-4o': 1.68,
    'gpt-4o-mini': 0.40,
  },
  byAgent: {
    'agent-001': 1.47,
    'agent-002': 0.98,
    'agent-003': 1.23,
    'agent-004': 0.85,
    'agent-005': 0.70,
  },
  budgetLimit: 50.00,
};
```

### 3.3 Cost Calculation Logic

```typescript
// costCalculator.ts

export function calculateTokenCost(
  inputTokens: number,
  outputTokens: number,
  modelPricing: ModelPricing
): number {
  const inputCost = (inputTokens / 1000) * modelPricing.inputPricePer1K;
  const outputCost = (outputTokens / 1000) * modelPricing.outputPricePer1K;
  return inputCost + outputCost;
}

export function getCurrentModelPricing(
  modelId: string,
  pricingTable: ModelPricing[]
): ModelPricing | undefined {
  return pricingTable.find(p => p.modelId === modelId);
}

export function estimateHourlyCost(
  modelPricing: ModelPricing,
  avgTokensPerHour: number = 4000
): number {
  // Assume 70% input, 30% output ratio
  const inputTokens = avgTokensPerHour * 0.7;
  const outputTokens = avgTokensPerHour * 0.3;
  return calculateTokenCost(inputTokens, outputTokens, modelPricing);
}

export function formatCost(cost: number): string {
  if (cost < 0.01) {
    return `$${(cost * 100).toFixed(2)}¢`;
  }
  return `$${cost.toFixed(2)}`;
}

export function formatTokens(tokens: number): string {
  if (tokens >= 1000000) {
    return `${(tokens / 1000000).toFixed(1)}M`;
  }
  if (tokens >= 1000) {
    return `${(tokens / 1000).toFixed(1)}K`;
  }
  return tokens.toString();
}
```

---

## 4. Step-by-Step Implementation Plan

### Phase 1: Foundation (Files 1-3)

**File 1: `src/isometric/math.ts`**
- Coordinate conversion functions
- Grid utilities
- Z-index sorting for isometric depth

**File 2: `src/isometric/palette.ts`**
- Warm color palette constants
- Furniture color variants

**File 3: `src/types/cost.ts`**
- Cost tracking type definitions
- Extend existing Agent type

### Phase 2: SVG Furniture Sprites (Files 4-8)

**File 4: `src/components/isometric/furniture/DeskSprites.tsx`**
- L-shaped desk (main work area)
- Straight desk (side stations)
- Standing desk (debug terminal)

**File 5: `src/components/isometric/furniture/ChairSprites.tsx`**
- Office swivel chair (multiple angles)
- Bean bag chair (lounge area)

**File 6: `src/components/isometric/furniture/EquipmentSprites.tsx`**
- Monitor (single, dual, multi)
- Coffee machine
- Water cooler
- Drawing tablet

**File 7: `src/components/isometric/furniture/DecorSprites.tsx`**
- Bookshelf
- Whiteboard
- Potted plants (3 variants)
- Rugs (2 patterns)

**File 8: `src/components/isometric/FurnitureSprite.tsx`**
- Unified furniture renderer
- Type-to-component mapping
- Position calculation

### Phase 3: Agent Components (Files 9-11)

**File 9: `src/components/isometric/AgentBadge.tsx`**
- Circular avatar with icon
- Status ring animation
- Click handler
- Cost meter integration

**File 10: `src/components/isometric/SpeechBubble.tsx`**
- Floating bubble above agent
- Status-based colors
- Auto-hide after delay

**File 11: `src/components/isometric/AgentLayer.tsx`**
- Renders all agents at positions
- Z-sorting for depth
- Selection state management

### Phase 4: Room & Layout (Files 12-14)

**File 12: `src/components/isometric/FloorGrid.tsx`**
- Isometric tile floor
- Warm beige coloring
- Subtle grid lines

**File 13: `src/components/isometric/RoomWalls.tsx`**
- Back wall with window
- Side walls
- Baseboards

**File 14: `src/components/isometric/IsometricRoom.tsx`**
- 3D transform container
- Combines floor, walls, furniture, agents
- Viewport sizing

### Phase 5: Cost Tracking UI (Files 15-17)

**File 15: `src/utils/costCalculator.ts`**
- Cost calculation functions
- Token formatting
- Budget utilities

**File 16: `src/components/cost/TeamCostPanel.tsx`**
- Total team cost display
- Budget progress bar
- Model breakdown mini-chart

**File 17: `src/components/cost/CostMeter.tsx`**
- Per-agent spending bar
- Color-coded by usage level
- Tooltip with details

### Phase 6: Main Integration (Files 18-20)

**File 18: `src/mockData.ts` (Update)**
- Add model pricing
- Add agent costs
- Add team cost summary
- Update agents with positions

**File 19: `src/components/IsometricOffice.tsx`**
- Main office component
- Layout definition
- State management

**File 20: `src/components/OfficeWorkspace.tsx` (Replace)**
- Integrate new isometric office
- Keep modal detail panel
- Add cost panel overlay

### Phase 7: Polish (Files 21-22)

**File 21: `src/components/isometric/animations.css`**
- Status ring pulse
- Speech bubble fade
- Furniture hover effects

**File 22: `src/components/cost/CostDetailModal.tsx`**
- Extended cost breakdown
- Historical usage chart
- Model comparison

---

## 5. Office Layout Specification

### Grid System (12x12)

```
    0   1   2   3   4   5   6   7   8   9   10  11
   ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
0  │   │   │   │   │   │   │   │   │   │   │   │   │
   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
1  │   │ B │ B │   │   │ W │ W │   │   │ P │ P │   │  B=Bookshelf, W=Whiteboard, P=Plant
   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
2  │   │   │   │   │   │   │   │   │   │   │   │   │
   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
3  │   │   │ R │ R │   │   │   │   │ D │ D │   │   │  R=Reviewer, D=Debugger
   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
4  │   │   │ R │ R │   │   │   │   │ D │ D │   │   │
   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
5  │   │   │   │   │   │ M │ M │   │   │   │   │   │  M=Main (center)
   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
6  │   │   │   │   │   │ M │ M │   │   │   │   │   │
   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
7  │   │   │ A │ A │   │   │   │   │ C │ C │   │   │  A=Architect, C=Coder
   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
8  │   │   │ A │ A │   │   │   │   │ C │ C │   │   │
   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
9  │   │   │   │   │   │   │   │   │   │   │   │   │
   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
10 │   │ ☕│ ☕│   │   │   │   │   │   │   │   │   │  ☕=Coffee corner
   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
11 │   │   │   │   │   │   │   │   │   │   │   │   │
   └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
```

### Agent Positions

| Agent | Grid Position | Area Description |
|-------|--------------|------------------|
| Main | (5, 5) | Central command - L-desk facing south |
| Architect | (2, 7) | Design corner - desk with drawing tablet |
| Developer | (8, 7) | Coding station - L-desk with multi-monitor |
| Reviewer | (2, 3) | Quiet corner - simple desk for focus |
| Debugger | (8, 3) | Debug terminal - standing desk with screens |

---

## 6. Key Implementation Details

### 6.1 Isometric Transform CSS

```css
.isometric-scene {
  transform-style: preserve-3d;
  transform: rotateX(60deg) rotateZ(-45deg);
  width: 600px;
  height: 600px;
}

/* Alternative: True isometric (26.565°) */
.isometric-true {
  transform: 
    rotateX(54.7356deg) 
    rotateZ(45deg)
    scale3d(1, 1, 1);
}
```

### 6.2 Z-Index Sorting for Depth

```typescript
// Sort items by (x + y) for proper isometric overlap
function sortByDepth<T extends { gridX: number; gridY: number }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    const depthA = a.gridX + a.gridY;
    const depthB = b.gridX + b.gridY;
    return depthA - depthB;
  });
}
```

### 6.3 SVG Isometric Drawing Tips

1. **Use 2:1 lines**: For every 2px horizontal, 1px vertical
2. **Three visible faces**: Top (light), Left (medium), Right (dark)
3. **Shadows**: Elliptical shadows below objects for grounding
4. **Highlights**: 1px white lines on edges for "cozy" feel

### 6.4 Cost Meter Visualization

```typescript
// Cost meter levels
function getCostLevel(cost: number, budget: number): 'low' | 'medium' | 'high' {
  const ratio = cost / budget;
  if (ratio < 0.3) return 'low';
  if (ratio < 0.7) return 'medium';
  return 'high';
}

// Colors
const costLevelColors = {
  low: '#4ADE80',      // Green
  medium: '#FBBF24',   // Yellow
  high: '#EF4444',     // Red
};
```

---

## 7. File Structure

```
src/
├── isometric/
│   ├── math.ts
│   └── palette.ts
├── components/
│   ├── isometric/
│   │   ├── furniture/
│   │   │   ├── DeskSprites.tsx
│   │   │   ├── ChairSprites.tsx
│   │   │   ├── EquipmentSprites.tsx
│   │   │   └── DecorSprites.tsx
│   │   ├── FurnitureSprite.tsx
│   │   ├── AgentBadge.tsx
│   │   ├── SpeechBubble.tsx
│   │   ├── AgentLayer.tsx
│   │   ├── FloorGrid.tsx
│   │   ├── RoomWalls.tsx
│   │   ├── IsometricRoom.tsx
│   │   └── animations.css
│   ├── cost/
│   │   ├── TeamCostPanel.tsx
│   │   ├── CostMeter.tsx
│   │   └── CostDetailModal.tsx
│   ├── IsometricOffice.tsx
│   └── OfficeWorkspace.tsx
├── utils/
│   └── costCalculator.ts
├── types/
│   └── cost.ts
└── mockData.ts (updated)
```

---

## Summary

This architecture delivers:

1. **Isometric Visual Style**: True 26.565° isometric projection with CSS 3D transforms and detailed SVG furniture sprites in warm, cozy colors

2. **Complete Office Layout**: Coffee lounge, main work area, meeting corner, and individual agent stations positioned logically in 3D space

3. **Rich Agent Visuals**: Circular avatars with status rings, speech bubbles, and interactive detail panels

4. **Comprehensive Cost Tracking**: Per-model pricing, per-agent usage, team totals, budget visualization, and detailed breakdowns

The implementation is broken into 22 logical files across 7 phases, making it manageable to build iteratively while maintaining coherence.
