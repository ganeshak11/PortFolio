"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

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

    return (
        <>
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

                    {/* DevOps Duels Series Section */}
                    {seriesPosts.length > 0 && (
                        <div style={{ marginTop: 48, marginBottom: 64 }}>
                            <div style={{ 
                                padding: "32px", 
                                background: "var(--card-bg)", 
                                border: "1px solid var(--border)", 
                                borderTop: "4px solid var(--accent)",
                                position: "relative",
                                overflow: "hidden"
                            }}>
                                {/* Decorative VS Background */}
                                <div style={{
                                    position: "absolute",
                                    top: -40,
                                    right: -20,
                                    fontSize: 180,
                                    fontWeight: 900,
                                    color: "var(--fg)",
                                    opacity: 0.03,
                                    fontStyle: "italic",
                                    userSelect: "none",
                                    pointerEvents: "none"
                                }}>VS</div>
                                
                                <h2 style={{ fontSize: 24, fontWeight: 900, color: "var(--fg)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                                    ⚔️ DevOps Duels
                                </h2>
                                <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 32 }}>
                                    Weekly head-to-head architectural showdowns. No fluff, just trade-offs. 
                                    <br/><span style={{ color: "var(--accent)" }}>New duels drop every Sunday and Thursday.</span>
                                </p>
                                
                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    {seriesPosts.map((post) => (
                                        <Link
                                            key={post.slug}
                                            href={`/blog/${post.slug}`}
                                            style={{ display: "block", textDecoration: "none" }}
                                        >
                                            <div
                                                style={{
                                                    background: "var(--bg)",
                                                    border: "1px solid var(--border)",
                                                    padding: "20px 24px",
                                                    display: "grid",
                                                    gridTemplateColumns: "1fr auto",
                                                    gap: 16,
                                                    alignItems: "center",
                                                    transition: "all 0.2s ease"
                                                }}
                                                onMouseEnter={(e) => {
                                                    const t = e.currentTarget as HTMLDivElement;
                                                    t.style.borderColor = "var(--accent)";
                                                    t.style.transform = "translateX(4px)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    const t = e.currentTarget as HTMLDivElement;
                                                    t.style.borderColor = "var(--border)";
                                                    t.style.transform = "translateX(0px)";
                                                }}
                                            >
                                                <div>
                                                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg)", marginBottom: 4 }}>
                                                        {post.title}
                                                    </h3>
                                                    {post.hook && (
                                                        <p style={{ fontSize: 13, color: "var(--muted)", fontStyle: "italic" }}>
                                                            {post.hook}
                                                        </p>
                                                    )}
                                                </div>
                                                <div style={{ textAlign: "right", flexShrink: 0 }}>
                                                    <time style={{ fontSize: 11, fontFamily: "monospace", color: "var(--muted)", display: "block", marginBottom: 4 }}>
                                                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                    </time>
                                                    <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--accent)", background: "color-mix(in srgb, var(--accent) 15%, transparent)", padding: "2px 6px", borderRadius: 4 }}>
                                                        Duel
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
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
