"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";

interface Post {
    title: string;
    date: string;
    tags: string[];
    content: string;
}

export default function BlogPostContent({ post }: { post: Post }) {
    return (
        <>
            <Navbar />
            <main style={{ minHeight: "100vh", padding: "120px 24px 80px", background: "var(--bg)" }}>
            <article style={{ maxWidth: 750, margin: "0 auto" }}>
                <Link
                    href="/blog"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontFamily: "monospace",
                        fontSize: 13,
                        color: "var(--accent)",
                        textDecoration: "none",
                        marginBottom: 40,
                        transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                    ← cd ../blog
                </Link>
                
                {/* Terminal-style header */}
                <div
                    style={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        padding: "clamp(24px, 5vw, 32px)",
                        marginBottom: 32,
                    }}
                >
                    <div style={{ marginBottom: 16, display: "flex", gap: 6, alignItems: "center" }}>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
                    </div>
                    <p
                        style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            color: "var(--accent)",
                            marginBottom: 8,
                        }}
                    >
                        ganesh@portfolio:~/blog$ cat {post.title.toLowerCase().replace(/\s+/g, "_")}.md
                    </p>
                    
                    {/* Author info with photo */}
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
                        <img
                            src="/profile.jpg"
                            alt="Ganesh Angadi"
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: "50%",
                                border: "2px solid var(--accent)",
                                objectFit: "cover",
                            }}
                        />
                        <div>
                            <p style={{ fontWeight: 600, color: "var(--fg)", fontSize: 15, marginBottom: 4 }}>Ganesh Angadi</p>
                            <time
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: 12,
                                    color: "var(--fg-muted)",
                                }}
                            >
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </div>
                    </div>
                    
                    <h1
                        style={{
                            fontSize: "clamp(24px, 4.5vw, 36px)",
                            fontWeight: 700,
                            letterSpacing: "-0.01em",
                            color: "var(--fg)",
                            marginBottom: 20,
                            lineHeight: 1.3,
                        }}
                    >
                        {post.title}
                    </h1>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: 11,
                                    padding: "4px 10px",
                                    background: "rgba(var(--accent-rgb) / 0.15)",
                                    color: "var(--accent)",
                                    borderRadius: 4,
                                    border: "1px solid rgba(var(--accent-rgb) / 0.3)",
                                }}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
                
                {/* Message-style content */}
                <div
                    style={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        padding: "clamp(28px, 5vw, 40px)",
                        borderLeft: "3px solid var(--accent)",
                    }}
                >
                    <div
                        className="blog-content"
                        style={{
                            color: "var(--fg)",
                            fontSize: 16,
                            lineHeight: 1.7,
                        }}
                    >
                        <ReactMarkdown
                            components={{
                                h1: ({ children }) => (
                                    <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--fg)", marginTop: 40, marginBottom: 16, borderBottom: "2px solid var(--border)", paddingBottom: 12 }}>
                                        {children}
                                    </h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--fg)", marginTop: 36, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                                        <span style={{ color: "var(--accent)", fontSize: 18 }}>▸</span>
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--accent)", marginTop: 28, marginBottom: 12 }}>
                                        {children}
                                    </h3>
                                ),
                                p: ({ children }) => (
                                    <p style={{ marginBottom: 18, lineHeight: 1.7, color: "var(--fg)" }}>{children}</p>
                                ),
                                code: ({ className, children }) => {
                                    const isBlock = className?.includes("language-");
                                    return isBlock ? (
                                        <code
                                            style={{
                                                display: "block",
                                                fontFamily: "monospace",
                                                fontSize: 14,
                                                background: "rgba(0,0,0,0.5)",
                                                padding: "20px",
                                                borderRadius: 6,
                                                overflowX: "auto",
                                                marginBottom: 20,
                                                border: "1px solid var(--border)",
                                                color: "#39ff14",
                                            }}
                                        >
                                            {children}
                                        </code>
                                    ) : (
                                        <code
                                            style={{
                                                fontFamily: "monospace",
                                                fontSize: 14,
                                                background: "rgba(var(--accent-rgb) / 0.15)",
                                                color: "var(--accent)",
                                                padding: "3px 8px",
                                                borderRadius: 4,
                                                border: "1px solid rgba(var(--accent-rgb) / 0.3)",
                                            }}
                                        >
                                            {children}
                                        </code>
                                    );
                                },
                                ul: ({ children }) => (
                                    <ul style={{ marginBottom: 20, paddingLeft: 24, listStyle: "none" }}>
                                        {children}
                                    </ul>
                                ),
                                ol: ({ children }) => (
                                    <ol style={{ marginBottom: 20, paddingLeft: 24 }}>{children}</ol>
                                ),
                                li: ({ children }) => (
                                    <li style={{ marginBottom: 10, position: "relative", paddingLeft: 20 }}>
                                        <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>•</span>
                                        {children}
                                    </li>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote
                                        style={{
                                            borderLeft: "3px solid var(--accent)",
                                            paddingLeft: 20,
                                            marginLeft: 0,
                                            marginBottom: 20,
                                            fontStyle: "italic",
                                            color: "var(--fg-muted)",
                                            background: "rgba(var(--accent-rgb) / 0.05)",
                                            padding: "16px 20px",
                                            borderRadius: 4,
                                        }}
                                    >
                                        {children}
                                    </blockquote>
                                ),
                                hr: () => (
                                    <hr
                                        style={{
                                            border: "none",
                                            borderTop: "1px dashed var(--border)",
                                            margin: "32px 0",
                                        }}
                                    />
                                ),
                                strong: ({ children }) => (
                                    <strong style={{ color: "var(--accent)", fontWeight: 700 }}>{children}</strong>
                                ),
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* Footer signature */}
                <div
                    style={{
                        marginTop: 32,
                        padding: "20px",
                        fontFamily: "monospace",
                        fontSize: 13,
                        color: "var(--fg-muted)",
                        borderTop: "1px dashed var(--border)",
                    }}
                >
                    <p style={{ margin: 0 }}>— Ganesh</p>
                    <p style={{ margin: "4px 0 0 0", fontSize: 11 }}>DevOps Engineer | System Thinker</p>
                </div>
            </article>
        </main>
        </>
    );
}
