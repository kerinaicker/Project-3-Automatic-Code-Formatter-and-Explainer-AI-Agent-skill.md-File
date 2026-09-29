import React, { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { ValidationWorkbench } from './components/ValidationWorkbench';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { PolicyConfigurator } from './components/PolicyConfigurator';
import { AuditDashboard } from './components/AuditDashboard';
import { CodeViewer } from './components/CodeViewer';
import { DocHub } from './components/DocHub';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('workbench');
  const [auditCount, setAuditCount] = useState<number>(3);

  const handleValidationComplete = () => {
    setAuditCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E4E4E7] font-sans antialiased selection:bg-emerald-500 selection:text-black">
      {/* Top Header Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} auditCount={auditCount} />

      {/* Main Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'workbench' && (
          <ValidationWorkbench onValidationComplete={handleValidationComplete} />
        )}

        {activeTab === 'architecture' && <ArchitectureDiagram />}

        {activeTab === 'policy' && <PolicyConfigurator />}

        {activeTab === 'audit' && <AuditDashboard />}

        {activeTab === 'code' && <CodeViewer />}

        {activeTab === 'docs' && <DocHub />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#18181B] bg-[#0F0F11] py-6 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 glow-green" />
            <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">PushGuard Agent-V</span>
            <span className="text-zinc-600">// Antigravity Security Infrastructure</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="bg-[#18181B] px-2 py-1 rounded text-zinc-400 border border-zinc-800">FastAPI</span>
            <span className="bg-[#18181B] px-2 py-1 rounded text-zinc-400 border border-zinc-800">Pydantic</span>
            <span className="bg-[#18181B] px-2 py-1 rounded text-zinc-400 border border-zinc-800">Ollama</span>
            <span className="bg-[#18181B] px-2 py-1 rounded text-zinc-400 border border-zinc-800">SQLite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
