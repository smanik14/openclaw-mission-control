import type { FurnitureItem } from '../../types';

interface FurnitureSpriteProps {
  item: FurnitureItem;
}

export function FurnitureSprite({ item }: FurnitureSpriteProps) {
  const renderFurniture = () => {
    switch (item.type) {
      case 'desk':
        return <DeskSvg rotation={item.rotation} />;
      case 'chair':
        return <ChairSvg rotation={item.rotation} />;
      case 'monitor':
        return <MonitorSvg rotation={item.rotation} />;
      case 'coffeeMachine':
        return <CoffeeMachineSvg />;
      case 'waterCooler':
        return <WaterCoolerSvg />;
      case 'beanBag':
        return <BeanBagSvg />;
      case 'plant':
        return <PlantSvg variant={item.variant} />;
      case 'bookshelf':
        return <BookshelfSvg />;
      case 'lamp':
        return <LampSvg />;
      case 'rug':
        return <RugSvg />;
      default:
        return null;
    }
  };

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: item.x,
        top: item.y,
        zIndex: Math.floor(item.y + item.z),
        transform: 'translate(-50%, -50%)',
      }}
    >
      {renderFurniture()}
    </div>
  );
}

// Desk SVG - warm wood tones
function DeskSvg({ rotation = 0 }: { rotation?: number }) {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60" style={{ transform: `rotate(${rotation}deg)` }}>
      {/* Desk top */}
      <ellipse cx="40" cy="35" rx="35" ry="20" fill="#A67B2D" />
      <ellipse cx="40" cy="32" rx="35" ry="20" fill="#C49A3B" />
      {/* Desk legs */}
      <rect x="15" y="35" width="8" height="20" fill="#8B6914" />
      <rect x="57" y="35" width="8" height="20" fill="#8B6914" />
      {/* Shadow */}
      <ellipse cx="40" cy="58" rx="30" ry="8" fill="rgba(0,0,0,0.15)" />
    </svg>
  );
}

// Chair SVG
function ChairSvg({ rotation = 0 }: { rotation?: number }) {
  return (
    <svg width="40" height="50" viewBox="0 0 40 50" style={{ transform: `rotate(${rotation}deg)` }}>
      {/* Chair base */}
      <ellipse cx="20" cy="42" rx="15" ry="6" fill="#5A4A3A" />
      {/* Chair seat */}
      <ellipse cx="20" cy="32" rx="14" ry="10" fill="#6B5344" />
      <ellipse cx="20" cy="30" rx="14" ry="10" fill="#8B7355" />
      {/* Chair back */}
      <rect x="12" y="10" width="16" height="22" rx="4" fill="#6B5344" />
      <rect x="14" y="8" width="12" height="20" rx="3" fill="#8B7355" />
      {/* Shadow */}
      <ellipse cx="20" cy="48" rx="12" ry="4" fill="rgba(0,0,0,0.1)" />
    </svg>
  );
}

// Monitor SVG
function MonitorSvg({ rotation = 0 }: { rotation?: number }) {
  return (
    <svg width="36" height="40" viewBox="0 0 36 40" style={{ transform: `rotate(${rotation}deg)` }}>
      {/* Monitor stand */}
      <rect x="14" y="28" width="8" height="8" fill="#3A3A3A" />
      <rect x="10" y="34" width="16" height="4" rx="1" fill="#2A2A2A" />
      {/* Monitor frame */}
      <rect x="4" y="8" width="28" height="22" rx="2" fill="#2A2A2A" />
      <rect x="6" y="10" width="24" height="18" rx="1" fill="#1A1A1A" />
      {/* Screen glow */}
      <rect x="8" y="12" width="20" height="14" rx="1" fill="#4A90D9" opacity="0.3" />
      {/* Screen content lines */}
      <rect x="10" y="14" width="12" height="2" rx="1" fill="#6BA3E0" opacity="0.6" />
      <rect x="10" y="18" width="16" height="2" rx="1" fill="#8BB8E8" opacity="0.4" />
      <rect x="10" y="22" width="10" height="2" rx="1" fill="#6BA3E0" opacity="0.5" />
    </svg>
  );
}

// Coffee Machine SVG
function CoffeeMachineSvg() {
  return (
    <svg width="50" height="60" viewBox="0 0 50 60">
      {/* Machine body */}
      <rect x="10" y="10" width="30" height="40" rx="4" fill="#4A4A4A" />
      <rect x="12" y="12" width="26" height="36" rx="3" fill="#5A5A5A" />
      {/* Display */}
      <rect x="16" y="18" width="18" height="10" rx="2" fill="#2A2A2A" />
      <rect x="18" y="20" width="14" height="6" rx="1" fill="#4A7C59" opacity="0.8" />
      {/* Buttons */}
      <circle cx="18" cy="36" r="3" fill="#D97706" />
      <circle cx="26" cy="36" r="3" fill="#8B6914" />
      <circle cx="34" cy="36" r="3" fill="#6B9E75" />
      {/* Cup area */}
      <rect x="15" y="42" width="20" height="6" rx="1" fill="#3A3A3A" />
      {/* Coffee cup */}
      <ellipse cx="25" cy="50" rx="6" ry="4" fill="#F5E6D3" />
      <ellipse cx="25" cy="48" rx="5" ry="3" fill="#8B6914" opacity="0.6" />
      {/* Steam */}
      <path d="M22 44 Q23 40 22 38" stroke="#FFF" strokeWidth="1.5" opacity="0.4" fill="none" />
      <path d="M25 44 Q26 40 25 37" stroke="#FFF" strokeWidth="1.5" opacity="0.4" fill="none" />
      <path d="M28 44 Q29 40 28 38" stroke="#FFF" strokeWidth="1.5" opacity="0.4" fill="none" />
      {/* Shadow */}
      <ellipse cx="25" cy="58" rx="18" ry="5" fill="rgba(0,0,0,0.15)" />
    </svg>
  );
}

// Water Cooler SVG
function WaterCoolerSvg() {
  return (
    <svg width="40" height="70" viewBox="0 0 40 70">
      {/* Base */}
      <rect x="8" y="35" width="24" height="30" rx="3" fill="#E8D4C0" />
      <rect x="10" y="37" width="20" height="26" rx="2" fill="#F5E6D3" />
      {/* Water bottle */}
      <ellipse cx="20" cy="35" rx="12" ry="5" fill="#4A90D9" opacity="0.3" />
      <rect x="10" y="15" width="20" height="22" rx="3" fill="#4A90D9" opacity="0.4" />
      <ellipse cx="20" cy="15" rx="10" ry="4" fill="#6BA3E0" opacity="0.5" />
      {/* Cap */}
      <rect x="16" y="10" width="8" height="6" rx="1" fill="#8B6914" />
      {/* Tap */}
      <rect x="18" y="45" width="4" height="8" fill="#8B6914" />
      <circle cx="20" cy="55" r="3" fill="#6B9E75" />
      {/* Shadow */}
      <ellipse cx="20" cy="68" rx="15" ry="4" fill="rgba(0,0,0,0.15)" />
    </svg>
  );
}

// Bean Bag SVG
function BeanBagSvg() {
  return (
    <svg width="60" height="50" viewBox="0 0 60 50">
      {/* Bean bag body */}
      <ellipse cx="30" cy="32" rx="25" ry="15" fill="#D97706" />
      <ellipse cx="30" cy="28" rx="22" ry="12" fill="#F59E0B" />
      {/* Highlight */}
      <ellipse cx="25" cy="26" rx="8" ry="4" fill="#FCD34D" opacity="0.5" />
      {/* Shadow */}
      <ellipse cx="30" cy="46" rx="22" ry="6" fill="rgba(0,0,0,0.15)" />
    </svg>
  );
}

// Plant SVG with variants
function PlantSvg({ variant = 1 }: { variant?: number }) {
  const potColor = variant === 1 ? '#D97706' : variant === 2 ? '#8B6914' : '#6B9E75';
  const leafColor = variant === 1 ? '#4A7C59' : variant === 2 ? '#6B9E75' : '#8FBC8F';
  
  return (
    <svg width="40" height="60" viewBox="0 0 40 60">
      {/* Pot */}
      <polygon points="12,35 28,35 26,50 14,50" fill={potColor} />
      <ellipse cx="20" cy="35" rx="8" ry="3" fill="#A67B2D" />
      {/* Leaves */}
      <ellipse cx="20" cy="25" rx="6" ry="12" fill={leafColor} transform="rotate(-10 20 35)" />
      <ellipse cx="15" cy="28" rx="5" ry="10" fill={leafColor} transform="rotate(-30 15 35)" />
      <ellipse cx="25" cy="28" rx="5" ry="10" fill={leafColor} transform="rotate(30 25 35)" />
      <ellipse cx="20" cy="18" rx="4" ry="8" fill="#8FBC8F" />
      {/* Shadow */}
      <ellipse cx="20" cy="54" rx="10" ry="3" fill="rgba(0,0,0,0.1)" />
    </svg>
  );
}

// Bookshelf SVG
function BookshelfSvg() {
  return (
    <svg width="50" height="70" viewBox="0 0 50 70">
      {/* Frame */}
      <rect x="8" y="8" width="34" height="54" rx="2" fill="#8B6914" />
      <rect x="12" y="12" width="26" height="46" rx="1" fill="#5A4A3A" />
      {/* Shelves */}
      <rect x="12" y="24" width="26" height="3" fill="#8B6914" />
      <rect x="12" y="38" width="26" height="3" fill="#8B6914" />
      {/* Books - top shelf */}
      <rect x="14" y="16" width="4" height="8" fill="#D97706" />
      <rect x="19" y="15" width="5" height="9" fill="#4A7C59" />
      <rect x="25" y="17" width="4" height="7" fill="#6B9E75" />
      <rect x="30" y="14" width="6" height="10" fill="#A67B2D" />
      {/* Books - middle shelf */}
      <rect x="14" y="30" width="5" height="8" fill="#6B9E75" />
      <rect x="20" y="28" width="4" height="10" fill="#D97706" />
      <rect x="25" y="31" width="6" height="7" fill="#8B6914" />
      {/* Books - bottom shelf */}
      <rect x="14" y="44" width="6" height="8" fill="#4A7C59" />
      <rect x="21" y="42" width="5" height="10" fill="#A67B2D" />
      <rect x="27" y="45" width="4" height="7" fill="#D97706" />
      <rect x="32" y="43" width="4" height="9" fill="#6B9E75" />
      {/* Shadow */}
      <ellipse cx="25" cy="66" rx="20" ry="4" fill="rgba(0,0,0,0.15)" />
    </svg>
  );
}

// Desk Lamp SVG
function LampSvg() {
  return (
    <svg width="30" height="50" viewBox="0 0 30 50">
      {/* Base */}
      <ellipse cx="15" cy="45" rx="10" ry="4" fill="#5A4A3A" />
      {/* Stem */}
      <path d="M15 42 Q15 30 10 20" stroke="#8B6914" strokeWidth="3" fill="none" />
      {/* Lamp head */}
      <ellipse cx="10" cy="18" rx="8" ry="6" fill="#D97706" />
      <ellipse cx="10" cy="16" rx="6" ry="4" fill="#F59E0B" />
      {/* Light glow */}
      <ellipse cx="10" cy="35" rx="15" ry="10" fill="#FCD34D" opacity="0.15" />
      {/* Shadow */}
      <ellipse cx="15" cy="50" rx="8" ry="2" fill="rgba(0,0,0,0.1)" />
    </svg>
  );
}

// Rug SVG
function RugSvg() {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80">
      <ellipse cx="60" cy="40" rx="55" ry="35" fill="#C9B8A7" />
      <ellipse cx="60" cy="38" rx="50" ry="32" fill="#D4C4B5" />
      {/* Pattern */}
      <ellipse cx="60" cy="38" rx="40" ry="25" fill="none" stroke="#B8A896" strokeWidth="2" strokeDasharray="5,5" />
      <ellipse cx="60" cy="38" rx="30" ry="18" fill="none" stroke="#A89684" strokeWidth="1.5" />
    </svg>
  );
}
