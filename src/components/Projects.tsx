"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
    {
        name: "MY(suru) BUS",
        github: "https://github.com/ganeshak11/MY-suru-BUS",
        tagline: "Real-Time Bus Tracking System",
        intro: (
            <>
                A city-scale real-time bus tracking and management platform built by{" "}
                <a
                    href="#about"
                    style={{
                        color: "var(--accent)",
                        textDecoration: "underline",
                    }}
                >
                    Ganesh Angadi
                </a>
                , a DevOps engineer focused on system reliability and Linux-based infrastructure design.
            </>
        ),
        architecture: [
            "Admin Dashboard – Next.js",
            "Driver App – React Native (Expo)",
            "Passenger App – React Native",
            "Backend – Supabase (PostgreSQL, Auth, Realtime, RLS)",
            "Maps – Leaflet + OpenStreetMap",
        ],
        philosophy: [
            "Reliability over UI",
            "Database as single source of truth",
            "Enforce logic at DB level using RLS",
            "Event-driven realtime architecture",
            "Offline-first design with queue + auto-sync",
        ],
        features: [
            "Live GPS tracking",
            "Geofencing-based stop detection",
            "ETA recalculation",
            "Role-based access control at database level",
            "Offline location queue with timestamp sync",
            "Admin observability dashboard",
            "Passenger reports & announcements",
        ],
        highlights: [
            {
                title: "Separation of static schedules vs dynamic trips",
                desc: "Postgres relational schema for consistency",
            },
            {
                title: "Row-Level Security policies",
                desc: "Enforced at database level, not application",
            },
            {
                title: "Realtime event subscriptions",
                desc: "WebSocket-based live updates",
            },
            {
                title: "Avoided NoSQL overengineering",
                desc: "Relational model fits the domain",
            },
        ],
        limitations: [
            "Driver phone dependency – single point of failure",
            "GPS precision limits – urban canyon effects",
            "No traffic prediction yet – ETA is distance-based only",
        ]
    },
    {
        name: "AUTOops (Hackathon)",
        github: "https://github.com/keerthi-180205/autoops-ai",
        tagline: "AWS Infrastructure Orchestrator",
        intro: (
            <>
                The DevOps and Infrastructure layer for an AI-driven cloud provisioning platform built by a 4-person team. I architected the containerization and local deployment environment.
            </>
        ),
        architecture: [
            "Frontend Dashboard – React",
            "Backend API Gateway – Node.js",
            "Master Agent – Python LLM Planner",
            "Worker Agent – Python AWS Executor",
            "Infrastructure – Docker & AWS EC2",
        ],
        philosophy: [
            "Containerized local parity ('Works on my machine')",
            "Internal DNS for secure microservice communication",
            "Automated bootstrap scripts over manual setup",
        ],
        features: [
            "One-click docker-compose orchestration",
            "Centralized environment variable injection",
            "Rapid Windows/Ubuntu EC2 deployment scripts",
            "AI-driven Infrastructure as Code management",
        ],
        highlights: [
            {
                title: "Network Isolation",
                desc: "Backend securely reaches internal agents without exposing ports externally",
            },
            {
                title: "Model Context Protocol",
                desc: "Wrapped the orchestration suite as an MCP server",
            },
        ],
        limitations: [
            "Heavy reliance on Docker limits deployment options to container-friendly hosts",
            "Hot-reloading local development required mapping volumes, complicating the Dockerfiles",
        ]
    },
    {
        name: "Cyber Kavach (Hackathon)",
        github: "https://github.com/ganeshak11/Infra-Sentinel",
        tagline: "Cyber Security Platform Infrastructure",
        intro: (
            <>
                The infrastructure and deployment track for a real-time intrusion detection and response platform built for a DevSecOps hackathon.
            </>
        ),
        architecture: [
            "Agent Container – Python + Scikit-Learn (Host Network)",
            "Backend Container – FastAPI + WebSockets",
            "Frontend Container – HTML/JS + Nginx",
        ],
        philosophy: [
            "Multi-container orchestration",
            "Strict dependency ordering",
            "Minimal attack surfaces",
        ],
        features: [
            "Host-network mode for raw process monitoring",
            "Optimized Docker image packaging",
            "Seamless cross-stack container communication",
            "End-to-end intrusion testing and vulnerability assessments",
        ],
        highlights: [
            {
                title: "Host Network Integration",
                desc: "Configured agent with network_mode: 'host' to access /var/log/auth.log",
            },
            {
                title: "Unified Docker Compose",
                desc: "Wired React, FastAPI, and ML agent together sequentially",
            },
        ],
        limitations: [
            "Running containers in host network mode breaks Docker isolation",
            "Combining ML models and web servers increased the overall memory footprint of the stack",
        ]
    }
];

export default function Projects() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id="projects"
            style={{
                padding: "100px 24px",
                background: "var(--bg)",
            }}
        >
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 64 }}
                >
                    <p
                        style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            letterSpacing: "0.2em",
                            color: "var(--accent)",
                            marginBottom: 12,
                        }}
                    >
                        03 / PROJECTS
                    </p>
                </motion.div>

                <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.name}
                            initial={{ opacity: 0, y: 24 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + (index * 0.2), duration: 0.5 }}
                        >
                            <div style={{ marginBottom: 48 }}>
                                <h2
                                    style={{
                                        fontSize: "clamp(28px, 4vw, 48px)",
                                        fontWeight: 800,
                                        letterSpacing: "-0.02em",
                                        color: "var(--fg)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "clamp(8px, 2vw, 16px)",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {project.name}
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            fontFamily: "monospace",
                                            fontSize: 12,
                                            padding: "6px 12px",
                                            border: "1px solid var(--accent)",
                                            color: "var(--accent)",
                                            textDecoration: "none",
                                            borderRadius: 4,
                                            transition: "all 0.2s",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "var(--accent)";
                                            e.currentTarget.style.color = "var(--bg)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = "var(--accent)";
                                        }}
                                    >
                                        [GitHub]
                                    </a>
                                </h2>
                                <p
                                    style={{
                                        marginTop: 12,
                                        fontSize: 16,
                                        color: "var(--accent)",
                                        fontFamily: "monospace",
                                    }}
                                >
                                    {project.tagline}
                                </p>
                            </div>

                            <div
                                className="glass-card"
                                style={{
                                    padding: "clamp(24px, 5vw, 48px)",
                                    borderRadius: 8,
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: 15,
                                        lineHeight: 1.8,
                                        color: "var(--muted)",
                                        marginBottom: 48,
                                    }}
                                >
                                    {project.intro}
                                </p>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                                        gap: 48,
                                    }}
                                >
                                    {/* Architecture */}
                                    <Block label="ARCHITECTURE">
                                        <ul style={{ listStyle: "none", padding: 0 }}>
                                            {project.architecture.map((item, i) => (
                                                <li
                                                    key={i}
                                                    style={{
                                                        fontSize: 14,
                                                        color: "var(--fg)",
                                                        padding: "8px 0",
                                                        borderBottom: "1px solid var(--border)",
                                                        fontFamily: "monospace",
                                                    }}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </Block>

                                    {/* Core Philosophy */}
                                    <Block label="CORE DESIGN PHILOSOPHY">
                                        <ul style={{ listStyle: "none", padding: 0 }}>
                                            {project.philosophy.map((item, i) => (
                                                <li
                                                    key={i}
                                                    style={{
                                                        fontSize: 13,
                                                        color: "var(--muted)",
                                                        padding: "8px 0",
                                                        display: "flex",
                                                        gap: 10,
                                                        alignItems: "flex-start",
                                                        lineHeight: 1.6,
                                                    }}
                                                >
                                                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>
                                                        ▸
                                                    </span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </Block>

                                    {/* Key Features */}
                                    <Block label="KEY FEATURES">
                                        <ul style={{ listStyle: "none", padding: 0 }}>
                                            {project.features.map((item, i) => (
                                                <li
                                                    key={i}
                                                    style={{
                                                        fontSize: 13,
                                                        color: "var(--muted)",
                                                        padding: "6px 0",
                                                        display: "flex",
                                                        gap: 10,
                                                        alignItems: "flex-start",
                                                        lineHeight: 1.6,
                                                    }}
                                                >
                                                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>
                                                        •
                                                    </span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </Block>

                                    {/* Technical Highlights */}
                                    <Block label="TECHNICAL HIGHLIGHTS">
                                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                            {project.highlights.map((item, i) => (
                                                <div
                                                    key={i}
                                                    style={{
                                                        borderLeft: "2px solid var(--accent)",
                                                        paddingLeft: 16,
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            fontSize: 13,
                                                            fontWeight: 600,
                                                            color: "var(--fg)",
                                                            marginBottom: 4,
                                                        }}
                                                    >
                                                        {item.title}
                                                    </p>
                                                    <p
                                                        style={{
                                                            fontSize: 12,
                                                            color: "var(--muted)",
                                                            lineHeight: 1.5,
                                                        }}
                                                    >
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </Block>
                                </div>

                                {/* Limitations */}
                                <div style={{ marginTop: 48 }}>
                                    <p
                                        style={{
                                            fontFamily: "monospace",
                                            fontSize: 11,
                                            letterSpacing: "0.15em",
                                            color: "var(--accent)",
                                            marginBottom: 16,
                                        }}
                                    >
                                        [KNOWN LIMITATIONS]
                                    </p>
                                    <ul style={{ listStyle: "none", padding: 0 }}>
                                        {project.limitations.map((item, i) => (
                                            <li
                                                key={i}
                                                style={{
                                                    fontSize: 13,
                                                    color: "var(--muted)",
                                                    padding: "8px 0",
                                                    borderBottom: "1px solid var(--border)",
                                                    display: "flex",
                                                    gap: 10,
                                                    alignItems: "flex-start",
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                <span style={{ color: "var(--status-warn)", flexShrink: 0 }}>
                                                    △
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <p
                style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "var(--accent)",
                    marginBottom: 16,
                }}
            >
                [{label}]
            </p>
            {children}
        </div>
    );
}
