"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Play, ExternalLink } from "lucide-react";

export default function TerminalQuickstart() {
  const [activeTab, setActiveTab] = useState("dev");
  const [copied, setCopied] = useState(false);

  const scripts = {
    dev: {
      cmd: "npm run dev",
      desc: "Starts the Next.js local development server with Turbopack fast refresh at http://localhost:3000"
    },
    build: {
      cmd: "npm run build",
      desc: "Compiles production-optimized bundles with zero-overhead server rendering"
    },
    start: {
      cmd: "npm run start",
      desc: "Runs the compiled production server ready for high-traffic deployment"
    },
    lint: {
      cmd: "npm run lint",
      desc: "Executes ESLint to check syntax rules and maintain code quality"
    }
  };

  const current = scripts[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Terminal Window Header */}
          <div className="px-5 py-3.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 font-mono text-xs text-slate-400">bash — project-workspace</span>
            </div>
            <div className="flex items-center gap-1">
              {Object.keys(scripts).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    setCopied(false);
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                    activeTab === key
                      ? "bg-white/10 text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-8 bg-slate-950/80 font-mono text-xs sm:text-sm">
            <div className="text-slate-500 mb-3">// {current.desc}</div>
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-white/5">
              <div className="flex items-center gap-3 text-emerald-400 overflow-x-auto">
                <span className="text-slate-500 select-none">$</span>
                <span className="text-slate-100 font-semibold">{current.cmd}</span>
              </div>
              <button
                id="copy-terminal-script-btn"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Next.js 16.4</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Tailwind CSS 4.x</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>React 19</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>Pure JavaScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
