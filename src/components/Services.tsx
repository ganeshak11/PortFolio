"use client";

import { useRef, useState } from "react";
import { m, useInView } from "framer-motion";

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

function ServiceCard({ service, index, inView }: { service: typeof SERVICES[0]; index: number; inView: boolean }) {
    const [hovered, setHovered] = useState(false);

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: "24px",
                borderRadius: 8,
                background: "var(--card-bg)",
                border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "border-color 0.2s",
                cursor: "default",
                height: 280,
            }}
            className="service-card"
        >
            <div>
                <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", display: "block", marginBottom: 10 }}>{service.num}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--fg)", lineHeight: 1.3, marginBottom: 12 }}>
                    {service.title}
                </h3>
            </div>

            {/* Swappable content — fills remaining space */}
            <div style={{ position: "relative", flex: 1 }}>
                <m.p
                    animate={{ opacity: hovered ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
                    style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7, position: "absolute", inset: 0, overflow: "hidden" }}
                >
                    {service.desc}
                </m.p>
                <m.p
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.2, delay: hovered ? 0.1 : 0 }}
                    style={{ fontSize: 12, color: "var(--fg)", lineHeight: 1.7, fontStyle: "italic", position: "absolute", inset: 0, overflow: "hidden" }}
                >
                    "{service.depth}"
                </m.p>
            </div>

            {/* Bottom: tags always anchored */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {service.tags.map(tag => (
                    <span key={tag} style={{
                        fontSize: 10, fontFamily: "monospace",
                        color: "var(--accent)", border: "1px solid var(--border)",
                        padding: "2px 8px", borderRadius: 4,
                    }}>
                        {tag}
                    </span>
                ))}
            </div>
        </m.div>
    );
}

export default function Services() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} id="services" className="section-pad" style={{ padding: "100px 24px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 48 }}
                >
                    <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 12 }}>
                        $ services --list
                    </p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)", marginBottom: 12 }}>
                        How I solve<br />
                        <span style={{ color: "var(--accent)" }}>systems problems</span>
                    </h2>
                    <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 480, lineHeight: 1.8 }}>
                        Available for freelance. Hover each card to see how I actually think about the work.
                    </p>
                </m.div>

                <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                    {SERVICES.map((s, i) => (
                        <ServiceCard key={s.num} service={s} index={i} inView={inView} />
                    ))}
                </div>

                <m.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}
                >
                    <a
                        href="mailto:ganeshangadi13012006@gmail.com"
                        className="btn-slide"
                        style={{
                            fontFamily: "monospace",
                            fontSize: 13,
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            padding: "10px 28px",
                            border: "1.5px solid var(--accent)",
                            borderRadius: 4,
                            textDecoration: "none",
                        }}
                    >
                        Let's work together →
                    </a>
                    <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "monospace" }}>
                        ganeshangadi13012006@gmail.com
                    </span>
                </m.div>
            </div>
        </section>
    );
}
