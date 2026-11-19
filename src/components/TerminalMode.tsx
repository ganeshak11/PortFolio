"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence  } from "framer-motion";
import MatrixRain from "./MatrixRain";
import { useTheme } from "@/components/ThemeProvider";

const FILE_SYSTEM = {
    "/": ["about", "projects", "stack", "github", "thinking", "contact", "README.md"],
    "/about": ["info.txt"],
    "/projects": ["fortis-ecosystem", "fortis-os", "fortis-share", "fortis-tools", "mysuru-bus", "frost", "devcard", "mechkeys", "portfolio-infra", "fortis-observe", "cicd-sentinel"],
    "/stack": ["tools.txt"],
    "/github": ["stats.txt"],
    "/thinking": ["principles.txt"],
    "/contact": ["links.txt"],
};

const FILE_CONTENTS: Record<string, string> = {
    "README.md": `# Ganesh Angadi - Systems Engineer

Systems, distributed systems, cloud, networking, DevOps/SRE and backend.\nBuilding Fortis Ecosystem.

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

    "/about/info.txt": `Ganesh Angadi - Systems Engineer

I don't just write scripts. I design systems. My focus lies at the
intersection of DevOps, Kubernetes infrastructure, and observability.

CORE PRINCIPLES:
▸ Linux-first daily user
▸ Automated declarative configuration over manual tweaks
▸ Designing robust failover and self-healing environments
▸ Enforcing security boundaries and minimizing attack surfaces`,

    "/projects/cicd-sentinel": `CI/CD Sentinel - Graph-Native AI SRE Platform (college project)

A self-hosted, open-source intelligent deployment observability platform powered by Neo4j.

STACK:
- Database: Neo4j
- API Core: Node.js
- Frontend: Next.js
- Integration: GitHub Actions

KEY CAPABILITY:
Models the entire deployment lifecycle as a connected graph to calculate
failure blast radius instantly and automate incident triage.`,

    "/projects/fortis-ecosystem": `Fortis Ecosystem - my flagship  ★

A privacy-first system for an Android phone and Linux laptops: encrypted
password vault with autofill, TOTP, fingerprint-approved sudo, laptop remote
control, phone-as-webcam and encrypted backups. Joined over Tailscale,
with no cloud service in between. The docs are the specification.

STACK:
- Laptop daemon + crypto core: Rust (fortis-agent, fortis-core)
- sudo: Rust PAM module (pam_fortis) that verifies the phone's signature
- Desktop: Tauri  |  CLI: Rust  |  Browser: extension + native host
- Phone: Kotlin / Compose, Rust via UniFFI, Android Keystore
- Crypto: Argon2id, SQLCipher 4, XChaCha20-Poly1305, ECDSA P-256

SCALE: ~13.2k lines Rust, ~9.7k lines Kotlin, 9 components
REPO:  https://github.com/Fortis-OS/fortis-ecosystem`,

    "/projects/fortis-os": `FortisOS - the dream

One OS layer, one user, many machines: every device I own as one
logical computer.

STATUS: M0 skeleton, M1 metadata engine, M2 encrypted chunk store done.
TESTED WITH: a deterministic simulator (network faults, clock skew,
crashes), power-cut-after-every-write crash tests, mutation testing.
STACK: Rust
REPO: private while the design settles`,

    "/projects/fortis-share": `fortis-share - AirDrop for Linux -> Android

Send files, screenshots and the clipboard to your phone in one command
or one right-click, over Tailscale + Termux sshd. One-time QR link
fallback when the phone isn't reachable. No cloud.

INSTALL: npm install -g fortis-share
REPO: https://github.com/Fortis-Tools/fortis-share`,

    "/projects/fortis-tools": `Fortis-Tools - healthcheck

npx @fortis-tools/healthcheck <domain>
DNS, SSL, HTTP/2 (ALPN), security headers, port exposure, SPF/DMARC and
a sitemap spider, rolled into a health score. --json + exit codes for CI.

STACK: TypeScript, Node.js native dns/tls/https
REPO: https://github.com/Fortis-Tools/healthcheck`,

    "/projects/frost": `Frost - my custom KDE Plasma 6 theme

Dark glassmorphic desktop generated from one palette (accent #F21D43):
Plasma theme, Kvantum, widgets, dock, Dynamic Island, SDDM, Plymouth,
GRUB, cursors, ~1,400 icons, GTK, VS Code, Firefox, Kitty.
This portfolio is styled after it.

REPO: https://github.com/ganeshak11/frost`,

    "/projects/devcard": `DevCard - npx ganeshak11

An interactive terminal business card: bio, skills, links, QR code.
STACK: TypeScript, Inquirer, Boxen, Chalk`,

    "/projects/mechkeys": `mechkeys - mechanical keyboard sounds

Rust daemon reading every keyboard via evdev and playing switch sounds
from 26 packs, controlled over a Unix socket and a TUI.
REPO: https://github.com/ganeshak11/mechkeys`,

    "/projects/fortis-observe": `FortisObserve - telemetry for this portfolio (college project)

Decoupled visitor analytics: Next.js, Supabase, WebGL globe, TOTP-gated.
REPO: https://github.com/ganeshak11/FortisObserve`,

    "/projects/mysuru-bus": `MY(suru) BUS - Smart Transit Platform

A city-scale public transportation platform tracking buses in real-time.

ARCHITECTURE:
- Passenger Interface: React Native (Expo)
- Fleet Tracking App: React Native (Driver client)
- Operations Dashboard: Next.js + Tailwind
- Backend: Node.js, Express, Socket.io, JWT, PostgreSQL

DESIGN HIGHLIGHTS:
▸ Offline-first queuing system synchronizes driver GPS buffers
▸ Database-level security policies enforce role-based access`,

    "/projects/portfolio-infra": `Portfolio Infrastructure - DevOps Setup

Zero-to-production automated infrastructure provisioning and deployment.

STACK:
- IaC: Terraform
- Containers: Docker, Kubernetes (Minikube)
- Cloud: AWS EC2
- CI/CD: GitHub Actions`,

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

function getDynamicAge() {
    const birthDate = new Date(2006, 0, 13, 2, 30, 0); // 13 Jan 2006 2:30 AM
    const now = new Date();
    
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    let hours = now.getHours() - birthDate.getHours();
    let minutes = now.getMinutes() - birthDate.getMinutes();
    let seconds = now.getSeconds() - birthDate.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        // Get total days in last month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    return `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export default function TerminalMode({ onExit }: { onExit: () => void }) {
    const { theme, toggle } = useTheme();
    const toggledRef = useRef(false);

    useEffect(() => {
        if (theme === "light") {
            toggle();
            toggledRef.current = true;
        }
        return () => {
            if (toggledRef.current) {
                toggle();
            }
        };
    }, []);

    const entryId = useRef(0);
    const makeEntry = (type: "input" | "output", text: string, lineHeight?: number | string) => ({ id: ++entryId.current, type, text, lineHeight });
    const [history, setHistory] = useState<{ id: number; type: "input" | "output"; text: string; lineHeight?: number | string }[]>([
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
 ██████╗  █████╗ ███╗   ██╗███████╗███████╗██╗  ██╗
██╔════╝ ██╔══██╗████╗  ██║██╔════╝██╔════╝██║  ██║
██║  ███╗███████║██╔██╗ ██║█████╗  ███████╗███████║
██║   ██║██╔══██║██║╚██╗██║██╔══╝  ╚════██║██╔══██║
╚██████╔╝██║  ██║██║ ╚████║███████╗███████║██║  ██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝
`, "1"),
                    makeEntry("output", `
Ganesh Angadi — Systems Engineer (distributed systems, cloud, networking, DevOps/SRE, backend)
`),
                ]);
                break;

            case "neofetch":
                const age = getDynamicAge();
                const specs = [
                    "ganesh@ubuntu",
                    "-------------",
                    "OS        : Ubuntu 24.04.4 LTS",
                    "Host      : ganeshak11-Vostro-15-3515",
                    `Uptime    : ${age}`,
                    "Kernel    : 6.8.0-134-generic",
                    "Shell     : /bin/bash",
                    "IDE       : VS Code, Vim",
                    "Languages : TypeScript, Python, Shell, C",
                    "Building  : Fortis Ecosystem, FortisOS",
                    "Telemetry : S1 (8-Puzzle: 3s) | S2 (Rubik: 48s) | S3 (Sudoku: 52s)"
                ];

                setHistory((prev) => [
                    ...prev,
                    makeEntry("output", specs.join("\n") + "\n"),
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
Role: Systems Engineer
Location: Mysuru, Karnataka, India

[EXPERIENCE & ACHIEVEMENTS]
▸ Founding Software Engineer (Intern) @ Kridtech Corp. — Vaniger (Verified · KT-INT-005)
▸ AI & Machine Learning Intern @ Artsy Technologies
▸ 1st Place - MCP-Based Systems Engineering Hackathon

[TOP PROJECTS]
▸ Fortis Ecosystem - privacy-first phone + Linux laptop platform (flagship)
▸ MY(suru) BUS - Real-Time Smart Bus Tracking
▸ Frost - custom KDE Plasma 6 theme
▸ fortis-share / healthcheck - Fortis-Tools

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
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)" }}>
                    portfolio.sh - Terminal Mode
                </span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button
                        onClick={() => setShowCommands(!showCommands)}
                        style={{
                            background: "none",
                            border: "1px solid var(--fg)",
                            color: "var(--fg)",
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            padding: "4px 12px",
                            cursor: "pointer",
                            transition: "opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.cssText = "background: none; border: 1px solid var(--fg); color: var(--fg); font-family: var(--font-mono); font-size: 12px; padding: 4px 12px; cursor: pointer; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s; background: var(--fg); color: var(--bg);";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.cssText = "background: none; border: 1px solid var(--fg); color: var(--fg); font-family: var(--font-mono); font-size: 12px; padding: 4px 12px; cursor: pointer; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s;";
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
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            padding: "4px 12px",
                            cursor: "pointer",
                            transition: "opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.cssText = "background: none; border: 1px solid var(--accent); color: var(--accent); font-family: var(--font-mono); font-size: 12px; padding: 4px 12px; cursor: pointer; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s; background: var(--accent); color: var(--bg);";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.cssText = "background: none; border: 1px solid var(--accent); color: var(--accent); font-family: var(--font-mono); font-size: 12px; padding: 4px 12px; cursor: pointer; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s;";
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
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 12,
                                    padding: "6px 12px",
                                    cursor: "pointer",
                                    transition: "opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s",
                                    borderRadius: 4,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.cssText = "background: none; border: 1px solid var(--muted); color: var(--muted); font-family: var(--font-mono); font-size: 12px; padding: 6px 12px; cursor: pointer; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s; border-radius: 4px; background: var(--muted); color: var(--bg);";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.cssText = "background: none; border: 1px solid var(--muted); color: var(--muted); font-family: var(--font-mono); font-size: 12px; padding: 6px 12px; cursor: pointer; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s; border-radius: 4px;";
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
                    fontFamily: "var(--font-mono)",
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
                            whiteSpace: entry.lineHeight ? "pre" : "pre-wrap",
                            wordBreak: entry.lineHeight ? "normal" : "break-word",
                            lineHeight: entry.lineHeight || "inherit",
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
                            fontFamily: "var(--font-mono)",
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
