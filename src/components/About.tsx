"use client";

import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from "react-icons/fa";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHead, Reveal } from "@/components/ui/SectionHead";

const SOCIALS = [
    { icon: FaLinkedin, href: "https://linkedin.com/in/ganeshangadi1301", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com/ganeshak11", label: "GitHub" },
    { icon: FaInstagram, href: "https://instagram.com/ganesh_a_k_22", label: "Instagram" },
    { icon: FaDiscord, href: "https://discord.com", label: "Discord" },
];

const INFO: [string, string][] = [
    ["role", "Systems engineer"],
    ["host", "Mysuru, Karnataka, India"],
    ["building", "Fortis Ecosystem"],
    ["desktop", "KDE Plasma 6 + Frost"],
    ["langs", "Rust, Kotlin, TypeScript, Python, Bash"],
    ["status", "open to opportunities"],
];

export default function About() {
    return (
        <section id="about" className="section">
            <div className="wrap">
                <SectionHead index="01" cmd="whoami" title="About me" />

                <div className="about-grid">
                    <Reveal className="panel">
                        <div className="panel-bar">
                            <span className="win-dots" aria-hidden="true"><i /><i /><i /></span>
                            <span className="title">ganesh@frost: ~ — neofetch</span>
                        </div>
                        <div className="neofetch">
                            <div className="neofetch-img">
                                <Image src="/portrait-dark.jpg" alt="Ganesh Angadi portrait" fill sizes="132px" style={{ objectFit: "cover" }} />
                            </div>
                            <dl>
                                <div className="head"><b>ganesh</b>@<b>angadi</b></div>
                                <div className="sep">-------------------</div>
                                {INFO.map(([k, v]) => (
                                    <div key={k} style={{ display: "contents" }}>
                                        <dt>{k}</dt>
                                        <dd style={k === "status" ? { color: "var(--status-ok)" } : undefined}>{v}</dd>
                                    </div>
                                ))}
                                <div className="swatches" aria-hidden="true">
                                    {["#0D0E11", "#1E1F24", "#34353D", "#9698A2", "#ECECF1", "#F21D43", "#34C759", "#FFB02E"].map((c) => (
                                        <i key={c} style={{ background: c }} />
                                    ))}
                                </div>
                            </dl>
                        </div>
                    </Reveal>

                    <Reveal className="panel about-copy" delay={0.08}>
                        <p className="big">Hi, I&apos;m Ganesh Angadi.</p>
                        <p>
                            Most of my time goes into Fortis: a Rust agent and PAM module on the laptop, a Kotlin app on the phone,
                            and a written security spec the code has to follow. Before that I built a city bus-tracking platform,
                            and on the side I made my own KDE theme and a few small CLI tools. Mostly, I code for fun.
                        </p>
                        <p className="mono" style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.8 }}>
                            Day to day: Rust · Kotlin · TypeScript · Python · Bash · Linux · systemd · PAM · Tailscale ·
                            PostgreSQL · SQLCipher · Docker · GitHub Actions · Terraform · AWS
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                            <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn primary">
                                View resume <ArrowUpRight size={14} />
                            </a>
                            <a href="/about" className="btn">More about me</a>
                        </div>
                        <div style={{ height: 1, background: "var(--border)" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                            <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>follow →</span>
                            <div className="socials">
                                {SOCIALS.map(({ icon: Icon, href, label }) => (
                                    <a key={label} href={href} target="_blank" rel="me noopener noreferrer" aria-label={label} className="icon-btn" title={label}>
                                        <Icon size={15} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
