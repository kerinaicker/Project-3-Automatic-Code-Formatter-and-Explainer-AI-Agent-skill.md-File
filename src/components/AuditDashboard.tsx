import React, { useState, useEffect } from 'react';
import {
  History,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
  Trash2,
  Eye,
  Shield,
  FileText,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { AuditLogEntry, DecisionType } from '../types';

export const AuditDashboard: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterDecision, setFilterDecision] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);

  useEffect(() => {
    fetchAuditLogs();
  }, [filterDecision, searchTerm]);

  const fetchAuditLogs = async () => {
    setIsLoading(true);
    try {
      let url = '/api/audit-logs?';
      if (filterDecision !== 'ALL') url += `decision=${filterDecision}&`;
      if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;

      const res = await fetch(url);
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLogs = async () => {
    if (!window.confirm('Are you sure you want to clear all audit logs?')) return;
    try {
      await fetch('/api/audit-logs', { method: 'DELETE' });
      fetchAuditLogs();
    } catch (err) {
      console.error('Failed to clear logs:', err);
    }
  };

  const exportAuditReport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `pushguard_audit_report_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Stats calculation
  const total = logs.length;
  const accepted = logs.filter((l) => l.decision === 'ACCEPT').length;
  const rejected = logs.filter((l) => l.decision === 'REJECT').length;
  const flagged = logs.filter((l) => l.decision === 'FLAGGED').length;
  const acceptRate = total > 0 ? ((accepted / total) * 100).toFixed(1) : '100.0';

  return (
    <div className="space-y-6 font-sans">
      {/* Header & Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-4 text-white shadow-xl flex items-center justify-between font-mono">
          <div>
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">Total Scans</span>
            <span className="text-2xl font-black tracking-tight text-white">{total}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <History className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-4 text-white shadow-xl flex items-center justify-between font-mono">
          <div>
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">Acceptance Rate</span>
            <span className="text-2xl font-black tracking-tight text-emerald-400">{acceptRate}%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30 glow-green">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-4 text-white shadow-xl flex items-center justify-between font-mono">
          <div>
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">Rejected Threats</span>
            <span className="text-2xl font-black tracking-tight text-rose-400">{rejected}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/30">
            <XCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-4 text-white shadow-xl flex items-center justify-between font-mono">
          <div>
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">Flagged Anomalies</span>
            <span className="text-2xl font-black tracking-tight text-amber-400">{flagged}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Audit Log Table Container */}
      <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-6 text-white shadow-xl space-y-4">
        {/* Controls Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-[#18181B]">
          <div className="flex items-center space-x-2 w-full sm:w-auto font-mono">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search audit logs..."
                className="w-full bg-[#0A0A0B] border border-[#18181B] rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <select
              value={filterDecision}
              onChange={(e) => setFilterDecision(e.target.value)}
              className="bg-[#0A0A0B] border border-[#18181B] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
            >
              <option value="ALL">All Verdicts</option>
              <option value="ACCEPT">ACCEPT Only</option>
              <option value="REJECT">REJECT Only</option>
              <option value="FLAGGED">FLAGGED Only</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end font-mono">
            <button
              onClick={fetchAuditLogs}
              className="p-2 bg-[#18181B] hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs transition-colors border border-zinc-700 cursor-pointer"
              title="Refresh Logs"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={exportAuditReport}
              className="flex items-center space-x-1.5 px-3 py-2 bg-[#18181B] hover:bg-zinc-800 text-zinc-200 rounded-xl text-xs font-bold transition-colors border border-zinc-700 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={handleClearLogs}
              className="p-2 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 rounded-xl text-xs transition-colors border border-rose-800/60 cursor-pointer"
              title="Clear All Logs"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#18181B] text-zinc-500 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Audit ID</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">File Name</th>
                <th className="py-3 px-3">Decision</th>
                <th className="py-3 px-3">Risk</th>
                <th className="py-3 px-3">Threat Vectors</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18181B]/80 font-mono">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-zinc-500 font-sans">
                    No audit records found matching current criteria.
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const isAccept = log.decision === 'ACCEPT';
                  const isReject = log.decision === 'REJECT';

                  return (
                    <tr key={log.auditId} className="hover:bg-[#141417] transition-colors">
                      <td className="py-3 px-3 font-mono text-emerald-400 font-bold">{log.auditId}</td>
                      <td className="py-3 px-3 text-zinc-400 text-[11px]">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-3 font-bold text-zinc-200 truncate max-w-[180px]">
                        {log.fileName}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[10px] font-bold ${
                            isAccept
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : isReject
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {isAccept ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : isReject ? (
                            <XCircle className="w-3 h-3" />
                          ) : (
                            <AlertTriangle className="w-3 h-3" />
                          )}
                          <span>{log.decision}</span>
                        </span>
                      </td>
                      <td className="py-3 px-3 font-black">
                        <span
                          className={
                            log.overallRiskScore >= 70
                              ? 'text-rose-400'
                              : log.overallRiskScore >= 35
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }
                        >
                          {log.overallRiskScore}/100
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-1 flex-wrap gap-y-1">
                          {log.threatCategories.length === 0 ? (
                            <span className="text-[10px] text-zinc-500 italic">None</span>
                          ) : (
                            log.threatCategories.map((t) => (
                              <span
                                key={t}
                                className="px-1.5 py-0.5 text-[10px] rounded bg-rose-950/60 border border-rose-800/80 text-rose-300"
                              >
                                {t}
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="p-1.5 bg-[#18181B] hover:bg-zinc-800 text-zinc-200 rounded-lg text-xs transition-colors cursor-pointer"
                          title="Inspect Request"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl max-w-2xl w-full p-6 text-white space-y-4 shadow-2xl font-mono">
            <div className="flex items-center justify-between border-b border-[#18181B] pb-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm uppercase">Audit Inspector: {selectedLog.auditId}</h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-zinc-400 hover:text-white text-lg font-bold px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0A0A0B] p-3 rounded-xl border border-[#18181B] space-y-1">
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">FILE NAME</span>
                <span className="font-bold text-zinc-200">{selectedLog.fileName}</span>
              </div>
              <div className="bg-[#0A0A0B] p-3 rounded-xl border border-[#18181B] space-y-1">
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">VERDICT & RISK</span>
                <span className="font-bold text-emerald-400">
                  {selectedLog.decision} ({selectedLog.overallRiskScore}/100)
                </span>
              </div>
              <div className="bg-[#0A0A0B] p-3 rounded-xl border border-[#18181B] space-y-1">
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">MD5 CHECKSUM</span>
                <span className="text-zinc-300 text-[11px]">{selectedLog.fileChecksumMd5}</span>
              </div>
              <div className="bg-[#0A0A0B] p-3 rounded-xl border border-[#18181B] space-y-1">
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">LATENCY & ORIGIN</span>
                <span className="text-zinc-300 text-[11px]">
                  {selectedLog.executionTimeMs} ms | IP {selectedLog.clientIp}
                </span>
              </div>
            </div>

            <div className="bg-[#0A0A0B] p-4 rounded-xl border border-[#18181B] space-y-2 font-sans">
              <span className="text-xs font-bold text-emerald-400 font-mono block uppercase">AI Validation Explanation:</span>
              <p className="text-xs text-zinc-300 leading-relaxed">{selectedLog.reasoning}</p>
            </div>

            <div className="text-right pt-2 font-mono">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-[#18181B] hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
