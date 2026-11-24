"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { ArrowDown, ArrowUpRight, Terminal } from "lucide-react";

const fade = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
});

// Time in Mysuru, like the Chronos card on the Frost desktop.
function useIst() {
    const [now, setNow] = useState<Date | null>(null);
    useEffect(() => {
        setNow(new Date());
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);
    if (!now) return null;
    const parts: Record<string, string> = Object.fromEntries(
        new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Kolkata",
            weekday: "long", day: "2-digit", month: "long",
            hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
        }).formatToParts(now).map((p) => [p.type, p.value]),
    );
    const h = Number(parts.hour) % 24;
    const greet = h < 5 ? "Good night" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : h < 21 ? "Good evening" : "Good night";
    return {
        weekday: parts.weekday, day: parts.day, month: parts.month,
        minute: parts.minute, second: parts.second,
        h, m: Number(parts.minute), greet,
    };
}

function ClockWidget() {
    const t = useIst();
    return (
        <m.div className="panel widget" {...fade(0.2)}>
            <span className="cap">Mysuru · IST</span>
            <span className="big" aria-live="off">
                {t ? `${String(t.h).padStart(2, "0")}:${t.minute}` : "--:--"}
                <small>:{t ? t.second : "--"}</small>
            </span>
            <span className="sub" style={{ color: "var(--accent)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                {t ? `${t.weekday} ${t.day} ${t.month}` : " "}
            </span>
            <div className="ruler" style={{ margin: "10px 0 2px" }} aria-hidden="true">
                {t && <i style={{ left: `${((t.h * 60 + t.m) / 1440) * 100}%` }} />}
            </div>
            <span className="sub">{t ? `${t.greet} from here` : " "}</span>
        </m.div>
    );
}

function BuildingWidget() {
    return (
        <m.a href="#fortis" className="panel hover widget" style={{ textDecoration: "none", color: "inherit" }} {...fade(0.26)}>
            <span className="cap"><span className="dot live" style={{ color: "var(--accent)" }} />Now building</span>
            <span className="big hand" style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>Fortis</span>
            <span className="sub">Rust agent · Kotlin app · spec</span>
            <span className="sub" style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", paddingTop: 8 }}>
                <span>since Jul 2026</span><span style={{ color: "var(--accent)" }}>see it ↓</span>
            </span>
        </m.a>
    );
}

export function HeroContent({ onTerminalOpen }: { isMobile?: boolean; onTerminalOpen?: () => void }) {
    return (
        <div className="hero">
            <div className="wrap hero-grid">
                <m.div className="panel hero-main" {...fade(0.05)}>
                    <span className="cap">
                        <span className="dot live" style={{ color: "var(--status-ok)" }} />
                        open to internships &amp; full-time · Mysuru
                    </span>

                    <p className="hero-name" aria-hidden="true">
                        Ganesh
                        <span className="last">Angadi</span>
                    </p>

                    <p className="hero-role">
                        Systems engineer · cloud · DevOps
                    </p>

                    <p className="hero-tagline">
                        I&apos;m building <a href="#fortis" className="hero-link">Fortis</a>, a privacy-first system that links my
                        Android phone and Linux laptops: an encrypted vault, fingerprint-approved sudo and laptop remote control,
                        with no cloud in between. Most recently I was the founding software engineer intern at Kridtech.
                    </p>

                    <div className="hero-ctas">
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
                    </div>

                    <div className="hero-meta" style={{ marginTop: "auto", paddingTop: 28 }}>
                        <span className="chip solid">systems</span>
                        <span className="chip">distributed</span>
                        <span className="chip">cloud</span>
                        <span className="chip">networking</span>
                        <span className="chip">DevOps / SRE</span>
                    </div>
                </m.div>

                <div className="hero-side">
                    <m.figure
                        className="portrait"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Image
                            src="/profile.png"
                            alt="Ganesh Angadi"
                            fill
                            priority
                            sizes="(max-width: 920px) 100vw, 480px"
                            style={{ objectFit: "cover", objectPosition: "center 30%" }}
                        />
                        <figcaption className="portrait-cap">
                            <span><b>Ganesh Angadi</b>ganesh@frost</span>
                            <span className="chip" style={{ background: "rgba(0,0,0,0.45)" }}>
                                <span className="dot" style={{ color: "var(--status-ok)" }} /> online
                            </span>
                        </figcaption>
                    </m.figure>
                    <ClockWidget />
                    <BuildingWidget />
                </div>
            </div>
        </div>
    );
}
