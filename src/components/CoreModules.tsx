"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const MODULES = [
    {
        id: "linux",
        tag: "CORE",
        title: "Linux Internals",
        topics: [
            "Filesystem hierarchy & inode model",
            "Process lifecycle & signal handling",
            "File permissions & capabilities",
            "systemd unit graph & dependency ordering",
            "cgroups v2 & namespace isolation",
        ],
        note: "Understanding the kernel is not optional.",
    },
    {
        id: "git",
        tag: "CORE",
        title: "Git Mental Model",
        topics: [
            "Directed acyclic commit graph",
            "Rebase vs merge — divergence and history",
            "Reflog as safety net",
            "Content-addressed storage (blob/tree/commit)",
            "Bisect & blame for root cause analysis",
        ],
        note: "Git is a graph database, not a save button.",
    },
    {
        id: "sysdesign",
        tag: "DESIGN",
        title: "System Design Thinking",
        topics: [
            "CAP theorem in practice",
            "Load balancing strategies",
            "Caching layers & invalidation",
            "Idempotency & retry semantics",
            "Observability: metrics, logs, traces",
        ],
        note: "Design for failure, not optimism.",
    },
    {
        id: "archrview",
        tag: "REVIEW",
        title: "Architecture Review",
        topics: [
            "Single points of failure audit",
            "Blast radius reduction",
            "Dependency chain analysis",
            "Cost vs complexity trade-offs",
            "Runbook completeness check",
        ],
        note: "Every system has a hidden assumption. Find it.",
    },
];

export default function CoreModules() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id="modules"
            style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}
        >
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
                    01 / CORE_MODULES
                </p>
                <h2
                    style={{
                        fontSize: "clamp(28px, 4vw, 48px)",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        color: "var(--fg)",
                    }}
                >
                    What I Actually Know
                </h2>
                <div className="section-sep" style={{ marginTop: 24 }} />
            </motion.div>

            {/* Module grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 2,
                }}
            >
                {MODULES.map((mod, i) => (
                    <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                        style={{
                            background: "var(--card-bg)",
                            border: "1px solid var(--border)",
                            padding: "28px 28px 32px",
                            position: "relative",
                            transition: "border-color 0.2s",
                        }}
                    >
                        <GlowingEffect
                            spread={40}
                            glow={false}
                            disabled={false}
                            proximity={60}
                            inactiveZone={0.01}
                            borderWidth={2}
                        />
                        {/* Tag */}
                        <span
                            style={{
                                fontFamily: "monospace",
                                fontSize: 10,
                                letterSpacing: "0.2em",
                                color: "var(--accent)",
                                marginBottom: 16,
                                display: "block",
                            }}
                        >
                            [{mod.tag}]
                        </span>

                        {/* Title */}
                        <h3
                            style={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: "var(--fg)",
                                marginBottom: 20,
                                letterSpacing: "-0.01em",
                            }}
                        >
                            {mod.title}
                        </h3>

                        {/* Topic list */}
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {mod.topics.map((t) => (
                                <li
                                    key={t}
                                    style={{
                                        fontSize: 13,
                                        color: "var(--muted)",
                                        padding: "6px 0",
                                        borderBottom: "1px solid var(--border)",
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 10,
                                        lineHeight: 1.5,
                                    }}
                                >
                                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>▸</span>
                                    {t}
                                </li>
                            ))}
                        </ul>

                        {/* Footer note */}
                        <p
                            style={{
                                marginTop: 20,
                                fontFamily: "monospace",
                                fontSize: 11,
                                color: "var(--accent)",
                                opacity: 0.7,
                                fontStyle: "italic",
                            }}
                        >
              // {mod.note}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
