"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import Link from "next/link";

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

export default function LatestBlogs({ posts }: { posts: BlogPost[] }) {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    // Get the 3 most recent posts
    const latestPosts = [...posts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    return (
        <section ref={ref} id="latest-blogs" className="section-pad" style={{ padding: "100px 24px" }}>
            <div style={{ maxWidth: 1536, margin: "0 auto" }}>
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 48 }}
                >
                    <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 12 }}>
                        $ cat /var/log/latest_entries
                    </p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                        Recent Articles
                    </h2>
                </m.div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
                    {latestPosts.map((post, idx) => (
                        <m.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 * idx, duration: 0.5 }}
                        >
                            <Link
                                href={`/blog/${post.slug}`}
                                style={{ display: "block", textDecoration: "none", color: "inherit" }}
                            >
                                <div
                                    className="glass-card"
                                    style={{
                                        padding: "20px 24px",
                                        borderRadius: 12,
                                        border: "1px solid var(--border)",
                                        background: "var(--card-bg)",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: 16,
                                        transition: "all 0.2s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        const card = e.currentTarget as HTMLDivElement;
                                        card.style.borderColor = "var(--accent)";
                                        const h3 = card.querySelector("h3");
                                        if (h3) h3.style.color = "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        const card = e.currentTarget as HTMLDivElement;
                                        card.style.borderColor = "var(--border)";
                                        const h3 = card.querySelector("h3");
                                        if (h3) h3.style.color = "var(--fg)";
                                    }}
                                >
                                    <div style={{ flex: 1, minWidth: 260 }}>
                                        <time style={{ fontFamily: "monospace", fontSize: 11, color: "var(--muted)", display: "block", marginBottom: 6 }}>
                                            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                        </time>
                                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--fg)", transition: "color 0.2s ease" }}>
                                            {post.title}
                                        </h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        {post.series && (
                                            <span style={{
                                                fontSize: 10,
                                                fontFamily: "monospace",
                                                color: "var(--accent)",
                                                border: "1px solid var(--accent)",
                                                padding: "2px 8px",
                                                borderRadius: 4
                                            }}>
                                                {post.series}
                                            </span>
                                        )}
                                        <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--muted)" }}>
                                            {post.readingTime} min read
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </m.div>
                    ))}
                </div>

                {/* Footer Link */}
                <m.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    <Link
                        href="/blog"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            fontFamily: "monospace",
                            fontSize: 14,
                            color: "var(--accent)",
                            textDecoration: "none",
                            fontWeight: 700
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.textDecoration = "underline";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.textDecoration = "none";
                        }}
                    >
                        <span>$ cd /blog</span>
                        <span>→</span>
                    </Link>
                </m.div>
            </div>
        </section>
    );
}
