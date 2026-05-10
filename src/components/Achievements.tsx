"use client";

import { useRef } from "react";
import { m, useInView  } from "framer-motion";

export default function Achievements() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id="achievements"
            style={{
                padding: "100px 24px",
                background: "var(--bg)",
            }}
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
                        02 / ACHIEVEMENTS
                    </p>
                    <h2
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--fg)",
                        }}
                    >
                        Recognition & Awards
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
                        border: "2px solid var(--accent)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Trophy Badge */}
                    <div
                        style={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            fontSize: 48,
                            opacity: 0.1,
                        }}
                    >
                        🏆
                    </div>

                    {/* Award Title */}
                    <div style={{ marginBottom: 32 }}>
                        <div
                            style={{
                                display: "inline-block",
                                padding: "8px 16px",
                                background: "var(--accent)",
                                color: "var(--bg)",
                                fontFamily: "monospace",
                                fontSize: 12,
                                letterSpacing: "0.05em",
                                borderRadius: 4,
                                marginBottom: 16,
                            }}
                        >
                            🏆 1ST PLACE WINNER
                        </div>
                        <h3
                            style={{
                                fontSize: "clamp(20px, 3vw, 28px)",
                                fontWeight: 700,
                                color: "var(--fg)",
                                marginBottom: 8,
                                lineHeight: 1.3,
                            }}
                        >
                            MCP-Based Systems Engineering Intelligent System Hackathon
                        </h3>
                        <p
                            style={{
                                fontSize: 14,
                                color: "var(--accent)",
                                fontFamily: "monospace",
                            }}
                        >
                            Model Context Protocol (MCP) Wrapper Development
                        </p>
                    </div>

                    {/* Project Description */}
                    <div style={{ marginBottom: 32 }}>
                        <p
                            style={{
                                fontSize: 15,
                                lineHeight: 1.8,
                                color: "var(--muted)",
                                marginBottom: 24,
                            }}
                        >
                            Built a working MCP wrapper around an Indian Sign Language (ISL) to text and speech translation tool, 
                            enabling seamless integration with AI assistants and development environments.
                        </p>
                    </div>

                    {/* Technical Details */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: 32,
                        }}
                    >
                        {/* What I Built */}
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
                                [WHAT I BUILT]
                            </p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "MCP server wrapper for ISL translation tool",
                                    "Bridge between accessibility tools and AI systems",
                                    "Protocol implementation for Model Context Protocol",
                                    "Integration layer for AI assistants",
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

                        {/* Key Highlights */}
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
                                [KEY HIGHLIGHTS]
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {[
                                    {
                                        title: "System Architecture Thinking",
                                        desc: "Bridged existing ISL translator with modern AI infrastructure",
                                    },
                                    {
                                        title: "Protocol Implementation",
                                        desc: "Wrapped tool with MCP interface for AI system integration",
                                    },
                                    {
                                        title: "Accessibility Focus",
                                        desc: "Made ISL translation accessible to AI assistants and developers",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.title}
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
                        </div>
                    </div>

                    {/* Clarification Note */}
                    <div
                        style={{
                            marginTop: 32,
                            padding: "16px 20px",
                            background: "var(--bg)",
                            border: "1px solid var(--border)",
                            borderRadius: 6,
                        }}
                    >
                        <p
                            style={{
                                fontFamily: "monospace",
                                fontSize: 12,
                                letterSpacing: "0.05em",
                                color: "var(--accent)",
                                marginBottom: 8,
                            }}
                        >
                            [TECHNICAL CLARIFICATION]
                        </p>
                        <p
                            style={{
                                fontSize: 13,
                                color: "var(--muted)",
                                lineHeight: 1.6,
                            }}
                        >
                            I did not build the ISL-to-text translator itself. My contribution was wrapping the existing 
                            translation tool with an MCP (Model Context Protocol) interface, enabling it to integrate 
                            seamlessly with AI systems and development environments.
                        </p>
                    </div>
                </m.div>
            </div>
        </section>
    );
}
