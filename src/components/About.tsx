"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id="about"
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
                        01 / ABOUT
                    </p>
                    <h2
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--fg)",
                        }}
                    >
                        System Thinker
                    </h2>
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
                    <div
                        style={{
                            display: "flex",
                            gap: "clamp(20px, 5vw, 40px)",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                        }}
                    >
                        {/* Profile Photo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            style={{
                                width: "clamp(80px, 20vw, 120px)",
                                height: "clamp(80px, 20vw, 120px)",
                                borderRadius: "50%",
                                overflow: "hidden",
                                border: "3px solid var(--accent)",
                                flexShrink: 0,
                            }}
                        >
                            <img
                                src="/profile.jpg"
                                alt="Ganesh Angadi"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </motion.div>

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 280 }}>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                                    gap: 40,
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            fontSize: 16,
                                            lineHeight: 1.8,
                                            color: "var(--fg)",
                                            marginBottom: 24,
                                        }}
                                    >
                                        Student since 2023. Focused on DevOps & System Architecture.
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 15,
                                            lineHeight: 1.8,
                                            color: "var(--muted)",
                                        }}
                                    >
                                        I don't just build features. I design systems. I think in control
                                        flow, model failure states, and design for observability.
                                    </p>
                                </div>

                                <div>
                                    <p
                                        style={{
                                            fontFamily: "monospace",
                                            fontSize: 11,
                                            letterSpacing: "0.15em",
                                            color: "var(--accent)",
                                            marginBottom: 16,
                                        }}
                                    >
                                        CORE COMPETENCIES
                                    </p>
                                    <ul style={{ listStyle: "none", padding: 0 }}>
                                        {[
                                            "Linux internals (filesystem, permissions, processes, services)",
                                            "Git beyond push (commit graph mental model)",
                                            "Question architecture decisions instead of blindly using tools",
                                            "Backend + DevOps oriented, not pure frontend",
                                        ].map((item, i) => (
                                            <li
                                                key={i}
                                                style={{
                                                    fontSize: 14,
                                                    color: "var(--muted)",
                                                    padding: "8px 0",
                                                    borderBottom: "1px solid var(--border)",
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
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
