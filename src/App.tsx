import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CozyOffice } from './components/CozyOffice';
import { OverviewSection } from './components/OverviewSection';
import { JobsSection } from './components/JobsSection';
import { LogsSection } from './components/LogsSection';
import { GitSection } from './components/GitSection';
import { ServicesSection } from './components/ServicesSection';
import { ActionsSection } from './components/ActionsSection';
import { SettingsSection } from './components/SettingsSection';
import type { Section } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('overview');

  const sectionTitles: Record<Section, string> = {
    overview: 'Office Workspace',
    jobs: 'Jobs',
    logs: 'Logs',
    git: 'Git',
    services: 'Services',
    actions: 'Actions',
    settings: 'Settings',
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':  return <CozyOffice />;
      case 'jobs':      return <JobsSection />;
      case 'logs':      return <LogsSection />;
      case 'git':       return <GitSection />;
      case 'services':  return <ServicesSection />;
      case 'actions':   return <ActionsSection />;
      case 'settings':  return <SettingsSection />;
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="main-content flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6 flex-1">
          <div className="flex items-center justify-between">
            <h1 className="section-title">{sectionTitles[activeSection]}</h1>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default App;
