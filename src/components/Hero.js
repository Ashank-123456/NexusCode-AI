"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Copy, Check, Terminal, Play, Flame, Shield, Layers } from "lucide-react";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const commandText = "npm run dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="overview" className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[300px] bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-sky-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-sm shadow-inner shadow-indigo-500/10">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Next.js 16 + Tailwind CSS v4 + Modern JavaScript</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
          Build Lightning-Fast Web Apps with{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
            Pure JavaScript & Tailwind
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300/90 max-w-2xl mx-auto font-normal leading-relaxed">
          A high-performance foundation configured with App Router, zero-runtime Tailwind v4 styling, and server-first architecture. Ready for production.
        </p>

        {/* Interactive action buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <a
            id="explore-playground-btn"
            href="#playground"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Explore Interactive Demo
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Quick copy command bar */}
          <div className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/60 shadow-inner">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>{commandText}</span>
            </div>
            <button
              id="copy-dev-cmd-btn"
              onClick={handleCopy}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="mt-16 pt-10 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Turbopack
            </span>
            <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Instant Bundling
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Tailwind v4
            </span>
            <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Zero Config CSS
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
              JavaScript
            </span>
            <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Native ES2024
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              App Router
            </span>
            <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              React 19 Architecture
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
