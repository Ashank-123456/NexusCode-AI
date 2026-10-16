"use client";

import React, { useState } from "react";
import { Sparkles, Terminal, Code2, ExternalLink, Activity } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#090d16]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-sky-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="h-full w-full bg-[#090d16] rounded-xl flex items-center justify-center">
                <Code2 className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                NextStack
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                JS + Tailwind
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#overview" className="hover:text-white transition-colors">
              Overview
            </a>
            <a href="#playground" className="hover:text-white transition-colors">
              Playground
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#terminal" className="hover:text-white transition-colors">
              CLI Quickstart
            </a>
          </nav>

          {/* Status & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Dev Server Active</span>
            </div>

            <a
              id="docs-header-btn"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/[0.1] transition-all"
            >
              Next.js Docs
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              <Activity className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 flex flex-col gap-3 text-sm text-slate-300">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white px-2 py-1"
            >
              Overview
            </a>
            <a
              href="#playground"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white px-2 py-1"
            >
              Playground
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white px-2 py-1"
            >
              Features
            </a>
            <a
              href="#terminal"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white px-2 py-1"
            >
              CLI Quickstart
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
