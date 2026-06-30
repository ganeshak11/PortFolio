"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Github, Settings, Box, Hexagon, Swords } from "lucide-react";
import { Bangers, Permanent_Marker } from "next/font/google";
import { useEffect, useRef } from "react";
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
    const seriesPosts = posts.filter((p) => p.series === "DevOps Duels");
    const regularPosts = posts.filter((p) => p.series !== "DevOps Duels");

    const hasTrackedVisit = useRef(false);
    const maxScroll = useRef(0);
    const sessionStart = useRef(Date.now());

    useEffect(() => {
        if (!hasTrackedVisit.current) {
            hasTrackedVisit.current = true;
            const visitorId = getOrCreateVisitorId();
            
            const fortisUrl = process.env.NEXT_PUBLIC_FORTIS_URL || (process.env.NODE_ENV === 'production' ? 'https://analytics.ganeshangadi.online' : 'http://localhost:3000');
            if (fortisUrl) {
                const urlParams = new URLSearchParams(window.location.search);
                const utm = urlParams.get("utm_source") || urlParams.get("ref");
                const finalReferer = utm ? `utm_source:${utm}` : document.referrer;

                fetch(`${fortisUrl}/api/track`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ visitorId, path: "/blog", referer: finalReferer }),
                }).catch(() => {});
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
            const fortisUrl = process.env.NEXT_PUBLIC_FORTIS_URL || (process.env.NODE_ENV === 'production' ? 'https://analytics.ganeshangadi.online' : 'http://localhost:3000');
            
            if (fortisUrl && durationMs > 1000) { 
                fetch(`${fortisUrl}/api/track/update`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        visitorId, 
                        path: `/blog`, 
                        scrollDepth: maxScroll.current > 100 ? 100 : maxScroll.current, 
                        durationMs 
                    }),
                    keepalive: true
                }).catch(() => {});
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

                    {/* Premium DevOps Duels Series Section */}
                    {seriesPosts.length > 0 && (
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
                                        <br/><br/>
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

                                    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
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
                                                if (n.includes('docker')) return <Box size={24} strokeWidth={1.5} color="var(--accent)" />;
                                                if (n.includes('kubernetes')) return <Hexagon size={24} strokeWidth={1.5} color="var(--accent)" />;
                                                if (n.includes('github')) return <Github size={24} strokeWidth={1.5} color="var(--accent)" />;
                                                if (n.includes('jenkins')) return <Settings size={24} strokeWidth={1.5} color="var(--accent)" />;
                                                return <Swords size={24} strokeWidth={1.5} color="var(--accent)" />;
                                            };

                                            return (
                                            <Link
                                                key={post.slug}
                                                href={`/blog/${post.slug}`}
                                                style={{ display: "block", textDecoration: "none" }}
                                            >
                                                <div
                                                    style={{
                                                        background: "var(--bg)",
                                                        border: "1px solid color-mix(in srgb, var(--accent) 10%, var(--border))",
                                                        padding: "20px",
                                                        borderRadius: 16,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 16,
                                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                        boxShadow: "0 4px 12px color-mix(in srgb, var(--fg) 2%, transparent)",
                                                        position: "relative"
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        const t = e.currentTarget as HTMLDivElement;
                                                        t.style.borderColor = "var(--accent)";
                                                        t.style.transform = "translateY(-4px)";
                                                        t.style.boxShadow = "0 12px 24px color-mix(in srgb, var(--accent) 15%, transparent)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        const t = e.currentTarget as HTMLDivElement;
                                                        t.style.borderColor = "color-mix(in srgb, var(--accent) 10%, var(--border))";
                                                        t.style.transform = "translateY(0px)";
                                                        t.style.boxShadow = "0 4px 12px color-mix(in srgb, var(--fg) 2%, transparent)";
                                                    }}
                                                >
                                                    {/* Number Badge */}
                                                    <div style={{
                                                        position: "absolute",
                                                        top: -10,
                                                        left: -10,
                                                        width: 28,
                                                        height: 28,
                                                        borderRadius: 8,
                                                        background: "var(--accent)",
                                                        color: "var(--bg)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontWeight: 900,
                                                        fontSize: 14,
                                                        boxShadow: "0 4px 12px color-mix(in srgb, var(--accent) 40%, transparent)"
                                                    }}>
                                                        {seriesPosts.length - index}
                                                    </div>

                                                    {/* VS Layout */}
                                                    {toolB ? (
                                                        <div className="duel-vs-grid" style={{ 
                                                            display: "grid", 
                                                            gridTemplateColumns: "1fr auto 1fr", 
                                                            alignItems: "center", 
                                                            gap: 16,
                                                            padding: "12px 16px",
                                                            background: "color-mix(in srgb, var(--card-bg) 50%, transparent)",
                                                            borderRadius: 12,
                                                            border: "1px dashed color-mix(in srgb, var(--accent) 20%, transparent)"
                                                        }}>
                                                            {/* Tool A */}
                                                            <div className="duel-tool-a" style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-end" }}>
                                                                <span style={{ fontSize: "clamp(15px, 2.5vw, 18px)", fontWeight: 800, color: "var(--fg)", textAlign: "right" }}>{toolA}</span>
                                                                <div style={{ padding: 8, background: "color-mix(in srgb, var(--accent) 10%, transparent)", borderRadius: "50%", display: "flex", flexShrink: 0 }}>
                                                                    {getIcon(toolA)}
                                                                </div>
                                                            </div>
                                                            
                                                            {/* VS Badge */}
                                                            <div className="duel-vs-badge" style={{
                                                                width: 36,
                                                                height: 36,
                                                                borderRadius: "50%",
                                                                background: "var(--fg)",
                                                                color: "var(--bg)",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontSize: 13,
                                                                fontWeight: 900,
                                                                boxShadow: "0 4px 12px color-mix(in srgb, var(--fg) 20%, transparent)",
                                                                zIndex: 2,
                                                                flexShrink: 0
                                                            }}>VS</div>
                                                            
                                                            {/* Tool B */}
                                                            <div className="duel-tool-b" style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-start" }}>
                                                                <div style={{ padding: 8, background: "color-mix(in srgb, var(--accent) 10%, transparent)", borderRadius: "50%", display: "flex", flexShrink: 0 }}>
                                                                    {getIcon(toolB)}
                                                                </div>
                                                                <span style={{ fontSize: "clamp(15px, 2.5vw, 18px)", fontWeight: 800, color: "var(--fg)", textAlign: "left" }}>{toolB}</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <h3 style={{ fontSize: 19, fontWeight: 700, color: "var(--fg)", marginBottom: 6, letterSpacing: "-0.01em", paddingLeft: 16 }}>
                                                            {post.title}
                                                        </h3>
                                                    )}

                                                    {/* Subtitle & Meta */}
                                                    <div className="duel-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 8px", marginTop: 4 }}>
                                                        <p style={{ fontSize: 14, color: "var(--muted)", fontStyle: "italic", lineHeight: 1.5, flex: 1, paddingRight: 24 }}>
                                                            {subtitle}
                                                        </p>
                                                        <time style={{ fontSize: 12, fontFamily: "monospace", color: "var(--accent)", fontWeight: 600 }}>
                                                            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                        </time>
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

                </div>
            </main>
        </>
    );
}
