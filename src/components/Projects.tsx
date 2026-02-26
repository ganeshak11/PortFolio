"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PROJECT = {
    name: "Automated Multi-Environment CI/CD Pipeline",
    tagline: "Zero-downtime deployments across dev, staging, and production",
    problem: `Application teams were deploying manually via SSH. No rollback plan,
no audit trail, and staging diverged from production weekly. Any failed
deploy meant a 30-minute recovery window and an incident ticket.`,
    decisions: [
        {
            label: "GitHub Actions over Jenkins",
            reason:
                "Eliminated a self-hosted CI server (SPOF), reduced maintenance burden, and kept pipeline configuration inside version control.",
        },
        {
            label: "Docker Compose for local parity",
            reason:
                "Enforced the same container images across all environments. 'Works on my machine' became a build error, not an excuse.",
        },
        {
            label: "Nginx as reverse proxy (not a cloud LB)",
            reason:
                "Cost-effective for the traffic volume. Full control over cache headers, rate limiting, and TLS termination without vendor lock-in.",
        },
        {
            label: "Blue-green deployment model",
            reason:
                "Instant rollback by re-routing traffic. Eliminated the 30-minute recovery window. Rollback became a two-line config change.",
        },
    ],
    tradeoffs: [
        "GitHub Actions free tier has concurrency limits — acceptable at this scale, would revisit at 10× volume",
        "Docker layer caching requires careful ordering of COPY instructions — documentation overhead added",
        "Blue-green doubles instance count during deploy — cost spike for ~3 minutes per release",
    ],
    stack: ["GitHub Actions", "Docker", "Nginx", "Bash", "Linux systemd", "Prometheus"],
    outcome: "Deploy time: 45 min manual → 4 min automated. Zero failed deploys in 90 days post-rollout.",
};

export default function Projects() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id="projects"
            style={{
                padding: "100px 24px",
                background: "var(--card-bg)",
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
            }}
        >
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                {/* Section header */}
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
                        02 / PROJECTS
                    </p>
                    <h2
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--fg)",
                        }}
                    >
                        Case Study
                    </h2>
                    <div className="section-sep" style={{ marginTop: 24 }} />
                </motion.div>

                {/* Project card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {/* Header */}
                    <div style={{ marginBottom: 48 }}>
                        <h3
                            style={{
                                fontSize: "clamp(22px, 3vw, 36px)",
                                fontWeight: 800,
                                color: "var(--fg)",
                                marginBottom: 8,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {PROJECT.name}
                        </h3>
                        <p
                            style={{
                                fontFamily: "monospace",
                                fontSize: 13,
                                color: "var(--accent)",
                            }}
                        >
                            {PROJECT.tagline}
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
                            gap: 40,
                        }}
                    >
                        {/* Left column */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                            {/* Problem */}
                            <Block label="PROBLEM">
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "var(--muted)",
                                        lineHeight: 1.8,
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {PROJECT.problem}
                                </p>
                            </Block>

                            {/* Trade-offs */}
                            <Block label="TRADE-OFFS">
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {PROJECT.tradeoffs.map((t, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                fontSize: 13,
                                                color: "var(--muted)",
                                                padding: "8px 0",
                                                borderBottom: "1px solid var(--border)",
                                                lineHeight: 1.6,
                                                display: "flex",
                                                gap: 10,
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <span style={{ color: "var(--status-warn)", flexShrink: 0 }}>△</span>
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </Block>
                        </div>

                        {/* Right column */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                            {/* Design decisions */}
                            <Block label="DESIGN DECISIONS">
                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    {PROJECT.decisions.map((d, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                borderLeft: "2px solid var(--accent)",
                                                paddingLeft: 16,
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 600,
                                                    color: "var(--fg)",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                {d.label}
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: 13,
                                                    color: "var(--muted)",
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {d.reason}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Block>

                            {/* Stack */}
                            <Block label="STACK">
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {PROJECT.stack.map((s) => (
                                        <span
                                            key={s}
                                            style={{
                                                fontFamily: "monospace",
                                                fontSize: 12,
                                                padding: "4px 10px",
                                                border: "1px solid var(--accent)",
                                                color: "var(--accent)",
                                                letterSpacing: "0.05em",
                                            }}
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </Block>

                            {/* Outcome */}
                            <Block label="OUTCOME">
                                <p
                                    style={{
                                        fontFamily: "monospace",
                                        fontSize: 14,
                                        color: "var(--accent)",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {PROJECT.outcome}
                                </p>
                            </Block>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Block({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
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
