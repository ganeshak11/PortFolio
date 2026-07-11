"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence  } from "framer-motion";
import MatrixRain from "./MatrixRain";

const FILE_SYSTEM = {
    "/": ["about", "projects", "stack", "github", "thinking", "contact", "README.md"],
    "/about": ["info.txt"],
    "/projects": ["mysuru-bus", "autoops", "cyber-kavach", "fortis-ci"],
    "/stack": ["tools.txt"],
    "/github": ["stats.txt", "contributions.txt"],
    "/thinking": ["principles.txt"],
    "/contact": ["links.txt"],
};

const FILE_CONTENTS: Record<string, string> = {
    "README.md": `# Ganesh Angadi - DevOps Engineer

Focusing on AWS, Kubernetes, Terraform, and CI/CD automation.

Available commands:
  ls              - list directory contents
  cd <dir>        - change directory
  cat <file>      - display file contents
  pwd             - print working directory
  date            - display current system date/time
  uname -a        - print system information
  echo [text]     - print text to standard output
  whoami          - print user details
  neofetch        - show system specifications
  github          - trigger interactive 3D stats graphs
  resume          - view my resume summary
  clear           - clear terminal screen
  exit            - close terminal simulator`,

    "/about/info.txt": `Ganesh Angadi - DevOps Engineer & Observer

I don't just write scripts. I design systems. My focus lies at the
intersection of DevOps, Kubernetes infrastructure, and observability.

CORE PRINCIPLES:
▸ Linux-first daily user
▸ Automated declarative configuration over manual tweaks
▸ Designing robust failover and self-healing environments
▸ Enforcing security boundaries and minimizing attack surfaces`,

    "/projects/mysuru-bus": `MY(suru) BUS - Smart Transit Platform

A city-scale public transportation platform tracking buses in real-time.

ARCHITECTURE:
- Passenger Interface: React Native (Expo)
- Fleet Tracking App: React Native (Driver client)
- Operations Dashboard: Next.js + Tailwind
- Database Backend: Supabase (Auth, RLS, WebSockets)

DESIGN HIGHLIGHTS:
▸ Offline-first queuing system synchronizes driver GPS buffers
▸ Database-level security policies enforce role-based access`,

    "/projects/fortis-ci": `Fortis-CI - Graph-Native CI/CD Observer

An open-source observability layer designed to audit deployment graphs.

STACK:
- Graph Database: Neo4j
- API Core: Node.js (Express)
- Event Broker: Redis
- Visual UI: Next.js (TypeScript)

KEY CAPABILITY:
Map pipelines, commits, configuration changes, and test failures into
a dependency graph to locate single points of failure automatically.`,

    "/projects/autoops": `AUTOops - Cloud Provisioner (Hackathon)

An AI-driven AWS provisioning platform provisioning containers dynamically.
Awarded 1st place in DevOps and local development tracks.

ARCHITECTURE:
- LLM Scheduler: Python Agent Planner
- Provisioner API: Node.js API Gateway
- Deployment: Docker Containers & AWS EC2`,

    "/projects/cyber-kavach": `Cyber Kavach - DevSecOps Intrusion Detection

A real-time network anomaly detector built for a secure hackathon.

ARCHITECTURE:
- ML Ingestion Client: Scikit-Learn Python Daemon
- Realtime Gateway: FastAPI (WebSockets)
- Edge Server: Nginx Web Server`,

    "/stack/tools.txt": `DEVOPS STACK & SKILLS:

Systems: Linux (Ubuntu), Bash Scripting
Containers: Docker, Kubernetes (Core)
IaC: Terraform (Core)
Backend: Node.js, Express, Python, Redis
Databases: PostgreSQL, Neo4j, Supabase
Frontend: Next.js, TypeScript`,

    "/github/stats.txt": `Ganesh Angadi's GitHub Stats (Daily Sync)

User: ganeshak11
Commits (last year): 381
PRs: 31
Issues: 0
Stars: 12
Contributions: 17 repos
Grade: B- (Focused on System Operations & Observability)`,

    "/github/contributions.txt": `Contribution Matrix Summary:

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░█░░░░█░░░░░░█░░░░░░░░░░░█░░░░█░░░░░░░░░
░░███░░██░░░░░███░░██░░░░░███░████░░░░░░░░
░█████████░░░████████░░░░███████████░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Type 'github' to close terminal and view animated 3D grids on the main page!`,

    "/thinking/principles.txt": `SYSTEM ENGINEERING PRINCIPLES:

1. System Architecture
   Map pipelines clearly. Avoid magical dependencies.
2. Failure Modeling
   Design around failovers. Assume things will break.
3. Observability
   Log explicitly. Collect metrics and telemetry dynamically.`,

    "/contact/links.txt": `CONTACT & SOCIALS:

GitHub:   https://github.com/ganeshak11
LinkedIn: https://linkedin.com/in/ganeshangadi1301
Email:    ganeshangadi13012006@gmail.com`,
};

const QUICK_COMMANDS = [
    { cmd: "ls", desc: "list files" },
    { cmd: "cd github", desc: "go to stats" },
    { cmd: "cat README.md", desc: "read manual" },
    { cmd: "github", desc: "view 3D graphs" },
    { cmd: "neofetch", desc: "system info" },
    { cmd: "pwd", desc: "working path" },
    { cmd: "clear", desc: "clear screen" },
    { cmd: "exit", desc: "quit terminal" },
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
        const lowerCmd = command.toLowerCase();

        switch (lowerCmd) {
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
                    const isDir = FILE_SYSTEM[filePath as keyof typeof FILE_SYSTEM] || (currentDir === "/" && FILE_SYSTEM[`/${filename}` as keyof typeof FILE_SYSTEM]);
                    if (isDir) {
                        setHistory((prev) => [...prev, makeEntry("output", `cat: ${filename}: Is a directory\n`)]);
                    } else {
                        const content = FILE_CONTENTS[filePath] || FILE_CONTENTS[filename];
                        if (content) {
                            setHistory((prev) => [...prev, makeEntry("output", content + "\n")]);
                        } else {
                            setHistory((prev) => [...prev, makeEntry("output", `cat: ${filename}: No such file\n`)]);
                        }
                    }
                }
                break;

            case "pwd":
                setHistory((prev) => [...prev, makeEntry("output", `${currentDir}\n`)]);
                break;

            case "date":
                setHistory((prev) => [...prev, makeEntry("output", `${new Date().toString()}\n`)]);
                break;

            case "uname":
                if (args[0] === "-a") {
                    setHistory((prev) => [...prev, makeEntry("output", "Linux ganeshangadi.online 5.15.0-88-generic #98-Ubuntu SMP x86_64 GNU/Linux\n")]);
                } else {
                    setHistory((prev) => [...prev, makeEntry("output", "Linux\n")]);
                }
                break;

            case "echo":
                setHistory((prev) => [...prev, makeEntry("output", `${args.join(" ")}\n`)]);
                break;

            case "touch":
            case "mkdir":
                setHistory((prev) => [...prev, makeEntry("output", `${lowerCmd}: cannot create: Read-only file system\n`)]);
                break;

            case "rm":
                setHistory((prev) => [...prev, makeEntry("output", "rm: cannot remove: Read-only file system\n")]);
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

            case "github":
            case "stats":
                setHistory((prev) => [
                    ...prev,
                    makeEntry("output", `
Opening GitHub Stats interface...
User: ganeshak11
Grade: B- (Focused on System Operations & Observability)
Animated Themes available: gitblock, green, season, south-season, night-green, night-rainbow.

Closing terminal and scrolling to stats section...
`),
                ]);
                setTimeout(() => {
                    onExit();
                    const el = document.getElementById("github-metrics");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 1200);
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
                                   
Ganesh Angadi — DevOps Engineer & Observability Specialist
`),
                ]);
                break;

            case "neofetch":
                setHistory((prev) => [
                    ...prev,
                    makeEntry("output", `
       _,met$$$$$gg.          ganesh@portfolio
    ,g$$$$$$$$$$$$$$$P.       ----------------
  ,g$$P"     """Y$$.".        OS: Ubuntu 22.04 LTS (Mental Model)
  ,$$P'              \`$$$.     Host: ganeshangadi.online
',$$P       ,ggs.     \`$$b:   Kernel: next-16.1.6
\`d$$'     ,$P"'   .    $$$    Uptime: up 24 mins
 $$$      d$'     ,    $$P    Packages: 24 (npm)
 $$:      $$.   -    ,d$$'    Shell: bash 5.1.16
 $$;      Y$b._   _,d$P'      Terminal: Framer Motion Terminal Simulator
 Y$$.    \`.\`"Y$$$$P"'         WM: Docker & Kubernetes (Local dev)
 \`$$b      "-.__              CPU: DevOps Core
  \`Y$$                        Memory: 381 Commits / 12 Stars
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
                            color: entry.type === "input" ? "var(--accent)" : "var(--fg)",
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
