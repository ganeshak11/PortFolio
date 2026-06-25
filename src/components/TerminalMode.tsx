"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence  } from "framer-motion";
import MatrixRain from "./MatrixRain";

const FILE_SYSTEM = {
    "/": ["about", "projects", "stack", "thinking", "contact", "README.md"],
    "/about": ["info.txt"],
    "/projects": ["mysuru-bus", "autoops", "cyber-kavach", "ci-cd-sentinel"],
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
  resume          - view my resume summary
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

    "/projects/ci-cd-sentinel": `CI/CD Sentinel [~80% COMPLETE]

Building a centralized observability and recovery layer for software
deployments. Tracking deployment history, monitoring health status
via polling, and providing one-click recovery controls.

PROGRESS:
▸ Backend Foundation & DB [█████████░] 95%
▸ Webhook Ingestion       [█████████░] 90%
▸ Health Monitoring       [███████░░░] 75%
▸ Dashboard UI            [██████░░░░] 60%

GOAL:
Build observability around CI/CD pipelines. Make deployment
decisions explicit, not implicit. Track what changed, when, and why.`,

    "/projects/autoops": `AUTOops - AWS Infrastructure Orchestrator (Hackathon)

The DevOps and Infrastructure layer for an AI-driven cloud provisioning
platform built by a 4-person team. I architected the containerization
and local deployment environment.

ARCHITECTURE:
- Frontend Dashboard – React
- Backend API Gateway – Node.js
- Master Agent – Python LLM Planner
- Worker Agent – Python AWS Executor
- Infrastructure – Docker & AWS EC2

CORE PHILOSOPHY:
▸ Containerized local parity ('Works on my machine')
▸ Internal DNS for secure microservice communication
▸ Automated bootstrap scripts over manual setup

KNOWN LIMITATIONS:
△ Heavy reliance on Docker limits deployment options
△ Hot-reloading required mapping volumes, complicating Dockerfiles`,

    "/projects/cyber-kavach": `Cyber Kavach - Cyber Security Platform Infrastructure (Hackathon)

The infrastructure and deployment track for a real-time intrusion
detection and response platform built for a DevSecOps hackathon.

ARCHITECTURE:
- Agent Container – Python + Scikit-Learn (Host Network)
- Backend Container – FastAPI + WebSockets
- Frontend Container – HTML/JS + Nginx

CORE PHILOSOPHY:
▸ Multi-container orchestration
▸ Strict dependency ordering
▸ Minimal attack surfaces

KNOWN LIMITATIONS:
△ Running containers in host network mode breaks Docker isolation
△ Combining ML models and web servers increased memory footprint`,

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
    { cmd: "resume", desc: "view resume" },
    { cmd: "help", desc: "show help" },
    { cmd: "clear", desc: "clear screen" },
];

export default function TerminalMode({ onExit }: { onExit: () => void }) {
    const entryId = useRef(0);
    const makeEntry = (type: "input" | "output", text: string) => ({ id: ++entryId.current, type, text });
    const [history, setHistory] = useState<{ id: number; type: "input" | "output"; text: string }[]>([
        makeEntry("output", "Welcome to portfolio.sh v1.0.0"),
        makeEntry("output", "Type 'help' for available commands or 'ls' to explore\n"),
    ]);
    const [input, setInput] = useState("");
    const [currentDir, setCurrentDir] = useState("/");
    const [showCommands, setShowCommands] = useState(true);
    const [showMatrix, setShowMatrix] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
        terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }, [history]);

    const executeCommand = (cmd: string) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        setHistory((prev) => [...prev, makeEntry("input", `ganesh@portfolio:${currentDir}$ ${trimmed}`)]);

        const [command, ...args] = trimmed.split(" ");

        switch (command) {
            case "ls":
                const contents = FILE_SYSTEM[currentDir as keyof typeof FILE_SYSTEM] || [];
                setHistory((prev) => [...prev, makeEntry("output", contents.join("\n") + "\n")]);
                break;

            case "cd":
                const target = args[0];
                if (!target) {
                    setHistory((prev) => [...prev, makeEntry("output", "cd: missing operand\n")]);
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
                        setHistory((prev) => [...prev, makeEntry("output", `cd: ${target}: No such directory\n`)]);
                    }
                }
                break;

            case "cat":
                const filename = args[0];
                if (!filename) {
                    setHistory((prev) => [...prev, makeEntry("output", "cat: missing operand\n")]);
                } else {
                    const filePath = currentDir === "/" ? filename : `${currentDir}/${filename}`;
                    const content = FILE_CONTENTS[filePath] || FILE_CONTENTS[filename];
                    if (content) {
                        setHistory((prev) => [...prev, makeEntry("output", content + "\n")]);
                    } else {
                        setHistory((prev) => [...prev, makeEntry("output", `cat: ${filename}: No such file\n`)]);
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
                    makeEntry("output", FILE_CONTENTS["README.md"] + "\n"),
                ]);
                break;

            case "exit":
                onExit();
                break;

            case "whoami":
                setHistory((prev) => [
                    ...prev,
                    makeEntry("output", `
  ____                        _     
 / ___| __ _ _ __   ___  ___| |__  
| |  _ / _\` | '_ \\ / _ \\/ __| '_ \\ 
| |_| | (_| | | | |  __/\\__ \\ | | |
 \\____|\\__,_|_| |_|\\___||___/_| |_/
                                   
Ganesh Angadi — DevOps Engineer & System Architect
`),
                ]);
                break;

            case "neofetch":
                setHistory((prev) => [
                    ...prev,
                    makeEntry("output", `
       _,met$$$$$gg.          ganesh@portfolio
    ,g$$$$$$$$$$$$$$$P.       ----------------
  ,g$$P"     """Y$$.".        OS: Linux (Mental Model)
 ,$$P'              \`$$$.     Host: Portfolio.sh
',$$P       ,ggs.     \`$$b:   Kernel: Next.js 16
\`d$$'     ,$P"'   .    $$$    Uptime: up indefinitely
 $$P      d$'     ,    $$P    Packages: 15 (npm)
 $$:      $$.   -    ,d$$'    Shell: bash
 $$;      Y$b._   _,d$P'      Terminal: Framer Motion
 Y$$.    \`.\`"Y$$$$P"'         WM: Docker & Kubernetes
 \`$$b      "-.__              CPU: System Thinker
  \`Y$$                        Memory: 100% Focused
   \`Y$$.                      
     \`$$b.                    
       \`Y$$b.                 
          \`"Y$b._             
`),
                ]);
                break;

            case "sudo":
                if (args.join(" ") === "rm -rf /") {
                    setHistory((prev) => [
                        ...prev,
                        makeEntry("output", "Nice try. I have backups. (And you're not in the sudoers file)\nThis incident will be reported.\n"),
                    ]);
                } else {
                    setHistory((prev) => [
                        ...prev,
                        makeEntry("output", `sudo: execute command as another user. But you are stuck as 'ganesh'.\n`),
                    ]);
                }
                break;
                
            case "matrix":
                setShowMatrix(prev => !prev);
                setHistory((prev) => [
                    ...prev,
                    makeEntry("output", "Initializing Matrix Protocol...\\n"),
                ]);
                break;

            case "resume":
                setHistory((prev) => [
                    ...prev,
                    makeEntry("output", `
=========================================
      GANESH ANGADI - RESUME SUMMARY
=========================================
Role: DevOps Engineer & System Architect
Location: Mysuru, Karnataka, India

[EXPERIENCE & ACHIEVEMENTS]
▸ AI & Machine Learning Intern @ Artsy Technologies
▸ 1st Place - MCP-Based Systems Engineering Hackathon

[TOP PROJECTS]
▸ Infra Sentinel - Graph-Native AI SRE Platform
▸ Portfolio Infrastructure - Zero-to-Production DevOps
▸ MY(suru) BUS - Real-Time Smart Bus Tracking
▸ CI/CD Sentinel - Centralized Deployment Observability

To view the full resume, close the terminal and click 'View Resume', 
or go directly to /resume.html
=========================================
`),
                ]);
                break;

            default:
                setHistory((prev) => [
                    ...prev,
                    makeEntry("output", `${command}: command not found. Type 'help' for available commands.\n`),
                ]);
        }

        setInput("");
    };

    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: "fixed",
                inset: 0,
                background: "var(--bg)",
                zIndex: 50,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {showMatrix && <MatrixRain />}
            {/* Terminal Header */}
            <div
                style={{
                    padding: "12px 24px",
                    borderBottom: "1px solid var(--accent)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 12,
                }}
            >
                <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--accent)" }}>
                    portfolio.sh - Terminal Mode
                </span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button
                        onClick={() => setShowCommands(!showCommands)}
                        style={{
                            background: "none",
                            border: "1px solid var(--fg)",
                            color: "var(--fg)",
                            fontFamily: "monospace",
                            fontSize: 12,
                            padding: "4px 12px",
                            cursor: "pointer",
                            transition: "opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.cssText = "background: none; border: 1px solid var(--fg); color: var(--fg); font-family: monospace; font-size: 12px; padding: 4px 12px; cursor: pointer; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s; background: var(--fg); color: var(--bg);";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.cssText = "background: none; border: 1px solid var(--fg); color: var(--fg); font-family: monospace; font-size: 12px; padding: 4px 12px; cursor: pointer; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s;";
                        }}
                    >
                        {showCommands ? "[HIDE COMMANDS]" : "[SHOW COMMANDS]"}
                    </button>
                    <button
                        onClick={onExit}
                        style={{
                            background: "none",
                            border: "1px solid var(--accent)",
                            color: "var(--accent)",
                            fontFamily: "monospace",
                            fontSize: 12,
                            padding: "4px 12px",
                            cursor: "pointer",
                            transition: "opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.cssText = "background: none; border: 1px solid var(--accent); color: var(--accent); font-family: monospace; font-size: 12px; padding: 4px 12px; cursor: pointer; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s; background: var(--accent); color: var(--bg);";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.cssText = "background: none; border: 1px solid var(--accent); color: var(--accent); font-family: monospace; font-size: 12px; padding: 4px 12px; cursor: pointer; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s;";
                        }}
                    >
                        [EXIT]
                    </button>
                </div>
            </div>

            {/* Quick Commands Panel */}
            {showCommands && (
                <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{
                        borderBottom: "1px solid var(--accent)",
                        padding: "12px 24px",
                        background: "var(--card-bg)",
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
                                    border: "1px solid var(--muted)",
                                    color: "var(--muted)",
                                    fontFamily: "monospace",
                                    fontSize: 12,
                                    padding: "6px 12px",
                                    cursor: "pointer",
                                    transition: "opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s",
                                    borderRadius: 4,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.cssText = "background: none; border: 1px solid var(--muted); color: var(--muted); font-family: monospace; font-size: 12px; padding: 6px 12px; cursor: pointer; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s; border-radius: 4px; background: var(--muted); color: var(--bg);";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.cssText = "background: none; border: 1px solid var(--muted); color: var(--muted); font-family: monospace; font-size: 12px; padding: 6px 12px; cursor: pointer; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s; border-radius: 4px;";
                                }}
                                title={qc.desc}
                            >
                                {qc.cmd}
                            </button>
                        ))}
                    </div>
                </m.div>
            )}

            {/* Terminal Content */}
            <div
                ref={terminalRef}
                role="presentation"
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
                onKeyDown={() => inputRef.current?.focus()}
            >
                {history.map((entry) => (
                    <div
                        key={entry.id}
                        style={{
                            color: entry.type === "input" ? "var(--accent)" : "var(--muted)",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                        }}
                    >
                        {entry.text}
                    </div>
                ))}

                {/* Input Line */}
                <div style={{ display: "flex", alignItems: "center", color: "var(--accent)" }}>
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
                            outline: "2px solid transparent", outlineOffset: "2px",
                            color: "var(--accent)",
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
        </m.div>
    );
}
