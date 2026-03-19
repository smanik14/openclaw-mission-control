import { useState } from 'react';
import { 
  Settings, 
  Globe, 
  RefreshCw, 
  Moon, 
  Cpu, 
  Database,
  Bell,
  Shield,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Volume2
} from 'lucide-react';

interface SettingItemProps {
  icon: React.ElementType;
  label: string;
  description: string;
  children: React.ReactNode;
}

function SettingItem({ icon: Icon, label, description, children }: SettingItemProps) {
  return (
    <div className="flex items-start justify-between p-4 rounded-xl bg-glass-light hover:bg-glass-medium transition-colors border border-transparent hover:border-white/5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-glass-heavy flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <h4 className="font-medium text-white">{label}</h4>
          <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
        checked ? 'bg-blue-500' : 'bg-gray-600'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
          checked ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export function SettingsSection() {
  const [settings, setSettings] = useState({
    apiUrl: 'http://localhost:8080',
    autoRefresh: true,
    refreshInterval: 30,
    darkMode: true,
    notifications: true,
    soundEffects: false,
    defaultModel: 'claude-sonnet-4',
    telemetry: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings({
      apiUrl: 'http://localhost:8080',
      autoRefresh: true,
      refreshInterval: 30,
      darkMode: true,
      notifications: true,
      soundEffects: false,
      defaultModel: 'claude-sonnet-4',
      telemetry: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg">
              <Settings className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <p className="text-gray-400">Configure your Mission Control dashboard</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleReset} className="glass-button flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button 
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                saved ? 'bg-green-500 text-white' : 'glass-button-primary'
              }`}
            >
              {saved ? (
                <><CheckCircle2 className="w-4 h-4" />Saved!</>
              ) : (
                <><Save className="w-4 h-4" />Save Changes</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Connection */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-400" />
          Connection
        </h3>
        <div className="space-y-3">
          <SettingItem icon={Globe} label="API Endpoint" description="OpenClaw gateway URL">
            <input
              type="text"
              value={settings.apiUrl}
              onChange={(e) => setSettings({ ...settings, apiUrl: e.target.value })}
              className="glass-input w-64 text-right"
            />
          </SettingItem>
          <SettingItem icon={RefreshCw} label="Auto Refresh" description="Automatically refresh dashboard data">
            <Toggle checked={settings.autoRefresh} onChange={(checked) => setSettings({ ...settings, autoRefresh: checked })} />
          </SettingItem>
          {settings.autoRefresh && (
            <SettingItem icon={Clock} label="Refresh Interval" description="Seconds between auto-refresh">
              <select
                value={settings.refreshInterval}
                onChange={(e) => setSettings({ ...settings, refreshInterval: Number(e.target.value) })}
                className="glass-input"
              >
                <option value={10}>10 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes</option>
              </select>
            </SettingItem>
          )}
        </div>
      </div>

      {/* Appearance */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Moon className="w-5 h-5 text-purple-400" />
          Appearance
        </h3>
        <div className="space-y-3">
          <SettingItem icon={Moon} label="Dark Mode" description="Use dark theme throughout">
            <Toggle checked={settings.darkMode} onChange={(checked) => setSettings({ ...settings, darkMode: checked })} />
          </SettingItem>
          <SettingItem icon={Bell} label="Notifications" description="Show desktop notifications">
            <Toggle checked={settings.notifications} onChange={(checked) => setSettings({ ...settings, notifications: checked })} />
          </SettingItem>
          <SettingItem icon={Volume2} label="Sound Effects" description="Play sounds on actions">
            <Toggle checked={settings.soundEffects} onChange={(checked) => setSettings({ ...settings, soundEffects: checked })} />
          </SettingItem>
        </div>
      </div>

      {/* AI Config */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-orange-400" />
          AI Configuration
        </h3>
        <div className="space-y-3">
          <SettingItem icon={Cpu} label="Default Model" description="Default AI model for new agents">
            <select
              value={settings.defaultModel}
              onChange={(e) => setSettings({ ...settings, defaultModel: e.target.value })}
              className="glass-input w-48"
            >
              <option value="claude-sonnet-4">Claude Sonnet 4</option>
              <option value="claude-opus-4">Claude Opus 4</option>
              <option value="gpt-4o">GPT-4o</option>
              <option value="gpt-4o-mini">GPT-4o Mini</option>
              <option value="gemini-pro">Gemini Pro</option>
            </select>
          </SettingItem>
        </div>
      </div>

      {/* Privacy */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-400" />
          Privacy & Data
        </h3>
        <div className="space-y-3">
          <SettingItem icon={Database} label="Telemetry" description="Send anonymous usage data">
            <Toggle checked={settings.telemetry} onChange={(checked) => setSettings({ ...settings, telemetry: checked })} />
          </SettingItem>
          <div className="p-4 rounded-xl bg-glass-light border border-yellow-500/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-white">Data Storage</h4>
                <p className="text-sm text-gray-400 mt-1">
                  All data is stored locally. Clear browser storage to reset all settings.
                </p>
                <button className="mt-3 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors">
                  Clear All Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Version */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-white">Mission Control</h4>
            <p className="text-sm text-gray-500">Version 1.0.0 • Build 2026.03.19</p>
          </div>
          <button className="glass-button text-xs">Check for Updates</button>
        </div>
      </div>
    </div>
  );
}
