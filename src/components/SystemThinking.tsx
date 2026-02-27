"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PRINCIPLES = [
    {
        title: "Think in control flow",
        desc: "Map the execution path. Understand what happens when, and why.",
    },
    {
        title: "Model failure states",
        desc: "Design for what breaks, not what works. Every system has a failure mode.",
    },
    {
        title: "Design for observability",
        desc: "If you can't measure it, you can't debug it. Logs, metrics, traces.",
    },
    {
        title: "Prefer explicit over magical abstractions",
        desc: "Magic is technical debt. Explicit is maintainable.",
    },
    {
        title: "Break systems to understand them",
        desc: "Chaos engineering isn't optional. It's how you learn.",
    },
];

export default function SystemThinking() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id="thinking"
            style={{ padding: "100px 24px" }}
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
                        04 / SYSTEM_THINKING
                    </p>
                    <h2
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--fg)",
                        }}
                    >
                        I don't just build features.
                        <br />I design systems.
                    </h2>
                </motion.div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: 24,
                    }}
                >
                    {PRINCIPLES.map((principle, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                            className="glass-card"
                            style={{
                                padding: "32px",
                                borderRadius: 8,
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: 17,
                                    fontWeight: 700,
                                    color: "var(--fg)",
                                    marginBottom: 12,
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                {principle.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: 14,
                                    color: "var(--muted)",
                                    lineHeight: 1.7,
                                }}
                            >
                                {principle.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
