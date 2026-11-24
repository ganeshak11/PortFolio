"use client";

import { Trophy, Briefcase, FileText, BadgeCheck } from "lucide-react";
import { SectionHead, Reveal } from "@/components/ui/SectionHead";

type Item = {
    type: string;
    Icon: typeof Briefcase;
    badge: string;
    title: string;
    org: string;
    desc: string;
    points?: string[];
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
        desc: "Founding SDE and DevOps intern on Vaniger, a production sales-calling platform.",
        points: [
            "Built the calling and billing core: browser WebRTC calls through a Telnyx SIP bridge, presence-based inbound routing and an atomic PostgreSQL billing ledger.",
            "Built a live AI call-coaching pipeline: Deepgram dual-channel streaming feeds real-time suggestions with sub-100ms latency, using Groq's prompt caching.",
            "Owned deployments for 2+ months: GitHub Actions pipelines to a GCP VM (Nginx, PM2, zero-downtime restarts) and Vercel, plus the architecture and handover docs.",
        ],
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
        title: "MCP Server Hackathon",
        org: "Open Innovation · April 2026",
        desc: "Built an MCP wrapper around an ISL translator — enabling AI assistant integration. Focused on the integration layer, not reinventing the tool.",
        tags: ["MCP", "Python", "AI Integration", "Protocol Design"],
        meta: "24h · MCP track",
    },
];

export default function Achievements() {
    return (
        <section id="achievements" className="section">
            <div className="wrap">
                <SectionHead
                    index="02"
                    cmd="experience"
                    title="Experience"
                />

                <div className="timeline">
                    {ITEMS.map((item, i) => (
                        <Reveal key={item.title} delay={i * 0.06} className="panel hover tl-item">
                            <div className="tl-when">
                                <span className="tl-icon"><item.Icon size={18} strokeWidth={1.6} /></span>
                                <span className={i === 0 || item.type === "award" ? "chip solid" : "chip accent"}>{item.badge}</span>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                                    {item.meta.startsWith("Verified") && <BadgeCheck size={13} style={{ color: "var(--status-ok)" }} />}
                                    {item.meta}
                                </span>
                            </div>

                            <div style={{ minWidth: 0 }}>
                                <h3 className="tl-title">{item.title}</h3>
                                <p className="tl-org">{item.org}</p>
                                <p className="tl-desc">{item.desc}</p>
                                {item.points && (
                                    <ul className="tl-desc" style={{ margin: "10px 0 0", paddingLeft: 18, display: "grid", gap: 6, listStyle: "disc" }}>
                                        {item.points.map((pt) => <li key={pt}>{pt}</li>)}
                                    </ul>
                                )}

                                {item.quote && (
                                    <blockquote className="quote">
                                        <p>&ldquo;{item.quote}&rdquo;</p>
                                        {item.quoteBy && <cite>— {item.quoteBy}</cite>}
                                    </blockquote>
                                )}

                                <div className="row-wrap" style={{ marginTop: 16 }}>
                                    {item.tags.map((tag) => (
                                        <span key={tag} className="chip">{tag}</span>
                                    ))}
                                </div>

                                {item.docs && (
                                    <div className="row-wrap" style={{ marginTop: 14, gap: 8 }}>
                                        {item.docs.map((doc) => (
                                            <a key={doc.href} href={doc.href} target="_blank" rel="noopener noreferrer" className="btn sm">
                                                <FileText size={13} strokeWidth={1.6} />
                                                {doc.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
