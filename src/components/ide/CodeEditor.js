"use client";

import React, { useRef, useEffect } from "react";
import { FileCode, Sparkles, Wand2, Zap, Bug } from "lucide-react";

export default function CodeEditor({
  code,
  onChange,
  activeFile,
  files,
  onSelectFile,
  onRunCode,
  onTriggerAiAction,
}) {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const lines = (code || "").split("\n");
  const lineCount = lines.length || 1;

  // Sync scroll between textarea and line numbers gutter
  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  // Handle Tab key and Cmd+Enter shortcut
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onRunCode();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      onChange(newCode);

      // Restore cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080c14] overflow-hidden relative">
      {/* File Tabs Header */}
      <div className="h-10 border-b border-white/[0.08] bg-[#070a12] flex items-center justify-between px-2 overflow-x-auto select-none">
        <div className="flex items-center gap-1">
          {Object.keys(files).map((fileName) => {
            const isActive = activeFile === fileName;
            return (
              <button
                key={fileName}
                onClick={() => onSelectFile(fileName)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs font-mono transition-colors border-t border-l border-r ${
                  isActive
                    ? "bg-[#080c14] text-white border-white/10 border-b-[#080c14]"
                    : "bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-white/[0.03]"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{fileName}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Action Chips */}
        <div className="hidden md:flex items-center gap-1.5">
          <button
            onClick={() => onTriggerAiAction("fix")}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
            title="Scan for bugs with AI"
          >
            <Bug className="w-3 h-3 text-rose-400" />
            <span>Find Bugs</span>
          </button>
          <button
            onClick={() => onTriggerAiAction("optimize")}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
            title="Optimize performance with AI"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Optimize</span>
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Line Numbers Gutter */}
        <div
          ref={lineNumbersRef}
          className="w-12 py-3 bg-[#070a12]/80 border-r border-white/5 select-none overflow-hidden font-mono text-xs text-slate-600 text-right pr-3 leading-6 shrink-0"
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Input Area */}
        <div className="flex-1 relative h-full">
          <textarea
            ref={textareaRef}
            id="code-editor-textarea"
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            className="w-full h-full p-3 font-mono text-xs sm:text-sm bg-transparent text-slate-100 resize-none focus:outline-none leading-6 tab-size-2 selection:bg-indigo-500/30 overflow-auto"
            style={{ tabSize: 2 }}
          />
        </div>
      </div>

      {/* Editor Status Bar */}
      <div className="h-6 bg-[#070a12] border-t border-white/[0.08] px-3 flex items-center justify-between text-[11px] text-slate-500 font-mono select-none">
        <div className="flex items-center gap-4">
          <span>JavaScript (ES2024)</span>
          <span>UTF-8</span>
          <span>Spaces: 2</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Lines: {lineCount}</span>
          <span>Chars: {(code || "").length}</span>
        </div>
      </div>
    </div>
  );
}
