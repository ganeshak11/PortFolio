"use client";

import { FaInstagram, FaDiscord, FaWhatsapp } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import { SectionHead, Reveal } from "@/components/ui/SectionHead";

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
    return (
        <section id="contact" className="section">
            <div className="wrap">
                <SectionHead index="06" cmd="contact" title="Get in touch" />

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
                        <p className="label">Status</p>
                        <p style={{ color: "var(--fg)", fontSize: 16 }}>
                            I&apos;m looking for roles in systems, distributed systems, cloud, networking, DevOps/SRE and backend.
                            Email is the fastest way to reach me, and my resume has the full details.
                        </p>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                            <a href="mailto:ganeshangadi13012006@gmail.com" className="btn primary">Email me</a>
                            <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn">Resume ↗</a>
                        </div>
                        <p className="sig">Ganesh</p>
                        <p className="mono" style={{ fontSize: 12, color: "var(--muted)", margin: "8px 0 0" }}>Mysuru, India</p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
