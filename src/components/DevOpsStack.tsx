"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";

const STACK = [
    { name: "Linux", level: "Advanced" },
    { name: "Docker", level: "Complete" },
    { name: "Git", level: "Deep Mental Model" },
    { name: "Bash", level: "Core" },
    { name: "Systemd", level: "Core" },
    { name: "CI/CD Pipelines", level: "Core" },
    { name: "PostgreSQL", level: "Core" },
    { name: "Supabase", level: "Core" },
    { name: "Networking", level: "Fundamentals" },
    { name: "Kubernetes", level: "Learning" },
    { name: "Next.js", level: "Core" },
    { name: "React Native", level: "Core" },
];

// duplicate for seamless loop
const ITEMS = [...STACK, ...STACK];

export default function DevOpsStack() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} id="stack" style={{ padding: "100px 0" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 48 }}
                >
                    <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 12 }}>
                        $ skills --level=expert
                    </p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                        Tools &amp; Technologies
                    </h2>
                </m.div>
            </div>

            {/* Carousel — full width, no padding */}
            <div style={{ position: "relative", overflow: "hidden" }}>
                {/* fade edges */}
                <div className="carousel-fade" style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
                    background: "linear-gradient(to right, var(--bg), transparent)",
                    pointerEvents: "none",
                }} />
                <div className="carousel-fade" style={{
                    position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
                    background: "linear-gradient(to left, var(--bg), transparent)",
                    pointerEvents: "none",
                }} />

                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        width: "max-content",
                        animation: "scroll-left 30s linear infinite",
                    }}
                >
                    {ITEMS.map((item, i) => (
                        <div
                            key={i}
                            className="glass-card"
                            style={{
                                fontFamily: "monospace",
                                fontSize: 13,
                                padding: "14px 24px",
                                borderRadius: 6,
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                                flexShrink: 0,
                                cursor: "default",
                            }}
                        >
                            <span style={{ color: "var(--fg)", fontWeight: 600, whiteSpace: "nowrap" }}>{item.name}</span>
                            <span style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{item.level}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes scroll-left {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}
