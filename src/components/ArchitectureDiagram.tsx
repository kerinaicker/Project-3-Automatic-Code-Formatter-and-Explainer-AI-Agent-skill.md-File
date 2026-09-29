import React, { useState } from 'react';
import {
  Server,
  ShieldCheck,
  Cpu,
  FileSearch,
  Database,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lock,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';

interface ArchNode {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  technicalRole: string;
  freeToolsUsed: string[];
  color: string;
}

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('ai-agent');

  const nodes: ArchNode[] = [
    {
      id: 'source-system',
      number: 1,
      title: 'Source System',
      subtitle: 'External API Client / Partner System',
      icon: Server,
      description:
        'The external business partner, webhook sender, or internal microservice that pushes incoming files (JSON, CSV, XML, PDF) to your application endpoint.',
      technicalRole:
        'Generates push requests with headers (x-api-key, x-signature) and payload data over HTTPS.',
      freeToolsUsed: ['Postman', 'cURL', 'Python Requests', 'Webhooks'],
      color: 'blue',
    },
    {
      id: 'api-gateway',
      number: 2,
      title: 'API Gateway',
      subtitle: 'Ingress & Authentication Guard',
      icon: Lock,
      description:
        'The front entrance for incoming traffic. Validates client API keys, verifies HMAC SHA-256 signatures, enforces rate limits, and prevents raw unauthenticated payloads from hitting internal servers.',
      technicalRole:
        'Terminates TLS, validates x-api-key, performs rate limiting, checks payload size constraints, and calculates MD5/SHA256 checksums.',
      freeToolsUsed: ['FastAPI Gateway', 'Nginx', 'Traefik', 'Uvicorn'],
      color: 'indigo',
    },
    {
      id: 'ai-agent',
      number: 3,
      title: 'AI Validation Agent',
      subtitle: 'Antigravity AI Inspector',
      icon: Cpu,
      description:
        'The intelligent agent running inside Antigravity container. Inspects file contents for contextual risk, disguised scripts, unexpected null values, and logical anomalies that standard regex rules miss.',
      technicalRole:
        'Calls local open-source LLM (Ollama / Llama 3) or Gemini 3.6 Flash. Produces a risk score (0-100), natural language reasoning, and remediation advice.',
      freeToolsUsed: ['Ollama', 'Llama 3', 'LangChain Community', 'Gemini 3.6 Flash (Free Tier)'],
      color: 'cyan',
    },
    {
      id: 'validation-engine',
      number: 4,
      title: 'Validation Engine',
      subtitle: 'Rule-Based & Security Scanner',
      icon: FileSearch,
      description:
        'Performs deterministic, lightning-fast security checks including Pydantic/JSON Schema validation, Anti-SQL injection, Anti-XSS, shell command detection, and malware signature matching.',
      technicalRole:
        'Runs Pydantic type models, JSON schema validators, regex security pattern matching, and ClamAV virus daemon scans.',
      freeToolsUsed: ['Pydantic v2', 'JSON Schema', 'ClamAV Malware Engine', 'Python Regex'],
      color: 'emerald',
    },
    {
      id: 'logging-audit',
      number: 5,
      title: 'Logging & Audit',
      subtitle: 'DevSecOps Ledger & Analytics',
      icon: Database,
      description:
        'Records every validation decision (ACCEPT, REJECT, FLAGGED) with timestamp, checksums, IP address, risk score, and detailed reason for compliance and security auditing.',
      technicalRole:
        'Persists audit entries in a lightweight zero-cost SQLite database or structured JSON log stream.',
      freeToolsUsed: ['SQLite', 'Python Logging', 'Structured JSON Logs'],
      color: 'purple',
    },
    {
      id: 'decision-node',
      number: 6,
      title: 'Accept / Reject Decision',
      subtitle: 'Gatekeeper Router',
      icon: Layers,
      description:
        'The final binary decision point. If any rule fails or AI risk score is high (>=70), the request is blocked and detailed error feedback is returned to sender. If safe, payload moves to target.',
      technicalRole:
        'Evaluates combined rule outputs. Returns HTTP 200 OK with acceptance token, or HTTP 400/422/403 with detailed remediation guidance.',
      freeToolsUsed: ['FastAPI Exception Handlers', 'Pydantic Response Models'],
      color: 'amber',
    },
    {
      id: 'target-endpoint',
      number: 7,
      title: 'Target Endpoint',
      subtitle: 'Internal Database / Core API',
      icon: CheckCircle2,
      description:
        'Your secure internal database or processing server. Accepts only clean, pre-validated, sanitized files with 100% confidence.',
      technicalRole:
        'Executes business logic, persists verified data to PostgreSQL or Cloud SQL, and updates application state.',
      freeToolsUsed: ['PostgreSQL', 'SQLite', 'Internal Microservices'],
      color: 'green',
    },
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[2];

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner - SaaS Split Style */}
      <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#18181B] pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold text-black font-mono text-xs">
                AG
              </div>
              <span className="text-xs tracking-[0.25em] uppercase text-zinc-500 font-bold font-mono">
                SECURITY ARCHITECTURE // AGENT-V
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white font-mono uppercase">
              ZERO-COST VALIDATION AGENT ARCHITECTURE
            </h2>
            <p className="text-zinc-400 text-xs mt-2 max-w-2xl uppercase tracking-wide font-sans">
              Secure data exchange pipeline for Antigravity endpoints. Lightweight, local-first, and security-hardened verification logic.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-[#18181B] px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse glow-green" />
            <span>BUILD: 0.1.0-STABLE</span>
          </div>
        </div>

        {/* Interactive Architecture Flow Graph */}
        <div className="mt-8 overflow-x-auto pb-4">
          <div className="min-w-[850px] flex items-center justify-between space-x-2">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isSelected = node.id === selectedNodeId;

              return (
                <React.Fragment key={node.id}>
                  <button
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`flex-1 flex flex-col items-center p-3 rounded-xl transition-all border text-center relative group cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105 glow-green'
                        : 'bg-[#0A0A0B] border-[#18181B] text-zinc-400 hover:border-zinc-700 hover:bg-[#141417]'
                    }`}
                  >
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#18181B] border border-zinc-700 text-zinc-300 text-[10px] font-bold font-mono w-5 h-5 rounded-full flex items-center justify-center">
                      {node.number}
                    </div>
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mt-1 mb-2 ${
                        isSelected
                          ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/30'
                          : 'bg-[#18181B] text-zinc-400 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold font-mono leading-tight line-clamp-1 text-zinc-200">
                      {node.title}
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">{node.subtitle}</span>
                  </button>

                  {index < nodes.length - 1 && (
                    <div className="flex flex-col items-center justify-center px-1 text-zinc-600">
                      <ArrowRight className="w-4 h-4 text-emerald-500/60 animate-pulse" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Node Details Card */}
      <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center glow-green">
              {React.createElement(selectedNode.icon, { className: 'w-6 h-6' })}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  COMPONENT #{selectedNode.number}
                </span>
                <h3 className="text-base font-bold text-white font-mono uppercase">{selectedNode.title}</h3>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">{selectedNode.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-[#0A0A0B] rounded-xl p-4 border border-[#18181B]">
            <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest flex items-center space-x-2 mb-2">
              <Info className="w-4 h-4" />
              <span>Plain-English Description</span>
            </h4>
            <p className="text-zinc-300 text-xs leading-relaxed">{selectedNode.description}</p>
          </div>

          <div className="bg-[#0A0A0B] rounded-xl p-4 border border-[#18181B]">
            <h4 className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest flex items-center space-x-2 mb-2">
              <Cpu className="w-4 h-4" />
              <span>DevSecOps & Technical Role</span>
            </h4>
            <p className="text-zinc-300 text-xs leading-relaxed">{selectedNode.technicalRole}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#18181B] flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs text-zinc-400 font-mono font-bold uppercase">
            RECOMMENDED OPEN-SOURCE TOOLS:
          </span>
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            {selectedNode.freeToolsUsed.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 text-xs font-mono rounded bg-[#18181B] border border-zinc-800 text-zinc-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
