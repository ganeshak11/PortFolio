"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const STACK = [
    { name: "Linux", level: "Advanced" },
    { name: "Git", level: "Deep Mental Model" },
    { name: "Systemd", level: "Core" },
    { name: "Bash", level: "Core" },
    { name: "Networking", level: "Basics" },
    { name: "Docker", level: "Learning" },
    { name: "CI/CD Pipelines", level: "Core" },
    { name: "PostgreSQL", level: "Core" },
    { name: "Supabase", level: "Core" },
    { name: "Next.js", level: "Core" },
    { name: "React Native", level: "Core" },
];

export default function DevOpsStack() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const el = e.currentTarget;
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            const rotX = -dy * 12;
            const rotY = dx * 12;
            el.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
            el.style.boxShadow = `0 8px 30px rgba(var(--accent-rgb, 6 182 212) / 0.25), 0 0 0 1px var(--accent)`;
        },
        []
    );

    const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const el = e.currentTarget;
            el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
            el.style.boxShadow = "";
        },
        []
    );

    return (
        <section
            ref={ref}
            id="stack"
            style={{
                padding: "100px 24px",
            }}
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
                        03 / DEVOPS_STACK
                    </p>
                    <h2
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--fg)",
                        }}
                    >
                        Tools &amp; Technologies
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 16,
                    }}
                >
                    {STACK.map((item, i) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            className="glass-card tilt-card"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                fontFamily: "monospace",
                                fontSize: 13,
                                padding: "12px 20px",
                                borderRadius: 6,
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                                cursor: "default",
                                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                            }}
                        >
                            <span style={{ color: "var(--fg)", fontWeight: 600 }}>
                                {item.name}
                            </span>
                            <span
                                style={{
                                    fontSize: 10,
                                    color: "var(--accent)",
                                    letterSpacing: "0.1em",
                                }}
                            >
                                {item.level}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
