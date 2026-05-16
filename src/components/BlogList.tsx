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
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
    const [featured, ...rest] = posts;

    return (
        <>
            <Navbar />
            <main style={{ minHeight: "100vh", padding: "120px 24px 80px" }}>
                <div style={{ maxWidth: 860, margin: "0 auto" }}>

                    {/* Header */}
                    <div style={{ marginBottom: 56 }}>
                        <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 12 }}>
                            $ cat /var/log/thoughts
                        </p>
                        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--fg)", marginBottom: 12, lineHeight: 1.0 }}>
                            Blog
                        </h1>
                        <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, maxWidth: 480 }}>
                            Lessons from production failures, system design decisions, and DevOps war stories.
                        </p>
                    </div>

                    {/* Featured post */}
                    {featured && (
                        <Link
                            href={`/blog/${featured.slug}`}
                            style={{ display: "block", textDecoration: "none", marginBottom: 16 }}
                        >
                            <div
                                className="blog-featured-card"
                                style={{
                                    padding: "36px",
                                    background: "var(--card-bg)",
                                    border: "1px solid var(--accent)",
                                    borderRadius: 8,
                                    transition: "background 0.2s",
                                }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--bg)"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--card-bg)"; }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                                    <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em", background: "var(--accent)", color: "var(--bg)", padding: "3px 10px", borderRadius: 999 }}>
                                        FEATURED
                                    </span>
                                    <time style={{ fontSize: 11, fontFamily: "monospace", color: "var(--muted)" }}>
                                        {new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                    </time>
                                    <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--muted)" }}>
                                        {featured.readingTime} min read
                                    </span>
                                </div>

                                <h2 style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)", marginBottom: 12, lineHeight: 1.2 }}>
                                    {featured.title}
                                </h2>

                                {featured.hook && (
                                    <p style={{ fontSize: 15, color: "var(--accent)", fontStyle: "italic", marginBottom: 16, lineHeight: 1.6 }}>
                                        "{featured.hook}"
                                    </p>
                                )}

                                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, marginBottom: 20, maxWidth: 560 }}>
                                    {featured.excerpt}
                                </p>

                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    {featured.tags.map(tag => (
                                        <span key={tag} style={{ fontSize: 10, fontFamily: "monospace", color: "var(--muted)", letterSpacing: "0.05em" }}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Rest of posts */}
                    <div style={{ borderTop: "1px solid var(--border)" }}>
                        {rest.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                style={{ display: "block", textDecoration: "none", color: "var(--fg)" }}
                            >
                                <div
                                    className="blog-post-row"
                                    style={{
                                        padding: "20px 0",
                                        borderBottom: "1px solid var(--border)",
                                        display: "grid",
                                        gridTemplateColumns: "1fr auto",
                                        gap: 24,
                                        alignItems: "start",
                                        transition: "color 0.2s",
                                    }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.color = "var(--accent)"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.color = "var(--fg)"; }}
                                >
                                    <div>
                                        <h2 style={{ fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 6, lineHeight: 1.3 }}>
                                            {post.title}
                                        </h2>
                                        {post.hook && (
                                            <p style={{ fontSize: 12, color: "var(--muted)", fontStyle: "italic", marginBottom: 8 }}>
                                                "{post.hook}"
                                            </p>
                                        )}
                                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                                            {post.tags.map(tag => (
                                                <span key={tag} style={{ fontSize: 10, fontFamily: "monospace", color: "var(--muted)" }}>#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="blog-post-meta" style={{ textAlign: "right", flexShrink: 0 }}>
                                        <time style={{ fontSize: 11, fontFamily: "monospace", color: "var(--muted)", display: "block", marginBottom: 4 }}>
                                            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                        </time>
                                        <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--muted)" }}>
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
