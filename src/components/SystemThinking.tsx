"use client";

import { useRef, useState } from "react";
import { m, useInView } from "framer-motion";
import { useScramble } from "@/lib/useScramble";

const PRINCIPLES = [
    {
        title: "Think in control flow",
        desc: "Map the execution path. Understand what happens when, and why.",
        depth: "When I debug, I don't guess. I trace. Every system has a path — find it, follow it, understand where it breaks.",
    },
    {
        title: "Model failure states",
        desc: "Design for what breaks, not what works. Every system has a failure mode.",
        depth: "A cron job silently failed for 11 days. No alerts. Just absence of signal. Now I design for failure first — happy path second.",
    },
    {
        title: "Design for observability",
        desc: "If you can't measure it, you can't debug it. Logs, metrics, traces.",
        depth: "Before I ship anything, I ask: how will I know when this breaks? If I can't answer that, it's not ready.",
    },
    {
        title: "Prefer explicit over magical abstractions",
        desc: "Magic is technical debt. Explicit is maintainable.",
        depth: "Every abstraction hides complexity. I prefer code that tells you exactly what it does — even if it's more verbose.",
    },
    {
        title: "Break systems to understand them",
        desc: "Chaos engineering isn't optional. It's how you learn.",
        depth: "I deliberately kill services and simulate failures in dev. I need to know what happens before production finds out first.",
    },
    {
        title: "A deploy without a rollback is a gamble",
        desc: "Every deployment needs a tested escape route.",
        depth: "3 hours of downtime. No rollback plan. No tested restore path. Rollback is now designed before deployment — not after.",
    },
];

function PrincipleCard({ principle, index, inView }: { principle: typeof PRINCIPLES[0]; index: number; inView: boolean }) {
    const [hovered, setHovered] = useState(false);

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: "24px",
                borderRadius: 8,
                background: "var(--card-bg)",
                border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
                cursor: "default",
                transition: "border-color 0.2s",
                height: 160,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
            className="principle-card"
        >
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--fg)", lineHeight: 1.4 }}>
                {principle.title}
            </h3>

            <div style={{ position: "relative", flex: 1, margin: "10px 0" }}>
                <m.p
                    animate={{ opacity: hovered ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
                    style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7, position: "absolute", inset: 0, overflow: "hidden" }}
                >
                    {principle.desc}
                </m.p>
                <m.p
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.2, delay: hovered ? 0.1 : 0 }}
                    style={{ fontSize: 12, color: "var(--fg)", lineHeight: 1.7, fontStyle: "italic", position: "absolute", inset: 0, overflow: "hidden" }}
                >
                    {principle.depth}
                </m.p>
            </div>
        </m.div>
    );
}

export default function SystemThinking() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const heading = useScramble("I design systems.", inView, 200);

    return (
        <section ref={ref} id="thinking" className="section-pad" style={{ padding: "100px 24px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 64 }}
                >
                    <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 16 }}>
                        06 / SYSTEM_THINKING
                    </p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)", lineHeight: 1.1, marginBottom: 16 }}>
                        I don't just build features.<br />
                        <span style={{ color: "var(--accent)" }}>{heading}</span>
                    </h2>
                    <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 480, lineHeight: 1.8 }}>
                        Six principles I actually follow. Hover each one to see where it came from.
                    </p>
                </m.div>

                <div className="thinking-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
                    {PRINCIPLES.map((p, i) => (
                        <PrincipleCard key={p.title} principle={p} index={i} inView={inView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
