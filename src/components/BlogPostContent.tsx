"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogComments from "@/components/BlogComments";
import { useEffect, useRef, useState } from "react";
import { Copy, Check, ArrowUp, Share2, ArrowLeft, Eye } from "lucide-react";

interface Post {
    title: string;
    date: string;
    tags: string[];
    content: string;
    slug: string;
    readingTime?: number;
    hook?: string;
}

function CodeBlock({ children, className }: { children: React.ReactNode; className?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        let textToCopy = "";
        if (typeof children === "string") {
            textToCopy = children;
        } else if (Array.isArray(children)) {
            textToCopy = children.join("");
        } else {
            textToCopy = String(children);
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy);
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            document.body.removeChild(textArea);
        }

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass-card" style={{
            marginBottom: 32, marginTop: 16, borderRadius: 12, overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", position: "relative"
        }}>
            <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 16px", background: "rgba(0,0,0,0.2)", borderBottom: "1px solid var(--glass-border)"
            }}>
                <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
                </div>
                <button
                    onClick={handleCopy}
                    style={{
                        background: "transparent", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: copied ? "var(--status-ok)" : "var(--muted)",
                        transition: "color 0.2s"
                    }}
                    title="Copy code"
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
            </div>
            <code style={{
                display: "block", fontFamily: "monospace", fontSize: 14,
                padding: "20px 24px", overflowX: "auto",
                color: "var(--accent-2)", lineHeight: 1.6
            }}>
                {children}
            </code>
        </div>
    );
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
            background: "color-mix(in srgb, var(--bg) 70%, transparent)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--glass-border)",
            transform: visible ? "translateY(0)" : "translateY(-100%)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            padding: "0 24px",
            height: 54,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}>
            <Link href="/" className="btn-slide" style={{ fontSize: 13, fontFamily: "monospace", textDecoration: "none", letterSpacing: "0.05em", padding: "4px 8px", borderRadius: "4px" }}>
                ~/ganesh
            </Link>
            <Link href="/blog" className="nav-underline" style={{ fontSize: 13, fontFamily: "monospace", color: "var(--muted)", textDecoration: "none" }}>
                ← all posts
            </Link>
        </header>
    );
}

const SURVIVAL_MESSAGES = [
    { title: "You made it to the end! 🎉", body: "Hey, you survived this long—drop your name in the comments below and let me know who made it till the end!" },
    { title: "Achievement Unlocked: Attention Span! 🏆", body: "You actually read the whole thing! Prove you're not a bot by dropping your name in the comments." },
    { title: "Still here? 👀", body: "Most people left after the first paragraph. You are special. Leave a comment so I can frame it!" },
    { title: "Wow, you have a lot of free time! ⏳", body: "Just kidding (mostly). Thanks for sticking around! Drop your name below so I know who my real fans are." },
    { title: "Plot Twist: You finished it! 🍿", body: "I didn't actually expect anyone to read this far. Leave a comment to claim your imaginary gold star! ⭐" },
    { title: "Error 404: Attention Not Lost 🤖", body: "Wait, you didn't just skim the headings? Drop your name in the comments—I need to verify this miracle." },
    { title: "Level Complete! 🎮", body: "You survived the wall of text. Drop your name below to save your progress." },
    { title: "Are you lost? 🗺️", body: "Because you've reached the absolute bottom of this post. Since you're here, why not leave a comment?" },
    { title: "Bravo! 👏", body: "You read faster than I can write. Drop your name below and let me know what you thought!" },
    { title: "The End of the Line 🚂", body: "No more words. Only the comment section awaits. Be brave, drop your name below!" },
    { title: "You win absolutely nothing! 🎁", body: "Except for my eternal gratitude. Drop a comment to claim it!" },
    { title: "A wild reader appeared! 👾", body: "Use 'Leave a Comment'. It's super effective!" },
    { title: "Coffee's empty, post is done ☕", body: "Since we both made it this far, introduce yourself in the comments!" }
];

const REACTIONS = [
    { id: 'useful', emoji: '👍', label: 'Useful' },
    { id: 'think', emoji: '🤔', label: 'Made me think' },
    { id: 'loved', emoji: '🔥', label: 'Loved it' }
];

export default function BlogPostContent({ post, slug }: { post: Post; slug: string }) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [views, setViews] = useState<number | null>(null);
    const [survivalMessage, setSurvivalMessage] = useState<{title: string, body: string} | null>(null);
    const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
    const [isAnimatingReaction, setIsAnimatingReaction] = useState<string | null>(null);

    const handleReaction = async (id: string) => {
        if (selectedReaction) return; // Prevent spamming
        setSelectedReaction(id);
        setIsAnimatingReaction(id);
        setTimeout(() => setIsAnimatingReaction(null), 300);

        // Record the reaction as a 'like' in Supabase
        try {
            await fetch(`/api/likes/${slug}`, { method: "POST" });
        } catch (err) {
            console.error("Failed to record reaction", err);
        }
    };

    const hasTrackedView = useRef(false);

    useEffect(() => {
        // Pick a random survival message after mount to prevent hydration mismatch
        setSurvivalMessage(SURVIVAL_MESSAGES[Math.floor(Math.random() * SURVIVAL_MESSAGES.length)]);
        
        // Record and fetch views — guard prevents double-fire from React Strict Mode
        if (!hasTrackedView.current) {
            hasTrackedView.current = true;
            const recordView = async () => {
                try {
                    const res = await fetch(`/api/views/${slug}`, { method: "POST" });
                    const data = await res.json();
                    if (data.count !== undefined) {
                        setViews(data.count);
                    }
                } catch (err) {
                    console.error("Failed to track view", err);
                }
            };
            recordView();
        }

        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / (windowHeight || 1)}`;
            setScrollProgress(Number(scroll));
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Scroll Progress Bar */}
            <div style={{
                position: "fixed",
                top: 0, left: 0, right: 0,
                height: 3,
                background: "transparent",
                zIndex: 100,
                pointerEvents: "none"
            }}>
                <div style={{
                    height: "100%",
                    width: `${scrollProgress * 100}%`,
                    background: "var(--accent)",
                    transition: "width 0.1s ease-out",
                    boxShadow: "0 0 10px var(--accent)"
                }} />
            </div>

            <BlogNavbar />
            <main style={{ minHeight: "100vh", paddingTop: 80, paddingBottom: 120, paddingLeft: 24, paddingRight: 24 }}>
                <article style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
                    {/* Glowing Orb Background */}
                    <div style={{
                        position: "absolute",
                        top: -100, left: "50%",
                        transform: "translateX(-50%)",
                        width: "100%", height: 300,
                        background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)",
                        opacity: 0.08,
                        filter: "blur(60px)",
                        pointerEvents: "none",
                        zIndex: -1
                    }} />

                    {/* Header */}
                    <header style={{ marginBottom: 56, position: "relative", zIndex: 1 }}>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                            {post.tags.map(tag => (
                                <span key={tag} className="glass-card" style={{
                                    fontSize: 12, fontFamily: "monospace", color: "var(--accent)",
                                    padding: "4px 12px", borderRadius: 20, letterSpacing: "0.05em",
                                    border: "1px solid var(--glass-border)",
                                }}>
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <h1 style={{
                            fontSize: "clamp(32px, 5vw, 48px)",
                            fontWeight: 900,
                            letterSpacing: "-0.03em",
                            lineHeight: 1.15,
                            background: "linear-gradient(135deg, var(--fg) 0%, var(--muted) 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            marginBottom: 28,
                        }}>
                            {post.title}
                        </h1>

                        <div className="glass-card" style={{
                            display: "flex", alignItems: "center", gap: 16,
                            padding: "16px 20px", borderRadius: 12,
                            border: "1px solid var(--glass-border)",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        }}>
                            <img
                                src="/profile.jpg"
                                alt="Ganesh Angadi"
                                style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent)", flexShrink: 0 }}
                            />
                            <div>
                                <p style={{ fontSize: 14, fontWeight: 700, color: "var(--fg)", marginBottom: 2, display: "flex", alignItems: "center", gap: 6 }}>
                                    Ganesh Angadi
                                    <span style={{ fontSize: 10, padding: "2px 6px", background: "var(--accent)", color: "var(--bg)", borderRadius: 10, fontWeight: 800 }}>DEV</span>
                                </p>
                                <time style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--muted)", fontFamily: "monospace" }}>
                                    <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                                    <span>•</span>
                                    <span>{post.readingTime} min read</span>
                                    {views !== null && (
                                        <>
                                            <span>•</span>
                                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                <Eye size={12} /> {views.toLocaleString()} views
                                            </span>
                                        </>
                                    )}
                                </time>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <div style={{ color: "var(--fg)", fontSize: 16, lineHeight: 1.85 }}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                img: ({ src, alt }) => {
                                    let cleanSrc = typeof src === "string" ? src : "";
                                    if (cleanSrc.startsWith("/public/")) {
                                        cleanSrc = cleanSrc.substring(7);
                                    } else if (cleanSrc.startsWith("public/")) {
                                        cleanSrc = "/" + cleanSrc.substring(7);
                                    } else if (!cleanSrc.startsWith("/") && !cleanSrc.startsWith("http")) {
                                        cleanSrc = "/" + cleanSrc;
                                    }
                                    return (
                                        <img
                                            src={cleanSrc}
                                            alt={alt}
                                            className="glass-card"
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                borderRadius: 12,
                                                margin: "40px 0",
                                                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                            }}
                                            onMouseOver={(e) => {
                                                (e.target as HTMLImageElement).style.transform = "translateY(-4px)";
                                                (e.target as HTMLImageElement).style.boxShadow = "0 12px 40px rgba(0, 229, 255, 0.15)";
                                            }}
                                            onMouseOut={(e) => {
                                                (e.target as HTMLImageElement).style.transform = "translateY(0)";
                                                (e.target as HTMLImageElement).style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.2)";
                                            }}
                                        />
                                    );
                                },
                                h1: ({ children }) => (
                                    <h1 style={{ fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "var(--fg)", marginTop: 64, marginBottom: 20, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                                        {children}
                                    </h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 style={{
                                        fontSize: "clamp(18px, 2.8vw, 24px)", fontWeight: 800,
                                        color: "var(--fg)", marginTop: 56, marginBottom: 16, lineHeight: 1.3,
                                        display: "inline-block", position: "relative"
                                    }}>
                                        {children}
                                        <div style={{ position: "absolute", bottom: -4, left: 0, width: "40%", height: 3, background: "var(--accent)", borderRadius: 2 }} />
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg)", marginTop: 40, marginBottom: 16 }}>
                                        {children}
                                    </h3>
                                ),
                                p: ({ children }) => (
                                    <p style={{ marginBottom: 24, lineHeight: 1.85, color: "var(--fg)", fontSize: 17, opacity: 0.9 }}>{children}</p>
                                ),
                                code: ({ className, children }) => {
                                    const isBlock = className?.includes("language-");
                                    return isBlock ? (
                                        <CodeBlock className={className}>{children}</CodeBlock>
                                    ) : (
                                        <code style={{
                                            fontFamily: "monospace", fontSize: 14,
                                            background: "var(--glass-border)", color: "var(--accent)",
                                            padding: "2px 8px", borderRadius: 6, border: "1px solid var(--glass-border)"
                                        }}>
                                            {children}
                                        </code>
                                    );
                                },
                                ul: ({ children }) => (
                                    <ul style={{ marginBottom: 28, paddingLeft: 0, listStyle: "none" }}>{children}</ul>
                                ),
                                ol: ({ children }) => (
                                    <ol style={{ marginBottom: 28, paddingLeft: 24, color: "var(--fg)", fontSize: 17, lineHeight: 1.85 }}>{children}</ol>
                                ),
                                li: ({ children }) => (
                                    <li style={{ marginBottom: 12, paddingLeft: 24, position: "relative", lineHeight: 1.85, fontSize: 17, opacity: 0.9 }}>
                                        <span style={{ position: "absolute", left: 0, color: "var(--accent)", fontWeight: "bold" }}>▹</span>
                                        {children}
                                    </li>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="glass-card" style={{
                                        padding: "20px 24px", margin: "32px 0", borderRadius: 8,
                                        color: "var(--fg)", fontStyle: "italic", fontSize: 18,
                                        borderLeft: "4px solid var(--accent)",
                                        position: "relative",
                                        overflow: "hidden"
                                    }}>
                                        <span style={{
                                            position: "absolute", top: -10, left: 10,
                                            color: "var(--accent)", fontSize: 80,
                                            opacity: 0.1, fontFamily: "serif",
                                            pointerEvents: "none", lineHeight: 1
                                        }}>
                                            "
                                        </span>
                                        <div style={{ position: "relative", zIndex: 1 }}>
                                            {children}
                                        </div>
                                    </blockquote>
                                ),
                                hr: () => (
                                    <div style={{ margin: "56px 0", display: "flex", justifyContent: "center", gap: 12, opacity: 0.5 }}>
                                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                                    </div>
                                ),
                                strong: ({ children }) => (
                                    <strong style={{ color: "var(--accent)", fontWeight: 700 }}>{children}</strong>
                                ),
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Survival Sign-off */}
                    {survivalMessage && (
                        <div className="glass-card" style={{
                            marginTop: 64,
                            padding: "24px 32px",
                            borderRadius: 16,
                            border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
                            background: "color-mix(in srgb, var(--accent) 5%, transparent)",
                            textAlign: "center",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)"
                        }}>
                            <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--fg)", marginBottom: 8 }}>
                                {survivalMessage.title}
                            </h3>
                            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.6, margin: 0, marginBottom: 24 }}>
                                {survivalMessage.body}
                            </p>

                            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                                {REACTIONS.map(r => (
                                    <button
                                        key={r.id}
                                        onClick={() => handleReaction(r.id)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            padding: '8px 16px',
                                            borderRadius: 24,
                                            border: `1px solid ${selectedReaction === r.id ? 'var(--accent)' : 'var(--glass-border)'}`,
                                            background: selectedReaction === r.id ? 'color-mix(in srgb, var(--accent) 20%, transparent)' : 'transparent',
                                            color: selectedReaction === r.id ? 'var(--accent)' : 'var(--fg)',
                                            cursor: 'pointer',
                                            fontWeight: 600,
                                            fontSize: 15,
                                            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                            transform: isAnimatingReaction === r.id ? 'scale(0.9)' : (selectedReaction === r.id ? 'scale(1.05)' : 'scale(1)'),
                                        }}
                                        onMouseOver={(e) => {
                                            if (selectedReaction !== r.id) {
                                                e.currentTarget.style.background = 'color-mix(in srgb, var(--accent) 10%, transparent)';
                                                e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 50%, transparent)';
                                            }
                                        }}
                                        onMouseOut={(e) => {
                                            if (selectedReaction !== r.id) {
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.borderColor = 'var(--glass-border)';
                                            }
                                        }}
                                    >
                                        <span style={{ fontSize: 18 }}>{r.emoji}</span>
                                        {r.label}
                                    </button>
                                ))}
                            </div>
                            <div style={{
                                marginTop: selectedReaction ? 16 : 0,
                                height: selectedReaction ? 20 : 0,
                                opacity: selectedReaction ? 1 : 0,
                                overflow: 'hidden',
                                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                color: "var(--accent)", 
                                fontSize: 14, 
                                fontWeight: 600
                            }}>
                                Thanks for your feedback! ✨
                            </div>
                        </div>
                    )}

                    {/* Footer Section */}
                    <footer style={{ marginTop: 80, borderTop: "1px solid var(--border)", paddingTop: 40, paddingBottom: 40 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
                            <Link href="/blog" style={{
                                display: "flex", alignItems: "center", gap: 8,
                                textDecoration: "none", color: "var(--fg)", fontWeight: 600
                            }}>
                                <ArrowLeft size={16} /> Back to all posts
                            </Link>
                            <button
                                onClick={() => {
                                    const url = window.location.href;
                                    if (navigator.clipboard && window.isSecureContext) {
                                        navigator.clipboard.writeText(url);
                                    } else {
                                        const textArea = document.createElement("textarea");
                                        textArea.value = url;
                                        textArea.style.position = "fixed";
                                        textArea.style.left = "-999999px";
                                        textArea.style.top = "-999999px";
                                        document.body.appendChild(textArea);
                                        textArea.focus();
                                        textArea.select();
                                        try {
                                            document.execCommand('copy');
                                        } catch (err) {
                                            console.error('Fallback: Oops, unable to copy', err);
                                        }
                                        document.body.removeChild(textArea);
                                    }
                                    alert("Link copied to clipboard!");
                                }}
                                className="glass-card"
                                style={{
                                    display: "flex", alignItems: "center", gap: 8,
                                    padding: "8px 16px", borderRadius: 20, border: "1px solid var(--glass-border)",
                                    background: "transparent", color: "var(--accent)", cursor: "pointer",
                                    fontFamily: "inherit", fontSize: 14, fontWeight: 600
                                }}
                            >
                                <Share2 size={16} /> Share Post
                            </button>
                        </div>
                    </footer>
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
