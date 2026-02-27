"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PROGRESS_ITEMS = [
    { label: "Architecture Design", pct: 65 },
    { label: "Core Pipeline Engine", pct: 40 },
    { label: "Observability Layer", pct: 30 },
    { label: "Dashboard UI", pct: 15 },
];

function ProgressBar({ label, pct, active, delay }: { label: string; pct: number; active: boolean; delay: number }) {
    return (
        <div style={{ marginBottom: 20 }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "monospace",
                fontSize: 12,
                color: "var(--muted)",
                marginBottom: 8,
            }}>
                <span>{label}</span>
                <span style={{ color: "var(--accent)" }}>{pct}%</span>
            </div>
            <div style={{
                height: 6,
                background: "var(--border)",
                borderRadius: 3,
                overflow: "hidden",
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={active ? { width: `${pct}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        height: "100%",
                        background: "linear-gradient(90deg, var(--accent), var(--accent-2, var(--accent)))",
                        borderRadius: 3,
                        boxShadow: "0 0 8px var(--accent)",
                    }}
                />
            </div>
            <div style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: "var(--accent)",
                marginTop: 4,
                opacity: 0.6,
            }}>
                {"["}
                {"█".repeat(Math.floor(pct / 10))}
                {"░".repeat(10 - Math.floor(pct / 10))}
                {"]"}
            </div>
        </div>
    );
}

export default function CurrentlyBuilding() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id="building"
            style={{
                padding: "100px 24px",
            }}
        >
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 48 }}
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
                        05 / CURRENTLY_BUILDING
                    </p>
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
                        CI/CD Sentinel
                        <motion.span
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            style={{
                                fontSize: "clamp(16px, 2vw, 24px)",
                                color: "var(--status-warn)",
                                fontFamily: "monospace",
                            }}
                        >
                            [IN PROGRESS]
                        </motion.span>
                        <a
                            href="https://github.com/yourusername/cicd-sentinel"
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
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
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
                            marginBottom: 40,
                        }}
                    >
                        Designing a CI/CD monitoring and enforcement system focused on
                        building observability around CI/CD instead of blindly trusting green
                        checkmarks.
                    </p>

                    {/* ── Build progress bars ── */}
                    <div style={{ marginBottom: 40 }}>
                        <p style={{
                            fontFamily: "monospace",
                            fontSize: 11,
                            letterSpacing: "0.15em",
                            color: "var(--accent)",
                            marginBottom: 20,
                        }}>
                            [BUILD_PROGRESS]
                        </p>
                        {PROGRESS_ITEMS.map((item, i) => (
                            <ProgressBar
                                key={item.label}
                                label={item.label}
                                pct={item.pct}
                                active={inView}
                                delay={0.3 + i * 0.15}
                            />
                        ))}
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: 32,
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: 11,
                                    letterSpacing: "0.15em",
                                    color: "var(--accent)",
                                    marginBottom: 16,
                                }}
                            >
                                [FOCUS AREAS]
                            </p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Pipeline health visibility",
                                    "Deployment audit tracking",
                                    "Log aggregation insights",
                                    "Failure pattern detection",
                                    "Git commit-to-deploy traceability",
                                    "Infrastructure sanity checks",
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            fontSize: 14,
                                            color: "var(--muted)",
                                            padding: "8px 0",
                                            borderBottom: "1px solid var(--border)",
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
                        </div>

                        <div>
                            <p
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: 11,
                                    letterSpacing: "0.15em",
                                    color: "var(--accent)",
                                    marginBottom: 16,
                                }}
                            >
                                [GOAL]
                            </p>
                            <p
                                style={{
                                    fontSize: 15,
                                    lineHeight: 1.8,
                                    color: "var(--fg)",
                                    padding: "16px",
                                    borderLeft: "3px solid var(--accent)",
                                    background: "var(--bg)",
                                }}
                            >
                                Build observability around CI/CD pipelines. Make deployment
                                decisions explicit, not implicit. Track what changed, when, and
                                why.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
