"use client";

import { useRef } from "react";
import { m, useInView  } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 48 }}
                >
                    <p
                        style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            letterSpacing: "0.05em",
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
                </m.div>

                <m.div
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
                        <m.div
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
                                position: "relative"
                            }}
                        >
                            <Image
                                src="/profile.jpg"
                                alt="Ganesh Angadi - DevOps Engineer specializing in Docker, Kubernetes, and Linux system administration"
                                fill
                                sizes="(max-width: 768px) 120px, 120px"
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        </m.div>

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 280 }}>
                            <h3
                                style={{
                                    fontSize: 24,
                                    fontWeight: 800,
                                    color: "var(--accent)",
                                    marginBottom: 24,
                                    letterSpacing: "0.05em",
                                    fontFamily: "monospace",
                                }}
                            >
                                GANESH ANGADI
                            </h3>
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
                                        DevOps Engineer since 2023.
                                        Focused on Docker, Kubernetes, Linux fundamentals, and System Architecture with strong system design expertise.
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 15,
                                            lineHeight: 1.8,
                                            color: "var(--muted)",
                                        }}
                                    >
                                        I don't just build features. I design systems. I think in control
                                        flow, model failure states, and design for observability. Read about my{" "}
                                        <Link
                                            href="#project"
                                            style={{
                                                color: "var(--accent)",
                                                textDecoration: "underline",
                                            }}
                                        >
                                            MY(suru) BUS system design project
                                        </Link>
                                        {" "}or explore my DevOps learning journey.
                                    </p>
                                </div>

                                <div>
                                    <p
                                        style={{
                                            fontFamily: "monospace",
                                            fontSize: 12,
                                            letterSpacing: "0.05em",
                                            color: "var(--accent)",
                                            marginBottom: 16,
                                        }}
                                    >
                                        CORE COMPETENCIES
                                    </p>
                                    <ul style={{ listStyle: "none", padding: 0 }}>
                                        {[
                                            "Docker (complete) - containerization, multi-stage builds, orchestration",
                                            "Linux fundamentals - filesystem, permissions, systemd, process management, logs",
                                            "Git beyond push - commit graph mental model, branching strategies",
                                            "CI/CD pipelines - Jenkins, GitLab CI, automated testing and deployment",
                                            "System architecture - questioning decisions instead of blindly using tools",
                                        ].map((item) => (
                                            <li
                                                key={item}
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
                </m.div>
            </div>
        </section>
    );
}
