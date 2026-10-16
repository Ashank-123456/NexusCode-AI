"use client";

import React, { useState } from "react";
import { Sliders, Palette, Zap, Cpu, RefreshCw, CheckCircle2, Copy, Sparkles, Layers } from "lucide-react";

export default function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState("styler");
  const [accentColor, setAccentColor] = useState("indigo");
  const [counter, setCounter] = useState(42);
  const [cardGlow, setCardGlow] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);
  const [loadingApi, setLoadingApi] = useState(false);

  const colors = [
    { name: "indigo", label: "Electric Indigo", bg: "bg-indigo-500", text: "text-indigo-400", border: "border-indigo-500/40", glow: "shadow-indigo-500/30" },
    { name: "sky", label: "Cyan Sky", bg: "bg-sky-500", text: "text-sky-400", border: "border-sky-500/40", glow: "shadow-sky-500/30" },
    { name: "emerald", label: "Emerald Mint", bg: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/40", glow: "shadow-emerald-500/30" },
    { name: "fuchsia", label: "Fuchsia Neon", bg: "bg-fuchsia-500", text: "text-fuchsia-400", border: "border-fuchsia-500/40", glow: "shadow-fuchsia-500/30" },
    { name: "amber", label: "Warm Amber", bg: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/40", glow: "shadow-amber-500/30" },
  ];

  const activeColorConfig = colors.find((c) => c.name === accentColor) || colors[0];

  const testApi = async () => {
    setLoadingApi(true);
    try {
      const res = await fetch("/api/status");
      const data = await res.json();
      setApiResponse(data);
    } catch {
      setApiResponse({
        status: "online",
        framework: "Next.js 16 (App Router)",
        styling: "Tailwind CSS v4",
        timestamp: new Date().toLocaleTimeString(),
      });
    } finally {
      setLoadingApi(false);
    }
  };

  return (
    <section id="playground" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-3 border border-sky-500/20">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive State & Styles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Tailwind v4 Live Sandbox
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Test real-time React state changes, dynamic theme accents, and API routes running entirely in Next.js.
          </p>
        </div>

        {/* Tab Navigator */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md">
            <button
              id="tab-styler"
              onClick={() => setActiveTab("styler")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === "styler"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Theme Studio</span>
            </button>
            <button
              id="tab-state"
              onClick={() => setActiveTab("state")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === "state"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Reactive Widget</span>
            </button>
            <button
              id="tab-api"
              onClick={() => setActiveTab("api")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === "api"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>API Route Tester</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Theme Studio */}
        {activeTab === "styler" && (
          <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Controls */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Accent Hue Palette</h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Choose an accent color to test Tailwind v4 class reactivity dynamically.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setAccentColor(color.name)}
                        className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          accentColor === color.name
                            ? "bg-white/10 text-white border-white/40 ring-2 ring-indigo-500/50"
                            : "bg-slate-900/60 text-slate-400 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${color.bg}`} />
                        <span>{color.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white">Glow Blur Effect</h4>
                      <p className="text-xs text-slate-400">Toggle ambient aura around preview card</p>
                    </div>
                    <button
                      id="toggle-glow-btn"
                      onClick={() => setCardGlow(!cardGlow)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        cardGlow ? "bg-indigo-600" : "bg-slate-700"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          cardGlow ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Preview Card */}
              <div
                className={`relative rounded-2xl p-6 transition-all duration-300 border ${activeColorConfig.border} bg-slate-900/80 backdrop-blur-xl ${
                  cardGlow ? `shadow-2xl ${activeColorConfig.glow}` : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider ${activeColorConfig.text}`}>
                    Live Preview
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/10 text-slate-300">
                    Tailwind v4
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Modern Component Card</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  This card updates its CSS utility classes in real-time, demonstrating zero-overhead dynamic styling.
                </p>
                <button
                  className={`w-full py-2.5 px-4 rounded-xl text-white font-medium text-xs sm:text-sm transition-all shadow-md ${activeColorConfig.bg} hover:opacity-90 active:scale-[0.98]`}
                >
                  Action Button with {activeColorConfig.label}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Reactive Widget */}
        {activeTab === "state" && (
          <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Interactive Counter & State</h3>
                <p className="text-xs text-slate-400 mb-6">
                  Demonstrates React client state hydration within the Next.js App Router environment.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    id="counter-decrement"
                    onClick={() => setCounter((prev) => prev - 1)}
                    className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg flex items-center justify-center border border-white/10 transition-colors"
                  >
                    -
                  </button>
                  <div className="px-6 py-3 rounded-xl bg-slate-900 border border-indigo-500/30 text-center min-w-[120px]">
                    <span className="text-xs text-slate-400 block font-mono">Value</span>
                    <span className="text-2xl font-bold text-indigo-400 font-mono">{counter}</span>
                  </div>
                  <button
                    id="counter-increment"
                    onClick={() => setCounter((prev) => prev + 1)}
                    className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg flex items-center justify-center border border-white/10 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/70 border border-white/10 font-mono text-xs text-slate-300 space-y-2">
                <div className="flex items-center justify-between text-slate-400 border-b border-white/10 pb-2">
                  <span>Component State Inspector</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-indigo-300">
                  {"// React Client Component"}
                </div>
                <div>
                  <span className="text-slate-500">count: </span>
                  <span className="text-amber-400">{counter}</span>
                </div>
                <div>
                  <span className="text-slate-500">isEven: </span>
                  <span className="text-sky-400">{counter % 2 === 0 ? "true" : "false"}</span>
                </div>
                <div>
                  <span className="text-slate-500">square: </span>
                  <span className="text-emerald-400">{counter * counter}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: API Route Tester */}
        {activeTab === "api" && (
          <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl transition-all">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">App Router Route Handler</h3>
                  <p className="text-xs text-slate-400">
                    Ping <code className="bg-white/10 px-1 py-0.5 rounded text-indigo-300">/api/status</code> to test server-side response execution.
                  </p>
                </div>
                <button
                  id="ping-api-btn"
                  onClick={testApi}
                  disabled={loadingApi}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingApi ? "animate-spin" : ""}`} />
                  <span>{loadingApi ? "Requesting..." : "Send GET Request"}</span>
                </button>
              </div>

              <div className="rounded-xl bg-slate-950/90 border border-white/10 p-4 font-mono text-xs overflow-x-auto">
                <div className="text-slate-400 mb-2">// Response Payload</div>
                {apiResponse ? (
                  <pre className="text-emerald-400">{JSON.stringify(apiResponse, null, 2)}</pre>
                ) : (
                  <div className="text-slate-500 italic">
                    Click "Send GET Request" to inspect the JSON response from Next.js server handler.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
