import React from 'react';
import { ShieldCheck, Cpu, Sliders, History, Code2, BookOpen, FileCheck2, Terminal } from 'lucide-react';

export type TabType = 'workbench' | 'architecture' | 'policy' | 'audit' | 'code' | 'docs';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  auditCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, auditCount }) => {
  return (
    <header className="bg-[#0A0A0B] border-b border-[#18181B] text-white sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand - SaaS Landing Split Theme Style */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('workbench')}>
            <div className="w-9 h-9 bg-emerald-500 rounded flex items-center justify-center font-bold text-black shadow-lg shadow-emerald-500/20 font-mono text-sm">
              AG
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 font-extrabold font-mono block">
                  SECURITY ARCHITECTURE // AGENT-V
                </span>
              </div>
              <span className="font-extrabold text-base tracking-tight text-white font-mono uppercase">
                PUSHGUARD<span className="text-emerald-400">.AI</span>
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('workbench')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === 'workbench'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-bold shadow-sm shadow-emerald-500/10'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Sandbox</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === 'architecture'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-bold shadow-sm shadow-emerald-500/10'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Architecture</span>
            </button>

            <button
              onClick={() => setActiveTab('policy')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === 'policy'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-bold shadow-sm shadow-emerald-500/10'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Security Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === 'audit'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-bold shadow-sm shadow-emerald-500/10'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Audit Logs</span>
              {auditCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {auditCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === 'code'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-bold shadow-sm shadow-emerald-500/10'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Python Code</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === 'docs'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-bold shadow-sm shadow-emerald-500/10'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Deliverables</span>
            </button>
          </nav>

          {/* Quick status badge */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse glow-green" />
              <span>AGENT STATUS: ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav sub-bar */}
      <div className="md:hidden flex overflow-x-auto border-t border-[#18181B] bg-[#0F0F11] px-2 py-1.5 space-x-1 scrollbar-none font-mono text-xs">
        <button
          onClick={() => setActiveTab('workbench')}
          className={`px-2.5 py-1 rounded text-xs uppercase ${
            activeTab === 'workbench' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-400'
          }`}
        >
          Sandbox
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-2.5 py-1 rounded text-xs uppercase ${
            activeTab === 'architecture' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-400'
          }`}
        >
          Architecture
        </button>
        <button
          onClick={() => setActiveTab('policy')}
          className={`px-2.5 py-1 rounded text-xs uppercase ${
            activeTab === 'policy' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-400'
          }`}
        >
          Policy
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-2.5 py-1 rounded text-xs uppercase ${
            activeTab === 'audit' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-400'
          }`}
        >
          Audit
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-2.5 py-1 rounded text-xs uppercase ${
            activeTab === 'code' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-400'
          }`}
        >
          Code
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`px-2.5 py-1 rounded text-xs uppercase ${
            activeTab === 'docs' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-400'
          }`}
        >
          Docs
        </button>
      </div>
    </header>
  );
};
