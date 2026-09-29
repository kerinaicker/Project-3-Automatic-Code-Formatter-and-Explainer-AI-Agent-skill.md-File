import React, { useState } from 'react';
import {
  FileText,
  ShieldAlert,
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Key,
  Lock,
  Code2,
  Sparkles,
  Info,
  Clock,
  Hash,
  Download,
  Upload,
} from 'lucide-react';
import { SampleTestCase, ValidationRequest, ValidationResponse, ValidationStepResult } from '../types';
import { SAMPLE_TEST_CASES } from '../sampleData';

interface ValidationWorkbenchProps {
  onValidationComplete: () => void;
}

export const ValidationWorkbench: React.FC<ValidationWorkbenchProps> = ({ onValidationComplete }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(SAMPLE_TEST_CASES[0].id);
  const [fileName, setFileName] = useState<string>(SAMPLE_TEST_CASES[0].fileName);
  const [mimeType, setMimeType] = useState<string>(SAMPLE_TEST_CASES[0].mimeType);
  const [fileContent, setFileContent] = useState<string>(SAMPLE_TEST_CASES[0].fileContent);
  const [apiKey, setApiKey] = useState<string>(SAMPLE_TEST_CASES[0].apiKey || 'pushguard_secret_key_2026');
  const [signature, setSignature] = useState<string>(SAMPLE_TEST_CASES[0].signature || '');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ValidationResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSelectTestCase = (testCase: SampleTestCase) => {
    setSelectedCaseId(testCase.id);
    setFileName(testCase.fileName);
    setMimeType(testCase.mimeType);
    setFileContent(testCase.fileContent);
    setApiKey(testCase.apiKey || 'pushguard_secret_key_2026');
    setSignature(testCase.signature || '');
    setResult(null);
    setErrorMsg(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setMimeType(file.type || 'text/plain');
    setSelectedCaseId('custom');

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setFileContent(text || '');
    };
    reader.readAsText(file);
  };

  const runValidationScan = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const reqPayload: ValidationRequest = {
        fileName,
        fileContent,
        mimeType,
        apiKey,
        signature,
      };

      const res = await fetch('/api/validate-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'x-signature': signature,
        },
        body: JSON.stringify(reqPayload),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
      }

      const data: ValidationResponse = await res.json();
      setResult(data);
      onValidationComplete();
    } catch (err: any) {
      console.error('Validation scan error:', err);
      setErrorMsg(err.message || 'Failed to communicate with PushGuard AI Agent endpoint.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Test Cases Selector Bar */}
      <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-5 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#18181B]">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 glow-green" />
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
              Push Security Scenarios Library
            </h3>
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            Select an attack/valid payload sample or upload custom push data:
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SAMPLE_TEST_CASES.map((tc) => {
            const isSelected = selectedCaseId === tc.id;
            const isAccept = tc.expectedDecision === 'ACCEPT';

            return (
              <button
                key={tc.id}
                onClick={() => handleSelectTestCase(tc)}
                className={`p-3 rounded-xl text-left border transition-all relative cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                    : 'bg-[#0A0A0B] border-[#18181B] text-zinc-300 hover:border-zinc-700 hover:bg-[#141417]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold font-mono text-zinc-200 line-clamp-1">{tc.title}</span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      isAccept
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    EXPECT {tc.expectedDecision}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">{tc.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Testing Workbench Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Payload Editor & Headers (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-5 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#18181B] pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm uppercase tracking-wider font-mono text-white">
                  Incoming Push Payload Editor
                </h3>
              </div>

              {/* Upload Button */}
              <label className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#18181B] hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Upload File</span>
                <input type="file" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {/* Metadata Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">File Name</label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#18181B] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                  placeholder="order_batch.json"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">MIME Type</label>
                <input
                  type="text"
                  value={mimeType}
                  onChange={(e) => setMimeType(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#18181B] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                  placeholder="application/json"
                />
              </div>
            </div>

            {/* Security Headers */}
            <div className="bg-[#0A0A0B] p-3 rounded-xl border border-[#18181B] space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>API Gateway Security Headers</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 mb-1">
                    API KEY (<code className="text-emerald-300">x-api-key</code>)
                  </label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-[#0F0F11] border border-[#18181B] rounded-lg px-3 py-1.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-emerald-500"
                    placeholder="pushguard_secret_key_2026"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 mb-1">
                    HMAC SIGNATURE (<code className="text-emerald-300">x-signature</code>)
                  </label>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full bg-[#0F0F11] border border-[#18181B] rounded-lg px-3 py-1.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-emerald-500"
                    placeholder="7e2f18391b..."
                  />
                </div>
              </div>
            </div>

            {/* File Content Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1 font-mono text-[11px]">
                <label className="block text-zinc-400 uppercase font-bold">File Payload Content</label>
                <span className="text-zinc-500">
                  {new TextEncoder().encode(fileContent).length} BYTES
                </span>
              </div>
              <textarea
                rows={12}
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-[#18181B] rounded-xl p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500 leading-relaxed resize-y"
                placeholder="Paste JSON, CSV, XML or payload..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-2 font-mono">
              <button
                onClick={runValidationScan}
                disabled={isLoading}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 cursor-pointer glow-green"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Agent Verification...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-black" />
                    <span>Validate Push Payload</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setFileContent('');
                  setResult(null);
                }}
                className="px-4 py-2.5 bg-[#18181B] hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-mono transition-colors border border-zinc-700 cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Validation Result & Step Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {!result && !isLoading && !errorMsg && (
            <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-8 text-center text-zinc-400 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#18181B] flex items-center justify-center mx-auto text-emerald-400 border border-zinc-800">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Ready for Security Scan</h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Click "Validate Push Payload" to initiate gateway auth check, HMAC signature check, schema strictness, anti-SQLi/XSS, and AI verification.
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="bg-rose-950/40 border border-rose-800/80 rounded-2xl p-4 text-rose-300 text-xs flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-sm font-mono uppercase">Validation Failed</span>
                <p className="mt-1">{errorMsg}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4 font-mono">
              {/* Verdict Summary Header Box */}
              <div
                className={`p-5 rounded-2xl border text-white shadow-xl ${
                  result.decision === 'ACCEPT'
                    ? 'bg-gradient-to-br from-emerald-950/40 to-[#0F0F11] border-emerald-500/50 glow-green'
                    : result.decision === 'FLAGGED'
                    ? 'bg-gradient-to-br from-amber-950/40 to-[#0F0F11] border-amber-500/50'
                    : 'bg-gradient-to-br from-rose-950/40 to-[#0F0F11] border-rose-500/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {result.decision === 'ACCEPT' ? (
                      <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                    ) : result.decision === 'FLAGGED' ? (
                      <AlertTriangle className="w-7 h-7 text-amber-400" />
                    ) : (
                      <XCircle className="w-7 h-7 text-rose-400" />
                    )}

                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">
                        Agent Verdict
                      </span>
                      <h3 className="text-base font-extrabold tracking-tight">
                        {result.decision === 'ACCEPT'
                          ? 'ACCEPTED - SAFE FOR ENDPOINT'
                          : result.decision === 'FLAGGED'
                          ? 'FLAGGED - SUSPICIOUS ANOMALY'
                          : 'REJECTED - SECURITY THREAT'}
                      </h3>
                    </div>
                  </div>

                  {/* Risk Gauge Badge */}
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 block uppercase font-mono">Risk Score</span>
                    <span
                      className={`text-lg font-black font-mono ${
                        result.overallRiskScore >= 70
                          ? 'text-rose-400'
                          : result.overallRiskScore >= 35
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {result.overallRiskScore}/100
                    </span>
                  </div>
                </div>

                {/* Reasoning */}
                <p className="text-xs text-zinc-200 leading-relaxed bg-[#0A0A0B] p-3 rounded-xl border border-[#18181B] font-sans">
                  <strong className="text-emerald-400 font-mono text-[11px] uppercase block mb-1">AI Agent Explanation: </strong>
                  {result.reasoning}
                </p>

                {/* Remediation Advice if Rejected */}
                {result.remediationAdvice && result.decision !== 'ACCEPT' && (
                  <div className="mt-3 p-3 bg-rose-950/30 border border-rose-800/40 rounded-xl text-xs text-rose-200 font-sans">
                    <strong className="text-rose-400 font-mono text-[11px] block mb-0.5 uppercase">Remediation Action:</strong>
                    {result.remediationAdvice}
                  </div>
                )}

                {/* Metadata row */}
                <div className="mt-3 pt-3 border-t border-[#18181B] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>AUDIT ID: {result.auditId}</span>
                  <span>ENDPOINT FORWARD: {result.forwardedToEndpoint ? 'YES' : 'NO (BLOCKED)'}</span>
                </div>
              </div>

              {/* Checksum Hashes */}
              <div className="bg-[#0F0F11] border border-[#18181B] rounded-xl p-3 text-white text-xs font-mono space-y-1">
                <div className="flex items-center space-x-1.5 text-zinc-400 font-bold mb-1 uppercase text-[10px] tracking-wider">
                  <Hash className="w-3.5 h-3.5 text-emerald-400" />
                  <span>File Integrity Fingerprints</span>
                </div>
                <div className="text-[11px] text-zinc-300">
                  <span className="text-zinc-500">MD5:</span> {result.fileChecksums.md5}
                </div>
                <div className="text-[11px] text-zinc-300 truncate">
                  <span className="text-zinc-500">SHA256:</span> {result.fileChecksums.sha256}
                </div>
              </div>

              {/* Step-by-Step Validation Pipeline Breakdown */}
              <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-5 text-white shadow-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest flex items-center space-x-2 text-zinc-300 font-mono">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Validation Pipeline ({result.steps.length} Checks)</span>
                </h4>

                <div className="space-y-2">
                  {result.steps.map((step, idx) => {
                    const isPass = step.status === 'pass';
                    const isFail = step.status === 'fail';
                    const isWarn = step.status === 'warn';

                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#0A0A0B] border border-[#18181B] space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center space-x-2">
                            {isPass ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : isFail ? (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            ) : isWarn ? (
                              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                            ) : (
                              <Info className="w-4 h-4 text-blue-400 shrink-0" />
                            )}
                            <span className="font-bold text-zinc-200">{step.checkName}</span>
                          </div>

                          <span className="text-[10px] font-mono text-zinc-500">
                            {step.executionTimeMs} ms
                          </span>
                        </div>

                        <p className="text-[11px] text-zinc-400 pl-6 leading-relaxed font-sans">{step.detail}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
