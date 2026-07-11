"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Github, Settings, Box, Hexagon, Swords, Key, Lock, Database, Server, Network, FileJson } from "lucide-react";
import { Bangers, Permanent_Marker } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { getOrCreateVisitorId } from "@/lib/visitorId";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400" });

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    hook: string;
    tags: string[];
    readingTime: number;
    featured?: boolean;
    series?: string;
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
    const seriesPosts = posts
        .filter((p) => p.series === "DevOps Duels")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const regularPosts = posts
        .filter((p) => p.series !== "DevOps Duels")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const [activeTab, setActiveTab] = useState<"all" | "articles" | "duels">("all");

    const hasTrackedVisit = useRef(false);
    const maxScroll = useRef(0);
    const sessionStart = useRef(Date.now());

    useEffect(() => {
        if (!hasTrackedVisit.current) {
            hasTrackedVisit.current = true;
            const visitorId = getOrCreateVisitorId();

            const fortisUrl = process.env.NEXT_PUBLIC_FORTIS_URL || (process.env.NODE_ENV === 'production' ? 'https://analytics.ganeshangadi.online' : 'http://localhost:3001');
            if (fortisUrl) {
                const urlParams = new URLSearchParams(window.location.search);
                const utm = urlParams.get("utm_source") || urlParams.get("ref");
                const finalReferer = utm ? `utm_source:${utm}` : document.referrer;

                fetch(`${fortisUrl}/api/telemetry`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ visitorId, path: "/blog", referer: finalReferer }),
                }).catch(() => { });
            }
        }

        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = totalScroll / (windowHeight || 1);
            const scrollPct = Math.round(scroll * 100);
            if (scrollPct > maxScroll.current) {
                maxScroll.current = scrollPct;
            }
        };
        window.addEventListener("scroll", handleScroll);

        const sendTelemetryUpdate = () => {
            const durationMs = Date.now() - sessionStart.current;
            const visitorId = getOrCreateVisitorId();
            const fortisUrl = process.env.NEXT_PUBLIC_FORTIS_URL || (process.env.NODE_ENV === 'production' ? 'https://analytics.ganeshangadi.online' : 'http://localhost:3001');

            if (fortisUrl && durationMs > 1000) {
                fetch(`${fortisUrl}/api/telemetry/update`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        visitorId,
                        path: `/blog`,
                        scrollDepth: maxScroll.current > 100 ? 100 : maxScroll.current,
                        durationMs
                    }),
                    keepalive: true
                }).catch(() => { });
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                sendTelemetryUpdate();
            }
        };

        window.addEventListener("beforeunload", sendTelemetryUpdate);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("beforeunload", sendTelemetryUpdate);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            sendTelemetryUpdate();
        };
    }, []);

    return (
        <>
            <style>{`
                @media (max-width: 600px) {
                    main {
                        padding-top: 150px !important;
                    }
                    .duel-vs-row {
                        flex-direction: column !important;
                        gap: 8px !important;
                        padding: 12px !important;
                    }
                    .terminal-title {
                        max-width: 140px !important;
                        font-size: 9px !important;
                    }
                    .duel-vs-grid {
                        grid-template-columns: 1fr !important;
                        gap: 12px !important;
                    }
                    .duel-tool-a, .duel-tool-b {
                        justify-content: center !important;
                    }
                    .duel-tool-b {
                        flex-direction: row-reverse !important;
                    }
                    .duel-vs-badge {
                        margin: 0 auto;
                    }
                    .duel-footer {
                        flex-direction: column !important;
                        align-items: center !important;
                        text-align: center;
                        gap: 12px;
                    }
                    .duel-footer p {
                        padding-right: 0 !important;
                    }
                    .devops-title {
                        font-size: clamp(40px, 12vw, 84px) !important;
                    }
                    .duels-title {
                        font-size: clamp(48px, 14vw, 96px) !important;
                    }
                    .matchmaking-divider {
                        font-size: 11px !important;
                        padding: 6px 12px !important;
                        text-align: center;
                    }
                }
            `}</style>
            <Navbar />
            <main style={{ minHeight: "100vh", padding: "120px 24px 80px" }}>
                <div style={{ maxWidth: 860, margin: "0 auto" }}>

                    {/* Header */}
                    <div style={{ marginBottom: 56 }}>
                        <p style={{ fontFamily: "monospace", fontSize: 13, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 16 }}>
                            $ cat /var/log/thoughts <span className="cursor-blink" style={{ display: "inline-block", width: 8, height: 14, background: "var(--accent)", marginLeft: 4, verticalAlign: "middle" }} />
                        </p>
                        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--fg)", marginBottom: 12, lineHeight: 1.0 }}>
                            Blog
                        </h1>
                        <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, maxWidth: 480 }}>
                            Lessons from production failures, system design decisions, and DevOps war stories.
                        </p>
                    </div>

                    {/* Category Switcher */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 48,
                        fontFamily: "monospace",
                        fontSize: 13,
                        flexWrap: "wrap"
                    }}>
                        <span style={{ color: "var(--muted)" }}>$ filter-posts --category=</span>
                        <div style={{ display: "flex", gap: 8 }}>
                            {(["all", "articles", "duels"] as const).map((tab) => {
                                const active = activeTab === tab;
                                const label = tab === "all" ? "ALL" : tab === "articles" ? "ARTICLES" : "DEV_DUELS";
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        style={{
                                            background: active ? "var(--accent)" : "color-mix(in srgb, var(--fg) 5%, transparent)",
                                            color: active ? "var(--bg)" : "var(--fg)",
                                            border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
                                            padding: "4px 12px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            fontWeight: 700,
                                            fontFamily: "monospace",
                                            transition: "all 0.2s ease"
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!active) {
                                                e.currentTarget.style.borderColor = "var(--accent)";
                                                e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 8%, transparent)";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!active) {
                                                e.currentTarget.style.borderColor = "var(--border)";
                                                e.currentTarget.style.background = "color-mix(in srgb, var(--fg) 5%, transparent)";
                                            }
                                        }}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Premium DevOps Duels Series Section */}
                    {seriesPosts.length > 0 && activeTab !== "articles" && (
                        <div style={{ marginTop: 48, marginBottom: 72, position: "relative" }}>
                            <div style={{
                                padding: "48px 24px 56px",
                                background: "linear-gradient(145deg, var(--card-bg) 0%, color-mix(in srgb, var(--accent) 2%, var(--card-bg)) 100%)",
                                border: "1px solid color-mix(in srgb, var(--accent) 15%, var(--border))",
                                borderRadius: 32,
                                position: "relative",
                                zIndex: 1,
                                overflow: "hidden",
                                boxShadow: "0 24px 48px color-mix(in srgb, var(--fg) 3%, transparent)"
                            }}>
                                {/* Subtle Dot Background Pattern */}
                                <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    backgroundImage: "radial-gradient(color-mix(in srgb, var(--fg) 10%, transparent) 1px, transparent 1px)",
                                    backgroundSize: "24px 24px",
                                    opacity: 0.5,
                                    pointerEvents: "none",
                                    zIndex: 0
                                }} />

                                <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

                                    {/* Swords Icon */}
                                    <div style={{ marginBottom: 16, color: "var(--fg)", filter: "drop-shadow(0 4px 12px color-mix(in srgb, var(--fg) 20%, transparent))" }}>
                                        <Swords size={48} strokeWidth={1.5} />
                                    </div>

                                    {/* Stacked Massive Title */}
                                    <h2 style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        lineHeight: 0.9,
                                        marginBottom: 24,
                                        position: "relative"
                                    }}>
                                        <span
                                            className={`${bangers.className} devops-title`}
                                            style={{
                                                fontSize: "clamp(56px, 10vw, 96px)",
                                                color: "var(--fg)",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.05em"
                                            }}
                                        >
                                            DevOps
                                        </span>
                                        <span
                                            className={`${marker.className} duels-title`}
                                            style={{
                                                fontSize: "clamp(56px, 9vw, 96px)",
                                                color: "var(--accent)",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.02em",
                                                transform: "translateY(-4px) rotate(-3deg)",
                                                filter: "drop-shadow(0 4px 12px color-mix(in srgb, var(--accent) 30%, transparent))"
                                            }}
                                        >
                                            Duels
                                        </span>

                                        {/* Decorative sparks */}
                                        <div style={{ position: "absolute", top: "10%", left: "-10%", color: "var(--accent)", fontWeight: 900, fontSize: 24, transform: "rotate(-15deg)" }}>\</div>
                                        <div style={{ position: "absolute", top: "30%", left: "-15%", color: "var(--accent)", fontWeight: 900, fontSize: 24, transform: "rotate(-45deg)" }}>-</div>
                                        <div style={{ position: "absolute", top: "50%", left: "-10%", color: "var(--accent)", fontWeight: 900, fontSize: 24, transform: "rotate(-75deg)" }}>/</div>

                                        <div style={{ position: "absolute", top: "10%", right: "-10%", color: "var(--accent)", fontWeight: 900, fontSize: 24, transform: "rotate(15deg)" }}>/</div>
                                        <div style={{ position: "absolute", top: "30%", right: "-15%", color: "var(--accent)", fontWeight: 900, fontSize: 24, transform: "rotate(45deg)" }}>-</div>
                                        <div style={{ position: "absolute", top: "50%", right: "-10%", color: "var(--accent)", fontWeight: 900, fontSize: 24, transform: "rotate(75deg)" }}>\</div>
                                    </h2>

                                    {/* Announcement Pill */}
                                    <div style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 8,
                                        padding: "8px 20px",
                                        background: "color-mix(in srgb, var(--accent) 15%, var(--bg))",
                                        border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
                                        borderRadius: 999,
                                        color: "var(--fg)",
                                        fontWeight: 800,
                                        fontSize: 14,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        marginBottom: 24,
                                        boxShadow: "0 4px 12px color-mix(in srgb, var(--accent) 15%, transparent)"
                                    }}>
                                        <span style={{ fontSize: 18 }}>📢</span> NEW BLOG SERIES
                                    </div>

                                    <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 48, maxWidth: "560px", lineHeight: 1.6 }}>
                                        DevOps is full of choices. Some are simple, some are powerful, and some... are just overkill.
                                        <br /><br />
                                        <span style={{ color: "var(--accent)", fontWeight: 700 }}>NEW BLOGS RELEASE EVERY SUNDAY AND THURSDAY.</span>
                                    </p>

                                    {/* UPCOMING DUELS DIVIDER */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%", maxWidth: 600, marginBottom: 32 }}>
                                        <div style={{ flex: 1, height: 1, background: "color-mix(in srgb, var(--accent) 30%, transparent)" }} />
                                        <span className="matchmaking-divider" style={{
                                            background: "var(--fg)",
                                            color: "var(--bg)",
                                            padding: "6px 16px",
                                            borderRadius: 999,
                                            fontSize: 13,
                                            fontWeight: 800,
                                            letterSpacing: "0.05em",
                                            textTransform: "uppercase"
                                        }}>
                                            Matchmaking In Progress...
                                        </span>
                                        <div style={{ flex: 1, height: 1, background: "color-mix(in srgb, var(--accent) 30%, transparent)" }} />
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
                                        {seriesPosts.map((post, index) => {
                                            // Parse the title e.g. "Docker Compose vs. Kubernetes: When..."
                                            const parts = post.title.split(':');
                                            const toolsPart = parts[0];
                                            const subtitle = parts.slice(1).join(':').trim() || post.hook;

                                            let toolA = toolsPart;
                                            let toolB = "";
                                            const vsMatch = toolsPart.match(/ vs\.? | VS | vs /i);
                                            if (vsMatch) {
                                                const split = toolsPart.split(vsMatch[0]);
                                                toolA = split[0].trim();
                                                toolB = split[1].trim();
                                            }

                                            // Helper to pick a Lucide icon based on tool name
                                            const getIcon = (name: string) => {
                                                const n = name.toLowerCase();
                                                if (n.includes('docker')) return <Box size={18} strokeWidth={1.5} color="var(--accent)" />;
                                                if (n.includes('kubernetes')) return <Hexagon size={18} strokeWidth={1.5} color="var(--accent)" />;
                                                if (n.includes('github')) return <Github size={18} strokeWidth={1.5} color="var(--accent)" />;
                                                if (n.includes('jenkins')) return <Settings size={18} strokeWidth={1.5} color="var(--accent)" />;
                                                if (n.includes('ssh')) return <Key size={18} strokeWidth={1.5} color="var(--accent)" />;
                                                if (n.includes('https')) return <Lock size={18} strokeWidth={1.5} color="var(--accent)" />;
                                                if (n.includes('monolith')) return <Server size={18} strokeWidth={1.5} color="var(--accent)" />;
                                                if (n.includes('microservices') || n.includes('micro-services')) return <Network size={18} strokeWidth={1.5} color="var(--accent)" />;
                                                if (n.includes('postgres')) return <Database size={18} strokeWidth={1.5} color="var(--accent)" />;
                                                if (n.includes('mongo')) return <FileJson size={18} strokeWidth={1.5} color="var(--accent)" />;
                                                return <Swords size={18} strokeWidth={1.5} color="var(--accent)" />;
                                            };

                                            const matchNum = String(seriesPosts.length - index).padStart(2, '0');

                                            return (
                                                <Link
                                                    key={post.slug}
                                                    href={`/blog/${post.slug}`}
                                                    style={{ display: "block", textDecoration: "none" }}
                                                >
                                                    <div
                                                        style={{
                                                            background: "var(--card-bg)",
                                                            border: "1px solid var(--border)",
                                                            borderRadius: 12,
                                                            overflow: "hidden",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            transition: "all 0.25s ease-in-out",
                                                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            const t = e.currentTarget as HTMLDivElement;
                                                            t.style.borderColor = "var(--accent)";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            const t = e.currentTarget as HTMLDivElement;
                                                            t.style.borderColor = "var(--border)";
                                                        }}
                                                    >
                                                        {/* Terminal Titlebar */}
                                                        <div style={{
                                                            height: 32,
                                                            background: "color-mix(in srgb, var(--fg) 3%, transparent)",
                                                            borderBottom: "1px solid var(--border)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            padding: "0 16px",
                                                            position: "relative"
                                                        }}>
                                                            {/* Terminal Window Controls */}
                                                            <div style={{ display: "flex", gap: 6 }}>
                                                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f56" }} />
                                                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e" }} />
                                                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27c93f" }} />
                                                            </div>
                                                            {/* Terminal Filename */}
                                                            <span
                                                                className="terminal-title"
                                                                style={{
                                                                    fontFamily: "monospace",
                                                                    fontSize: 11,
                                                                    color: "var(--muted)",
                                                                    position: "absolute",
                                                                    left: "50%",
                                                                    transform: "translateX(-50%)",
                                                                    letterSpacing: "0.02em",
                                                                    whiteSpace: "nowrap",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    maxWidth: "60%",
                                                                    textAlign: "center"
                                                                }}
                                                            >
                                                                matchup_{matchNum}_{toolA.toLowerCase().replace(/[\s\.\-]+/g, '_')}_vs_{toolB.toLowerCase().replace(/[\s\.\-]+/g, '_')}.sh
                                                            </span>
                                                            {/* Dummy extension/active badge */}
                                                            <div style={{ width: 36 }} />
                                                        </div>

                                                        {/* Terminal Body */}
                                                        <div style={{ padding: "20px 24px" }}>
                                                            {/* Command Prompt */}
                                                            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 16 }}>
                                                                <span style={{ color: "var(--accent)", fontFamily: "monospace", fontSize: 13, fontWeight: 700, userSelect: "none" }}>$</span>
                                                                <span style={{ fontFamily: "monospace", fontSize: 13, color: "var(--fg)", lineHeight: 1.5, wordBreak: "break-word" }}>
                                                                    devops-duel --run {toolA.toLowerCase()} --vs {toolB.toLowerCase()}
                                                                </span>
                                                            </div>

                                                            {/* Visual Versus Output */}
                                                            {toolB ? (
                                                                <div
                                                                    className="duel-vs-row"
                                                                    style={{
                                                                        display: "flex",
                                                                        flexWrap: "wrap",
                                                                        alignItems: "center",
                                                                        gap: 16,
                                                                        background: "color-mix(in srgb, var(--fg) 2%, transparent)",
                                                                        border: "1px solid var(--border)",
                                                                        padding: "12px 20px",
                                                                        borderRadius: 8,
                                                                        marginBottom: 16,
                                                                        justifyContent: "center",
                                                                        transition: "all 0.2s ease"
                                                                    }}
                                                                >
                                                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                                        {getIcon(toolA)}
                                                                        <span style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 700, color: "var(--fg)", whiteSpace: "nowrap" }}>{toolA}</span>
                                                                    </div>
                                                                    <span className="duel-vs-text" style={{ fontFamily: "monospace", fontSize: 12, color: "var(--accent)", fontWeight: 900, userSelect: "none" }}>VS</span>
                                                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                                        {getIcon(toolB)}
                                                                        <span style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 700, color: "var(--fg)", whiteSpace: "nowrap" }}>{toolB}</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--fg)", marginBottom: 12 }}>
                                                                    {post.title}
                                                                </h3>
                                                            )}

                                                            {/* Code Comment styled Excerpt */}
                                                            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: "0 0 16px" }}>
                                                                <span style={{ color: "var(--accent)", marginRight: 8, fontFamily: "monospace" }}>#</span>
                                                                {subtitle}
                                                            </p>

                                                            {/* Footer details */}
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px dashed var(--border)", paddingTop: 12 }}>
                                                                <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--muted)" }}>
                                                                    STATUS: <span style={{ color: "var(--status-ok)", fontWeight: 700 }}>PUBLISHED</span>
                                                                </span>
                                                                <time style={{ fontSize: 11, fontFamily: "monospace", color: "var(--accent)", fontWeight: 700 }}>
                                                                    {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                                </time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Standard posts */}
                    {activeTab !== "duels" && (
                        <div style={{ marginTop: 40 }}>
                        {regularPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                style={{ display: "block", textDecoration: "none", color: "var(--fg)", position: "relative" }}
                            >
                                <div
                                    style={{
                                        padding: "24px 0",
                                        borderBottom: "1px solid var(--border)",
                                        display: "grid",
                                        gridTemplateColumns: "1fr auto",
                                        gap: 24,
                                        alignItems: "start",
                                        transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        const t = e.currentTarget as HTMLDivElement;
                                        const title = t.querySelector("h2");
                                        if (title) title.style.color = "var(--accent)";
                                        t.style.paddingLeft = "12px";
                                    }}
                                    onMouseLeave={(e) => {
                                        const t = e.currentTarget as HTMLDivElement;
                                        const title = t.querySelector("h2");
                                        if (title) title.style.color = "var(--fg)";
                                        t.style.paddingLeft = "0px";
                                    }}
                                >
                                    <div>
                                        <h2 style={{
                                            fontSize: "clamp(16px, 2.2vw, 20px)",
                                            fontWeight: 700,
                                            letterSpacing: "-0.01em",
                                            marginBottom: 8,
                                            lineHeight: 1.3,
                                            transition: "color 0.2s ease"
                                        }}>
                                            {post.title}
                                        </h2>
                                        {post.hook && (
                                            <p style={{ fontSize: 13, color: "var(--muted)", fontStyle: "italic", marginBottom: 12, lineHeight: 1.5 }}>
                                                "{post.hook}"
                                            </p>
                                        )}
                                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                                            {post.tags.map(tag => (
                                                <span key={tag} style={{ fontSize: 11, fontFamily: "monospace", color: "var(--muted)" }}>#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right", flexShrink: 0, paddingTop: 4 }}>
                                        <time style={{ fontSize: 12, fontFamily: "monospace", color: "var(--muted)", display: "block", marginBottom: 4 }}>
                                            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                        </time>
                                        <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--accent)" }}>
                                            {post.readingTime} min
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    )}

                </div>
            </main>
        </>
    );
}
