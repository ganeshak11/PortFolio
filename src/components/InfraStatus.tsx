"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATUS_ITEMS = [
    {
        label: "Hosting",
        value: "DigitalOcean Droplet (Ubuntu 22.04 LTS)",
        status: "ok",
        detail: "2 vCPU · 4GB RAM · SSD",
    },
    {
        label: "Reverse Proxy",
        value: "Nginx 1.24",
        status: "ok",
        detail: "TLS 1.3 · Gzip · Rate limiting",
    },
    {
        label: "CI/CD",
        value: "GitHub Actions",
        status: "ok",
        detail: "main branch → auto deploy",
    },
    {
        label: "Containers",
        value: "Docker Compose",
        status: "ok",
        detail: "Blue-green · Health checks",
    },
    {
        label: "Monitoring",
        value: "Prometheus + Grafana",
        status: "warn",
        detail: "Alertmanager pending config",
    },
    {
        label: "Uptime",
        value: "99.7% (90d)",
        status: "ok",
        detail: "Last incident: 2024-08",
    },
];

const DOT_COLOR: Record<string, string> = {
    ok: "var(--status-ok)",
    warn: "var(--status-warn)",
    err: "var(--status-err)",
};

export default function InfraStatus() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id="status"
            style={{
                padding: "100px 24px",
                background: "var(--card-bg)",
                borderTop: "1px solid var(--border)",
            }}
        >
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
                        04 / INFRA_STATUS
                    </p>
                    <h2
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--fg)",
                        }}
                    >
                        Live Infrastructure
                    </h2>
                    <div className="section-sep" style={{ marginTop: 24 }} />
                </motion.div>

                {/* Status grid */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: 2,
                        border: "1px solid var(--border)",
                    }}
                >
                    {STATUS_ITEMS.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.3 + i * 0.07 }}
                            style={{
                                padding: "20px 24px",
                                borderBottom: "1px solid var(--border)",
                                borderRight: "1px solid var(--border)",
                                background: "var(--bg)",
                            }}
                        >
                            {/* Label */}
                            <p
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: 10,
                                    letterSpacing: "0.15em",
                                    color: "var(--muted)",
                                    marginBottom: 10,
                                    textTransform: "uppercase",
                                }}
                            >
                                {item.label}
                            </p>

                            {/* Value + dot */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    marginBottom: 6,
                                }}
                            >
                                <span
                                    className="status-dot"
                                    style={{ background: DOT_COLOR[item.status] }}
                                />
                                <span
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: "var(--fg)",
                                    }}
                                >
                                    {item.value}
                                </span>
                            </div>

                            {/* Detail */}
                            <p
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: 11,
                                    color: "var(--muted)",
                                }}
                            >
                                {item.detail}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 0.6 } : {}}
                    transition={{ delay: 0.8 }}
                    style={{
                        marginTop: 20,
                        display: "flex",
                        gap: 20,
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--muted)",
                    }}
                >
                    {[
                        { status: "ok", label: "Operational" },
                        { status: "warn", label: "Degraded" },
                        { status: "err", label: "Incident" },
                    ].map((l) => (
                        <span
                            key={l.status}
                            style={{ display: "flex", alignItems: "center", gap: 6 }}
                        >
                            <span
                                className="status-dot"
                                style={{
                                    background: DOT_COLOR[l.status],
                                    position: "relative",
                                    width: 7,
                                    height: 7,
                                }}
                            />
                            {l.label}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
