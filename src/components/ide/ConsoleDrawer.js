"use client";

import React, { useState } from "react";
import {
  Terminal,
  Trash2,
  Copy,
  Check,
  ChevronDown,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";

export default function ConsoleDrawer({
  output,
  onClear,
  executionTime,
  hasError,
  isOpen,
  onToggle,
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = output.map((item) => `[${item.type}] ${item.text}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-56 sm:h-64 border-t border-white/[0.08] bg-[#070a12] flex flex-col font-mono text-xs select-none shrink-0 z-30">
      {/* Console Drawer Header */}
      <div className="h-9 px-3 bg-slate-950/90 border-b border-white/[0.08] flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-200 font-semibold text-xs">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Console &amp; Execution Output</span>
          </div>

          {executionTime !== null && (
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                hasError
                  ? "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                  : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
              }`}
            >
              {hasError ? (
                <>
                  <XCircle className="w-3 h-3 text-rose-400" />
                  <span>Execution Failed ({executionTime}ms)</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Success ({executionTime}ms)</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Copy Console Output"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClear}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Clear Console"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onToggle}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Close Drawer"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Console Output Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 bg-[#05080f]/90 select-text">
        {output.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 text-xs italic">
            <span>No execution output yet.</span>
            <span className="text-[11px] text-slate-700 mt-1">
              Click &quot;Run&quot; or press ⌘↵ to execute current JavaScript code.
            </span>
          </div>
        ) : (
          output.map((item, idx) => {
            switch (item.type) {
              case "error":
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded bg-rose-950/40 border border-rose-800/40 text-rose-300"
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                    <pre className="whitespace-pre-wrap font-mono leading-relaxed">{item.text}</pre>
                  </div>
                );
              case "warn":
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded bg-amber-950/40 border border-amber-800/40 text-amber-300"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <pre className="whitespace-pre-wrap font-mono leading-relaxed">{item.text}</pre>
                  </div>
                );
              case "result":
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold block">Return Value:</span>
                      <pre className="whitespace-pre-wrap font-mono leading-relaxed">{item.text}</pre>
                    </div>
                  </div>
                );
              default:
                return (
                  <div key={idx} className="flex items-start gap-2 text-slate-300 py-0.5 px-1 font-mono">
                    <span className="text-slate-600 select-none">&gt;</span>
                    <pre className="whitespace-pre-wrap leading-relaxed">{item.text}</pre>
                  </div>
                );
            }
          })
        )}
      </div>
    </div>
  );
}
