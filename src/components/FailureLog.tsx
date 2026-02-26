"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FAILURES = [
    {
        id: "f1",
        date: "2024-08",
        severity: "P1",
        title: "Cron job silently failed for 11 days",
        lesson:
            "Exit codes are not enough. Cron jobs need health checks, alerting on absence-of-signal, and logs in a queryable system.",
        fix: "Added Prometheus dead man's switch. All cron jobs now emit a heartbeat metric.",
    },
    {
        id: "f2",
        date: "2024-05",
        severity: "P2",
        title: "Nginx upgrade wiped custom config",
        lesson:
            "Package upgrades can clobber untracked config files. If it is not in version control, it does not exist.",
        fix: "Migrated all server configs to Ansible playbooks. Config drift is now a CI failure.",
    },
    {
        id: "f3",
        date: "2023-11",
        severity: "P1",
        title: "No rollback plan caused 3h downtime",
        lesson:
            "A deploy without a tested rollback is a gamble. The restore procedure must be rehearsed, not theorised.",
        fix: "Implemented blue-green deployment. Rollback time: 3h → 45 seconds.",
    },
    {
        id: "f4",
        date: "2023-07",
        severity: "P3",
        title: "Disk filled: logs rotated but not compressed",
        lesson:
            "Log rotation config is not the same as disk capacity planning. Both are needed.",
        fix: "Added Grafana disk_used_percent alert at 70% and 90%. Compression enforced in logrotate.",
    },
];

const SEVERITY_COLOR: Record<string, string> = {
    P1: "var(--status-err)",
    P2: "var(--status-warn)",
    P3: "var(--muted)",
};

export default function FailureLog() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id="failures"
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
                    03 / FAILURE_LOG
                </p>
                <h2
                    style={{
                        fontSize: "clamp(28px, 4vw, 48px)",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        color: "var(--fg)",
                    }}
                >
                    What Broke
                    <span style={{ color: "var(--accent)", marginLeft: 8 }}>_</span>
                </h2>
                <p
                    style={{
                        marginTop: 12,
                        fontSize: 14,
                        color: "var(--muted)",
                        lineHeight: 1.7,
                        maxWidth: 560,
                    }}
                >
                    Every failure listed here was a system that taught me something. I track
                    these because pattern recognition is more valuable than pretending they
                    didn&apos;t happen.
                </p>
                <div className="section-sep" style={{ marginTop: 24 }} />
            </motion.div>

            {/* Failure list */}
            <div style={{ display: "flex", flexDirection: "column" }}>
                {FAILURES.map((f, i) => (
                    <motion.div
                        key={f.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                        style={{
                            borderBottom: "1px solid var(--border)",
                            padding: "32px 0",
                            display: "grid",
                            gridTemplateColumns: "80px 1fr",
                            gap: 24,
                        }}
                    >
                        {/* Left: severity + date */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <span
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: SEVERITY_COLOR[f.severity] ?? "var(--muted)",
                                    letterSpacing: "0.1em",
                                }}
                            >
                                {f.severity}
                            </span>
                            <span
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: 11,
                                    color: "var(--muted)",
                                }}
                            >
                                {f.date}
                            </span>
                        </div>

                        {/* Right: content */}
                        <div>
                            <h3
                                style={{
                                    fontSize: 17,
                                    fontWeight: 700,
                                    color: "var(--fg)",
                                    marginBottom: 10,
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                {f.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: 13,
                                    color: "var(--muted)",
                                    lineHeight: 1.7,
                                    marginBottom: 10,
                                }}
                            >
                                {f.lesson}
                            </p>
                            <p
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: 12,
                                    color: "var(--accent)",
                                    opacity: 0.8,
                                }}
                            >
                                → {f.fix}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
