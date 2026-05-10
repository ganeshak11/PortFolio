"use client";

import { useRef, useEffect, useState } from "react";
import { m, useInView  } from "framer-motion";
import Link from "next/link";

const FULL_TEXT = "$ connect --with ganesh";

export default function Contact() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [state, setState] = useState({ typed: "", typingDone: false });
    const startedRef = useRef(false);

    useEffect(() => {
        if (!inView || startedRef.current) return;
        startedRef.current = true;

        let i = 0;
        const speed = 45; // ms per char
        const interval = setInterval(() => {
            i++;
            const isDone = i >= FULL_TEXT.length;
            setState({ typed: FULL_TEXT.slice(0, i), typingDone: isDone });
            if (isDone) {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [inView]);

    return (
        <section
            ref={ref}
            id="contact"
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
                        07 / CONTACT
                    </p>
                    {/* Typewriter heading */}
                    <h2
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--fg)",
                            fontFamily: "monospace",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 4,
                        }}
                    >
                        {state.typed}
                        {!state.typingDone && (
                            <span className="cursor-blink" style={{ marginLeft: 2 }} />
                        )}
                        {state.typingDone && (
                            <span className="cursor-blink" style={{ marginLeft: 2 }} />
                        )}
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
                            flexDirection: "column",
                            gap: 16,
                            fontFamily: "monospace",
                        }}
                    >
                        {[
                            { label: "GitHub", href: "https://github.com/ganeshak11", icon: "→" },
                            {
                                label: "LinkedIn",
                                href: "https://www.linkedin.com/in/ganeshangadi1301/",
                                icon: "→",
                            },
                            { label: "Email", href: "mailto:ganeshangadi13012006@gmail.com", icon: "→" },
                        ].map((link, i) => (
                            <m.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -16 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                style={{
                                    fontSize: 16,
                                    color: "var(--muted)",
                                    textDecoration: "none",
                                    padding: "16px 0",
                                    borderBottom: "1px solid var(--border)",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    transition: "opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.cssText = "padding: 16px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s; color: var(--accent); padding-left: 16px; text-decoration: none;";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.cssText = "padding: 16px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; transition: opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s; color: var(--muted); padding-left: 0; text-decoration: none;";
                                }}
                            >
                                <span>{link.label}</span>
                                <span style={{ color: "var(--accent)" }}>{link.icon}</span>
                            </m.a>
                        ))}
                    </div>

                    <p
                        style={{
                            marginTop: 32,
                            fontSize: 14,
                            color: "var(--muted)",
                            textAlign: "center",
                        }}
                    >
                        View all{" "}
                        <Link
                            href="#projects"
                            style={{
                                color: "var(--accent)",
                                textDecoration: "underline",
                            }}
                        >
                            DevOps projects
                        </Link>
                        {" "}or connect on{" "}
                        <a
                            href="https://github.com/ganeshak11"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: "var(--accent)",
                                textDecoration: "underline",
                            }}
                        >
                            GitHub
                        </a>
                        .
                    </p>
                </m.div>
            </div>
        </section>
    );
}
