"use client";

import { useRef, useState } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";

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
                    <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                        Things I'm Building
                    </h2>
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
                                    Fortis-CI
                                </span>
                                <m.span
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    style={{ fontFamily: "monospace", fontSize: 12, color: "var(--status-warn)" }}
                                >
                                    OPEN SOURCE
                                </m.span>
                            </div>
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                {["Self-Hosted"].map(t => (
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
                                    <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)", maxWidth: 640, marginBottom: 16 }}>
                                        Building a centralized observability and recovery layer for software deployments. Open source, graph-native deployment tracking with root cause analysis and automated rollbacks.
                                    </p>
                                    
                                    <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--accent)", maxWidth: 640, marginBottom: 28, fontStyle: "italic" }}>
                                        🚀 Looking for open-source developers to collaborate! If you're interested in system architecture, graphs, or DevOps tools, I'd love to build this together.
                                    </p>

                                    <a
                                        href="https://github.com/Fortis-CI/Fortis-CI"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ fontFamily: "monospace", fontSize: 12, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 2 }}
                                    >
                                        [GitHub / Contribute] →
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
