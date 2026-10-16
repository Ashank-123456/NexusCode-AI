"use client";

import React, { useState } from "react";
import {
  Folder,
  FileCode,
  Plus,
  Trash2,
  Bookmark,
  Settings,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Zap,
} from "lucide-react";

export default function FileSidebar({
  files,
  activeFile,
  onSelectFile,
  onCreateFile,
  onDeleteFile,
  onLoadSnippet,
}) {
  const [activeTab, setActiveTab] = useState("files"); // 'files' | 'snippets'
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const snippets = [
    {
      title: "Async Retry with Backoff",
      desc: "Robust resilient fetch logic",
      code: `// Resilient Async Retry with Exponential Backoff
async function fetchWithRetry(url, retries = 3, delay = 500) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(\`[Attempt \${attempt}] Fetching \${url}...\`);
      // Simulating network fetch
      if (Math.random() < 0.4 && attempt < retries) {
        throw new Error("Temporary 503 Service Unavailable");
      }
      return { status: 200, data: { message: "Success!", timestamp: Date.now() } };
    } catch (err) {
      console.warn(\`Attempt \${attempt} failed: \${err.message}\`);
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, delay * Math.pow(2, attempt - 1)));
    }
  }
}

fetchWithRetry("https://api.nexuscode.dev/status")
  .then(res => console.log("Final Result:", res))
  .catch(err => console.error("All retries exhausted:", err));`,
    },
    {
      title: "Debounce Function",
      desc: "Performance rate limiting",
      code: `// Debounce implementation for input rate limiting
function debounce(fn, delay = 300) {
  let timerId = null;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const onSearchInput = debounce((query) => {
  console.log("Triggering debounced search query for:", query);
}, 200);

// Simulate typing events
onSearchInput("N");
onSearchInput("Ne");
onSearchInput("Nex");
onSearchInput("NexusCode");`,
    },
    {
      title: "Fibonacci Memoized",
      desc: "O(n) recursive dynamic programming",
      code: `// O(n) Memoized Fibonacci
function memoizedFibonacci() {
  const cache = new Map();

  function fib(n) {
    if (n <= 1) return n;
    if (cache.has(n)) return cache.get(n);

    const val = fib(n - 1) + fib(n - 2);
    cache.set(n, val);
    return val;
  }

  return fib;
}

const fib = memoizedFibonacci();
console.log("Fib(10):", fib(10));
console.log("Fib(30):", fib(30));
console.log("Fib(50):", fib(50));`,
    },
    {
      title: "Deep Object Clone",
      desc: "Structured cloning utility",
      code: `// Deep Clone with structuredClone or recursive fallback
function deepClone(obj) {
  if (typeof structuredClone === "function") {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}

const original = {
  project: "NexusCode IDE",
  runtime: "JavaScript (V8)",
  config: { threads: 4, aiEnabled: true }
};

const copy = deepClone(original);
copy.config.aiEnabled = false;

console.log("Original object config:", original.config);
console.log("Cloned object config:", copy.config);`,
    },
  ];

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    const name = newFileName.endsWith(".js") ? newFileName.trim() : `${newFileName.trim()}.js`;
    onCreateFile(name);
    setNewFileName("");
    setIsCreating(false);
  };

  return (
    <div className="w-56 sm:w-64 border-r border-white/[0.08] bg-[#070a12] flex flex-col h-full select-none shrink-0">
      {/* Top Tabs */}
      <div className="flex items-center border-b border-white/[0.08] text-xs font-medium text-slate-400">
        <button
          onClick={() => setActiveTab("files")}
          className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "files"
              ? "text-white border-b-2 border-indigo-500 bg-white/[0.02]"
              : "hover:text-slate-200"
          }`}
        >
          <Folder className="w-3.5 h-3.5 text-indigo-400" />
          <span>Explorer</span>
        </button>
        <button
          onClick={() => setActiveTab("snippets")}
          className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "snippets"
              ? "text-white border-b-2 border-indigo-500 bg-white/[0.02]"
              : "hover:text-slate-200"
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 text-amber-400" />
          <span>Snippets</span>
        </button>
      </div>

      {/* Explorer Content */}
      {activeTab === "files" && (
        <div className="flex-1 flex flex-col overflow-y-auto p-2">
          {/* Header & New File Button */}
          <div className="flex items-center justify-between px-2 py-1 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            <span>Files</span>
            <button
              onClick={() => setIsCreating(true)}
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
              title="Add New JavaScript File"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* New File Inline Input */}
          {isCreating && (
            <form onSubmit={handleCreateSubmit} className="px-2 py-1.5 mb-1">
              <input
                autoFocus
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onBlur={() => {
                  if (!newFileName) setIsCreating(false);
                }}
                placeholder="name.js"
                className="w-full bg-slate-900 border border-indigo-500/50 rounded px-2 py-1 text-xs text-white focus:outline-none"
              />
            </form>
          )}

          {/* File List */}
          <div className="space-y-0.5 mt-1">
            {Object.keys(files).map((fileName) => {
              const isActive = activeFile === fileName;
              return (
                <div
                  key={fileName}
                  onClick={() => onSelectFile(fileName)}
                  className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                    isActive
                      ? "bg-indigo-600/20 text-white font-medium border border-indigo-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-amber-400" : "text-amber-500/60"}`} />
                    <span className="truncate">{fileName}</span>
                  </div>

                  {Object.keys(files).length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFile(fileName);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-400 rounded transition-opacity"
                      title="Delete file"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Snippets Content */}
      {activeTab === "snippets" && (
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          <div className="px-2 py-1 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            Quick JS Templates
          </div>
          {snippets.map((snip, index) => (
            <div
              key={index}
              onClick={() => onLoadSnippet(snip.code)}
              className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-indigo-950/40 border border-white/5 hover:border-indigo-500/30 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300">
                  {snip.title}
                </span>
                <Zap className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{snip.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Language Info */}
      <div className="p-3 border-t border-white/[0.08] text-[11px] text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>V8 Engine Ready</span>
        </span>
        <span className="font-mono text-slate-400">ES2024</span>
      </div>
    </div>
  );
}
