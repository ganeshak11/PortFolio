"use client";

import { useRef, useState } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";

const PROJECTS = [
    {
        num: "00",
        name: "Portfolio Infrastructure",
        github: "https://github.com/ganeshak11/PortFolio",
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

function ProgressBar({ label, pct, active, delay }: { label: string; pct: number; active: boolean; delay: number }) {
    return (
        <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>
                <span>{label}</span>
                <span style={{ color: "var(--accent)" }}>{pct}%</span>
            </div>
            <div style={{ height: 3, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <m.div
                    initial={{ width: 0 }}
                    animate={active ? { width: `${pct}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: "100%", background: "var(--accent)", borderRadius: 2 }}
                />
            </div>
        </div>
    );
}

function ProjectRow({ project, index, inView, openIndex, setOpenIndex }: {
    project: typeof PROJECTS[0];
    index: number;
    inView: boolean;
    openIndex: number | null;
    setOpenIndex: (i: number | null) => void;
}) {
    const open = openIndex === index;

    return (
        <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
            style={{ borderTop: "1px solid var(--border)" }}
        >
            <button
                onClick={() => setOpenIndex(open ? null : index)}
                style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "20px 0",
                    display: "grid",
                    gridTemplateColumns: "48px 1fr auto",
                    alignItems: "center",
                    gap: 16,
                    textAlign: "left",
                }}
                className="project-row-btn"
            >
                <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em" }}>
                    {project.num}
                </span>

                <div className="project-inner-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center" }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap", marginBottom: 5 }}>
                            <span style={{ fontSize: "clamp(15px, 2vw, 20px)", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--fg)" }}>
                                {project.name}
                            </span>
                            <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--muted)" }}>
                                {project.tagline}
                            </span>
                        </div>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontFamily: "monospace", color: project.statusColor }}>
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: project.statusColor, display: "inline-block" }} />
                                {project.status}
                            </span>
                            <span style={{ color: "var(--border)", fontSize: 10 }}>·</span>
                            {project.stack.slice(0, 3).map(t => (
                                <span key={t} style={{ fontFamily: "monospace", fontSize: 10, color: "var(--muted)" }}>{t}</span>
                            ))}
                            {project.stack.length > 3 && (
                                <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--muted)" }}>+{project.stack.length - 3}</span>
                            )}
                        </div>
                    </div>
                </div>

                <span style={{
                    fontSize: 16, color: "var(--accent)", flexShrink: 0,
                    transition: "transform 0.25s",
                    transform: open ? "rotate(45deg)" : "none",
                    display: "inline-block",
                    lineHeight: 1,
                }}>+</span>
            </button>

            <AnimatePresence>
                {open && (
                    <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                    >
                        <div className="project-expanded" style={{ paddingBottom: 36, paddingLeft: 64 }}>
                            {/* Full stack */}
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                                {project.stack.map(t => (
                                    <span key={t} style={{
                                        fontSize: 11, fontFamily: "monospace",
                                        color: "var(--accent)", border: "1px solid var(--border)",
                                        padding: "2px 8px", borderRadius: 4,
                                    }}>{t}</span>
                                ))}
                            </div>

                            <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)", maxWidth: 600, marginBottom: 32 }}>
                                {project.intro}
                            </p>

                            {/* Progress bars for WIP */}
                            {project.progress && (
                                <div style={{ marginBottom: 32, maxWidth: 480 }}>
                                    <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 14, textTransform: "uppercase" }}>
                                        Build Progress
                                    </p>
                                    {project.progress.map((item, i) => (
                                        <ProgressBar key={item.label} label={item.label} pct={item.pct} active={open} delay={i * 0.12} />
                                    ))}
                                </div>
                            )}

                            <div className="project-detail-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40, marginBottom: 28 }}>
                                <div>
                                    <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 16, textTransform: "uppercase" }}>
                                        Technical Highlights
                                    </p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                        {project.highlights.map(h => (
                                            <div key={h.title} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 12 }}>
                                                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)", marginBottom: 3 }}>{h.title}</p>
                                                <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>{h.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 16, textTransform: "uppercase" }}>
                                        Known Limitations
                                    </p>
                                    <ul style={{ listStyle: "none", padding: 0 }}>
                                        {project.limitations.map(l => (
                                            <li key={l} style={{ fontSize: 13, color: "var(--muted)", padding: "8px 0", borderBottom: "1px solid var(--border)", display: "flex", gap: 10, lineHeight: 1.6 }}>
                                                <span style={{ color: "var(--status-warn)", flexShrink: 0 }}>△</span>
                                                {l}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontFamily: "monospace", fontSize: 12, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 2 }}
                            >
                                View on GitHub →
                            </a>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </m.div>
    );
}

export default function Projects() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section ref={ref} id="projects" className="section-pad" style={{ padding: "100px 24px", background: "var(--bg)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 48 }}
                >
                    <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 12 }}>
                        $ ls -lh /opt/projects
                    </p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                        Things I've Built
                    </h2>
                </m.div>

                <div>
                    {PROJECTS.map((p, i) => (
                        <ProjectRow key={p.num} project={p} index={i} inView={inView} openIndex={openIndex} setOpenIndex={setOpenIndex} />
                    ))}
                    <div style={{ borderTop: "1px solid var(--border)" }} />
                </div>
            </div>
        </section>
    );
}
