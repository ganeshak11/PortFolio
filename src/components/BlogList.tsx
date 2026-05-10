"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
    return (
        <>
            <Navbar />
            <main style={{ minHeight: "100vh", padding: "120px 24px 80px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <div style={{ marginBottom: 64 }}>
                    <p
                        style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            letterSpacing: "0.05em",
                            color: "var(--accent)",
                            marginBottom: 12,
                        }}
                    >
                        $ cat /var/log/thoughts
                    </p>
                    <h1
                        style={{
                            fontSize: "clamp(32px, 5vw, 56px)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--fg)",
                            marginBottom: 16,
                        }}
                    >
                        Blog
                    </h1>
                    <p style={{ color: "var(--fg-muted)", fontSize: 16, lineHeight: 1.6 }}>
                        Lessons from production failures, system design decisions, and DevOps war stories.
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            style={{
                                display: "block",
                                padding: "clamp(24px, 5vw, 32px)",
                                background: "var(--card-bg)",
                                border: "1px solid var(--border)",
                                borderRadius: 8,
                                transition: "border-color 0.2s, box-shadow 0.2s",
                                textDecoration: "none",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "var(--accent)";
                                e.currentTarget.style.boxShadow = "0 4px 20px rgba(var(--accent-rgb) / 0.15)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "var(--border)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <div style={{ marginBottom: 12 }}>
                                <time
                                    style={{
                                        fontFamily: "monospace",
                                        fontSize: 12,
                                        color: "var(--accent)",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </time>
                            </div>
                            <h2
                                style={{
                                    fontSize: "clamp(20px, 3vw, 28px)",
                                    fontWeight: 700,
                                    color: "var(--fg)",
                                    marginBottom: 12,
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                {post.title}
                            </h2>
                            <p
                                style={{
                                    color: "var(--fg-muted)",
                                    fontSize: 15,
                                    lineHeight: 1.6,
                                    marginBottom: 16,
                                }}
                            >
                                {post.excerpt}
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        style={{
                                            fontFamily: "monospace",
                                            fontSize: 11,
                                            padding: "4px 10px",
                                            background: "rgba(var(--accent-rgb) / 0.1)",
                                            color: "var(--accent)",
                                            borderRadius: 4,
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
        </>
    );
}
