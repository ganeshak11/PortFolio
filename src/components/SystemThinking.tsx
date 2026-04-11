"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";

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

const STATS: { label: string; target: number; suffix: string; isImage?: boolean; imageUrl?: string }[] = [
    { label: "Years learning systems", target: 2, suffix: "+" },
    { label: "Failure simulations tested", target: 8, suffix: "+" },
    { label: "Focus on reliability", target: 100, suffix: "%" },
    { 
        label: "Live GitHub Stats", 
        target: 0, 
        suffix: "",
        isImage: true,
        imageUrl: "https://github-readme-stats-rho-six-90.vercel.app/api?username=ganeshak11&show_icons=true&count_private=true&hide_border=true&bg_color=0d0d0d&title_color=39ff14&icon_color=06b6d4&text_color=f0f0f0&border_radius=8"
    },
];

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
    const [count, setCount] = useState(0);
    const startedRef = useRef(false);

    useEffect(() => {
        if (!active || startedRef.current) return;
        startedRef.current = true;
        const duration = 1200;
        const steps = 50;
        const increment = target / steps;
        let current = 0;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(interval);
    }, [active, target]);

    return (
        <span style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "var(--accent)", fontFamily: "monospace" }}>
            {count}{suffix}
        </span>
    );
}

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
                        06 / SYSTEM_THINKING
                    </p>
                    <h2
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--fg)",
                        }}
                    >
                        I don&apos;t just build features.
                        <br />I design systems.
                    </h2>
                </motion.div>

                {/* ── Stat counters ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 24,
                        marginBottom: 32,
                    }}
                >
                    {STATS.filter(s => !s.isImage).map((s) => (
                        <div 
                            key={s.label} 
                            className="glass-card"
                            style={{ 
                                textAlign: "center",
                                padding: "32px 24px",
                                borderRadius: 8,
                            }}
                        >
                            <Counter target={s.target} suffix={s.suffix} active={inView} />
                            <p style={{
                                fontFamily: "monospace",
                                fontSize: 11,
                                letterSpacing: "0.1em",
                                color: "var(--muted)",
                                marginTop: 6,
                            }}>
                                {s.label}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* ── GitHub Stats Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="glass-card"
                    style={{
                        padding: "clamp(24px, 5vw, 48px)",
                        borderRadius: 8,
                        marginBottom: 56,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 16,
                    }}
                >
                    <p style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        letterSpacing: "0.15em",
                        color: "var(--accent)",
                        textAlign: "center",
                    }}>
                        [LIVE GITHUB ACTIVITY]
                    </p>
                    <img 
                        src={STATS.find(s => s.isImage)?.imageUrl} 
                        alt="GitHub Stats"
                        style={{
                            width: "100%",
                            maxWidth: "600px",
                            height: "auto",
                            borderRadius: 8,
                        }}
                    />
                </motion.div>

                {/* ── Principles grid ── */}
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
                                position: "relative",
                            }}
                        >
                            <GlowingEffect
                                spread={35}
                                glow={false}
                                disabled={false}
                                proximity={60}
                                inactiveZone={0.01}
                                borderWidth={2}
                            />
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
