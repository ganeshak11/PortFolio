"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const FULL_TEXT = "$ connect --with ganesh";

export default function Contact() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [typed, setTyped] = useState("");
    const [typingDone, setTypingDone] = useState(false);
    const startedRef = useRef(false);

    useEffect(() => {
        if (!inView || startedRef.current) return;
        startedRef.current = true;

        let i = 0;
        const speed = 45; // ms per char
        const interval = setInterval(() => {
            i++;
            setTyped(FULL_TEXT.slice(0, i));
            if (i >= FULL_TEXT.length) {
                clearInterval(interval);
                setTypingDone(true);
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
                        06 / CONTACT
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
                        {typed}
                        {!typingDone && (
                            <span className="cursor-blink" style={{ marginLeft: 2 }} />
                        )}
                        {typingDone && (
                            <span className="cursor-blink" style={{ marginLeft: 2 }} />
                        )}
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
                            <motion.a
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
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "var(--accent)";
                                    e.currentTarget.style.paddingLeft = "16px";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "var(--muted)";
                                    e.currentTarget.style.paddingLeft = "0";
                                }}
                            >
                                <span>{link.label}</span>
                                <span style={{ color: "var(--accent)" }}>{link.icon}</span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
