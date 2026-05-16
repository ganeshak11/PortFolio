"use client";

import { useRef, useState } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";

const PROGRESS_ITEMS = [
    { label: "Backend Foundation & DB", pct: 95 },
    { label: "Webhook Ingestion & Idempotency", pct: 90 },
    { label: "Health Monitoring Worker", pct: 75 },
    { label: "Dashboard UI & Redeploy Control", pct: 60 },
];

function ProgressBar({ label, pct, active, delay }: { label: string; pct: number; active: boolean; delay: number }) {
    return (
        <div style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>
                <span>{label}</span>
                <span style={{ color: "var(--accent)" }}>{pct}%</span>
            </div>
            <div style={{ height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
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

export default function CurrentlyBuilding() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [open, setOpen] = useState(false);

    return (
        <section ref={ref} id="building" style={{ padding: "60px 24px 0" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 24 }}
                >
                    <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 12 }}>
                        04 / CURRENTLY_BUILDING
                    </p>
                </m.div>

                <div style={{ borderTop: "1px solid var(--border)" }}>
                    <button
                        onClick={() => setOpen(!open)}
                        style={{
                            width: "100%",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "24px 0",
                            display: "grid",
                            gridTemplateColumns: "40px 1fr auto",
                            alignItems: "center",
                            gap: 20,
                            textAlign: "left",
                        }}
                    >
                        <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em" }}>WIP</span>
                        <div>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginBottom: 6 }}>
                                <span style={{ fontSize: "clamp(16px, 2.5vw, 24px)", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--fg)" }}>
                                    CI/CD Sentinel
                                </span>
                                <m.span
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    style={{ fontFamily: "monospace", fontSize: 12, color: "var(--status-warn)" }}
                                >
                                    ~80% COMPLETE
                                </m.span>
                            </div>
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                {["Next.js", "Supabase", "Webhooks", "CI/CD"].map(t => (
                                    <span key={t} style={{ fontFamily: "monospace", fontSize: 11, color: "var(--muted)" }}>{t}</span>
                                ))}
                            </div>
                        </div>
                        <span style={{
                            fontSize: 20, color: "var(--accent)", flexShrink: 0,
                            transition: "transform 0.2s",
                            transform: open ? "rotate(45deg)" : "none",
                            display: "inline-block",
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
                                <div className="currently-expanded" style={{ paddingBottom: 36, paddingLeft: 60 }}>
                                    <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)", maxWidth: 640, marginBottom: 28 }}>
                                        Building a centralized observability and recovery layer for software deployments.
                                        Tracking deployment history, monitoring health via polling, one-click recovery — all from a single dashboard.
                                    </p>

                                    <div style={{ marginBottom: 28 }}>
                                        <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--accent)", marginBottom: 12 }}>[BUILD_PROGRESS]</p>
                                        {PROGRESS_ITEMS.map((item, i) => (
                                            <ProgressBar key={item.label} label={item.label} pct={item.pct} active={open} delay={i * 0.15} />
                                        ))}
                                    </div>

                                    <a
                                        href="https://github.com/ganeshak11/CI-CD_Sentinel"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ fontFamily: "monospace", fontSize: 12, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 2 }}
                                    >
                                        [GitHub] →
                                    </a>
                                </div>
                            </m.div>
                        )}
                    </AnimatePresence>
                </div>
                <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>
        </section>
    );
}
