"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Github, Settings, Box, Hexagon, Swords, Key, Lock, Database, Server, Network, FileJson } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getOrCreateVisitorId } from "@/lib/visitorId";

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

    const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    // Pick a Lucide icon based on tool name
    const getIcon = (name: string) => {
        const n = name.toLowerCase();
        const p = { size: 18, strokeWidth: 1.5, color: "var(--accent)" };
        if (n.includes("docker")) return <Box {...p} />;
        if (n.includes("kubernetes")) return <Hexagon {...p} />;
        if (n.includes("github")) return <Github {...p} />;
        if (n.includes("jenkins")) return <Settings {...p} />;
        if (n.includes("ssh")) return <Key {...p} />;
        if (n.includes("https")) return <Lock {...p} />;
        if (n.includes("monolith")) return <Server {...p} />;
        if (n.includes("microservices") || n.includes("micro-services")) return <Network {...p} />;
        if (n.includes("postgres")) return <Database {...p} />;
        if (n.includes("mongo")) return <FileJson {...p} />;
        return <Swords {...p} />;
    };

    return (
        <>
            <Navbar />
            <main>
                <header className="page-head">
                    <div className="wrap">
                        <span className="cap"><span className="dot" style={{ color: "var(--accent)" }} />~/blog · $ cat /var/log/thoughts</span>
                        <h1>Blog</h1>
                        <p>Lessons from production failures, system design decisions, and DevOps war stories.</p>
                        <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                            <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>$ filter-posts --category=</span>
                            <div className="tabs" role="group" aria-label="Filter posts">
                                {(["all", "articles", "duels"] as const).map((tab) => (
                                    <button key={tab} onClick={() => setActiveTab(tab)} aria-pressed={activeTab === tab}>
                                        {tab === "all" ? "all" : tab === "articles" ? "articles" : "devops_duels"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="wrap" style={{ paddingBottom: 96 }}>
                    {/* DevOps Duels series */}
                    {seriesPosts.length > 0 && activeTab !== "articles" && (
                        <section style={{ paddingTop: 56 }} aria-labelledby="duels-heading">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
                                <div style={{ maxWidth: 620 }}>
                                    <div className="row-wrap" style={{ marginBottom: 12 }}>
                                        <span className="chip solid"><Swords size={12} /> new blog series</span>
                                    </div>
                                    <h2 id="duels-heading" className="section-title">DevOps <em>Duels</em></h2>
                                    <p className="section-lede" style={{ marginTop: 10 }}>
                                        DevOps is full of choices. Some are simple, some are powerful, and some... are just overkill.
                                    </p>
                                </div>
                            </div>

                            <div className="duel-grid">
                                {seriesPosts.map((post, index) => {
                                    const parts = post.title.split(":");
                                    const toolsPart = parts[0];
                                    const subtitle = parts.slice(1).join(":").trim() || post.hook;

                                    let toolA = toolsPart;
                                    let toolB = "";
                                    const vsMatch = toolsPart.match(/ vs\.? | VS | vs /i);
                                    if (vsMatch) {
                                        const split = toolsPart.split(vsMatch[0]);
                                        toolA = split[0].trim();
                                        toolB = split[1].trim();
                                    }

                                    const matchNum = String(seriesPosts.length - index).padStart(2, "0");

                                    return (
                                        <Link key={post.slug} href={`/blog/${post.slug}`} className="panel hover duel">
                                            <div className="panel-bar">
                                                <span className="title">matchup_{matchNum}.sh</span>
                                                <time dateTime={post.date}>{fmt(post.date)}</time>
                                            </div>
                                            {toolB ? (
                                                <div className="duel-vs">
                                                    <span className="side">{getIcon(toolA)}<span>{toolA}</span></span>
                                                    <span className="vs">vs</span>
                                                    <span className="side b"><span>{toolB}</span>{getIcon(toolB)}</span>
                                                </div>
                                            ) : (
                                                <h3 style={{ fontSize: 17, fontWeight: 650, padding: "20px 18px 0" }}>{post.title}</h3>
                                            )}
                                            <p>{subtitle}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* Standard posts */}
                    {activeTab !== "duels" && (
                        <section style={{ paddingTop: 56 }} aria-labelledby="articles-heading">
                            <h2 id="articles-heading" className="section-title" style={{ marginBottom: 24 }}>Articles</h2>
                            <div className="post-list">
                                {regularPosts.map((post) => (
                                    <Link key={post.slug} href={`/blog/${post.slug}`} className="post-row">
                                        <time className="post-date" dateTime={post.date}>{fmt(post.date)}</time>
                                        <div style={{ minWidth: 0 }}>
                                            <h3 className="post-title">{post.title}</h3>
                                            {post.hook && <p className="post-hook">&ldquo;{post.hook}&rdquo;</p>}
                                            <div className="post-tags">
                                                {post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
                                            </div>
                                        </div>
                                        <span className="post-meta">{post.readingTime} min</span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
