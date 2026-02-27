"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FeaturedProject() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id="project"
            style={{
                padding: "100px 24px",
                background: "var(--bg)",
            }}
        >
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
                        02 / FEATURED PROJECT
                    </p>
                    <h2
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--fg)",
                            display: "flex",
                            alignItems: "center",
                            gap: "clamp(8px, 2vw, 16px)",
                            flexWrap: "wrap",
                        }}
                    >
                        MY(suru) BUS
                        <a
                            href="https://github.com/ganeshak11/MY-suru-BUS"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontFamily: "monospace",
                                fontSize: 12,
                                padding: "6px 12px",
                                border: "1px solid var(--accent)",
                                color: "var(--accent)",
                                textDecoration: "none",
                                borderRadius: 4,
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "var(--accent)";
                                e.currentTarget.style.color = "var(--bg)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "var(--accent)";
                            }}
                        >
                            [GitHub]
                        </a>
                    </h2>
                    <p
                        style={{
                            marginTop: 12,
                            fontSize: 16,
                            color: "var(--accent)",
                            fontFamily: "monospace",
                        }}
                    >
                        Real-Time Bus Tracking System
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="glass-card"
                    style={{
                        padding: "clamp(24px, 5vw, 48px)",
                        borderRadius: 8,
                    }}
                >
                    <p
                        style={{
                            fontSize: 15,
                            lineHeight: 1.8,
                            color: "var(--muted)",
                            marginBottom: 48,
                        }}
                    >
                        A city-scale real-time bus tracking and management platform built
                        with system reliability as the priority.
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: 48,
                        }}
                    >
                        {/* Architecture */}
                        <Block label="ARCHITECTURE">
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Admin Dashboard – Next.js",
                                    "Driver App – React Native (Expo)",
                                    "Passenger App – React Native",
                                    "Backend – Supabase (PostgreSQL, Auth, Realtime, RLS)",
                                    "Maps – Leaflet + OpenStreetMap",
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            fontSize: 14,
                                            color: "var(--fg)",
                                            padding: "8px 0",
                                            borderBottom: "1px solid var(--border)",
                                            fontFamily: "monospace",
                                        }}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Block>

                        {/* Core Philosophy */}
                        <Block label="CORE DESIGN PHILOSOPHY">
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Reliability over UI",
                                    "Database as single source of truth",
                                    "Enforce logic at DB level using RLS",
                                    "Event-driven realtime architecture",
                                    "Offline-first design with queue + auto-sync",
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            fontSize: 13,
                                            color: "var(--muted)",
                                            padding: "8px 0",
                                            display: "flex",
                                            gap: 10,
                                            alignItems: "flex-start",
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        <span style={{ color: "var(--accent)", flexShrink: 0 }}>
                                            ▸
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Block>

                        {/* Key Features */}
                        <Block label="KEY FEATURES">
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Live GPS tracking",
                                    "Geofencing-based stop detection",
                                    "ETA recalculation",
                                    "Role-based access control at database level",
                                    "Offline location queue with timestamp sync",
                                    "Admin observability dashboard",
                                    "Passenger reports & announcements",
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            fontSize: 13,
                                            color: "var(--muted)",
                                            padding: "6px 0",
                                            display: "flex",
                                            gap: 10,
                                            alignItems: "flex-start",
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        <span style={{ color: "var(--accent)", flexShrink: 0 }}>
                                            •
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Block>

                        {/* Technical Highlights */}
                        <Block label="TECHNICAL HIGHLIGHTS">
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {[
                                    {
                                        title: "Separation of static schedules vs dynamic trips",
                                        desc: "Postgres relational schema for consistency",
                                    },
                                    {
                                        title: "Row-Level Security policies",
                                        desc: "Enforced at database level, not application",
                                    },
                                    {
                                        title: "Realtime event subscriptions",
                                        desc: "WebSocket-based live updates",
                                    },
                                    {
                                        title: "Avoided NoSQL overengineering",
                                        desc: "Relational model fits the domain",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            borderLeft: "2px solid var(--accent)",
                                            paddingLeft: 16,
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: 13,
                                                fontWeight: 600,
                                                color: "var(--fg)",
                                                marginBottom: 4,
                                            }}
                                        >
                                            {item.title}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: 12,
                                                color: "var(--muted)",
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Block>
                    </div>

                    {/* Drawbacks */}
                    <div style={{ marginTop: 48 }}>
                        <p
                            style={{
                                fontFamily: "monospace",
                                fontSize: 11,
                                letterSpacing: "0.15em",
                                color: "var(--accent)",
                                marginBottom: 16,
                            }}
                        >
                            [KNOWN LIMITATIONS]
                        </p>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {[
                                "Driver phone dependency – single point of failure",
                                "GPS precision limits – urban canyon effects",
                                "No traffic prediction yet – ETA is distance-based only",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    style={{
                                        fontSize: 13,
                                        color: "var(--muted)",
                                        padding: "8px 0",
                                        borderBottom: "1px solid var(--border)",
                                        display: "flex",
                                        gap: 10,
                                        alignItems: "flex-start",
                                        lineHeight: 1.6,
                                    }}
                                >
                                    <span style={{ color: "var(--status-warn)", flexShrink: 0 }}>
                                        △
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <p
                style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "var(--accent)",
                    marginBottom: 16,
                }}
            >
                [{label}]
            </p>
            {children}
        </div>
    );
}
