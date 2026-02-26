"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
    "BIOS v2.4.1 — Initializing hardware...",
    "CPU: 8-core @ 3.6GHz ✓",
    "RAM: 32GB DDR5 ✓",
    "Loading kernel modules...",
    "Mounting filesystems...",
    "[  OK  ] Started systemd-journald.service",
    "[  OK  ] Reached target Graphical Interface",
    "Starting portfolio.service...",
    "[  OK  ] portfolio.service — Active (running)",
    "Ready.",
];

const HERO_DEFAULT = ["I BUILD", "RELIABLE", "SYSTEMS"];
const HERO_REVEAL = ["I QUESTION", "FRAGILE", "ARCHITECTURE"];

export default function Hero() {
    const [bootDone, setBootDone] = useState(false);
    const [lineIdx, setLineIdx] = useState(0);
    const [typedLines, setTyped] = useState<string[]>([]);

    const heroRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
    const rafRef = useRef<number | null>(null);
    const textRef = useRef<HTMLDivElement>(null);

    /* ── Boot animation ─────────────────────────── */
    useEffect(() => {
        if (lineIdx >= BOOT_LINES.length) {
            setTimeout(() => setBootDone(true), 800);
            return;
        }
        const delay = lineIdx === 0 ? 1000 : 400 + Math.random() * 500;
        const t = setTimeout(() => {
            setTyped((prev) => [...prev, BOOT_LINES[lineIdx]]);
            setLineIdx((n) => n + 1);
        }, delay);
        return () => clearTimeout(t);
    }, [lineIdx]);

    /* ── Cursor-tracked radial mask ─────────────── */
    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        maskRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(() => {
                if (textRef.current) {
                    const { x, y } = maskRef.current;
                    textRef.current.style.setProperty("--mx", `${x}px`);
                    textRef.current.style.setProperty("--my", `${y}px`);
                }
                rafRef.current = null;
            });
        }
    }, []);

    const onMouseLeave = useCallback(() => {
        if (textRef.current) {
            textRef.current.style.setProperty("--mx", `-999px`);
            textRef.current.style.setProperty("--my", `-999px`);
        }
    }, []);

    /* ── Render: Boot ───────────────────────────── */
    if (!bootDone) {
        return (
            <section
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px 24px 40px",
                    background: "#000",
                    color: "#39ff14",
                }}
            >
                <div
                    style={{
                        maxWidth: 640,
                        margin: "0 auto",
                        width: "100%",
                        fontFamily: "monospace",
                        fontSize: "clamp(12px, 1.5vw, 14px)",
                        lineHeight: 1.8,
                    }}
                >
                    {typedLines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                color: line.startsWith("[  OK  ]") ? "#39ff14"
                                    : line.startsWith("Starting") ? "#facc15"
                                        : "#ccc",
                            }}
                        >
                            {line}
                        </motion.div>
                    ))}
                    {lineIdx < BOOT_LINES.length && (
                        <span className="cursor-blink" style={{ marginTop: 4, display: "block", height: 14 }} />
                    )}
                </div>
            </section>
        );
    }

    /* ── Render: Hero ───────────────────────────── */
    return (
        <AnimatePresence>
            <motion.section
                ref={heroRef}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px 24px 40px",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "crosshair",
                }}
            >
                {/* ── Eyebrow ─── */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        fontFamily: "monospace",
                        fontSize: 13,
                        color: "var(--accent)",
                        letterSpacing: "0.15em",
                        marginBottom: 32,
                        maxWidth: 1100,
                        margin: "0 auto 32px",
                        width: "100%",
                    }}
                >
                    $ whoami — DevOps Engineer
                </motion.p>

                {/* ── Dual-layer headline ─── */}
                <div
                    ref={textRef}
                    style={
                        {
                            position: "relative",
                            maxWidth: 1100,
                            margin: "0 auto",
                            width: "100%",
                            "--mx": "-999px",
                            "--my": "-999px",
                        } as React.CSSProperties
                    }
                >
                    {/* Layer A — default text */}
                    <div aria-hidden="true" style={{ pointerEvents: "none" }}>
                        {HERO_DEFAULT.map((line, i) => (
                            <motion.div
                                key={`a-${i}`}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                style={{
                                    fontSize: "clamp(52px, 10vw, 140px)",
                                    fontWeight: 900,
                                    lineHeight: 1.0,
                                    letterSpacing: "-0.03em",
                                    color: "var(--fg)",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {line}
                            </motion.div>
                        ))}
                    </div>

                    {/* Layer B — revealed text via circular mask */}
                    <div
                        aria-label={HERO_REVEAL.join(" ")}
                        style={{
                            position: "absolute",
                            inset: 0,
                            pointerEvents: "none",
                            WebkitMaskImage:
                                "radial-gradient(circle 160px at var(--mx) var(--my), black 100%, transparent 100%)",
                            maskImage:
                                "radial-gradient(circle 160px at var(--mx) var(--my), black 100%, transparent 100%)",
                            background: "var(--accent)",
                        }}
                    >
                        {HERO_REVEAL.map((line, i) => (
                            <div
                                key={`b-${i}`}
                                style={{
                                    fontSize: "clamp(52px, 10vw, 140px)",
                                    fontWeight: 900,
                                    lineHeight: 1.0,
                                    letterSpacing: "-0.03em",
                                    color: "var(--bg)",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {line}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Subline ─── */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{
                        marginTop: 48,
                        maxWidth: 1100,
                        margin: "48px auto 0",
                        width: "100%",
                        fontFamily: "monospace",
                        fontSize: "clamp(13px, 1.5vw, 15px)",
                        color: "var(--muted)",
                        lineHeight: 1.8,
                    }}
                >
                    Infrastructure is not magic — it is decisions with trade-offs.
                    <br />
                    I make those decisions explicit.
                </motion.p>

                {/* ── Scroll indicator ─── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1.2 }}
                    style={{
                        position: "absolute",
                        bottom: 40,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontFamily: "monospace",
                        fontSize: 11,
                        letterSpacing: "0.15em",
                        color: "var(--muted)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <span>scroll</span>
                    <motion.span
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6 }}
                    >
                        ↓
                    </motion.span>
                </motion.div>
            </motion.section>
        </AnimatePresence>
    );
}
