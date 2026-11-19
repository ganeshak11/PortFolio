"use client";

import { Mail } from "lucide-react";
import { SectionHead, Reveal } from "@/components/ui/SectionHead";

const SERVICES = [
    {
        num: "01",
        title: "Full Stack Development",
        desc: "End-to-end web applications — from schema design to deployed product.",
        depth: "Schema is architecture. I design the database before writing frontend. Get it wrong early and you pay forever.",
        tags: ["Next.js", "React", "Node.js", "PostgreSQL", "Supabase"],
    },
    {
        num: "02",
        title: "Android App Development",
        desc: "Cross-platform mobile apps using React Native. Offline-first by default.",
        depth: "Networks are unreliable. I design for offline behavior from day one — not as an afterthought.",
        tags: ["React Native", "Expo", "Offline-first", "REST APIs"],
    },
    {
        num: "03",
        title: "DevOps & CI/CD",
        desc: "Deployment reliability, observability pipelines, fault-tolerant workflows.",
        depth: "A deploy without a rollback plan is a gamble. I build pipelines that fail loudly and recover gracefully.",
        tags: ["Docker", "CI/CD", "Jenkins", "GitLab CI", "Bash"],
    },
    {
        num: "04",
        title: "Infrastructure & Architecture",
        desc: "Systems designed to survive failure. Tradeoffs made explicit, not hidden.",
        depth: "I ask the uncomfortable questions before you build — not after you're paged at midnight.",
        tags: ["Linux", "System Design", "Kubernetes", "Monitoring", "Cloud"],
    },
];

export default function Services() {
    return (
        <section id="services" className="section">
            <div className="wrap">
                <SectionHead
                    index="09"
                    cmd="systemctl list-units --type=service"
                    title={<>How I solve <em>systems problems</em></>}
                    lede="Available for freelance. Each card shows how I actually think about the work."
                />
                <div className="cards-4">
                    {SERVICES.map((s, i) => (
                        <Reveal key={s.num} delay={i * 0.05} className="panel hover flip">
                            <span className="n">{s.num}</span>
                            <h3>{s.title}</h3>
                            <p className="desc">{s.desc}</p>
                            <p className="depth">&ldquo;{s.depth}&rdquo;</p>
                            <div className="row-wrap">
                                {s.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
                            </div>
                        </Reveal>
                    ))}
                </div>
                <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <a href="mailto:ganeshangadi13012006@gmail.com" className="btn primary">
                        <Mail size={14} /> Let&apos;s work together
                    </a>
                    <span className="mono" style={{ fontSize: 12.5, color: "var(--muted)", overflowWrap: "anywhere" }}>ganeshangadi13012006@gmail.com</span>
                </div>
            </div>
        </section>
    );
}
