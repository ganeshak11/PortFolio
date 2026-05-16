"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import BlogComments from "@/components/BlogComments";
import { useEffect, useState } from "react";

interface Post {
    title: string;
    date: string;
    tags: string[];
    content: string;
    slug: string;
}

function BlogNavbar() {
    const [visible, setVisible] = useState(true);
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        const handler = () => {
            const y = window.scrollY;
            setVisible(y < lastY || y < 80);
            setLastY(y);
        };
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, [lastY]);

    return (
        <header style={{
            position: "fixed",
            top: 0, left: 0, right: 0,
            zIndex: 50,
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
            transform: visible ? "translateY(0)" : "translateY(-100%)",
            transition: "transform 0.3s ease",
            padding: "0 24px",
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <Link href="/" style={{ fontSize: 12, fontFamily: "monospace", color: "var(--accent)", textDecoration: "none", letterSpacing: "0.05em" }}>
                ~/ganesh
            </Link>
            <Link href="/blog" style={{ fontSize: 12, fontFamily: "monospace", color: "var(--muted)", textDecoration: "none" }}>
                ← all posts
            </Link>
        </header>
    );
}

export default function BlogPostContent({ post, slug }: { post: Post; slug: string }) {
    return (
        <>
            <BlogNavbar />
            <main style={{ minHeight: "100vh", paddingTop: 80, paddingBottom: 120, paddingLeft: 24, paddingRight: 24 }}>
                <article style={{ maxWidth: 680, margin: "0 auto" }}>

                    {/* Header */}
                    <header style={{ marginBottom: 56 }}>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                            {post.tags.map(tag => (
                                <span key={tag} style={{ fontSize: 11, fontFamily: "monospace", color: "var(--muted)", letterSpacing: "0.05em" }}>
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <h1 style={{
                            fontSize: "clamp(26px, 4vw, 42px)",
                            fontWeight: 900,
                            letterSpacing: "-0.02em",
                            lineHeight: 1.15,
                            color: "var(--fg)",
                            marginBottom: 20,
                        }}>
                            {post.title}
                        </h1>

                        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 32, borderBottom: "1px solid var(--border)" }}>
                            <img
                                src="/profile.jpg"
                                alt="Ganesh Angadi"
                                style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)", flexShrink: 0 }}
                            />
                            <div>
                                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)", marginBottom: 2 }}>Ganesh Angadi</p>
                                <time style={{ fontSize: 11, color: "var(--muted)", fontFamily: "monospace" }}>
                                    {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                </time>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <div style={{ color: "var(--fg)", fontSize: 16, lineHeight: 1.85 }}>
                        <ReactMarkdown
                            components={{
                                h1: ({ children }) => (
                                    <h1 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, color: "var(--fg)", marginTop: 56, marginBottom: 16, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                                        {children}
                                    </h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 style={{ fontSize: "clamp(17px, 2.5vw, 22px)", fontWeight: 700, color: "var(--fg)", marginTop: 48, marginBottom: 14, lineHeight: 1.3 }}>
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--accent)", marginTop: 36, marginBottom: 12 }}>
                                        {children}
                                    </h3>
                                ),
                                p: ({ children }) => (
                                    <p style={{ marginBottom: 24, lineHeight: 1.85, color: "var(--fg)" }}>{children}</p>
                                ),
                                code: ({ className, children }) => {
                                    const isBlock = className?.includes("language-");
                                    return isBlock ? (
                                        <code style={{
                                            display: "block", fontFamily: "monospace", fontSize: 13,
                                            background: "var(--card-bg)", padding: "20px 24px",
                                            borderRadius: 6, overflowX: "auto", marginBottom: 24,
                                            marginTop: 8, color: "var(--accent-2)",
                                            border: "1px solid var(--border)",
                                        }}>
                                            {children}
                                        </code>
                                    ) : (
                                        <code style={{
                                            fontFamily: "monospace", fontSize: 13,
                                            background: "var(--card-bg)", color: "var(--accent)",
                                            padding: "2px 6px", borderRadius: 3,
                                        }}>
                                            {children}
                                        </code>
                                    );
                                },
                                ul: ({ children }) => (
                                    <ul style={{ marginBottom: 24, paddingLeft: 0, listStyle: "none" }}>{children}</ul>
                                ),
                                ol: ({ children }) => (
                                    <ol style={{ marginBottom: 24, paddingLeft: 20 }}>{children}</ol>
                                ),
                                li: ({ children }) => (
                                    <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative", lineHeight: 1.75 }}>
                                        <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>▸</span>
                                        {children}
                                    </li>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote style={{
                                        paddingLeft: 20, marginLeft: 0, marginBottom: 24,
                                        color: "var(--muted)", fontStyle: "italic",
                                        borderLeft: "2px solid var(--border)",
                                    }}>
                                        {children}
                                    </blockquote>
                                ),
                                hr: () => (
                                    <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "40px 0" }} />
                                ),
                                strong: ({ children }) => (
                                    <strong style={{ color: "var(--fg)", fontWeight: 700 }}>{children}</strong>
                                ),
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Closing signature */}
                    <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
                        <p style={{ fontSize: 13, color: "var(--muted)", fontFamily: "monospace" }}>— Ganesh Angadi</p>
                        <p style={{ fontSize: 11, color: "var(--muted)", fontFamily: "monospace", opacity: 0.5, marginTop: 4 }}>
                            DevOps Engineer · System Thinker
                        </p>
                    </div>

                </article>
            </main>

            {/* Comments — fully separated from article */}
            <section style={{ borderTop: "2px solid var(--border)", padding: "80px 24px 120px", background: "var(--card-bg)" }}>
                <div style={{ maxWidth: 680, margin: "0 auto" }}>
                    <BlogComments slug={slug} />
                </div>
            </section>
        </>
    );
}
