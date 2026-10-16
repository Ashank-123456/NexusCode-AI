"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Code2,
  Play,
  Sparkles,
  Terminal,
  Columns,
  LogOut,
  User,
  Check,
  RefreshCw,
  FolderGit2,
  ChevronDown,
  Wand2,
} from "lucide-react";

export default function IdeHeader({
  activeFile,
  isRunning,
  onRunCode,
  onFormatCode,
  aiOpen,
  setAiOpen,
  consoleOpen,
  setConsoleOpen,
}) {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 border-b border-white/[0.08] bg-[#070a12] flex items-center justify-between px-3 sm:px-4 z-40 select-none">
      {/* Left: Branding & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-indigo-600 to-sky-400 p-[1px] shadow-md shadow-indigo-500/20">
            <div className="h-full w-full bg-[#080c14] rounded-lg flex items-center justify-center">
              <Code2 className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <span className="font-bold text-sm tracking-tight text-white hidden sm:inline">
            NexusCode
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
            JS
          </span>
        </Link>

        <div className="h-4 w-[1px] bg-white/10 hidden md:block" />

        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <FolderGit2 className="w-3.5 h-3.5 text-slate-500" />
          <span>project</span>
          <span className="text-slate-600">/</span>
          <span>src</span>
          <span className="text-slate-600">/</span>
          <span className="text-indigo-300 font-medium">{activeFile}</span>
        </div>
      </div>

      {/* Center: Primary Run & Action Controls */}
      <div className="flex items-center gap-2">
        <button
          id="run-code-btn"
          onClick={onRunCode}
          disabled={isRunning}
          title="Run JavaScript (Cmd + Enter)"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 active:scale-95 transition-all disabled:opacity-50"
        >
          {isRunning ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
          <span>{isRunning ? "Running..." : "Run"}</span>
          <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.2 rounded text-[10px] bg-black/30 font-mono text-emerald-200">
            ⌘↵
          </kbd>
        </button>

        <button
          id="format-code-btn"
          onClick={onFormatCode}
          title="Auto-format JavaScript code"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
        >
          <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Format</span>
        </button>
      </div>

      {/* Right: View Toggles & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Toggle Console */}
        <button
          id="toggle-console-btn"
          onClick={() => setConsoleOpen(!consoleOpen)}
          title="Toggle Output Console"
          className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
            consoleOpen
              ? "bg-slate-800 border-white/20 text-white"
              : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span className="hidden lg:inline text-[11px]">Console</span>
        </button>

        {/* Toggle AI Copilot */}
        <button
          id="toggle-ai-btn"
          onClick={() => setAiOpen(!aiOpen)}
          title="Toggle AI Copilot"
          className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
            aiOpen
              ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-300 shadow-sm shadow-indigo-500/10"
              : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline text-[11px] font-medium">AI Copilot</span>
        </button>

        <div className="h-4 w-[1px] bg-white/10" />

        {/* User Account / Login State */}
        {user ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-slate-900 border border-white/10">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="text-xs text-slate-200 font-medium max-w-[80px] sm:max-w-[110px] truncate hidden sm:inline">
                {user.name}
              </span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono hidden md:inline">
                PRO
              </span>
            </div>

            <button
              id="logout-btn"
              onClick={logout}
              title="Sign Out to Login Page"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <Link
            id="nav-login-btn"
            href="/login"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-900 shadow-sm transition-all"
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign In with Google</span>
          </Link>
        )}
      </div>
    </header>
  );
}
