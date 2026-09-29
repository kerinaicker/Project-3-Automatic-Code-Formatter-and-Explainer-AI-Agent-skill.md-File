import React, { useState, useEffect } from 'react';
import { Code2, Copy, Check, Download, FileCode2, Terminal, Sparkles } from 'lucide-react';

interface CodeFile {
  filename: string;
  description: string;
  code: string;
}

export const CodeViewer: React.FC = () => {
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCode();
  }, []);

  const fetchCode = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/python-code');
      const data: CodeFile[] = await res.json();
      setFiles(data);
    } catch (err) {
      console.error('Failed to load python code:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!files[activeFileIndex]) return;
    navigator.clipboard.writeText(files[activeFileIndex].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const current = files[activeFileIndex];
    if (!current) return;

    const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(current.code);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', current.filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (isLoading || files.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400">
        <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin inline-block mb-2" />
        <p className="text-sm">Loading Python source code deliverables...</p>
      </div>
    );
  }

  const currentFile = files[activeFileIndex];

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-[#0F0F11] border border-[#18181B] rounded-2xl p-6 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#18181B] pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 glow-green" />
              <Code2 className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold tracking-wider font-mono uppercase text-white">
                Minimum Viable Python Implementation
              </h2>
            </div>
            <p className="text-zinc-400 text-xs mt-1 font-mono">
              Production-ready Python code built with FastAPI, Pydantic, Ollama, and SQLite with zero recurring licensing cost.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono">
            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-1.5 px-3 py-2 bg-[#18181B] hover:bg-zinc-800 text-zinc-200 rounded-xl text-xs font-bold transition-colors border border-zinc-700 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{copied ? 'COPIED!' : 'COPY CODE'}</span>
            </button>

            <button
              onClick={handleDownloadFile}
              className="flex items-center space-x-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-xs font-extrabold uppercase shadow-lg shadow-emerald-500/20 transition-all cursor-pointer glow-green"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD</span>
            </button>
          </div>
        </div>

        {/* File Tabs */}
        <div className="flex overflow-x-auto space-x-2 pt-2 pb-2 border-b border-[#18181B] scrollbar-none font-mono">
          {files.map((file, index) => (
            <button
              key={file.filename}
              onClick={() => setActiveFileIndex(index)}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeFileIndex === index
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold'
                  : 'bg-[#0A0A0B] border border-[#18181B] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>{file.filename}</span>
            </button>
          ))}
        </div>

        {/* File Description */}
        <div className="px-3 py-2 bg-[#0A0A0B] rounded-xl border border-[#18181B] text-xs text-zinc-300 font-mono flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{currentFile.description}</span>
        </div>

        {/* Code View Box */}
        <div className="relative bg-[#0A0A0B] border border-[#18181B] rounded-2xl overflow-hidden shadow-2xl">
          <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-[500px]">
            <code>{currentFile.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
