"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useScramble } from "@/lib/useScramble";
import { Linkedin, Github, Instagram, MessageCircle } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from "react-icons/fa";
import Magnetic from "@/components/Magnetic";

const SOCIALS = [
    { icon: FaLinkedin, href: "https://linkedin.com/in/ganeshangadi1301", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com/ganeshak11", label: "GitHub" },
    { icon: FaInstagram, href: "https://instagram.com/ganesh_a_k_22", label: "Instagram" },
    { icon: FaDiscord, href: "https://discord.com", label: "Discord" },
];

export default function About() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const heading = useScramble("System Thinker", inView, 200);

    return (
        <section ref={ref} id="about" className="section-pad" style={{ padding: "100px 24px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 48 }}
                >
                    <p
                        style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 12 }}
                        className={inView ? "flicker" : ""}
                    >
                        $ man ganesh
                    </p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                        {heading}
                    </h2>
                </m.div>

                <m.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="about-card"
                    style={{
                        borderRadius: 8,
                        background: "var(--card-bg)",
                        border: "1px solid var(--border)",
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Photo — 36% width */}
                    <m.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="about-photo"
                        style={{
                            width: "36%",
                            minWidth: 200,
                            flexShrink: 0,
                            padding: 16,
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <div className="about-photo-inner" style={{ position: "relative", width: "100%", aspectRatio: "4/5", borderRadius: 12, overflow: "hidden", background: "var(--bg)" }}>
                            <Image
                                src="/profile.png"
                                alt="Ganesh Angadi - DevOps Engineer Portfolio"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 36vw"
                                style={{ objectFit: "cover", objectPosition: "center top" }}
                            />
                        </div>
                    </m.div>

                    {/* Content — remaining width */}
                    <div className="about-content" style={{ flex: 1, minWidth: 260, padding: "clamp(28px, 5vw, 52px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
                        <div>
                            <p style={{ fontSize: 20, color: "var(--muted)", fontFamily: "monospace", marginBottom: 4 }}>Hi, I'm</p>
                            <h3 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: "var(--accent)", letterSpacing: "0.04em", fontFamily: "monospace", lineHeight: 1.1 }}>
                                GANESH ANGADI
                            </h3>
                        </div>

                        {/* Status badge */}
                        <div className="about-badges" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontFamily: "monospace", color: "var(--status-ok)", border: "1px solid var(--status-ok)", padding: "4px 12px", borderRadius: 999 }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--status-ok)", display: "inline-block" }} />
                                [ STATUS: OPEN TO OPPORTUNITIES ]
                            </span>
                        </div>

                        <p style={{ fontSize: "clamp(14px, 1.8vw, 15px)", lineHeight: 1.8, color: "var(--fg)", maxWidth: 500 }}>
                            Welcome to my DevOps portfolio. I don't build features; I design observable systems that fail gracefully. Focused on Linux internals, Kubernetes orchestration, and declarative infrastructure automation.
                        </p>

                        {/* Address + Resume buttons */}
                        <div className="about-resume-row" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                            <p style={{ fontSize: 13, color: "var(--muted)", fontFamily: "monospace" }}>
                                📍 Mysuru, Karnataka, India
                            </p>
                            <Magnetic>
                                <Link
                                    href="/resume.html"
                                    target="_blank"
                                    rel="me noopener noreferrer"
                                    className="btn-slide"
                                    style={{
                                        display: "inline-block",
                                        fontFamily: "monospace",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        letterSpacing: "0.05em",
                                        textTransform: "uppercase",
                                        padding: "10px 24px",
                                        border: "1.5px solid var(--accent)",
                                        background: "var(--accent)",
                                        color: "var(--bg)",
                                        borderRadius: 4,
                                        textDecoration: "none",
                                        boxShadow: "0 4px 14px color-mix(in srgb, var(--accent) 25%, transparent)",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    View Resume →
                                </Link>
                            </Magnetic>
                        </div>

                        {/* Divider */}
                        <div style={{ height: 1, background: "var(--border)", width: "100%" }} />

                        {/* Social icons */}
                        <div className="about-socials" style={{ display: "flex", alignItems: "center", gap: 0, justifyContent: "space-between", maxWidth: 320 }}>
                            <span style={{ fontSize: 13, color: "var(--muted)", fontFamily: "monospace", whiteSpace: "nowrap", marginRight: 16 }}>Follow me on :</span>
                            {SOCIALS.map(({ icon: Icon, href, label }, i) => (
                                <m.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="me noopener noreferrer"
                                    aria-label={label}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + i * 0.08 }}
                                    whileHover={{ scale: 1.2, rotate: 8 }}
                                    style={{
                                        color: "var(--muted)",
                                        transition: "color 0.2s",
                                        display: "flex",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
                                >
                                    <Icon size={22} />
                                </m.a>
                            ))}
                        </div>
                    </div>
                </m.div>
            </div>
        </section>
    );
}
