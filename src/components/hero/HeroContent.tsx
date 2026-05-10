"use client";

import { useRef, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";

const HERO_DEFAULT = ["I BUILD", "RELIABLE", "SYSTEMS"];
const HERO_REVEAL = ["I QUESTION", "FRAGILE", "ARCHITECTURE"];

export function HeroContent({ isMobile }: { isMobile: boolean }) {
    const heroRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
    const rafRef = useRef<number | null>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const maskLayerRef = useRef<HTMLDivElement>(null);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!textRef.current) return;
        const rect = textRef.current.getBoundingClientRect();
        maskRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(() => {
                if (maskLayerRef.current) {
                    const { x, y } = maskRef.current;
                    const mask = `radial-gradient(circle 160px at ${x}px ${y}px, black 100%, transparent 100%)`;
                    maskLayerRef.current.style.cssText = `position:absolute;inset:0;pointer-events:none;-webkit-mask-image:${mask};mask-image:${mask};background:var(--accent);`;
                }
                rafRef.current = null;
            });
        }
    }, []);

    const onMouseLeave = useCallback(() => {
        if (maskLayerRef.current) {
            const mask = "radial-gradient(circle 160px at -999px -999px, black 100%, transparent 100%)";
            maskLayerRef.current.style.cssText = `position:absolute;inset:0;pointer-events:none;-webkit-mask-image:${mask};mask-image:${mask};background:var(--accent);`;
        }
    }, []);

    return (
        <AnimatePresence>
            <m.section
                ref={heroRef}
                onMouseMove={!isMobile ? onMouseMove : undefined}
                onMouseLeave={!isMobile ? onMouseLeave : undefined}
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
                    cursor: isMobile ? "default" : "crosshair",
                }}
            >
                {/* ── Eyebrow ─── */}
                <m.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        fontFamily: "monospace",
                        fontSize: 13,
                        color: "var(--accent)",
                        letterSpacing: "0.05em",
                        marginBottom: 32,
                        maxWidth: 1100,
                        margin: "0 auto 32px",
                        width: "100%",
                    }}
                >
                    $ whoami — DevOps Engineer | System Thinker
                </m.p>

                {/* ── Dual-layer headline ─── */}
                <div
                    ref={textRef}
                    style={{
                        position: "relative",
                        maxWidth: 1100,
                        margin: "0 auto",
                        width: "100%",
                    }}
                >
                    {/* Layer A — default text */}
                    <div aria-hidden="true" style={{ pointerEvents: "none" }}>
                        {HERO_DEFAULT.map((line) => (
                            <m.div
                                key={line}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + HERO_DEFAULT.indexOf(line) * 0.1 }}
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
                            </m.div>
                        ))}
                    </div>

                    {/* Layer B — revealed text via circular mask */}
                    {!isMobile && (
                        <div
                            ref={maskLayerRef}
                            aria-label={HERO_REVEAL.join(" ")}
                            style={{
                                position: "absolute",
                                inset: 0,
                                pointerEvents: "none",
                                WebkitMaskImage: "radial-gradient(circle 160px at -999px -999px, black 100%, transparent 100%)",
                                maskImage: "radial-gradient(circle 160px at -999px -999px, black 100%, transparent 100%)",
                                background: "var(--accent)",
                            }}
                        >
                            {HERO_REVEAL.map((line) => (
                                <div
                                    key={line}
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
                    )}
                </div>

                {/* ── Subline ─── */}
                <m.p
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
                </m.p>

                {/* ── Resume CTA Buttons ─── */}
                <m.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    style={{
                        maxWidth: 1100,
                        margin: "32px auto 0",
                        width: "100%",
                        display: "flex",
                        gap: 16,
                        flexWrap: "wrap",
                    }}
                >
                    <Link
                        href="/resume.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontFamily: "monospace",
                            fontSize: 13,
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            padding: "10px 28px",
                            border: "1.5px solid var(--accent)",
                            color: "var(--bg)",
                            background: "var(--accent)",
                            borderRadius: 4,
                            cursor: "pointer",
                            textDecoration: "none",
                            transition: "opacity 0.25s, transform 0.25s, color 0.25s, background-color 0.25s, border-color 0.25s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.cssText = "font-family: monospace; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; padding: 10px 28px; border: 1.5px solid var(--accent); color: var(--bg); background: var(--accent); border-radius: 4px; cursor: pointer; text-decoration: none; transition: opacity 0.25s, transform 0.25s, color 0.25s, background-color 0.25s, border-color 0.25s;";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.cssText = "font-family: monospace; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; padding: 10px 28px; border: 1.5px solid var(--accent); color: var(--bg); background: var(--accent); border-radius: 4px; cursor: pointer; text-decoration: none; transition: opacity 0.25s, transform 0.25s, color 0.25s, background-color 0.25s, border-color 0.25s;";
                        }}
                    >
                        View Resume →
                    </Link>
                    <button
                        onClick={() => {
                            const resumeWindow = window.open('/resume.html', '_blank');
                            if (resumeWindow) {
                                resumeWindow.addEventListener('load', () => {
                                    setTimeout(() => {
                                        resumeWindow.print();
                                    }, 500);
                                });
                            }
                        }}
                        style={{
                            fontFamily: "monospace",
                            fontSize: 13,
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase" as const,
                            padding: "10px 28px",
                            border: "1.5px solid var(--accent)",
                            color: "var(--accent)",
                            background: "transparent",
                            borderRadius: 4,
                            cursor: "pointer",
                            transition: "all 0.25s",
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
                        ↓ Download Resume
                    </button>
                </m.div>

                {/* ── Scroll indicator ─── */}
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1.2 }}
                    style={{
                        position: "absolute",
                        bottom: 40,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontFamily: "monospace",
                        fontSize: 12,
                        letterSpacing: "0.05em",
                        color: "var(--muted)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <span>scroll</span>
                    <m.span
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6 }}
                    >
                        ↓
                    </m.span>
                </m.div>
            </m.section>
        </AnimatePresence>
    );
}
