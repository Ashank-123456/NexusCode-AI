"use client";

import React, { useState } from "react";
import {
  Sparkles,
  X,
  Send,
  Zap,
  Bug,
  HelpCircle,
  Check,
  CheckCircle2,
  Copy,
  Wand2,
  Cpu,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

export default function AiCopilotPanel({
  isOpen,
  onClose,
  activeFile,
  activeCode,
  onApplyCode,
}) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `👋 Hi! I'm **Nexus AI Copilot**, your dedicated JavaScript programming assistant.

I analyze your active file in real-time. How can I help you right now?`,
      improvedCode: null,
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini-pro");
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const handleSendPrompt = async (customAction = null, customPrompt = null) => {
    const action = customAction || "chat";
    const promptText = customPrompt || inputPrompt.trim();

    if (!promptText && action === "chat") return;

    const userMessage = {
      role: "user",
      content: promptText || `Run ${action} on ${activeFile}`,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          prompt: promptText,
          code: activeCode,
          filename: activeFile,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Analysis completed.",
          improvedCode: data.improvedCode,
          diffSummary: data.diffSummary,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Sorry, failed to communicate with AI assistant. Please try again.",
          improvedCode: null,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-80 sm:w-96 border-l border-white/[0.08] bg-[#070a12] flex flex-col h-full select-none shrink-0 z-30">
      {/* Copilot Header */}
      <div className="h-14 px-4 border-b border-white/[0.08] bg-slate-950/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Nexus AI Copilot</span>
            <span className="text-[10px] text-slate-400">Context: {activeFile}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-[11px] text-slate-300 focus:outline-none"
          >
            <option value="gemini-pro">Gemini 2.5 Pro</option>
            <option value="claude-sonnet">Claude 3.7 Sonnet</option>
            <option value="gpt-4o">GPT-4o</option>
          </select>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
            title="Close Copilot Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Action Chips Bar */}
      <div className="p-3 border-b border-white/[0.08] bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <button
          onClick={() => handleSendPrompt("explain", `Explain ${activeFile}`)}
          disabled={loading}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 shrink-0 transition-colors"
        >
          <HelpCircle className="w-3 h-3 text-sky-400" />
          <span>Explain</span>
        </button>
        <button
          onClick={() => handleSendPrompt("fix", `Find and fix bugs in ${activeFile}`)}
          disabled={loading}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 shrink-0 transition-colors"
        >
          <Bug className="w-3 h-3 text-rose-400" />
          <span>Fix Bugs</span>
        </button>
        <button
          onClick={() => handleSendPrompt("optimize", `Optimize ${activeFile}`)}
          disabled={loading}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 shrink-0 transition-colors"
        >
          <Zap className="w-3 h-3 text-amber-400" />
          <span>Optimize</span>
        </button>
        <button
          onClick={() => handleSendPrompt("test", `Generate unit tests for ${activeFile}`)}
          disabled={loading}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 shrink-0 transition-colors"
        >
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Tests</span>
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 select-text text-xs leading-relaxed">
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={index}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl p-3.5 ${
                  isUser
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-slate-900 border border-white/10 text-slate-200 rounded-bl-none shadow-sm"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Optional Suggested Code Block */}
                {msg.improvedCode && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-mono">
                      <span>Suggested JavaScript</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyCode(msg.improvedCode, index)}
                          className="hover:text-white flex items-center gap-1"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>
                    <pre className="p-2.5 rounded-xl bg-black/60 font-mono text-[11px] text-slate-200 overflow-x-auto border border-white/5 leading-snug">
                      {msg.improvedCode}
                    </pre>

                    <button
                      onClick={() => onApplyCode(msg.improvedCode)}
                      className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-sm shadow-emerald-600/30 active:scale-95"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>Apply Fix to Editor</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-indigo-400 py-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>AI is analyzing code &amp; generating insights...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPrompt();
        }}
        className="p-3 border-t border-white/[0.08] bg-slate-950/90"
      >
        <div className="relative">
          <input
            id="ai-prompt-input"
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={loading}
            placeholder="Ask AI anything about your JavaScript..."
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-3 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            id="ai-send-btn"
            type="submit"
            disabled={loading || !inputPrompt.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-indigo-400 hover:text-white hover:bg-indigo-600 transition-all disabled:opacity-30"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
