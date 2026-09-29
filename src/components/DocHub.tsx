import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Cpu,
  Layers,
  Shield,
  Terminal,
  Zap,
  HelpCircle,
  AlertOctagon,
  TrendingUp,
  FileText,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const DocHub: React.FC = () => {
  const [openSection, setOpenSection] = useState<string>('del-1');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? '' : id);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-6 text-white shadow-xl space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-emerald-500 rounded flex items-center justify-center font-bold text-black font-mono text-xs glow-green">
            AG
          </div>
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 font-bold font-mono block">
              TECHNICAL SPECIFICATIONS // DELIVERABLES
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white font-mono uppercase">
              PushGuard Agent Architecture & DevSecOps Deliverables
            </h2>
          </div>
        </div>
        <p className="text-zinc-400 text-xs font-mono pt-1">
          Complete 10-point technical documentation, open-source stack breakdown, security guardrails, and deployment guide for Antigravity.
        </p>
      </div>

      {/* Accordion List for 10 Deliverables */}
      <div className="space-y-4 font-sans">
        {/* Deliverable 1: High Level Architecture */}
        <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl text-white shadow-xl overflow-hidden">
          <button
            onClick={() => toggleSection('del-1')}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-[#141417] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs font-mono">
                01
              </span>
              <h3 className="font-bold text-sm font-mono uppercase tracking-wide">
                High-Level Architecture & Component Plain-English Explanations
              </h3>
            </div>
            {openSection === 'del-1' ? <ChevronDown className="w-5 h-5 text-zinc-400" /> : <ChevronRight className="w-5 h-5 text-zinc-400" />}
          </button>

          {openSection === 'del-1' && (
            <div className="p-5 border-t border-[#18181B] text-xs text-zinc-300 space-y-3 leading-relaxed bg-[#0A0A0B]">
              <p>
                The PushGuard architecture uses a zero-cost, lightweight agentic pipeline sitting directly in front of your core database or API endpoint.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#0F0F11] p-3 rounded-xl border border-[#18181B]">
                  <strong className="text-emerald-400 font-mono block mb-1">1. Source System:</strong> External client or webhook pushing incoming data files.
                </div>
                <div className="bg-[#0F0F11] p-3 rounded-xl border border-[#18181B]">
                  <strong className="text-emerald-400 font-mono block mb-1">2. API Gateway:</strong> Validates API keys (<code className="text-emerald-300">x-api-key</code>), enforces rate limits, checks file size limits.
                </div>
                <div className="bg-[#0F0F11] p-3 rounded-xl border border-[#18181B]">
                  <strong className="text-emerald-400 font-mono block mb-1">3. AI Validation Agent:</strong> Runs Ollama (local LLM) or Gemini Flash to evaluate contextual risk and structural anomalies.
                </div>
                <div className="bg-[#0F0F11] p-3 rounded-xl border border-[#18181B]">
                  <strong className="text-emerald-400 font-mono block mb-1">4. Validation Engine:</strong> Executes Pydantic schemas, Anti-SQLi, Anti-XSS, and ClamAV virus scans.
                </div>
                <div className="bg-[#0F0F11] p-3 rounded-xl border border-[#18181B]">
                  <strong className="text-emerald-400 font-mono block mb-1">5. Logging & Audit:</strong> Writes immutable audit logs with MD5/SHA256 checksums to SQLite.
                </div>
                <div className="bg-[#0F0F11] p-3 rounded-xl border border-[#18181B]">
                  <strong className="text-emerald-400 font-mono block mb-1">6. Target Endpoint:</strong> Receives clean, pre-sanitized payloads with zero threat exposure.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Deliverable 2 & 3: Agent Workflow & Validation Pipeline */}
        <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl text-white shadow-xl overflow-hidden">
          <button
            onClick={() => toggleSection('del-2')}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-[#141417] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs font-mono">
                02
              </span>
              <h3 className="font-bold text-sm font-mono uppercase tracking-wide">
                Step-by-Step Agent Workflow & Validation Pipeline
              </h3>
            </div>
            {openSection === 'del-2' ? <ChevronDown className="w-5 h-5 text-zinc-400" /> : <ChevronRight className="w-5 h-5 text-zinc-400" />}
          </button>

          {openSection === 'del-2' && (
            <div className="p-5 border-t border-[#18181B] text-xs text-zinc-300 space-y-3 leading-relaxed bg-[#0A0A0B]">
              <ol className="list-decimal pl-4 space-y-2 font-sans">
                <li><strong className="font-mono text-emerald-400">Ingress & Auth Check:</strong> Verify client authentication key and HMAC SHA256 signature.</li>
                <li><strong className="font-mono text-emerald-400">Format & Extension Guard:</strong> Block disallowed extensions (<code className="text-emerald-300">.exe, .sh, .bat</code>) and size limit violations.</li>
                <li><strong className="font-mono text-emerald-400">Structure & Syntax Parse:</strong> Validate JSON well-formedness and check Pydantic schemas for missing mandatory keys or invalid nulls.</li>
                <li><strong className="font-mono text-emerald-400">Static Security Pattern Scan:</strong> Execute regex scanners for SQL Injection, XSS script tags, path traversal, and shell execution commands.</li>
                <li><strong className="font-mono text-emerald-400">AI Agent Evaluation:</strong> AI agent computes risk score (0-100), logical reasoning, and remediation advice.</li>
                <li><strong className="font-mono text-emerald-400">Audit Persistence:</strong> Log timestamp, client IP, checksums, and result to SQLite database.</li>
                <li><strong className="font-mono text-emerald-400">Gate Routing:</strong> Forward payload to target endpoint if safe, or return HTTP 422 with remediation instructions.</li>
              </ol>
            </div>
          )}
        </div>

        {/* Deliverable 4: Recommended Free & Open-Source Tools */}
        <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl text-white shadow-xl overflow-hidden">
          <button
            onClick={() => toggleSection('del-4')}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-[#141417] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs font-mono">
                04
              </span>
              <h3 className="font-bold text-sm font-mono uppercase tracking-wide">
                Recommended Free & Open-Source Tools Stack
              </h3>
            </div>
            {openSection === 'del-4' ? <ChevronDown className="w-5 h-5 text-zinc-400" /> : <ChevronRight className="w-5 h-5 text-zinc-400" />}
          </button>

          {openSection === 'del-4' && (
            <div className="p-5 border-t border-[#18181B] text-xs text-zinc-300 space-y-3 leading-relaxed bg-[#0A0A0B]">
              <p>All recommended components carry permissive open-source licenses with $0 operating cost:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <li className="p-2.5 bg-[#0F0F11] rounded-xl border border-[#18181B] font-mono">
                  <strong className="text-emerald-400">FastAPI & Uvicorn:</strong> High performance Async Python Web Gateway.
                </li>
                <li className="p-2.5 bg-[#0F0F11] rounded-xl border border-[#18181B] font-mono">
                  <strong className="text-emerald-400">Pydantic v2:</strong> Data validation & typing enforcement.
                </li>
                <li className="p-2.5 bg-[#0F0F11] rounded-xl border border-[#18181B] font-mono">
                  <strong className="text-emerald-400">Ollama & Llama 3:</strong> Local open-source LLM agent runner.
                </li>
                <li className="p-2.5 bg-[#0F0F11] rounded-xl border border-[#18181B] font-mono">
                  <strong className="text-emerald-400">ClamAV Daemon:</strong> Open-source antivirus & malware signature engine.
                </li>
                <li className="p-2.5 bg-[#0F0F11] rounded-xl border border-[#18181B] font-mono">
                  <strong className="text-emerald-400">SQLite:</strong> Zero-maintenance embedded audit database.
                </li>
                <li className="p-2.5 bg-[#0F0F11] rounded-xl border border-[#18181B] font-mono">
                  <strong className="text-emerald-400">Docker & Docker Compose:</strong> Single-command containerization.
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Deliverable 6: Sample Input and Output Examples */}
        <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl text-white shadow-xl overflow-hidden">
          <button
            onClick={() => toggleSection('del-6')}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-[#141417] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs font-mono">
                06
              </span>
              <h3 className="font-bold text-sm font-mono uppercase tracking-wide">
                Example Input Payloads & Output Decision Formats
              </h3>
            </div>
            {openSection === 'del-6' ? <ChevronDown className="w-5 h-5 text-zinc-400" /> : <ChevronRight className="w-5 h-5 text-zinc-400" />}
          </button>

          {openSection === 'del-6' && (
            <div className="p-5 border-t border-[#18181B] text-xs text-zinc-300 space-y-4 bg-[#0A0A0B]">
              <div>
                <span className="text-rose-400 font-bold font-mono uppercase block mb-1">Malicious Input (SQL Injection):</span>
                <pre className="bg-[#0F0F11] p-3 rounded-xl border border-[#18181B] text-[11px] font-mono text-rose-300">
                  {`{
  "userId": "101'; DROP TABLE users; --",
  "username": "admin' OR '1'='1"
}`}
                </pre>
              </div>

              <div>
                <span className="text-emerald-400 font-bold font-mono uppercase block mb-1">Agent Response Output:</span>
                <pre className="bg-[#0F0F11] p-3 rounded-xl border border-[#18181B] text-[11px] font-mono text-emerald-300">
                  {`{
  "audit_id": "AUD-20260803-02",
  "decision": "REJECT",
  "risk_score": 95,
  "reasoning": "BLOCKED: Detected SQL injection attempt in field 'userId'.",
  "remediation_advice": "Sanitize inputs and remove SQL keywords.",
  "forwarded_to_endpoint": false
}`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Deliverable 7: Security Best Practices */}
        <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl text-white shadow-xl overflow-hidden">
          <button
            onClick={() => toggleSection('del-7')}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-[#141417] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs font-mono">
                07
              </span>
              <h3 className="font-bold text-sm font-mono uppercase tracking-wide">
                API Security Best Practices & Defense-in-Depth
              </h3>
            </div>
            {openSection === 'del-7' ? <ChevronDown className="w-5 h-5 text-zinc-400" /> : <ChevronRight className="w-5 h-5 text-zinc-400" />}
          </button>

          {openSection === 'del-7' && (
            <div className="p-5 border-t border-[#18181B] text-xs text-zinc-300 space-y-2 bg-[#0A0A0B]">
              <p>Key DevSecOps controls implemented in PushGuard:</p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                <li><strong className="text-emerald-400 font-mono">Strict Content-Type verification:</strong> Never trust file extensions alone; inspect MIME magic bytes.</li>
                <li><strong className="text-emerald-400 font-mono">HMAC SHA256 Signature Verification:</strong> Mitigates Man-In-The-Middle tampering.</li>
                <li><strong className="text-emerald-400 font-mono">Non-executable upload directory:</strong> Store files outside web root with <code className="text-emerald-300">noexec</code> mount flags.</li>
                <li><strong className="text-emerald-400 font-mono">Least-privilege API keys:</strong> Rotate secrets periodically and isolate gateway service accounts.</li>
                <li><strong className="text-emerald-400 font-mono">Zero-trust sanitization:</strong> Treat every external payload as potentially hostile until proven safe.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Deliverable 8 & 9: Limitations & Future Enhancements */}
        <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl text-white shadow-xl overflow-hidden">
          <button
            onClick={() => toggleSection('del-8')}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-[#141417] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs font-mono">
                08
              </span>
              <h3 className="font-bold text-sm font-mono uppercase tracking-wide">
                Limitations & Future Roadmap Enhancements
              </h3>
            </div>
            {openSection === 'del-8' ? <ChevronDown className="w-5 h-5 text-zinc-400" /> : <ChevronRight className="w-5 h-5 text-zinc-400" />}
          </button>

          {openSection === 'del-8' && (
            <div className="p-5 border-t border-[#18181B] text-xs text-zinc-300 space-y-3 bg-[#0A0A0B]">
              <div>
                <strong className="text-amber-400 font-mono uppercase block mb-1">Current Limitations:</strong>
                <p>Local LLM latency on low-spec hardware may add ~200ms per scan. High file throughput (&gt;1,000 req/sec) requires async queue worker distribution.</p>
              </div>
              <div>
                <strong className="text-emerald-400 font-mono uppercase block mb-1">Future Enhancement Roadmap:</strong>
                <p>1. Asynchronous Redis/Celery queue processing. 2. Automated fine-tuned anomaly models. 3. Prometheus metrics exporter & Grafana security alert dashboards.</p>
              </div>
            </div>
          )}
        </div>

        {/* Deliverable 10: Antigravity Deployment Instructions */}
        <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl text-white shadow-xl overflow-hidden">
          <button
            onClick={() => toggleSection('del-10')}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-[#141417] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs font-mono">
                10
              </span>
              <h3 className="font-bold text-sm font-mono uppercase tracking-wide">
                Deployment Instructions for Antigravity Platform
              </h3>
            </div>
            {openSection === 'del-10' ? <ChevronDown className="w-5 h-5 text-zinc-400" /> : <ChevronRight className="w-5 h-5 text-zinc-400" />}
          </button>

          {openSection === 'del-10' && (
            <div className="p-5 border-t border-[#18181B] text-xs text-zinc-300 space-y-3 bg-[#0A0A0B]">
              <p>Deploying PushGuard inside your Antigravity container workspace:</p>
              <pre className="bg-[#0F0F11] p-4 rounded-xl border border-[#18181B] font-mono text-emerald-300 text-[11px] leading-relaxed">
{`# 1. Clone repository into your Antigravity workspace:
git clone https://github.com/your-org/pushguard-agent.git
cd pushguard-agent

# 2. Build and run Docker container with zero configuration:
docker-compose up --build -d

# 3. Verify health endpoint:
curl http://localhost:8000/api/v1/health

# 4. Test push file validation endpoint:
curl -X POST http://localhost:8000/api/v1/validate-push \\
  -H "x-api-key: pushguard_secret_key_2026" \\
  -H "Content-Type: application/json" \\
  -d '{"file_name": "test.json", "file_content": "{\\"status\\": \\"ok\\"}"}'`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
