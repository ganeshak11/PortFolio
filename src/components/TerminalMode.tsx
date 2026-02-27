"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FILE_SYSTEM = {
    "/": ["about", "projects", "stack", "thinking", "contact", "README.md"],
    "/about": ["info.txt"],
    "/projects": ["mysuru-bus", "ci-cd-sentinel"],
    "/stack": ["tools.txt"],
    "/thinking": ["principles.txt"],
    "/contact": ["links.txt"],
};

const FILE_CONTENTS: Record<string, string> = {
    "README.md": `# Ganesh Angadi - DevOps Engineer

Student since 2023. Focused on DevOps & System Architecture.

Available commands:
  ls              - list directory contents
  cd <dir>        - change directory
  cat <file>      - display file contents
  clear           - clear terminal
  help            - show this help message
  exit            - return to normal view`,

    "/about/info.txt": `Student since 2023. Focused on DevOps & System Architecture.

I don't just build features. I design systems. I think in control
flow, model failure states, and design for observability.

CORE COMPETENCIES:
▸ Linux internals (filesystem, permissions, processes, services)
▸ Git beyond push (commit graph mental model)
▸ Question architecture decisions instead of blindly using tools
▸ Backend + DevOps oriented, not pure frontend`,

    "/projects/mysuru-bus": `MY(suru) BUS - Real-Time Bus Tracking System

A city-scale real-time bus tracking and management platform built
with system reliability as the priority.

ARCHITECTURE:
- Admin Dashboard – Next.js
- Driver App – React Native (Expo)
- Passenger App – React Native
- Backend – Supabase (PostgreSQL, Auth, Realtime, RLS)
- Maps – Leaflet + OpenStreetMap

CORE PHILOSOPHY:
▸ Reliability over UI
▸ Database as single source of truth
▸ Enforce logic at DB level using RLS
▸ Event-driven realtime architecture
▸ Offline-first design with queue + auto-sync

KNOWN LIMITATIONS:
△ Driver phone dependency – single point of failure
△ GPS precision limits – urban canyon effects
△ No traffic prediction yet – ETA is distance-based only`,

    "/projects/ci-cd-sentinel": `CI/CD Sentinel [IN PROGRESS]

Designing a CI/CD monitoring and enforcement system focused on
building observability around CI/CD instead of blindly trusting
green checkmarks.

FOCUS AREAS:
▸ Pipeline health visibility
▸ Deployment audit tracking
▸ Log aggregation insights
▸ Failure pattern detection
▸ Git commit-to-deploy traceability
▸ Infrastructure sanity checks

GOAL:
Build observability around CI/CD pipelines. Make deployment
decisions explicit, not implicit. Track what changed, when, and why.`,

    "/stack/tools.txt": `DEVOPS STACK:

Linux (Advanced)
Git (Deep Mental Model)
Systemd (Core)
Bash (Core)
Networking (Basics)
Docker (Learning)
CI/CD Pipelines (Core)
PostgreSQL (Core)
Supabase (Core)
Next.js (Core)
React Native (Core)`,

    "/thinking/principles.txt": `SYSTEM THINKING PRINCIPLES:

1. Think in control flow
   Map the execution path. Understand what happens when, and why.

2. Model failure states
   Design for what breaks, not what works. Every system has a failure mode.

3. Design for observability
   If you can't measure it, you can't debug it. Logs, metrics, traces.

4. Prefer explicit over magical abstractions
   Magic is technical debt. Explicit is maintainable.

5. Break systems to understand them
   Chaos engineering isn't optional. It's how you learn.`,

    "/contact/links.txt": `CONTACT:

GitHub: https://github.com/ganeshak11
LinkedIn: https://www.linkedin.com/in/ganeshangadi1301/
Email: ganeshangadi13012006@gmail.com`,
};

const QUICK_COMMANDS = [
    { cmd: "ls", desc: "list contents" },
    { cmd: "cd about", desc: "go to about" },
    { cmd: "cd projects", desc: "go to projects" },
    { cmd: "cd ..", desc: "go back" },
    { cmd: "cat README.md", desc: "read readme" },
    { cmd: "help", desc: "show help" },
    { cmd: "clear", desc: "clear screen" },
];

export default function TerminalMode({ onExit }: { onExit: () => void }) {
    const [history, setHistory] = useState<{ type: "input" | "output"; text: string }[]>([
        { type: "output", text: "Welcome to portfolio.sh v1.0.0" },
        { type: "output", text: "Type 'help' for available commands or 'ls' to explore\n" },
    ]);
    const [input, setInput] = useState("");
    const [currentDir, setCurrentDir] = useState("/");
    const [showCommands, setShowCommands] = useState(true);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
        terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }, [history]);

    const executeCommand = (cmd: string) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        setHistory((prev) => [...prev, { type: "input", text: `ganesh@portfolio:${currentDir}$ ${trimmed}` }]);

        const [command, ...args] = trimmed.split(" ");

        switch (command) {
            case "ls":
                const contents = FILE_SYSTEM[currentDir as keyof typeof FILE_SYSTEM] || [];
                setHistory((prev) => [...prev, { type: "output", text: contents.join("\n") + "\n" }]);
                break;

            case "cd":
                const target = args[0];
                if (!target) {
                    setHistory((prev) => [...prev, { type: "output", text: "cd: missing operand\n" }]);
                } else if (target === "..") {
                    const newDir = currentDir === "/" ? "/" : currentDir.split("/").slice(0, -1).join("/") || "/";
                    setCurrentDir(newDir);
                } else if (target === "/") {
                    setCurrentDir("/");
                } else {
                    const newPath = currentDir === "/" ? `/${target}` : `${currentDir}/${target}`;
                    if (FILE_SYSTEM[newPath as keyof typeof FILE_SYSTEM]) {
                        setCurrentDir(newPath);
                    } else {
                        setHistory((prev) => [...prev, { type: "output", text: `cd: ${target}: No such directory\n` }]);
                    }
                }
                break;

            case "cat":
                const filename = args[0];
                if (!filename) {
                    setHistory((prev) => [...prev, { type: "output", text: "cat: missing operand\n" }]);
                } else {
                    const filePath = currentDir === "/" ? filename : `${currentDir}/${filename}`;
                    const content = FILE_CONTENTS[filePath] || FILE_CONTENTS[filename];
                    if (content) {
                        setHistory((prev) => [...prev, { type: "output", text: content + "\n" }]);
                    } else {
                        setHistory((prev) => [...prev, { type: "output", text: `cat: ${filename}: No such file\n` }]);
                    }
                }
                break;

            case "clear":
                setHistory([]);
                setShowCommands(false);
                break;

            case "help":
                setHistory((prev) => [
                    ...prev,
                    { type: "output", text: FILE_CONTENTS["README.md"] + "\n" },
                ]);
                break;

            case "exit":
                onExit();
                break;

            default:
                setHistory((prev) => [
                    ...prev,
                    { type: "output", text: `${command}: command not found. Type 'help' for available commands.\n` },
                ]);
        }

        setInput("");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: "fixed",
                inset: 0,
                background: "#000",
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Terminal Header */}
            <div
                style={{
                    padding: "12px 24px",
                    borderBottom: "1px solid #39ff14",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 12,
                }}
            >
                <span style={{ fontFamily: "monospace", fontSize: 12, color: "#39ff14" }}>
                    portfolio.sh - Terminal Mode
                </span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button
                        onClick={() => setShowCommands(!showCommands)}
                        style={{
                            background: "none",
                            border: "1px solid #facc15",
                            color: "#facc15",
                            fontFamily: "monospace",
                            fontSize: 11,
                            padding: "4px 12px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#facc15";
                            e.currentTarget.style.color = "#000";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "none";
                            e.currentTarget.style.color = "#facc15";
                        }}
                    >
                        {showCommands ? "[HIDE COMMANDS]" : "[SHOW COMMANDS]"}
                    </button>
                    <button
                        onClick={onExit}
                        style={{
                            background: "none",
                            border: "1px solid #39ff14",
                            color: "#39ff14",
                            fontFamily: "monospace",
                            fontSize: 11,
                            padding: "4px 12px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#39ff14";
                            e.currentTarget.style.color = "#000";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "none";
                            e.currentTarget.style.color = "#39ff14";
                        }}
                    >
                        [EXIT]
                    </button>
                </div>
            </div>

            {/* Quick Commands Panel */}
            {showCommands && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{
                        borderBottom: "1px solid #39ff14",
                        padding: "12px 24px",
                        background: "#0a0a0a",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 8,
                        }}
                    >
                        {QUICK_COMMANDS.map((qc) => (
                            <button
                                key={qc.cmd}
                                onClick={() => {
                                    setInput(qc.cmd);
                                    inputRef.current?.focus();
                                }}
                                style={{
                                    background: "none",
                                    border: "1px solid #06b6d4",
                                    color: "#06b6d4",
                                    fontFamily: "monospace",
                                    fontSize: 11,
                                    padding: "6px 12px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    borderRadius: 4,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#06b6d4";
                                    e.currentTarget.style.color = "#000";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "none";
                                    e.currentTarget.style.color = "#06b6d4";
                                }}
                                title={qc.desc}
                            >
                                {qc.cmd}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Terminal Content */}
            <div
                ref={terminalRef}
                style={{
                    flex: 1,
                    overflow: "auto",
                    padding: "24px",
                    fontFamily: "monospace",
                    fontSize: "clamp(12px, 1.5vw, 14px)",
                    lineHeight: 1.8,
                    color: "#ccc",
                }}
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((entry, i) => (
                    <div
                        key={i}
                        style={{
                            color: entry.type === "input" ? "#39ff14" : "#ccc",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                        }}
                    >
                        {entry.text}
                    </div>
                ))}

                {/* Input Line */}
                <div style={{ display: "flex", alignItems: "center", color: "#39ff14" }}>
                    <span>ganesh@portfolio:{currentDir}$ </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                executeCommand(input);
                            }
                        }}
                        style={{
                            flex: 1,
                            background: "none",
                            border: "none",
                            outline: "none",
                            color: "#39ff14",
                            fontFamily: "monospace",
                            fontSize: "clamp(12px, 1.5vw, 14px)",
                            marginLeft: 8,
                        }}
                        placeholder="Type a command or click one above..."
                        autoComplete="off"
                        spellCheck={false}
                    />
                </div>
            </div>
        </motion.div>
    );
}
