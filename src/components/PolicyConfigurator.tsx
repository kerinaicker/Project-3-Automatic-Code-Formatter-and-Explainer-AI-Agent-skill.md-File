import React, { useState, useEffect } from 'react';
import { Sliders, Save, ShieldCheck, Key, Lock, FileCode, CheckCircle2, AlertCircle } from 'lucide-react';
import { SecurityPolicyConfig } from '../types';

export const PolicyConfigurator: React.FC = () => {
  const [config, setConfig] = useState<SecurityPolicyConfig | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/config');
      const data: SecurityPolicyConfig = await res.json();
      setConfig(data);
    } catch (err) {
      console.error('Failed to load config:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = async () => {
    if (!config) return;
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        setStatusMessage('Security Policy saved & deployed to AI Validation Agent!');
        setTimeout(() => setStatusMessage(null), 4000);
      }
    } catch (err) {
      console.error('Error saving config:', err);
      setStatusMessage('Error saving configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !config) {
    return (
      <div className="p-8 text-center text-slate-400">
        <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin inline-block mb-2" />
        <p className="text-sm">Loading security policy settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-6 text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#18181B] pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 glow-green" />
              <Sliders className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold tracking-wider font-mono uppercase text-white">
                Security Policy & Guardrail Configuration
              </h2>
            </div>
            <p className="text-zinc-400 text-xs mt-1 font-mono">
              Customize real-time validation constraints, API key secrets, scanner rules, and AI strictness levels.
            </p>
          </div>

          <button
            onClick={handleSaveConfig}
            disabled={isSaving}
            className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50 glow-green"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Deploying...' : 'Deploy Security Policy'}</span>
          </button>
        </div>

        {statusMessage && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-mono flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 1: Authentication & Integrity */}
          <div className="bg-[#0A0A0B] p-5 rounded-2xl border border-[#18181B] space-y-4">
            <h3 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest flex items-center space-x-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>1. Authentication & Integrity Controls</span>
            </h3>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Shared API Key Secret (<code className="text-emerald-300">x-api-key</code>)
              </label>
              <input
                type="text"
                value={config.apiKeySecret}
                onChange={(e) => setConfig({ ...config, apiKeySecret: e.target.value })}
                className="w-full bg-[#0F0F11] border border-[#18181B] rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                Incoming requests must supply this key in headers to pass gateway validation.
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs font-bold font-mono text-zinc-200 uppercase block">Require HMAC SHA256 Signature</span>
                <span className="text-[11px] text-zinc-400">
                  Enforces signature integrity verification on every incoming push payload.
                </span>
              </div>
              <input
                type="checkbox"
                checked={config.requireSignature}
                onChange={(e) => setConfig({ ...config, requireSignature: e.target.checked })}
                className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Rate Limit Threshold (Requests per minute)
              </label>
              <input
                type="number"
                value={config.rateLimitRpm}
                onChange={(e) => setConfig({ ...config, rateLimitRpm: parseInt(e.target.value) || 60 })}
                className="w-full bg-[#0F0F11] border border-[#18181B] rounded-xl px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Section 2: File Size & Allowed Extension Restrictions */}
          <div className="bg-[#0A0A0B] p-5 rounded-2xl border border-[#18181B] space-y-4">
            <h3 className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest flex items-center space-x-2">
              <FileCode className="w-4 h-4" />
              <span>2. Payload Constraints & Format Policy</span>
            </h3>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Max File Size Limit (MB)
              </label>
              <input
                type="number"
                value={config.maxFileSizeBytes / (1024 * 1024)}
                onChange={(e) =>
                  setConfig({ ...config, maxFileSizeBytes: (parseFloat(e.target.value) || 1) * 1024 * 1024 })
                }
                className="w-full bg-[#0F0F11] border border-[#18181B] rounded-xl px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Allowed File Extensions (Comma separated)
              </label>
              <input
                type="text"
                value={config.allowedExtensions.join(', ')}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    allowedExtensions: e.target.value.split(',').map((s) => s.trim().toLowerCase()),
                  })
                }
                className="w-full bg-[#0F0F11] border border-[#18181B] rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs font-bold font-mono text-zinc-200 uppercase block">Strict Schema Validation</span>
                <span className="text-[11px] text-zinc-400">
                  Rejects payloads containing invalid structures or missing mandatory attributes.
                </span>
              </div>
              <input
                type="checkbox"
                checked={config.strictSchema}
                onChange={(e) => setConfig({ ...config, strictSchema: e.target.checked })}
                className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Section 3: Threat Scanners */}
          <div className="bg-[#0A0A0B] p-5 rounded-2xl border border-[#18181B] space-y-4">
            <h3 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span>3. Threat Scanner Rules</span>
            </h3>

            <div className="space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-300 font-bold uppercase">Detect SQL Injection (Anti-SQLi)</span>
                <input
                  type="checkbox"
                  checked={config.detectSqlInjection}
                  onChange={(e) => setConfig({ ...config, detectSqlInjection: e.target.checked })}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-300 font-bold uppercase">Detect Cross-Site Scripting (Anti-XSS)</span>
                <input
                  type="checkbox"
                  checked={config.detectXss}
                  onChange={(e) => setConfig({ ...config, detectXss: e.target.checked })}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-300 font-bold uppercase">ClamAV & Command Injection Scan</span>
                <input
                  type="checkbox"
                  checked={config.detectMalware}
                  onChange={(e) => setConfig({ ...config, detectMalware: e.target.checked })}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Section 4: AI Agent Sensitivity */}
          <div className="bg-[#0A0A0B] p-5 rounded-2xl border border-[#18181B] space-y-4">
            <h3 className="text-xs font-bold font-mono text-amber-400 uppercase tracking-widest flex items-center space-x-2">
              <Sliders className="w-4 h-4" />
              <span>4. AI Validation Sensitivity</span>
            </h3>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-2">
                Sensitivity Mode
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono">
                {(['LENIENT', 'BALANCED', 'STRICT'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setConfig({ ...config, aiStrictness: mode })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      config.aiStrictness === mode
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                        : 'bg-[#0F0F11] border-[#18181B] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 font-sans">
                {config.aiStrictness === 'LENIENT'
                  ? 'Passes subtle anomalies unless direct malicious patterns exist.'
                  : config.aiStrictness === 'BALANCED'
                  ? 'Optimal DevSecOps threshold. Flags suspicious structure while avoiding false positives.'
                  : 'Rejects payloads with minor format irregularities or potential logical risks.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
