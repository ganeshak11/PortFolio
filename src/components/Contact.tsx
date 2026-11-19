"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FaInstagram, FaDiscord, FaWhatsapp } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/SectionHead";

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
    const ref = useRef<HTMLHeadingElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [typed, setTyped] = useState("");
    const started = useRef(false);

    useEffect(() => {
        if (!inView || started.current) return;
        started.current = true;
        let i = 0;
        const iv = setInterval(() => {
            i++;
            setTyped(FULL_TEXT.slice(0, i));
            if (i >= FULL_TEXT.length) clearInterval(iv);
        }, 45);
        return () => clearInterval(iv);
    }, [inView]);

    return (
        <section id="contact" className="section">
            <div className="wrap">
                <header className="section-head">
                    <span className="eyebrow">
                        <span className="idx">10</span>
                        <span className="rule" />
                        <span>$ ping -c 4 ganesh.online</span>
                    </span>
                    <h2 ref={ref} className="section-title" aria-label={FULL_TEXT} style={{ minHeight: "1.1em" }}>
                        {typed}
                        <span className="caret" aria-hidden="true" style={{ display: "inline-block", width: 3, height: "0.8em", background: "var(--accent)", marginLeft: 4, animation: "blink 1s step-end infinite" }} />
                    </h2>
                </header>

                <div className="contact-grid">
                    <Reveal>
                        <div className="panel contact-links" style={{ overflow: "hidden" }}>
                            <div className="panel-bar">
                                <span className="win-dots" aria-hidden="true"><i /><i /><i /></span>
                                <span className="title">reach out</span>
                            </div>
                            {LINKS.map((link) => (
                                <a key={link.label} href={link.href} target="_blank" rel="me noopener noreferrer" className="contact-link">
                                    <span style={{ minWidth: 0 }}>
                                        <b>{link.label}</b>
                                        <small>{link.sub}</small>
                                    </span>
                                    <ArrowUpRight size={18} className="arrow" />
                                </a>
                            ))}
                        </div>
                        <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                            <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>elsewhere →</span>
                            <div className="socials">
                                {SOCIALS.map(({ icon: Icon, href, label }) => (
                                    <a key={label} href={href} target="_blank" rel="me noopener noreferrer" aria-label={label} title={label} className="icon-btn">
                                        <Icon size={15} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.08} className="panel letter">
                        <p className="label">What I believe</p>
                        <p style={{ color: "var(--fg)", fontSize: 16 }}>
                            Infrastructure is not magic — it is decisions with trade-offs.
                            I make those decisions explicit.
                        </p>
                        <p>
                            I&apos;m still learning. Still breaking things on purpose to understand them.
                            Still questioning every abstraction I reach for.
                        </p>
                        <p>
                            If you&apos;re building something that needs to be reliable, observable, and honest about its failure modes — let&apos;s talk.
                        </p>
                        <p className="sig">— Ganesh Angadi</p>
                        <p className="mono" style={{ fontSize: 12, color: "var(--muted)", margin: "8px 0 0" }}>DevOps Engineer · System Thinker · Mysuru, India</p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
