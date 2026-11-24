"use client";

import { Fragment, useRef, useState } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, Copy, Check } from "lucide-react";
import { SectionHead, Reveal } from "@/components/ui/SectionHead";

type ProjectData = {
    num: string;
    name: string;
    github: string;
    tagline: string;
    status: string;
    statusColor: string;
    stack: string[];
    intro: string;
    highlights: { title: string; desc: string }[];
    /** Which highlight to show on the closed card (default: the first). */
    cardHighlight?: number;
    limitations: string[];
    progress?: { label: string; pct: number }[];
    group?: "main" | "earlier";
    badge?: string;
    image?: string;
    live?: string;
    /** A shell command to try the project, shown with a copy button. */
    command?: string;
};

const PROJECTS: ProjectData[] = [
    {
        num: "01",
        name: "MY(suru) BUS",
        github: "https://github.com/ganeshak11/MY-suru-BUS",
        live: "https://my-suru-bus.vercel.app/live",
        badge: "largest by scale",
        tagline: "Real-Time Bus Tracking & Fleet Management",
        cardHighlight: 3,
        status: "Live demo · simulated bus",
        statusColor: "var(--status-ok)",
        stack: ["Node.js", "Express", "Socket.io", "PostgreSQL", "Next.js", "React Native", "Expo", "GitHub Actions"],
        intro: "A city-scale public transport platform for Mysuru, built from scratch as a multi-app monorepo: a Node.js backend, a Next.js admin dashboard, and Expo driver and passenger apps, all fed by live GPS over WebSockets. The live map is public, with a demo bus driven through the real API every 30 minutes.",
        highlights: [
            { title: "Four apps, one backend", desc: "Admin dashboard, driver app, passenger app and a public live map on one REST + Socket.io API" },
            { title: "Server-side trip progress", desc: "Each GPS fix advances the trip on the server, measured or inferred stops; ETAs are the schedule plus the live delay" },
            { title: "Runs itself every day", desc: "Trips are generated from weekday schedules with default buses and drivers; restarts no longer hide live buses" },
            { title: "Built for bad networks", desc: "Offline GPS queue in the driver app, stale replays ignored server-side, sessions that renew mid-shift" },
            { title: "Audited and tested", desc: "Code, security and real-world flow audits; 68 backend tests; Android APKs built on GitHub Actions" },
        ],
        limitations: [
            "Depends on the driver's phone for GPS",
            "Free-tier hosting: about 20 s to wake up after idling",
            "Route lines are straight stop to stop; no traffic prediction yet",
        ],
        image: "/projects/mysurubus-live-roads.jpg",
    },
    {
        num: "02",
        name: "Frost",
        github: "https://github.com/ganeshak11/frost",
        image: "/projects/frost-preview.jpg",
        badge: "this site's look",
        tagline: "My first fully custom KDE Plasma 6 theme",
        status: "Daily driver",
        statusColor: "var(--status-ok)",
        stack: ["KDE Plasma 6", "QML", "Python", "Kvantum", "SDDM", "Bash"],
        intro: "I looked at different themes and combined components from several of them, but nothing quite matched, so I built one. A dark, glassmorphic theme for my whole desktop, generated from one palette (accent #F21D43): native Plasma widgets, a dock, a Dynamic Island, and matching themes from the boot screen to the code editor. This site uses the same palette.",
        highlights: [
            { title: "Generated, not hand-edited", desc: "build.py produces the colour scheme, Plasma theme, Kvantum styles, window decorations and global themes" },
            { title: "Obsidian Glass widgets", desc: "QML plasmoids with shared design tokens: clock, system observatory, calendar, weather, focus timer, controls" },
            { title: "Boot to editor", desc: "GRUB, Plymouth, SDDM login, splash, 23 cursors, ~1,400 recoloured icons, GTK 3/4, Firefox, Kitty, VS Code" },
            { title: "Safe to try", desc: "install.sh backs up your previous look; revert.sh and --undo flags put everything back" },
        ],
        limitations: [
            "Dark only, and built for Plasma 6 on Wayland",
            "Boot splash and login theme need sudo",
        ],
    },
    {
        num: "03",
        name: "DevCard",
        github: "https://github.com/ganeshak11/devcard-ganeshak11",
        image: "/projects/devcard-preview.jpg",
        tagline: "npx -y ganeshak11 — my CLI business card",
        command: "npx -y ganeshak11",
        status: "Published on npm",
        statusColor: "var(--status-ok)",
        stack: ["TypeScript", "Node.js", "Inquirer", "Boxen", "Chalk"],
        intro: "A developer visiting card for the terminal. Run npx -y ganeshak11 and get my bio, skills and links in an animated boxen layout with an interactive command palette and a scannable QR code.",
        highlights: [
            { title: "Zero install", desc: "Published to npm, runs anywhere with npx" },
            { title: "Interactive palette", desc: "Arrow-key navigation through sections via Inquirer" },
            { title: "QR + easter egg", desc: "Terminal QR code to the portfolio, and a “Summon the Duck” animation" },
        ],
        limitations: [
            "Needs Node.js and a terminal with colour support",
        ],
    },
    {
        num: "04",
        name: "mechkeys",
        github: "https://github.com/ganeshak11/mechkeys",
        tagline: "Mechanical keyboard sounds for any keyboard",
        status: "Hobby",
        statusColor: "var(--accent)",
        stack: ["Rust", "evdev", "rodio", "Unix sockets", "Python"],
        intro: "A small Rust daemon that listens to every keyboard on the system through evdev and plays a switch sound on each key press: Cherry MX, Kailh Box, NK Cream, typewriters and more, from 26 sound packs.",
        highlights: [
            { title: "Low-latency playback", desc: "Samples are decoded once and mixed in memory, so a click plays the moment the key goes down" },
            { title: "Per-key mappings", desc: "Sound packs map individual keys (space, enter, backspace) to their own samples" },
            { title: "Daemon + control", desc: "A Unix-socket IPC (set / toggle / status / list) driven by a terminal UI and a Python menu" },
            { title: "Survives audio hiccups", desc: "Reopens the audio output with back-off when the stream breaks" },
        ],
        limitations: [
            "Linux only: reads /dev/input, so the user needs input-group access",
        ],
    },
    {
        group: "earlier",
        num: "05",
        name: "Portfolio Infrastructure",
        github: "https://github.com/ganeshak11/PortFolio/tree/main",
        tagline: "Zero-to-Production DevOps Pipeline",
        status: "Deployed",
        statusColor: "var(--status-ok)",
        stack: ["Docker", "Terraform", "AWS EC2", "GitHub Actions", "Minikube"],
        intro: "Transformed a standard Next.js web application into a production-grade infrastructure deployment. Moved from manual deployments to a fully automated CI/CD pipeline with Infrastructure as Code.",
        highlights: [
            { title: "Containerization", desc: "Multi-stage Dockerfile optimization (75MB final image)" },
            { title: "Infrastructure as Code", desc: "Terraform AWS provisioning (VPC, Subnets, EC2, SG)" },
            { title: "CI/CD Automation", desc: "GitHub Actions pipeline for automated build, push, and deploy" },
            { title: "Container Orchestration", desc: "Kubernetes local deployment testing with self-healing Pods" },
        ],
        limitations: [
            "Currently running local Minikube for K8s testing to optimize cloud costs",
            "Exploring managed EKS migration in the future",
        ],
    },
    {
        group: "earlier",
        num: "06",
        name: "FortisObserve",
        github: "https://github.com/ganeshak11/FortisObserve",
        tagline: "Telemetry & Command Center",
        status: "Deployed",
        statusColor: "var(--status-ok)",
        stack: ["Next.js", "Supabase", "WebGL", "TOTP"],
        intro: "A decoupled telemetry and visitor analytics platform. Acts as an invisible observatory, capturing real-time visitor metrics and traffic flows.",
        highlights: [
            { title: "Zero-Trust Security", desc: "Edge middleware enforcing TOTP and WebAuthn hardware keys." },
            { title: "Global Radar", desc: "Real-time 3D globe visualization of connection arcs using react-globe.gl." },
            { title: "Intelligent Telemetry", desc: "PostgreSQL RPCs for atomic session management and bot fingerprinting." }
        ],
        limitations: [
            "Currently direct DB inserts — planning Redis queue for high traffic spikes."
        ],
    },
    {
        group: "earlier",
        num: "07",
        name: "CI/CD Sentinel",
        github: "https://github.com/ganeshak11/CI-CD_Sentinel",
        tagline: "Deployment Observability & Recovery Layer",
        cardHighlight: 1,
        status: "College project · ~80%",
        statusColor: "var(--status-warn)",
        stack: ["Next.js", "Supabase", "Webhooks", "CI/CD", "Polling"],
        intro: "Centralized observability and recovery layer for software deployments. Tracks deployment history, monitors health via polling, and provides one-click recovery — all from a single dashboard.",
        highlights: [
            { title: "Why I'm building this", desc: "Deployment failures are invisible until they're catastrophic. This makes them visible before that." },
            { title: "Webhook ingestion with idempotency", desc: "Handles duplicate events gracefully — critical for reliable pipeline tracking" },
            { title: "Health monitoring via polling", desc: "Active checks on deployed services, not just passive log collection" },
            { title: "One-click rollback", desc: "Recovery controls directly from the dashboard — no SSH, no panic" },
        ],
        limitations: [
            "Currently polling-based — event-driven would be more efficient",
            "Dashboard UI still in progress — core backend is solid",
            "No multi-tenant support yet",
        ],
        progress: [
            { label: "Backend Foundation & DB", pct: 95 },
            { label: "Webhook Ingestion & Idempotency", pct: 90 },
            { label: "Health Monitoring Worker", pct: 75 },
            { label: "Dashboard UI & Redeploy Control", pct: 60 },
        ],
    },
];

type Project = ProjectData;

// "$ command" with a copy button. Tries the Clipboard API, then the older
// execCommand copy (some browsers or embedded views refuse one or the other);
// if both are refused, it selects the command and asks for Ctrl+C.
function CommandCopy({ command }: { command: string }) {
    const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
    const codeRef = useRef<HTMLElement>(null);
    const legacyCopy = () => {
        const ta = document.createElement("textarea");
        ta.value = command;
        ta.style.position = "fixed";
        ta.style.left = "-999999px";
        document.body.appendChild(ta);
        ta.select();
        let ok = false;
        try { ok = document.execCommand("copy"); } catch { ok = false; }
        document.body.removeChild(ta);
        return ok;
    };
    const copy = async () => {
        let ok = false;
        if (navigator.clipboard && window.isSecureContext) {
            try { await navigator.clipboard.writeText(command); ok = true; } catch { ok = false; }
        }
        if (!ok) ok = legacyCopy();
        if (!ok && codeRef.current) {
            const range = document.createRange();
            range.selectNodeContents(codeRef.current);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
        }
        setState(ok ? "copied" : "manual");
        setTimeout(() => setState("idle"), 2500);
    };
    const copied = state === "copied";
    return (
        <div
            style={{
                display: "flex", alignItems: "center", gap: 10, marginTop: 16,
                padding: "10px 10px 10px 14px", borderRadius: 10,
                border: "1px solid var(--accent-line)", background: "rgba(0,0,0,.25)",
                fontFamily: "var(--font-mono)", fontSize: 14, maxWidth: "100%",
            }}
        >
            <span style={{ color: "var(--accent)", userSelect: "none" }}>$</span>
            <code ref={codeRef} style={{ flex: 1, minWidth: 0, overflowX: "auto", whiteSpace: "nowrap", userSelect: "all" }}>{command}</code>
            <button
                type="button"
                onClick={copy}
                className="btn sm"
                aria-label={copied ? "Copied" : `Copy command: ${command}`}
                style={{ flexShrink: 0 }}
            >
                {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Copied" : state === "manual" ? "Press Ctrl+C" : "Copy"}
            </button>
            <span aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                {copied ? "Command copied to clipboard" : state === "manual" ? "Command selected; press Control C to copy" : ""}
            </span>
        </div>
    );
}

function Detail({ project }: { project: Project }) {
    return (
        <m.div
            className="panel proj-detail"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ borderColor: "var(--accent-line)" }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <div style={{ minWidth: 0 }}>
                    <p className="label" style={{ marginBottom: 6 }}>{project.num} / {project.tagline}</p>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.05 }}>{project.name}</h3>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn sm primary">
                            Demo site <ArrowUpRight size={13} />
                        </a>
                    )}
                    <a href={project.github} target="_blank" rel="me noopener noreferrer" className="btn sm">
                        View on GitHub <ArrowUpRight size={13} />
                    </a>
                </div>
            </div>

            {project.command && <CommandCopy command={project.command} />}

            <div className="row-wrap" style={{ marginTop: 16 }}>
                {project.stack.map((t) => <span key={t} className="chip accent">{t}</span>)}
            </div>

            {"progress" in project && project.progress && (
                <div style={{ marginTop: 22, maxWidth: 520 }}>
                    <p className="label">Build progress</p>
                    {project.progress.map((item, i) => (
                        <div key={item.label} style={{ marginBottom: 12 }}>
                            <div className="mono" style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>
                                <span>{item.label}</span>
                                <span style={{ color: "var(--accent)" }}>{item.pct}%</span>
                            </div>
                            <div className="bar">
                                <m.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="detail-cols">
                <div>
                    <p className="label">Technical highlights</p>
                    {project.highlights.map((h) => (
                        <div key={h.title} className="hl">
                            <b>{h.title}</b>
                            <span>{h.desc}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <p className="label">Known limitations</p>
                    <ul className="lim">
                        {project.limitations.map((l) => <li key={l}>{l}</li>)}
                    </ul>
                </div>
            </div>
        </m.div>
    );
}

function ProjectGrid({ items, openKey, setOpenKey }: { items: Project[]; openKey: string | null; setOpenKey: (k: string | null) => void }) {
    return (
        <div className="proj-grid" style={{ gridAutoFlow: "row dense" }}>
            {items.map((p, i) => {
                const open = openKey === p.num;
                return (
                    <Fragment key={p.num}>
                        <Reveal delay={(i % 3) * 0.05} style={{ display: "flex" }}>
                            <button
                                className={`panel hover proj${open ? " open" : ""}`}
                                onClick={() => setOpenKey(open ? null : p.num)}
                                aria-expanded={open}
                            >
                                <div className="panel-bar" style={{ width: "100%" }}>
                                    <span className="title">/opt/projects/{p.num}</span>
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: p.statusColor, whiteSpace: "nowrap" }}>
                                        <span className="dot" />
                                        {p.status}
                                    </span>
                                </div>
                                {p.image && (
                                    <div className="proj-media">
                                        <Image src={p.image} alt={`${p.name} preview`} fill sizes="(max-width: 760px) 100vw, 400px" />
                                    </div>
                                )}
                                <div className="proj-body">
                                    {p.badge && <span className="chip solid" style={{ alignSelf: "flex-start" }}>{p.badge}</span>}
                                    <h3 className="proj-name">{p.name}</h3>
                                    <p className="proj-tag">{p.tagline}</p>
                                    <p className="proj-intro">{p.intro}</p>
                                    {(() => {
                                        const h = p.highlights[p.cardHighlight ?? 0];
                                        return h ? (
                                            <p className="proj-hl"><b>{h.title}</b> {h.desc}</p>
                                        ) : null;
                                    })()}
                                </div>
                                <div className="proj-foot" style={{ width: "100%" }}>
                                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
                                        {p.stack.slice(0, 3).join(" · ")}{p.stack.length > 3 ? ` +${p.stack.length - 3}` : ""}
                                    </span>
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--accent)", flexShrink: 0 }}>
                                        {open ? <Minus size={13} /> : <Plus size={13} />} {open ? "close" : "details"}
                                    </span>
                                </div>
                            </button>
                        </Reveal>
                        <AnimatePresence>{open && <Detail key={`d-${p.num}`} project={p} />}</AnimatePresence>
                    </Fragment>
                );
            })}
        </div>
    );
}

export default function Projects() {
    const [openKey, setOpenKey] = useState<string | null>(null);
    const main = PROJECTS.filter((p) => p.group !== "earlier");
    const earlier = PROJECTS.filter((p) => p.group === "earlier");

    return (
        <section id="projects" className="section">
            <div className="wrap">
                <SectionHead
                    index="04"
                    cmd="ls ~/dev"
                    title="Other projects"
                    lede="Open a card for every highlight and the known limitations."
                />
                <ProjectGrid items={main} openKey={openKey} setOpenKey={setOpenKey} />

                <div className="proj-group">
                    <p className="cap" style={{ margin: "0 4px 16px" }}><span className="dot" style={{ color: "var(--accent)" }} />04.1 · college &amp; earlier work</p>
                    <ProjectGrid items={earlier} openKey={openKey} setOpenKey={setOpenKey} />
                </div>
            </div>
        </section>
    );
}
