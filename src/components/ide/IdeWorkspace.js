"use client";

import React, { useState, useEffect } from "react";
import IdeHeader from "./IdeHeader";
import FileSidebar from "./FileSidebar";
import CodeEditor from "./CodeEditor";
import ConsoleDrawer from "./ConsoleDrawer";
import AiCopilotPanel from "./AiCopilotPanel";

const INITIAL_FILES = {
  "index.js": `// ⚡ Welcome to NexusCode AI - JavaScript Cloud IDE
// Press "Run" (⌘↵) in the top bar to execute this code in real-time.

console.log("🚀 Initializing NexusCode JavaScript Workspace...");

// 1. Data Pipeline with Modern JavaScript
const transactions = [
  { id: "tx_101", user: "Alice", amount: 250.75, category: "Infrastructure" },
  { id: "tx_102", user: "Bob", amount: 49.99, category: "SaaS Tools" },
  { id: "tx_103", user: "Charlie", amount: 1200.0, category: "Infrastructure" },
  { id: "tx_104", user: "Alice", amount: 310.5, category: "API Credits" },
];

// 2. Aggregate metrics using reduce
const totalVolume = transactions.reduce((sum, tx) => sum + tx.amount, 0);
console.log(\`💰 Total Transaction Volume: $\${totalVolume.toFixed(2)}\`);

// 3. High-value transactions filter
const highValue = transactions
  .filter(tx => tx.amount > 200)
  .map(tx => \`\${tx.user} -> $\${tx.amount}\`);

console.log("🌟 High Value Purchases:", highValue);

// Return value is captured and displayed in the console drawer
return {
  status: "success",
  analyzedTransactions: transactions.length,
  totalVolume: totalVolume,
  timestamp: new Date().toISOString()
};`,

  "algorithms.js": `// 🧮 Fast QuickSort Algorithm in Pure JavaScript
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

const numbers = [64, 34, 25, 12, 22, 11, 90, 88, 45, 1];
console.log("Unsorted Array:", numbers);

const sorted = quickSort(numbers);
console.log("Sorted Array:  ", sorted);

return sorted;`,

  "async-fetch.js": `// 🌐 Asynchronous Task Pipeline & Promises
async function simulateWorker(taskName, delayMs) {
  console.log(\`⏳ Starting \${taskName} (takes \${delayMs}ms)...\`);
  await new Promise(resolve => setTimeout(resolve, delayMs));
  return \`✓ \${taskName} completed\`;
}

async function runPipeline() {
  const t0 = performance.now();
  
  const results = await Promise.all([
    simulateWorker("Authentication", 150),
    simulateWorker("Fetch User Preferences", 220),
    simulateWorker("Compile JS AST", 180)
  ]);

  const duration = (performance.now() - t0).toFixed(2);
  console.log(\`⚡ All tasks finished in \${duration}ms:\`, results);
  return results;
}

runPipeline();`,

  "array-utils.js": `// 🛠️ Modern Array Utilities
const dataset = [
  { role: "frontend", score: 92 },
  { role: "backend", score: 88 },
  { role: "ai", score: 98 },
  { role: "frontend", score: 85 }
];

// Average score calculation
const avgScore = dataset.reduce((acc, curr) => acc + curr.score, 0) / dataset.length;
console.log("Average Team Score:", avgScore.toFixed(1));

// Grouping by role
const grouped = {};
for (const item of dataset) {
  if (!grouped[item.role]) grouped[item.role] = [];
  grouped[item.role].push(item.score);
}

console.log("Grouped Scores by Department:", grouped);
return grouped;`,
};

export default function IdeWorkspace() {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [activeFile, setActiveFile] = useState("index.js");
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [executionTime, setExecutionTime] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [aiOpen, setAiOpen] = useState(true);
  const [consoleOpen, setConsoleOpen] = useState(true);

  // Safe JavaScript Execution Engine
  const executeJavaScript = async () => {
    setIsRunning(true);
    setHasError(false);
    setConsoleOpen(true);

    const logs = [];
    const pushLog = (type, args) => {
      const formatted = args
        .map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)))
        .join(" ");
      logs.push({ type, text: formatted, timestamp: new Date().toLocaleTimeString() });
    };

    const codeToRun = files[activeFile] || "";
    const startTime = performance.now();

    try {
      // Create a scoped mock console
      const customConsole = {
        log: (...args) => pushLog("log", args),
        warn: (...args) => pushLog("warn", args),
        error: (...args) => pushLog("error", args),
        info: (...args) => pushLog("log", args),
      };

      // Wrap code in an async function to allow both top-level await and return values
      const wrapped = `
        return (async function(console) {
          "use strict";
          ${codeToRun}
        })(customConsole);
      `;

      // Evaluate safely
      const executor = new Function("customConsole", wrapped);
      const result = await executor(customConsole);

      const duration = (performance.now() - startTime).toFixed(2);
      setExecutionTime(duration);

      if (result !== undefined) {
        pushLog(
          "result",
          [typeof result === "object" ? JSON.stringify(result, null, 2) : String(result)]
        );
      }

      setConsoleOutput(logs);
      setHasError(false);
    } catch (err) {
      const duration = (performance.now() - startTime).toFixed(2);
      setExecutionTime(duration);
      pushLog("error", [`${err.name}: ${err.message}`]);
      setConsoleOutput(logs);
      setHasError(true);
    } finally {
      setIsRunning(false);
    }
  };

  // Simple auto-formatter (indentation helper)
  const formatCode = () => {
    const currentCode = files[activeFile] || "";
    const lines = currentCode.split("\n");
    let indent = 0;
    const formattedLines = lines.map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";

      if (trimmed.startsWith("}") || trimmed.startsWith("]") || trimmed.startsWith(");")) {
        indent = Math.max(0, indent - 1);
      }

      const formatted = "  ".repeat(indent) + trimmed;

      if (
        (trimmed.endsWith("{") || trimmed.endsWith("[") || trimmed.endsWith("(")) &&
        !trimmed.startsWith("//")
      ) {
        indent += 1;
      }

      return formatted;
    });

    const newCode = formattedLines.join("\n");
    setFiles((prev) => ({ ...prev, [activeFile]: newCode }));
  };

  const handleCreateFile = (name) => {
    if (files[name]) {
      setActiveFile(name);
      return;
    }
    const boilerplate = `// ${name}\nconsole.log("Loaded ${name}");\n`;
    setFiles((prev) => ({ ...prev, [name]: boilerplate }));
    setActiveFile(name);
  };

  const handleDeleteFile = (name) => {
    const fileKeys = Object.keys(files);
    if (fileKeys.length <= 1) return;

    const newFiles = { ...files };
    delete newFiles[name];
    setFiles(newFiles);

    if (activeFile === name) {
      setActiveFile(Object.keys(newFiles)[0]);
    }
  };

  const handleLoadSnippet = (snippetCode) => {
    setFiles((prev) => ({ ...prev, [activeFile]: snippetCode }));
  };

  const handleApplyAiCode = (newCode) => {
    setFiles((prev) => ({ ...prev, [activeFile]: newCode }));
  };

  // Trigger AI action directly from editor buttons
  const [externalAiAction, setExternalAiAction] = useState(null);
  const handleTriggerAiAction = (action) => {
    setAiOpen(true);
    setExternalAiAction(action);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#070a12] text-slate-100 overflow-hidden font-sans">
      {/* Top Header */}
      <IdeHeader
        activeFile={activeFile}
        isRunning={isRunning}
        onRunCode={executeJavaScript}
        onFormatCode={formatCode}
        aiOpen={aiOpen}
        setAiOpen={setAiOpen}
        consoleOpen={consoleOpen}
        setConsoleOpen={setConsoleOpen}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left: Files and Snippets Sidebar */}
        <FileSidebar
          files={files}
          activeFile={activeFile}
          onSelectFile={setActiveFile}
          onCreateFile={handleCreateFile}
          onDeleteFile={handleDeleteFile}
          onLoadSnippet={handleLoadSnippet}
        />

        {/* Center: Editor + Bottom Console */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <CodeEditor
            code={files[activeFile] || ""}
            onChange={(val) => setFiles((prev) => ({ ...prev, [activeFile]: val }))}
            activeFile={activeFile}
            files={files}
            onSelectFile={setActiveFile}
            onRunCode={executeJavaScript}
            onTriggerAiAction={handleTriggerAiAction}
          />

          <ConsoleDrawer
            output={consoleOutput}
            onClear={() => setConsoleOutput([])}
            executionTime={executionTime}
            hasError={hasError}
            isOpen={consoleOpen}
            onToggle={() => setConsoleOpen(!consoleOpen)}
          />
        </div>

        {/* Right: AI Copilot Drawer */}
        <AiCopilotPanel
          isOpen={aiOpen}
          onClose={() => setAiOpen(false)}
          activeFile={activeFile}
          activeCode={files[activeFile] || ""}
          onApplyCode={handleApplyAiCode}
        />
      </div>
    </div>
  );
}
