"use client";

import { SectionHead, Reveal } from "@/components/ui/SectionHead";

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

export default function SystemThinking() {
    return (
        <section id="thinking" className="section">
            <div className="wrap">
                <SectionHead
                    index="08"
                    cmd="cat /etc/sysctl.conf"
                    title={<>I don&apos;t just build features. <em>I design systems.</em></>}
                    lede="Six principles I actually follow, and where each one came from."
                />
                <div className="cards-3">
                    {PRINCIPLES.map((p, i) => (
                        <Reveal key={p.title} delay={(i % 3) * 0.05} className="panel hover flip">
                            <span className="n">{String(i + 1).padStart(2, "0")}</span>
                            <h3>{p.title}</h3>
                            <p className="desc">{p.desc}</p>
                            <p className="depth">{p.depth}</p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
