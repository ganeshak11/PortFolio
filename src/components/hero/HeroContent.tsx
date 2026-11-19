"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { ArrowDown, ArrowUpRight, Terminal } from "lucide-react";

export function HeroContent({ onTerminalOpen }: { isMobile?: boolean; onTerminalOpen?: () => void }) {
    const fade = (delay: number) => ({
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <div className="hero">
            <div className="wrap hero-grid">
                <div>
                    <m.span className="chip accent" {...fade(0.05)}>
                        <span className="dot" style={{ color: "var(--status-ok)" }} />
                        open to opportunities · Mysuru, India
                    </m.span>

                    <m.p className="hero-name" {...fade(0.1)} aria-hidden="true">
                        Ganesh
                        <span className="last">Angadi</span>
                    </m.p>

                    <m.p className="hero-role" {...fade(0.16)}>
                        Systems engineer · Rust, Linux, security &amp; infrastructure
                    </m.p>

                    <m.p className="hero-tagline" {...fade(0.22)}>
                        I&apos;m building <a href="#fortis" className="hero-link">Fortis</a>, a privacy-first system that links my
                        Android phone and Linux laptops: an encrypted vault, fingerprint-approved sudo and laptop remote control,
                        with no cloud in between. Most recently I was the founding software engineer intern at Kridtech.
                    </m.p>

                    <m.div className="hero-ctas" {...fade(0.28)}>
                        <a href="#fortis" className="btn primary">
                            See Fortis <ArrowDown size={14} />
                        </a>
                        <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn">
                            Resume <ArrowUpRight size={14} />
                        </a>
                        {onTerminalOpen && (
                            <button className="btn" onClick={onTerminalOpen} title="A terminal version of this site">
                                <Terminal size={14} /> terminal
                            </button>
                        )}
                    </m.div>
                </div>

                <m.figure
                    className="portrait"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image
                        src="/profile.png"
                        alt="Ganesh Angadi"
                        fill
                        priority
                        sizes="(max-width: 860px) 300px, 420px"
                        style={{ objectFit: "cover", objectPosition: "center 30%" }}
                    />
                </m.figure>
            </div>
        </div>
    );
}
