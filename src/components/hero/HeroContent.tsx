"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

const HERO_DEFAULT = ["I BUILD", "RELIABLE", "SYSTEMS"];
const HERO_REVEAL  = ["I QUESTION", "FRAGILE", "ARCHITECTURE"];
const SUBLINE = "Infrastructure is not magic — it is decisions with trade-offs.";
const SUBLINE2 = "I make those decisions explicit.";

export function HeroContent({ isMobile }: { isMobile: boolean }) {
    const heroRef = useRef<HTMLDivElement>(null);
    const maskRef   = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
    const rafRef    = useRef<number | null>(null);
    const textRef   = useRef<HTMLDivElement>(null);
    const maskLayerRef = useRef<HTMLDivElement>(null);
    const [typed, setTyped] = useState("");
    const [typed2, setTyped2] = useState("");
    const [line1Done, setLine1Done] = useState(false);
    const startedRef = useRef(false);

    useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;
        const delay1 = setTimeout(() => {
            let i = 0;
            const iv = setInterval(() => {
                i++;
                setTyped(SUBLINE.slice(0, i));
                if (i >= SUBLINE.length) { clearInterval(iv); setLine1Done(true); }
            }, 28);
        }, 900);
        return () => clearTimeout(delay1);
    }, []);

    useEffect(() => {
        if (!line1Done) return;
        let i = 0;
        const iv = setInterval(() => {
            i++;
            setTyped2(SUBLINE2.slice(0, i));
            if (i >= SUBLINE2.length) clearInterval(iv);
        }, 28);
        return () => clearInterval(iv);
    }, [line1Done]);

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
                    cursor: isMobile ? "default" : "default",
                }}
            >
                {/* ── Eyebrow ─── */}
                <m.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="hero-eyebrow"
                    style={{
                        fontFamily: "monospace",
                        fontSize: 13,
                        color: "var(--accent)",
                        letterSpacing: "0.05em",
                        marginBottom: 32,
                        maxWidth: 1536,
                        margin: "0 auto 32px",
                        width: "100%",
                    }}
                >
                    $ whoami — DevOps Engineer &amp; Systems Engineering
                </m.p>

                {/* ── Dual-layer headline ─── */}
                <div
                    ref={textRef}
                    onMouseMove={!isMobile ? onMouseMove : undefined}
                    onMouseLeave={!isMobile ? onMouseLeave : undefined}
                    style={{
                        position: "relative",
                        maxWidth: 1536,
                        margin: "0 auto",
                        width: "100%",
                        cursor: isMobile ? "default" : "crosshair",
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
                                    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
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
                                        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
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
                        maxWidth: 1536,
                        margin: "48px auto 0",
                        width: "100%",
                        fontFamily: "monospace",
                        fontSize: "clamp(13px, 1.5vw, 15px)",
                        color: "var(--muted)",
                        lineHeight: 1.8,
                    }}
                >
                    {typed}<br />{typed2}
                </m.p>

            </m.section>
        </AnimatePresence>
    );
}
