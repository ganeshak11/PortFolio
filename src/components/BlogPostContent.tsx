"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogComments from "@/components/BlogComments";
import { useEffect, useRef, useState, useMemo } from "react";
import { Copy, Check, ArrowUp, Share2, ArrowLeft, Eye, Sun, Moon } from "lucide-react";
import { getOrCreateVisitorId } from "@/lib/visitorId";
import { useTheme } from "@/components/ThemeProvider";
import katex from "katex";
import "katex/dist/katex.min.css";

interface Post {
    title: string;
    date: string;
    tags: string[];
    content: string;
    slug: string;
    readingTime?: number;
    hook?: string;
    author?: string;
}

function MathEquation({ math, displayMode = false }: { math: string; displayMode?: boolean }) {
    const html = useMemo(() => {
        try {
            return katex.renderToString(math.trim(), {
                displayMode,
                throwOnError: false,
            });
        } catch (e) {
            console.error("KaTeX render error:", e);
            return null;
        }
    }, [math, displayMode]);

    if (!html) {
        return <code style={{ fontFamily: "monospace" }}>{math}</code>;
    }

    if (displayMode) {
        return (
            <div
                className="math-display-card"
                style={{
                    margin: "28px auto",
                    maxWidth: "540px",
                    width: "100%",
                    padding: "24px 28px",
                    borderRadius: "14px",
                    background: "color-mix(in srgb, var(--card-bg) 80%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--accent) 30%, var(--border))",
                    boxShadow: "0 8px 30px -6px rgba(0, 0, 0, 0.08)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflowX: "auto",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 14,
                        fontSize: "9.5px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        color: "var(--accent)",
                        opacity: 0.85,
                        userSelect: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                    }}
                >
                    <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                    Blackboard Formula
                </div>
                <div
                    style={{
                        fontSize: "1.6rem",
                        color: "var(--fg)",
                        paddingTop: 12,
                        paddingBottom: 4,
                        letterSpacing: "0.02em",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        );
    }

    return (
        <span
            style={{
                fontSize: "1.08em",
                color: "var(--fg)",
                padding: "0 3px",
                display: "inline-block",
                verticalAlign: "baseline",
            }}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

function extractMathBlock(children: React.ReactNode): string | null {
    if (typeof children === "string") {
        const trimmed = children.trim();
        if (trimmed.startsWith("$$") && trimmed.endsWith("$$") && trimmed.length >= 4) {
            return trimmed.slice(2, -2).trim();
        }
    }
    if (Array.isArray(children)) {
        if (children.length === 1 && typeof children[0] === "string") {
            const trimmed = children[0].trim();
            if (trimmed.startsWith("$$") && trimmed.endsWith("$$") && trimmed.length >= 4) {
                return trimmed.slice(2, -2).trim();
            }
        }
        const allStrings = children.every(c => typeof c === "string");
        if (allStrings) {
            const joined = children.join("").trim();
            if (joined.startsWith("$$") && joined.endsWith("$$") && joined.length >= 4) {
                return joined.slice(2, -2).trim();
            }
        }
    }
    return null;
}

function renderFormattedStoryText(text: string): React.ReactNode[] {
    const tokenRegex = /(\$\$[\s\S]+?\$\$|\$(?:\\.|[^\$\n])+\$|["“][^"”\n]+["”])/g;
    const parts = text.split(tokenRegex);
    return parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith("$$") && part.endsWith("$$") && part.length >= 4) {
            return <MathEquation key={i} math={part.slice(2, -2)} displayMode={true} />;
        }
        if (part.startsWith("$") && part.endsWith("$") && part.length >= 2 && !part.startsWith("$$")) {
            return <MathEquation key={i} math={part.slice(1, -1)} displayMode={false} />;
        }
        if (part.startsWith('"') || part.startsWith('“')) {
            return (
                <span
                    key={i}
                    style={{
                        color: "var(--story-dialogue)",
                        fontWeight: 600,
                        letterSpacing: "0.008em",
                    }}
                >
                    {part}
                </span>
            );
        }
        return part;
    });
}

function processStoryNodes(children: React.ReactNode): React.ReactNode {
    if (typeof children === "string") {
        return renderFormattedStoryText(children);
    }
    if (Array.isArray(children)) {
        return children.map((child, idx) => {
            if (typeof child === "string") {
                return <span key={idx}>{renderFormattedStoryText(child)}</span>;
            }
            return child;
        });
    }
    return children;
}

function isDialogueStart(children: React.ReactNode): boolean {
    if (typeof children === "string") {
        const trimmed = children.trim();
        return trimmed.startsWith('"') || trimmed.startsWith('“');
    }
    if (Array.isArray(children) && children.length > 0) {
        const first = children[0];
        if (typeof first === "string") {
            const trimmed = first.trim();
            return trimmed.startsWith('"') || trimmed.startsWith('“');
        }
    }
    return false;
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
        <div style={{
            marginBottom: 32, marginTop: 16, borderRadius: 8, overflow: "hidden",
            border: "1px solid var(--border)",
            background: "var(--card-bg)",
            position: "relative",
            transition: "all 0.2s ease"
        }}>
            <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 16px",
                background: "color-mix(in srgb, var(--fg) 5%, transparent)",
                borderBottom: "1px solid var(--border)"
            }}>
                <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f56" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27c93f" }} />
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
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                </button>
            </div>
            <code style={{
                display: "block",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 13.5,
                padding: "16px 20px",
                overflowX: "auto",
                color: "var(--fg)",
                lineHeight: 1.6
            }}>
                {children}
            </code>
        </div>
    );
}

function ClientIpBadge() {
    const [ip, setIp] = useState("detecting...");
    useEffect(() => {
        // Cloudflare's trace API is extremely fast and rarely blocked by adblockers
        fetch("https://1.1.1.1/cdn-cgi/trace")
            .then(res => res.text())
            .then(data => {
                const ipLine = data.split('\n').find(line => line.startsWith('ip='));
                if (ipLine) {
                    setIp(ipLine.split('=')[1]);
                } else {
                    setIp("your actual IP");
                }
            })
            .catch(() => setIp("your actual IP"));
    }, []);

    return (
        <code style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 13.5,
            background: "color-mix(in srgb, #ff4757 15%, transparent)",
            color: "#ff4757",
            padding: "2px 6px",
            borderRadius: 4,
            border: "1px solid color-mix(in srgb, #ff4757 30%, transparent)",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            opacity: ip === "detecting..." ? 0.7 : 1
        }}>
            {ip}
        </code>
    );
}

function BrowserDataReveal() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const getGPU = () => {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
                if (gl) {
                    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    if (debugInfo) {
                        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                        // Clean up generic/long strings for better display
                        return renderer.replace(/ANGLE \(|\)|Direct3D.*|vs_.*|ps_.*/g, '').trim() || 'Hidden';
                    }
                }
                return 'Hidden/Blocked';
            } catch (e) {
                return 'Hidden/Blocked';
            }
        };

        const parseBrowser = (ua: string) => {
            if (ua.includes("Firefox/")) return "Firefox " + ua.split("Firefox/")[1].split(" ")[0];
            if (ua.includes("Edg/")) return "Edge " + ua.split("Edg/")[1].split(" ")[0];
            if (ua.includes("Chrome/")) return "Chrome " + ua.split("Chrome/")[1].split(".")[0];
            if (ua.includes("Safari/") && !ua.includes("Chrome")) return "Safari " + (ua.includes("Version/") ? ua.split("Version/")[1].split(" ")[0] : "");
            return "Unknown Browser";
        };

        const parseOS = (ua: string) => {
            if (ua.includes('Android')) return 'Android';
            if (ua.includes('like Mac')) return 'iOS';
            if (ua.includes('Win')) return 'Windows';
            if (ua.includes('Mac')) return 'MacOS';
            if (ua.includes('Linux')) return 'Linux';
            return 'Unknown OS';
        };

        const gatherData = async () => {
            const nav = navigator as any;
            let publicIp = "Fetching...";
            try {
                const res = await fetch("https://1.1.1.1/cdn-cgi/trace");
                const text = await res.text();
                const ipLine = text.split('\n').find(line => line.startsWith('ip='));
                if (ipLine) publicIp = ipLine.split('=')[1];
            } catch (e) {
                publicIp = "Hidden";
            }

            let browserName = parseBrowser(nav.userAgent);
            try {
                if (nav.brave && await nav.brave.isBrave()) {
                    browserName = "Brave";
                }
            } catch (e) {}

            setData({
                browser: browserName,
                os: parseOS(nav.userAgent),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                ip: publicIp,
                theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light',
                language: nav.language || 'Unknown',
                resolution: `${window.screen.width} × ${window.screen.height}`,
                cookies: nav.cookieEnabled ? 'Enabled' : 'Disabled',
                cores: nav.hardwareConcurrency || 'Hidden',
                gpu: getGPU()
            });
        };
        gatherData();
    }, []);

    if (!data) return null;

    const Item = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ color: "var(--muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                {icon} {label}
            </span>
            <span style={{ color: "var(--fg)", fontSize: 15, fontWeight: 500 }}>{value}</span>
        </div>
    );

    return (
        <div style={{
            background: "color-mix(in srgb, var(--card-bg) 50%, transparent)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "24px 28px",
            margin: "32px 0",
            fontFamily: "var(--font-mono), monospace",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
        }}>
            <div style={{ color: "var(--fg)", fontSize: 18, fontWeight: 800, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                🕵️ What Your Browser Just Told Me
            </div>
            
            <hr style={{ border: "none", borderTop: "1px dashed var(--border)", margin: "0 0 20px 0", opacity: 0.5 }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px 24px" }}>
                <Item icon="🖥" label="Browser" value={data.browser} />
                <Item icon="💻" label="OS" value={data.os} />
                <Item icon="🌍" label="Timezone" value={data.timezone} />
                <Item icon="📍" label="Public IP" value={data.ip} />
                <Item icon="🌙" label="Theme" value={data.theme} />
                <Item icon="🗣" label="Language" value={data.language} />
                <Item icon="📏" label="Resolution" value={data.resolution} />
                <Item icon="🍪" label="Cookies" value={data.cookies} />
                <Item icon="🧠" label="CPU Cores" value={data.cores} />
                <Item icon="🎮" label="GPU" value={data.gpu} />
            </div>
        </div>
    );
}

function BlogNavbar({ isStory }: { isStory?: boolean }) {
    const [visible, setVisible] = useState(true);
    const [lastY, setLastY] = useState(0);
    const { theme, toggle } = useTheme();

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
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Link href={isStory ? "/" : "/blog"} className="nav-underline" style={{ fontSize: 13, fontFamily: "monospace", color: "var(--muted)", textDecoration: "none" }}>
                    {isStory ? "← home" : "← all posts"}
                </Link>
                <button
                    onClick={toggle}
                    style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--fg)",
                        padding: 6,
                        borderRadius: 6,
                        transition: "color 0.2s, background-color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--border)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>
            </div>
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

interface SeriesPart {
    part: number;
    title: string;
    subtitle: string;
    slug: string;
}

const STORY_SERIES: Record<string, { name: string; parts: SeriesPart[] }> = {
    "the-asymptote": {
        name: "The Asymptote",
        parts: [
            {
                part: 1,
                title: "Part 1",
                subtitle: "First Semesters and Forgotten Coordinates",
                slug: "the-asymptote-part-1",
            },
            {
                part: 2,
                title: "Part 2",
                subtitle: "Nested Logic and the Flight of Stairs",
                slug: "the-asymptote-part-2",
            },
        ],
    },
};

function getSeriesInfo(slug: string) {
    for (const [_, series] of Object.entries(STORY_SERIES)) {
        const foundIndex = series.parts.findIndex(p => p.slug === slug);
        if (foundIndex !== -1) {
            return {
                seriesName: series.name,
                parts: series.parts,
                currentIndex: foundIndex,
                currentPart: series.parts[foundIndex],
                prevPart: foundIndex > 0 ? series.parts[foundIndex - 1] : null,
                nextPart: foundIndex < series.parts.length - 1 ? series.parts[foundIndex + 1] : null,
            };
        }
    }
    return null;
}

const stripFirstH1 = (markdown: string) => {
    if (!markdown) return "";
    const lines = markdown.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith("# ")) {
            lines.splice(i, 1);
            return lines.join("\n");
        }
        if (line !== "") {
            break; // Stop if we hit any text that isn't an H1
        }
    }
    return markdown;
};

export default function BlogPostContent({ post, slug, isStory }: { post: Post; slug: string; isStory?: boolean }) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [views, setViews] = useState<number | null>(null);
    const [survivalMessage, setSurvivalMessage] = useState<{ title: string, body: string } | null>(null);
    const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
    const [isAnimatingReaction, setIsAnimatingReaction] = useState<string | null>(null);
    const [copiedUrl, setCopiedUrl] = useState(false);
    const seriesInfo = useMemo(() => isStory ? getSeriesInfo(slug) : null, [isStory, slug]);

    const handleReaction = async (id: string) => {
        if (selectedReaction) return; // Prevent spamming
        setSelectedReaction(id);
        setIsAnimatingReaction(id);
        setTimeout(() => setIsAnimatingReaction(null), 300);

        // Record the reaction as a 'like' in Supabase (skip for private stories)
        if (!isStory) {
            try {
                await fetch(`/api/likes/${slug}`, { method: "POST" });
            } catch (err) {
                console.error("Failed to record reaction", err);
            }
        }
    };

    const hasTrackedView = useRef(false);
    const maxScroll = useRef(0);
    const sessionStart = useRef(Date.now());

    useEffect(() => {
        // Pick a random survival message after mount to prevent hydration mismatch
        setSurvivalMessage(SURVIVAL_MESSAGES[Math.floor(Math.random() * SURVIVAL_MESSAGES.length)]);

        // Record and fetch views — guard prevents double-fire from React Strict Mode (skip for private stories)
        if (!hasTrackedView.current && !isStory) {
            hasTrackedView.current = true;
            const recordView = async () => {
                try {
                    // Get or generate a stable visitor UUID stored in localStorage
                    const visitorId = getOrCreateVisitorId();

                    const res = await fetch(`/api/views/${slug}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ visitorId }),
                    });
                    if (res.ok) {
                        const contentType = res.headers.get("content-type");
                        if (contentType && contentType.includes("application/json")) {
                            const data = await res.json();
                            if (data.count !== undefined) {
                                setViews(data.count);
                            }
                        }
                    }

                    // Send telemetry to Fortis Observe
                    let fortisUrl = process.env.NEXT_PUBLIC_FORTIS_URL;
                    if (process.env.NODE_ENV === 'production') {
                        fortisUrl = 'https://analytics.ganeshangadi.online';
                    } else if (!fortisUrl) {
                        fortisUrl = 'http://localhost:3001';
                    }
                    if (fortisUrl) {
                        const urlParams = new URLSearchParams(window.location.search);
                        const utm = urlParams.get("utm_source") || urlParams.get("ref");
                        const finalReferer = utm ? `utm_source:${utm}` : document.referrer;

                        fetch(`${fortisUrl}/api/telemetry`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ visitorId, path: `/blog/${slug}`, referer: finalReferer }),
                        }).catch(() => { });
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
            const scroll = totalScroll / (windowHeight || 1);
            setScrollProgress(scroll);

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
            if (fortisUrl && durationMs > 1000) { // Only send if they stayed for more than 1 second
                const payload = JSON.stringify({
                    visitorId,
                    path: `/blog/${slug}`,
                    scrollDepth: maxScroll.current > 100 ? 100 : maxScroll.current,
                    durationMs
                });

                // Use fetch with keepalive as it supports custom headers better, or fallback to beacon
                fetch(`${fortisUrl}/api/telemetry/update`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: payload,
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
            sendTelemetryUpdate(); // Trigger when navigating away via React Router
        };
    }, [slug]);

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

            <BlogNavbar isStory={isStory} />
            <main style={{ minHeight: "100vh", paddingTop: 70, paddingBottom: 60, paddingLeft: 20, paddingRight: 20 }}>
                <article style={{ maxWidth: isStory ? 900 : 1200, margin: "0 auto", position: "relative" }}>
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
                    <header style={{ marginBottom: 28, position: "relative", zIndex: 1 }}>
                        {/* Author Metadata at the top */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                            <img
                                src="/profile.png"
                                alt="Ganesh Angadi"
                                style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "1.5px solid var(--glass-border)" }}
                            />
                            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)", display: "flex", alignItems: "center", gap: 6 }}>
                                    By {post.author || "Ganesh Angadi"}
                                    <span style={{
                                        fontSize: 9,
                                        padding: "1px 6px",
                                        background: isStory ? "linear-gradient(135deg, var(--accent), var(--accent-2))" : "var(--accent)",
                                        color: "var(--bg)",
                                        borderRadius: 10,
                                        fontWeight: 800,
                                        letterSpacing: "0.04em"
                                    }}>
                                        {isStory ? "STORY" : "DEV"}
                                    </span>
                                </span>
                                <time dateTime={new Date(post.date).toISOString()} style={{ fontSize: 12, color: "var(--muted)", fontFamily: "monospace", display: "flex", gap: 6 }}>
                                    <span>Published {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                                    <span>•</span>
                                    <span>{post.readingTime} min read</span>
                                    {views !== null && (
                                        <>
                                            <span>•</span>
                                            <span>{views.toLocaleString()} views</span>
                                        </>
                                    )}
                                </time>
                            </div>
                        </div>

                        {/* Series Breadcrumb (if story belongs to a series) */}
                        {seriesInfo && (
                            <div style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "6px 14px",
                                borderRadius: 20,
                                background: "color-mix(in srgb, var(--accent) 12%, transparent)",
                                border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
                                marginBottom: 16,
                                fontSize: 12.5,
                                fontWeight: 600,
                                color: "var(--accent)",
                            }}>
                                <span>✦</span>
                                <span>{seriesInfo.seriesName} • Part {seriesInfo.currentPart.part} of {seriesInfo.parts.length}</span>
                                {seriesInfo.prevPart && (
                                    <>
                                        <span style={{ opacity: 0.4 }}>•</span>
                                        <Link
                                            href={`/stories/${seriesInfo.prevPart.slug}`}
                                            style={{
                                                color: "var(--fg)",
                                                textDecoration: "underline",
                                                textUnderlineOffset: 3,
                                                fontWeight: 600,
                                                fontSize: 12,
                                            }}
                                        >
                                            ← Read Part {seriesInfo.prevPart.part}
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Title */}
                        <h1 style={{
                            fontSize: "clamp(28px, 4vw, 38px)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            lineHeight: 1.25,
                            color: "var(--fg)",
                            marginBottom: 16,
                        }}>
                            {post.title}
                        </h1>

                        {/* Tags */}
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                            {post.tags.map(tag => (
                                <span key={tag} style={{
                                    fontSize: 11,
                                    fontFamily: "var(--font-mono), monospace",
                                    color: "var(--muted)",
                                    padding: "2px 8px",
                                    borderRadius: 4,
                                    letterSpacing: "0.01em",
                                    border: "1px solid var(--border)",
                                    background: "var(--card-bg)",
                                    transition: "all 0.2s ease"
                                }}>
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Story Hook / Excerpt Card */}
                        {isStory && post.hook && (
                            <div style={{
                                margin: "16px 0 24px",
                                padding: "16px 22px",
                                borderRadius: 8,
                                background: "color-mix(in srgb, var(--accent) 6%, transparent)",
                                borderLeft: "3.5px solid var(--accent)",
                                fontStyle: "italic",
                                fontSize: 16.5,
                                lineHeight: 1.65,
                                color: "color-mix(in srgb, var(--fg) 88%, transparent)",
                            }}>
                                &ldquo;{post.hook}&rdquo;
                            </div>
                        )}

                        {/* Separator */}
                        <hr style={{ border: "none", borderTop: "1px solid var(--border)", opacity: 0.2, margin: "20px 0" }} />
                    </header>

                    {/* Content */}
                    <div style={{ color: "var(--fg)", fontSize: 16, lineHeight: 1.75 }}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={useMemo(() => ({
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
                                                margin: "24px 0",
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
                                h1: ({ children }) => {
                                    const textContent = Array.isArray(children)
                                        ? children.join("")
                                        : String(children || "");
                                    if (textContent.toLowerCase().trim() === post.title.toLowerCase().trim()) {
                                        return null; // Skip duplicate H1 title
                                    }
                                    return (
                                        <h2 style={{ fontSize: "clamp(21px, 3vw, 25px)", fontWeight: 800, color: "var(--fg)", marginTop: 44, marginBottom: 14, letterSpacing: "-0.02em", lineHeight: 1.3, paddingLeft: 14, borderLeft: "4px solid var(--accent)" }}>
                                            {children}
                                        </h2>
                                    );
                                },
                                h2: ({ children }) => (
                                    <h2 style={{
                                        fontSize: "clamp(18px, 2.5vw, 21px)", fontWeight: 800,
                                        color: "var(--fg)", marginTop: 38, marginBottom: 14, letterSpacing: "-0.01em", lineHeight: 1.3,
                                        paddingLeft: 14, borderLeft: "4px solid var(--accent)"
                                    }}>
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => {
                                    const text = Array.isArray(children) ? children.join("") : String(children || "");
                                    const chapterMatch = text.match(/^Chapter\s+(\d+)[:\s]*(.*)$/i);

                                    if (isStory && chapterMatch) {
                                        const chapterNum = chapterMatch[1];
                                        const chapterTitle = chapterMatch[2];
                                        return (
                                            <div style={{ marginTop: 52, marginBottom: 24 }}>
                                                <div style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 6,
                                                    padding: "3px 12px",
                                                    borderRadius: 20,
                                                    background: "color-mix(in srgb, var(--accent) 15%, transparent)",
                                                    border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
                                                    color: "var(--accent)",
                                                    fontSize: 11,
                                                    fontWeight: 800,
                                                    letterSpacing: "0.08em",
                                                    textTransform: "uppercase",
                                                    fontFamily: "var(--font-mono), monospace",
                                                    marginBottom: 8
                                                }}>
                                                    <span>✦</span>
                                                    <span>CHAPTER {chapterNum}</span>
                                                </div>
                                                <h3 style={{
                                                    fontSize: "clamp(22px, 3vw, 26px)",
                                                    fontWeight: 800,
                                                    color: "var(--fg)",
                                                    letterSpacing: "-0.02em",
                                                    lineHeight: 1.3,
                                                    margin: "4px 0 10px"
                                                }}>
                                                    {chapterTitle}
                                                </h3>
                                                <div style={{
                                                    width: 48,
                                                    height: 3,
                                                    borderRadius: 2,
                                                    background: "linear-gradient(90deg, var(--accent), transparent)",
                                                }} />
                                            </div>
                                        );
                                    }

                                    return (
                                        <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--fg)", marginTop: 28, marginBottom: 10 }}>
                                            {children}
                                        </h3>
                                    );
                                },
                                p: ({ children }) => {
                                    if (children === "[WHAT_YOUR_BROWSER_TOLD_ME]" || (Array.isArray(children) && children[0] === "[WHAT_YOUR_BROWSER_TOLD_ME]")) {
                                        return <BrowserDataReveal />;
                                    }

                                    const mathBlock = extractMathBlock(children);
                                    if (mathBlock) {
                                        return <MathEquation math={mathBlock} displayMode={true} />;
                                    }

                                    if (isStory) {
                                        const isDialogue = isDialogueStart(children);
                                        const content = processStoryNodes(children);

                                        if (isDialogue) {
                                            return (
                                                <p style={{
                                                    marginBottom: 20,
                                                    lineHeight: 1.85,
                                                    fontSize: 17.5,
                                                    paddingLeft: 14,
                                                    borderLeft: "2.5px solid color-mix(in srgb, var(--story-dialogue) 45%, transparent)",
                                                    borderRadius: 1,
                                                    color: "color-mix(in srgb, var(--fg) 92%, transparent)",
                                                    background: "color-mix(in srgb, var(--story-dialogue) 3%, transparent)",
                                                    paddingTop: 4,
                                                    paddingBottom: 4,
                                                    paddingRight: 8,
                                                    transition: "border-color 0.2s ease",
                                                }}>
                                                    {content}
                                                </p>
                                            );
                                        }

                                        return (
                                            <p style={{
                                                marginBottom: 24,
                                                lineHeight: 1.85,
                                                fontSize: 17.5,
                                                color: "color-mix(in srgb, var(--fg) 88%, transparent)",
                                            }}>
                                                {content}
                                            </p>
                                        );
                                    }

                                    return <p style={{ marginBottom: 20, lineHeight: 1.8, color: "color-mix(in srgb, var(--fg) 92%, transparent)", fontSize: 17 }}>{children}</p>;
                                },
                                a: ({ href, children }) => (
                                    <a 
                                        href={href} 
                                        target={href?.startsWith("http") ? "_blank" : "_self"}
                                        rel={href?.startsWith("http") ? "noopener noreferrer" : ""}
                                        style={{
                                            color: "var(--accent)",
                                            textDecoration: "underline",
                                            textDecorationStyle: "dashed",
                                            textUnderlineOffset: 4,
                                            fontWeight: 600,
                                            transition: "all 0.2s ease"
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.textDecorationStyle = "solid";
                                            e.currentTarget.style.color = "color-mix(in srgb, var(--accent) 80%, white)";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.textDecorationStyle = "dashed";
                                            e.currentTarget.style.color = "var(--accent)";
                                        }}
                                    >
                                        {children}
                                    </a>
                                ),
                                code: ({ className, children }) => {
                                    const isBlock = className?.includes("language-");
                                    const textContent = String(children);
                                    
                                    if (!isBlock && textContent === "[YOUR_PUBLIC_IP]") {
                                        return <ClientIpBadge />;
                                    }

                                    return isBlock ? (
                                        <CodeBlock className={className}>{children}</CodeBlock>
                                    ) : (
                                        <code style={{
                                            fontFamily: "var(--font-mono), monospace",
                                            fontSize: 13.5,
                                            background: "color-mix(in srgb, var(--fg) 5%, transparent)",
                                            color: "var(--fg)",
                                            padding: "2px 6px",
                                            borderRadius: 4,
                                            border: "1px solid color-mix(in srgb, var(--fg) 10%, transparent)"
                                        }}>
                                            {children}
                                        </code>
                                    );
                                },
                                ul: ({ children }) => (
                                    <ul style={{ marginBottom: 20, paddingLeft: 0, listStyle: "none" }}>{children}</ul>
                                ),
                                ol: ({ children }) => (
                                    <ol style={{ marginBottom: 20, paddingLeft: 20, color: "var(--fg)", fontSize: 17, lineHeight: 1.8 }}>{children}</ol>
                                ),
                                li: ({ children }) => (
                                    <li style={{ marginBottom: 8, paddingLeft: 20, position: "relative", lineHeight: 1.8, fontSize: 17, color: "color-mix(in srgb, var(--fg) 92%, transparent)" }}>
                                        <span style={{ position: "absolute", left: 0, color: "var(--accent)", fontWeight: "bold", userSelect: "none" }}>▹</span>
                                        {children}
                                    </li>
                                ),
                                em: ({ children }) => (
                                    <em style={{
                                        fontStyle: "italic",
                                        color: isStory ? "var(--story-thought)" : "inherit",
                                        fontWeight: isStory ? 500 : "inherit",
                                    }}>
                                        {children}
                                    </em>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote style={{
                                        padding: "16px 24px",
                                        margin: "28px 0",
                                        borderRadius: 6,
                                        background: "color-mix(in srgb, var(--fg) 3%, transparent)",
                                        color: "color-mix(in srgb, var(--fg) 85%, transparent)",
                                        fontStyle: "italic",
                                        fontSize: 17,
                                        borderLeft: "4px solid var(--accent)",
                                        lineHeight: 1.8
                                    }}>
                                        {children}
                                    </blockquote>
                                ),
                                hr: () => (
                                    <div style={{
                                        margin: isStory ? "48px 0" : "56px 0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 16,
                                        opacity: 0.7
                                    }}>
                                        <div style={{ height: 1, width: 80, background: "linear-gradient(90deg, transparent, var(--border))" }} />
                                        <span style={{ color: "var(--accent)", fontSize: 12, letterSpacing: 6 }}>✦ ✦ ✦</span>
                                        <div style={{ height: 1, width: 80, background: "linear-gradient(90deg, var(--border), transparent)" }} />
                                    </div>
                                ),
                                strong: ({ children }) => (
                                    <strong style={{ color: "var(--fg)", fontWeight: 700 }}>{children}</strong>
                                ),
                            }), [post.title, isStory])}
                        >
                            {stripFirstH1(post.content)}
                        </ReactMarkdown>
                    </div>

                    {/* Story Series Pagination & Navigation */}
                    {seriesInfo && (
                        <div
                            className="story-series-pagination"
                            style={{
                                marginTop: 44,
                                marginBottom: 28,
                                padding: "26px 24px",
                                borderRadius: 16,
                                background: "color-mix(in srgb, var(--card-bg) 80%, transparent)",
                                border: "1px solid color-mix(in srgb, var(--accent) 30%, var(--border))",
                                boxShadow: "0 8px 30px -6px rgba(0, 0, 0, 0.08)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            {/* Series Header */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 18, borderBottom: "1px solid var(--border)", paddingBottom: 14 }}>
                                <div>
                                    <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: 5 }}>
                                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                                        STORY SERIES
                                    </span>
                                    <h4 style={{ margin: "4px 0 0 0", fontSize: 19, fontWeight: 800, color: "var(--fg)" }}>
                                        {seriesInfo.seriesName}
                                    </h4>
                                </div>
                                <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, background: "color-mix(in srgb, var(--fg) 5%, transparent)", padding: "3px 10px", borderRadius: 12 }}>
                                    Part {seriesInfo.currentPart.part} of {seriesInfo.parts.length}
                                </span>
                            </div>

                            {/* Page / Part Number Selector */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                                <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", color: "var(--muted)", textTransform: "uppercase" }}>
                                    Story Parts (Pages):
                                </span>
                                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                                    {seriesInfo.parts.map((p) => {
                                        const isCurrent = p.part === seriesInfo.currentPart.part;
                                        if (isCurrent) {
                                            return (
                                                <div
                                                    key={p.part}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 8,
                                                        padding: "8px 16px",
                                                        borderRadius: 10,
                                                        background: "var(--accent)",
                                                        color: "var(--bg)",
                                                        fontWeight: 700,
                                                        fontSize: 13.5,
                                                        boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                                                    }}
                                                >
                                                    <span style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        width: 22,
                                                        height: 22,
                                                        borderRadius: "50%",
                                                        background: "var(--bg)",
                                                        color: "var(--accent)",
                                                        fontSize: 12,
                                                        fontWeight: 800,
                                                    }}>
                                                        {p.part}
                                                    </span>
                                                    <span>Part {p.part} (Current)</span>
                                                </div>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={p.part}
                                                href={`/stories/${p.slug}`}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 8,
                                                    padding: "8px 16px",
                                                    borderRadius: 10,
                                                    border: "1px solid var(--border)",
                                                    background: "color-mix(in srgb, var(--card-bg) 90%, transparent)",
                                                    color: "var(--fg)",
                                                    textDecoration: "none",
                                                    fontWeight: 600,
                                                    fontSize: 13.5,
                                                    transition: "all 0.2s ease",
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.borderColor = "var(--accent)";
                                                    e.currentTarget.style.transform = "translateY(-2px)";
                                                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.borderColor = "var(--border)";
                                                    e.currentTarget.style.transform = "none";
                                                    e.currentTarget.style.boxShadow = "none";
                                                }}
                                            >
                                                <span style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: 22,
                                                    height: 22,
                                                    borderRadius: "50%",
                                                    background: "color-mix(in srgb, var(--fg) 8%, transparent)",
                                                    color: "var(--fg)",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                }}>
                                                    {p.part}
                                                </span>
                                                <span>Part {p.part}: {p.subtitle}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Next / Previous Story Links */}
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: seriesInfo.prevPart && seriesInfo.nextPart ? "repeat(auto-fit, minmax(240px, 1fr))" : "1fr",
                                gap: 12,
                                marginTop: 8,
                            }}>
                                {seriesInfo.prevPart && (
                                    <Link
                                        href={`/stories/${seriesInfo.prevPart.slug}`}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 4,
                                            padding: "14px 18px",
                                            borderRadius: 12,
                                            border: "1px solid var(--border)",
                                            background: "color-mix(in srgb, var(--fg) 2%, transparent)",
                                            textDecoration: "none",
                                            transition: "all 0.2s ease",
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.borderColor = "var(--accent)";
                                            e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 5%, transparent)";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.borderColor = "var(--border)";
                                            e.currentTarget.style.background = "color-mix(in srgb, var(--fg) 2%, transparent)";
                                        }}
                                    >
                                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--muted)", textTransform: "uppercase" }}>
                                            ← Previous Part
                                        </span>
                                        <span style={{ fontSize: 14.5, fontWeight: 700, color: "var(--fg)" }}>
                                            Part {seriesInfo.prevPart.part}: {seriesInfo.prevPart.subtitle}
                                        </span>
                                    </Link>
                                )}

                                {seriesInfo.nextPart && (
                                    <Link
                                        href={`/stories/${seriesInfo.nextPart.slug}`}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 4,
                                            padding: "14px 18px",
                                            borderRadius: 12,
                                            border: "1px solid color-mix(in srgb, var(--accent) 45%, var(--border))",
                                            background: "color-mix(in srgb, var(--accent) 8%, transparent)",
                                            textDecoration: "none",
                                            textAlign: seriesInfo.prevPart ? "right" : "left",
                                            transition: "all 0.2s ease",
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.borderColor = "var(--accent)";
                                            e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 15%, transparent)";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.borderColor = "color-mix(in srgb, var(--accent) 45%, var(--border))";
                                            e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 8%, transparent)";
                                        }}
                                    >
                                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent)", textTransform: "uppercase" }}>
                                            Next Part →
                                        </span>
                                        <span style={{ fontSize: 14.5, fontWeight: 700, color: "var(--fg)" }}>
                                            Part {seriesInfo.nextPart.part}: {seriesInfo.nextPart.subtitle}
                                        </span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Survival Sign-off */}
                    {survivalMessage && (
                        <div className="glass-card" style={{
                            marginTop: 48,
                            padding: "20px 24px",
                            borderRadius: 12,
                            border: "1px solid var(--border)",
                            background: "var(--card-bg)",
                            textAlign: "center",
                        }}>
                            <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--fg)", marginBottom: 6 }}>
                                {survivalMessage.title}
                            </h3>
                            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.5, margin: 0, marginBottom: 16 }}>
                                {survivalMessage.body}
                            </p>

                            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                                {REACTIONS.map(r => (
                                    <button
                                        key={r.id}
                                        onClick={() => handleReaction(r.id)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            padding: '6px 12px',
                                            borderRadius: 20,
                                            border: `1px solid ${selectedReaction === r.id ? 'var(--accent)' : 'var(--border)'}`,
                                            background: selectedReaction === r.id ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'transparent',
                                            color: selectedReaction === r.id ? 'var(--accent)' : 'var(--fg)',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            fontSize: 13,
                                            transition: 'all 0.15s ease',
                                        }}
                                        onMouseOver={(e) => {
                                            if (selectedReaction !== r.id) {
                                                e.currentTarget.style.background = 'var(--bg)';
                                                e.currentTarget.style.borderColor = 'var(--accent)';
                                            }
                                        }}
                                        onMouseOut={(e) => {
                                            if (selectedReaction !== r.id) {
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.borderColor = 'var(--border)';
                                            }
                                        }}
                                    >
                                        <span style={{ fontSize: 15 }}>{r.emoji}</span>
                                        {r.label}
                                    </button>
                                ))}
                            </div>
                            <div style={{
                                marginTop: selectedReaction ? 12 : 0,
                                height: selectedReaction ? 18 : 0,
                                opacity: selectedReaction ? 1 : 0,
                                overflow: 'hidden',
                                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                color: "var(--accent)",
                                fontSize: 13,
                                fontWeight: 600
                            }}>
                                Thanks for your feedback! ✨
                            </div>
                        </div>
                    )}

                    {/* Author block for SEO */}
                    <div style={{
                        marginTop: 48,
                        padding: "24px",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        background: "var(--card-bg)",
                        lineHeight: 1.6
                    }}>
                        <p style={{ margin: "0 0 8px 0", fontSize: 16, fontWeight: 700, color: "var(--fg)" }}>
                            Written by Ganesh Angadi
                        </p>
                        <p style={{ margin: "0 0 16px 0", fontSize: 14, color: "var(--muted)" }}>
                            DevOps Engineer • Backend Engineer • Platform Engineering
                        </p>
                        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: 13, fontWeight: 600 }}>
                            <Link href="/" style={{ color: "var(--accent)", textDecoration: "none" }} className="nav-underline">
                                Portfolio Home
                            </Link>
                            <a href="https://github.com/ganeshak11" target="_blank" rel="me noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }} className="nav-underline">
                                GitHub Profile
                            </a>
                            <a href="https://linkedin.com/in/ganeshangadi1301" target="_blank" rel="me noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }} className="nav-underline">
                                LinkedIn Connect
                            </a>
                            <a href="https://dev.to/ganeshak11" target="_blank" rel="me noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }} className="nav-underline">
                                Dev.to Profile
                            </a>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <footer style={{ marginTop: 60, borderTop: "1px solid var(--border)", paddingTop: 32, paddingBottom: 32 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                            <Link href="/blog" style={{
                                display: "flex", alignItems: "center", gap: 8,
                                textDecoration: "none", color: "var(--fg)", fontWeight: 500, fontSize: 14,
                                transition: "color 0.2s"
                            }}
                                className="nav-underline"
                            >
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
                                        } catch (err) { }
                                        document.body.removeChild(textArea);
                                    }
                                    setCopiedUrl(true);
                                    setTimeout(() => setCopiedUrl(false), 2000);
                                }}
                                style={{
                                    display: "flex", alignItems: "center", gap: 6,
                                    padding: "6px 14px", borderRadius: 6, border: "1px solid var(--border)",
                                    background: "var(--card-bg)", color: copiedUrl ? "var(--status-ok)" : "var(--fg)", cursor: "pointer",
                                    fontFamily: "inherit", fontSize: 13, fontWeight: 500,
                                    transition: "all 0.15s ease"
                                }}
                                onMouseOver={(e) => {
                                    if (!copiedUrl) {
                                        e.currentTarget.style.borderColor = "var(--accent)";
                                        e.currentTarget.style.color = "var(--accent)";
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (!copiedUrl) {
                                        e.currentTarget.style.borderColor = "var(--border)";
                                        e.currentTarget.style.color = "var(--fg)";
                                    }
                                }}
                            >
                                {copiedUrl ? <Check size={14} /> : <Share2 size={14} />}
                                {copiedUrl ? "Copied!" : "Share Post"}
                            </button>
                        </div>
                    </footer>
                </article>
            </main>

            {/* Comments — fully separated from article */}
            <section style={{ borderTop: "1px solid var(--border)", padding: "60px 20px 80px", background: "var(--card-bg)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <BlogComments slug={slug} />
                </div>
            </section>
        </>
    );
}
