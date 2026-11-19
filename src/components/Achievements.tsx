"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Trophy, Briefcase, FileText } from "lucide-react";

type Item = {
    type: string;
    Icon: typeof Briefcase;
    badge: string;
    title: string;
    org: string;
    desc: string;
    tags: string[];
    meta: string;
    quote?: string;
    quoteBy?: string;
    docs?: { label: string; href: string }[];
};

const ITEMS: Item[] = [
    {
        type: "experience",
        Icon: Briefcase,
        badge: "FOUNDING SDE",
        title: "Founding Software Engineer (Intern) — Vaniger",
        org: "Kridtech Corp. | 27 July 2026 – 27 October 2026",
        desc: "Founding SDE & DevOps Intern for Vaniger (production conversational sales & telephony platform). Architected browser-native WebRTC calling via Telnyx SIP bridge, Frontier live AI coaching with dual-channel Deepgram Nova-2 streaming & real-time objection handling, dynamic inbound routing with presence sync, atomic PostgreSQL billing ledger, and automated CI/CD pipelines deploying to Linux VM (PM2/Nginx) and Vercel.",
        tags: ["WebRTC", "Telnyx", "Deepgram", "Node.js", "PostgreSQL", "CI/CD", "Next.js"],
        meta: "Verified · KT-INT-005",
        quote: "If circumstances permitted, I would gladly retain Ganesh as a full-time member of our engineering team.",
        quoteBy: "Rananjay Kandamwar, Co-Founder & CEO, Kridtech",
        docs: [
            { label: "Certificate", href: "/KT_INT_005_Ganesh_Angadi/KT_INT_005_Ganesh_Angadi_Internship_Certificate.pdf" },
            { label: "Experience Letter", href: "/KT_INT_005_Ganesh_Angadi/KT_INT_005_Ganesh_Angadi_Letter_Of_Experience.pdf" },
            { label: "Recommendation", href: "/KT_INT_005_Ganesh_Angadi/KT_INT_005_Ganesh_Angadi_Letter_Of_Recommendation.pdf" },
        ],
    },
    {
        type: "award",
        Icon: Trophy,
        badge: "1ST PLACE",
        title: "MCP-Based Systems Engineering Hackathon",
        org: "Open Innovation · April 2026",
        desc: "Built an MCP wrapper around an ISL translator — enabling AI assistant integration. Focused on the integration layer, not reinventing the tool.",
        tags: ["MCP", "Python", "AI Integration", "Protocol Design"],
        meta: "24h · MCP track",
    },
    {
        type: "experience",
        Icon: Briefcase,
        badge: "INTERNSHIP",
        title: "AI & Machine Learning Intern",
        org: "Artsy Technologies Pvt Ltd · May 2026",
        desc: "Selected for an AI/ML internship. Working on real projects alongside experienced professionals. Offer ID: OL-2026-VP9K07.",
        tags: ["AI/ML", "Python", "Artsy Technologies"],
        meta: "Verified · May 2026 - present",
    },
];

export default function Achievements() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} id="achievements" className="section-pad" style={{ padding: "100px 24px", background: "var(--bg)" }}>
            <div style={{ maxWidth: 1536, margin: "0 auto" }}>
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 48 }}
                >
                    <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 12 }}>
                        $ history | grep "milestones"
                    </p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                        Recognition & Experience
                    </h2>
                </m.div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {ITEMS.map((item, i) => (
                        <m.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                            className="achievement-card"
                            style={{
                                padding: "24px 28px",
                                borderRadius: 8,
                                background: "var(--card-bg)",
                                border: "1px solid var(--border)",
                                display: "grid",
                                gridTemplateColumns: "auto 1fr auto",
                                gap: 20,
                                alignItems: "start",
                            }}
                        >
                            {/* Icon */}
                            <div className="achievement-icon" style={{
                                width: 40, height: 40,
                                borderRadius: 8,
                                border: "1px solid var(--border)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "var(--accent)",
                                flexShrink: 0,
                            }}>
                                <item.Icon size={18} strokeWidth={1.5} />
                            </div>

                            {/* Content */}
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                                    <span style={{
                                        fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em",
                                        background: "var(--accent)", color: "var(--bg)",
                                        padding: "3px 10px", borderRadius: 999,
                                    }}>
                                        {item.badge}
                                    </span>
                                    <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "monospace" }}>{item.org}</span>
                                </div>
                                <h3 style={{ fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 700, color: "var(--fg)", marginBottom: 8, lineHeight: 1.4 }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, maxWidth: 480 }}>
                                    {item.desc}
                                </p>
                                {item.quote && (
                                    <blockquote style={{
                                        margin: "12px 0 0 0", paddingLeft: 12,
                                        borderLeft: "2px solid var(--accent)",
                                        fontSize: 13, color: "var(--fg)", fontStyle: "italic", lineHeight: 1.6, maxWidth: 480,
                                    }}>
                                        &ldquo;{item.quote}&rdquo;
                                        {item.quoteBy && (
                                            <span style={{ display: "block", marginTop: 4, fontSize: 11, fontStyle: "normal", fontFamily: "monospace", color: "var(--muted)" }}>
                                                — {item.quoteBy}
                                            </span>
                                        )}
                                    </blockquote>
                                )}
                                {item.docs && (
                                    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                                        {item.docs.map(doc => (
                                            <a
                                                key={doc.href}
                                                href={doc.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: "inline-flex", alignItems: "center", gap: 6,
                                                    fontSize: 11, fontFamily: "monospace",
                                                    color: "var(--accent)", border: "1px solid var(--border)",
                                                    padding: "4px 10px", borderRadius: 4, textDecoration: "none",
                                                }}
                                            >
                                                <FileText size={12} strokeWidth={1.5} />
                                                {doc.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right side — tags + meta */}
                            <div className="achievement-right" style={{ display: "flex", gap: 12, flexShrink: 0 }}>
                                <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--muted)", whiteSpace: "nowrap" }}>
                                    {item.meta}
                                </span>
                                <div className="achievement-tags" style={{ display: "flex", gap: 6 }}>
                                    {item.tags.map(tag => (
                                        <span key={tag} style={{
                                            fontSize: 10, fontFamily: "monospace",
                                            color: "var(--accent)", border: "1px solid var(--border)",
                                            padding: "2px 8px", borderRadius: 4, whiteSpace: "nowrap",
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
