"use client";

import { Fragment, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { SectionHead, Reveal } from "@/components/ui/SectionHead";

const PROJECTS = [
    {
        num: "00",
        name: "Portfolio Infrastructure",
        github: "https://github.com/ganeshak11/PortFolio/tree/dev",
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
        num: "01",
        name: "MY(suru) BUS",
        github: "https://github.com/ganeshak11/MY-suru-BUS",
        tagline: "Real-Time Bus Tracking System",
        status: "Deployed",
        statusColor: "var(--status-ok)",
        stack: ["Next.js", "React Native", "Supabase", "PostgreSQL", "Leaflet"],
        intro: "City-scale real-time bus tracking and management platform. Built with reliability over UI as the core principle — database as single source of truth, RLS enforced at DB level, offline-first with queue + auto-sync.",
        highlights: [
            { title: "Separation of static schedules vs dynamic trips", desc: "Postgres relational schema for consistency" },
            { title: "Row-Level Security policies", desc: "Enforced at database level, not application" },
            { title: "Realtime event subscriptions", desc: "WebSocket-based live updates" },
            { title: "Avoided NoSQL overengineering", desc: "Relational model fits the domain" },
        ],
        limitations: [
            "Driver phone dependency – single point of failure",
            "GPS precision limits – urban canyon effects",
            "No traffic prediction yet – ETA is distance-based only",
        ],
    },
    {
        num: "02",
        name: "AUTOops",
        github: "https://github.com/keerthi-180205/autoops-ai",
        tagline: "AWS Infrastructure Orchestrator",
        status: "Hackathon",
        statusColor: "var(--accent)",
        stack: ["Docker", "Node.js", "Python", "AWS EC2", "React"],
        intro: "DevOps and infrastructure layer for an AI-driven cloud provisioning platform. Architected containerization and local deployment environment for a 4-person team.",
        highlights: [
            { title: "Network Isolation", desc: "Backend reaches internal agents without exposing ports externally" },
            { title: "Model Context Protocol", desc: "Wrapped the orchestration suite as an MCP server" },
        ],
        limitations: [
            "Heavy Docker reliance limits deployment to container-friendly hosts",
            "Hot-reloading required volume mapping, complicating Dockerfiles",
        ],
    },
    {
        num: "03",
        name: "Cyber Kavach",
        github: "https://github.com/ganeshak11/Infra-Sentinel",
        tagline: "Cyber Security Platform Infrastructure",
        status: "Hackathon",
        statusColor: "var(--accent)",
        stack: ["Docker", "FastAPI", "Python", "Scikit-Learn", "Nginx"],
        intro: "Infrastructure and deployment track for a real-time intrusion detection platform. Multi-container orchestration with strict dependency ordering and minimal attack surfaces.",
        highlights: [
            { title: "Host Network Integration", desc: "Configured agent with network_mode: host to access /var/log/auth.log" },
            { title: "Unified Docker Compose", desc: "Wired React, FastAPI, and ML agent together sequentially" },
        ],
        limitations: [
            "Host network mode breaks Docker isolation by design",
            "Combining ML models and web servers increased memory footprint",
        ],
    },
    {
        num: "04",
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
        num: "05",
        name: "DevCard",
        github: "https://github.com/ganeshak11/devcard-ganeshak11",
        tagline: "Dynamic CLI Dashboard",
        status: "Deployed",
        statusColor: "var(--status-ok)",
        stack: ["Markdown", "GitHub APIs", "Github Stats"],
        intro: "A highly customized and dynamic GitHub profile README showcasing live metrics, system design philosophy, and technical stacks.",
        highlights: [
            { title: "Live Metrics", desc: "Dynamic integration of GitHub stats, language breakdowns, and activity graphs." },
            { title: "System Thinker Aesthetic", desc: "Terminal-styled themes and formatting that matches a DevOps mentality." }
        ],
        limitations: [
            "Relies heavily on external APIs for dynamic badge generation."
        ],
    },
    {
        num: "WIP",
        name: "CI/CD Sentinel",
        github: "https://github.com/ganeshak11/CI-CD_Sentinel",
        tagline: "Deployment Observability & Recovery Layer",
        status: "~80% Complete",
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

type Project = (typeof PROJECTS)[number];

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
                <a href={project.github} target="_blank" rel="me noopener noreferrer" className="btn sm">
                    View on GitHub <ArrowUpRight size={13} />
                </a>
            </div>

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

export default function Projects() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="projects" className="section">
            <div className="wrap">
                <SectionHead
                    index="03"
                    cmd="ls -lh /opt/projects"
                    title={<>Things I&apos;ve <em>built</em></>}
                    lede="Each one with the trade-offs and the parts that still break. Open a card for highlights and known limitations."
                />

                <div className="proj-grid" style={{ gridAutoFlow: "row dense" }}>
                    {PROJECTS.map((p, i) => {
                        const open = openIndex === i;
                        return (
                            <Fragment key={p.num}>
                                <Reveal delay={(i % 3) * 0.05} style={{ display: "flex" }}>
                                    <button
                                        className={`panel hover proj${open ? " open" : ""}`}
                                        onClick={() => setOpenIndex(open ? null : i)}
                                        aria-expanded={open}
                                    >
                                        <div className="panel-bar" style={{ width: "100%" }}>
                                            <span className="title">/opt/projects/{p.num}</span>
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: p.statusColor }}>
                                                <span className="dot" />
                                                {p.status}
                                            </span>
                                        </div>
                                        <div className="proj-body">
                                            <h3 className="proj-name">{p.name}</h3>
                                            <p className="proj-tag">{p.tagline}</p>
                                            <p className="proj-intro">{p.intro}</p>
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
            </div>
        </section>
    );
}
