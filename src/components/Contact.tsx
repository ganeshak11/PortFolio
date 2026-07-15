"use client";

import { useRef, useEffect, useState } from "react";
import { m, useInView } from "framer-motion";
import { FaInstagram, FaDiscord, FaWhatsapp } from "react-icons/fa";

const FULL_TEXT = "Let's build something great.";

const LINKS = [
    { label: "GitHub", sub: "github.com/ganeshak11", href: "https://github.com/ganeshak11" },
    { label: "LinkedIn", sub: "linkedin.com/in/ganeshangadi1301", href: "https://www.linkedin.com/in/ganeshangadi1301/" },
    { label: "Email", sub: "ganeshangadi13012006@gmail.com", href: "mailto:ganeshangadi13012006@gmail.com" },
];

const SOCIALS = [
    { icon: FaWhatsapp, href: "https://wa.me/919986094984", label: "WhatsApp" },
    { icon: FaInstagram, href: "https://instagram.com/ganesh_a_k_22", label: "Instagram" },
    { icon: FaDiscord, href: "https://discord.com/ganeshak11", label: "Discord" },
];

export default function Contact() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [typed, setTyped] = useState("");
    const [done, setDone] = useState(false);
    const started = useRef(false);

    useEffect(() => {
        if (!inView || started.current) return;
        started.current = true;
        let i = 0;
        const iv = setInterval(() => {
            i++;
            setTyped(FULL_TEXT.slice(0, i));
            if (i >= FULL_TEXT.length) { setDone(true); clearInterval(iv); }
        }, 45);
        return () => clearInterval(iv);
    }, [inView]);

    return (
        <section ref={ref} id="contact" className="section-pad" style={{ padding: "100px 24px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 48 }}
                >
                    <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 12 }}>
                        $ ping -c 4 ganesh.online
                    </p>
                    <h2 style={{
                        fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800,
                        letterSpacing: "-0.02em", color: "var(--fg)",
                        fontFamily: "monospace", display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4,
                    }}>
                        {typed}
                    </h2>
                </m.div>

                <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>

                    {/* Left — links */}
                    <m.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 24, textTransform: "uppercase" }}>
                            Reach out
                        </p>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {LINKS.map((link, i) => (
                                <m.a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="me noopener noreferrer"
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "16px 0",
                                        borderBottom: "1px solid var(--border)",
                                        textDecoration: "none",
                                        color: "var(--fg)",
                                        transition: "color 0.2s, padding-left 0.2s",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.paddingLeft = "8px"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.paddingLeft = "0"; }}
                                >
                                    <div>
                                        <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{link.label}</p>
                                        <p style={{ fontSize: 11, fontFamily: "monospace", color: "var(--muted)" }}>{link.sub}</p>
                                    </div>
                                    <span style={{ color: "var(--accent)", fontSize: 16 }}>→</span>
                                </m.a>
                            ))}
                        </div>

                        {/* Socials integrated */}
                        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 20 }}>
                            <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--muted)", letterSpacing: "0.08em" }}>elsewhere</span>
                            {SOCIALS.map(({ icon: Icon, href, label }) => (
                                <m.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="me noopener noreferrer"
                                    aria-label={label}
                                    whileHover={{ scale: 1.2, rotate: 8 }}
                                    style={{ color: "var(--muted)", display: "flex", transition: "color 0.2s" }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
                                >
                                    <Icon size={18} />
                                </m.a>
                            ))}
                        </div>
                    </m.div>

                    {/* Right — human closure */}
                    <m.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        whileHover={{
                            y: -4,
                            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.05)",
                        }}
                        className="contact-closure"
                        style={{
                            padding: "32px",
                            borderRadius: 8,
                            background: "var(--card-bg)",
                            border: "1px solid var(--border)",
                            borderLeft: "3.5px solid var(--accent)",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >
                        <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 20, textTransform: "uppercase" }}>
                            What I believe
                        </p>
                        <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--fg)", marginBottom: 20 }}>
                            Infrastructure is not magic — it is decisions with trade-offs.
                            I make those decisions explicit.
                        </p>
                        <p style={{ fontSize: 14, lineHeight: 1.9, color: "var(--muted)", marginBottom: 20 }}>
                            I'm still learning. Still breaking things on purpose to understand them.
                            Still questioning every abstraction I reach for.
                        </p>
                        <p style={{ fontSize: 14, lineHeight: 1.9, color: "var(--muted)" }}>
                            If you're building something that needs to be reliable, observable, and honest about its failure modes — let's talk.
                        </p>
                        <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
                            <p style={{ fontSize: 12, fontFamily: "monospace", color: "var(--muted)" }}>— Ganesh Angadi</p>
                            <p style={{ fontSize: 11, fontFamily: "monospace", color: "var(--muted)", opacity: 0.6, marginTop: 4 }}>DevOps Engineer · System Thinker · Mysuru, India</p>
                        </div>
                    </m.div>
                </div>
            </div>
        </section>
    );
}
