"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { ArrowDown, ArrowUpRight, Terminal } from "lucide-react";

const HERO_DEFAULT = "I build reliable systems.";
const HERO_REVEAL = "I question fragile architecture.";
const SUBLINE = "Infrastructure is not magic — it is decisions with trade-offs. I make those decisions explicit.";

export function HeroContent({ isMobile, onTerminalOpen }: { isMobile: boolean; onTerminalOpen?: () => void }) {
    const [typed, setTyped] = useState("");
    const [flip, setFlip] = useState(false);
    const startedRef = useRef(false);

    useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;
        let iv: ReturnType<typeof setInterval> | undefined;
        const t = setTimeout(() => {
            let i = 0;
            iv = setInterval(() => {
                i++;
                setTyped(SUBLINE.slice(0, i));
                if (i >= SUBLINE.length && iv) clearInterval(iv);
            }, 22);
        }, 700);
        return () => { clearTimeout(t); if (iv) clearInterval(iv); };
    }, []);

    const fade = (delay: number) => ({
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <div className="hero">
            <div className="wrap hero-grid">
                <div>
                    <m.span className="chip accent" {...fade(0.05)}>
                        <span className="dot live" style={{ color: "var(--status-ok)" }} />
                        open to opportunities · Mysuru, IN
                    </m.span>

                    <m.p className="hero-name" {...fade(0.12)} aria-hidden="true">
                        Ganesh
                        <span className="last">Angadi</span>
                    </m.p>

                    <m.p className="hero-role" {...fade(0.2)}>
                        $ whoami → DevOps engineer &amp; systems builder
                    </m.p>

                    <m.p
                        {...fade(0.26)}
                        onMouseEnter={() => !isMobile && setFlip(true)}
                        onMouseLeave={() => setFlip(false)}
                        onClick={() => isMobile && setFlip((f) => !f)}
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(26px, 3.4vw, 40px)",
                            lineHeight: 1.15,
                            marginBottom: 14,
                            color: flip ? "var(--accent)" : "var(--fg)",
                            cursor: "default",
                            transition: "color 0.2s ease",
                        }}
                        title="hover me"
                    >
                        {flip ? HERO_REVEAL : HERO_DEFAULT}
                    </m.p>

                    <p className="hero-tagline">
                        {typed}
                        <span className="caret" aria-hidden="true" />
                    </p>

                    <m.div className="hero-ctas" {...fade(0.34)}>
                        <a href="#projects" className="btn primary">
                            See my work <ArrowDown size={14} />
                        </a>
                        <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn">
                            Resume <ArrowUpRight size={14} />
                        </a>
                        {onTerminalOpen && (
                            <button className="btn" onClick={onTerminalOpen}>
                                <Terminal size={14} /> terminal mode
                            </button>
                        )}
                    </m.div>

                    <m.div className="hero-meta" {...fade(0.42)}>
                        <span className="chip">Founding SDE @ Kridtech</span>
                        <span className="chip">1st place · MCP hackathon</span>
                        <span className="chip">creator of Fortis-CI</span>
                    </m.div>
                </div>

                <m.figure
                    className="portrait"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image
                        src="/profile.png"
                        alt="Ganesh Angadi - DevOps Engineer Portfolio"
                        fill
                        priority
                        sizes="(max-width: 860px) 300px, 420px"
                        style={{ objectFit: "cover", objectPosition: "center 30%" }}
                    />
                    <figcaption className="portrait-cap">
                        <span>~/ganesh/profile.png</span>
                        <span style={{ color: "var(--accent-2)" }}>● live</span>
                    </figcaption>
                </m.figure>
            </div>

            <a href="#about" className="scroll-hint">scroll ↓</a>
        </div>
    );
}
