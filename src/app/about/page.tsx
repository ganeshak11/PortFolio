import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DOMAIN = "https://ganeshangadi.online";

export const metadata: Metadata = {
    title: "About Ganesh Angadi | Systems Engineer Portfolio",
    description:
        "Welcome to the official systems-first DevOps portfolio of Ganesh Angadi, detailing platform engineering projects, systems thinking, and custom architectures.",
    keywords: [
        "Ganesh Angadi",
        "DevOps Portfolio",
        "DevOps Engineer Portfolio",
        "DevOps Engineer",
        "Backend Engineer",
        "Platform Engineering",
        "Fortis Ecosystem",
        "Systems Engineer",
        "About Ganesh Angadi"
    ],
    authors: [{ name: "Ganesh Angadi", url: DOMAIN }],
    creator: "Ganesh Angadi",
    openGraph: {
        title: "About Ganesh Angadi | Systems Engineer",
        description:
            "Systems-first DevOps portfolio of Ganesh Angadi. Builder of Fortis Ecosystem, hackathon winner, platform engineer focused on AWS, Kubernetes, Terraform, and CI/CD automation.",
        type: "profile",
        url: `${DOMAIN}/about`,
        siteName: "Ganesh Angadi Portfolio",
        images: [
            {
                url: `${DOMAIN}/og-profile.jpg`,
                width: 800,
                height: 800,
                alt: "Ganesh Angadi - Systems Engineer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Ganesh Angadi | Systems Engineer",
        description:
            "Systems-first DevOps portfolio. Building Fortis Ecosystem — privacy-first phone + Linux laptop platform over Tailscale. AWS • Kubernetes • Terraform | 1st Place MCP Hackathon Winner",
        images: [`${DOMAIN}/og-profile.jpg`],
        creator: "@ganeshak11",
    },
    alternates: {
        canonical: `${DOMAIN}/about`,
    },
};

export default function AboutPage() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Ganesh Angadi",
        alternateName: "ganeshak11",
        url: DOMAIN,
        image: `${DOMAIN}/profile.png`,
        jobTitle: "Systems Engineer",
        description:
            "DevOps and Backend Engineer focused on AWS, Kubernetes, Terraform, and CI/CD automation. Builder of Fortis Ecosystem, an open-source privacy-first platform joining an Android phone and Linux laptops over Tailscale. 1st place MCP hackathon winner.",
        knowsAbout: [
            "Docker",
            "Kubernetes",
            "AWS",
            "Terraform",
            "Linux System Administration",
            "CI/CD Pipelines",
            "GitHub Actions",
            "System Design",
            "Applied Cryptography",
            "Rust",
            "Android",
            "Model Context Protocol (MCP)",
            "Node.js",
            "PostgreSQL",
            "Git",
            "Bash"
        ],
        sameAs: [
            "https://github.com/ganeshak11",
            "https://linkedin.com/in/ganeshangadi1301",
            "https://dev.to/ganeshak11",
            "https://reddit.com/u/ganeshak11",
            "https://x.com/Ganeshangadi16"
        ],
        award: "1st Place - MCP Server Hackathon 2026",
    };

    const profiles: [string, string][] = [
        ["Portfolio Website", "https://ganeshangadi.online"],
        ["GitHub Profile", "https://github.com/ganeshak11"],
        ["LinkedIn Connect", "https://linkedin.com/in/ganeshangadi1301"],
        ["Dev.to Articles", "https://dev.to/ganeshak11"],
        ["Reddit Profile", "https://reddit.com/u/ganeshak11"],
        ["X / Twitter Feed", "https://x.com/Ganeshangadi16"],
    ];

    const projects = [
        { name: "Fortis Ecosystem", href: "https://github.com/Fortis-OS/fortis-ecosystem", desc: "My flagship: a privacy-first system for an Android phone and Linux laptops. Encrypted vault with autofill, TOTP, fingerprint-approved sudo, laptop remote, phone-as-webcam and encrypted backups, over Tailscale with no cloud. Rust + Kotlin, spec-first.", link: "Fortis Ecosystem Repository" },
        { name: "FortisOS", href: "", desc: "The long-term goal: one OS layer, one user, many machines. A Rust distributed metadata engine and encrypted chunk store, tested with a deterministic fault simulator and crash tests. Private while in design.", link: "" },
        { name: "Fortis-Tools", href: "https://github.com/Fortis-Tools", desc: "Small tools around Fortis: fortis-share (AirDrop for Linux → Android) and healthcheck (an SRE-style domain diagnostics CLI).", link: "Fortis-Tools Organization" },
        { name: "MY(suru) BUS", href: "https://github.com/ganeshak11/MY-suru-BUS", desc: "Real-time city transportation platform with live GPS tracking.", link: "MY(suru) BUS Repository" },
        { name: "Frost", href: "https://github.com/ganeshak11/frost", desc: "My fully custom KDE Plasma 6 theme, from boot screen to code editor. This site is styled after it.", link: "Frost Repository" },
    ];

    const skills = [
        { title: "Systems & Security", items: "Rust, Linux, systemd, PAM, Tailscale / WireGuard, SQLCipher, Argon2id, XChaCha20-Poly1305, ECDSA P-256" },
        { title: "Infrastructure", items: "Docker, GitHub Actions, Terraform, AWS, Kubernetes, Nginx, PM2, Bash" },
        { title: "Apps & Data", items: "Kotlin / Compose, TypeScript, Node.js, Next.js, React Native, PostgreSQL, Neo4j, Python, C" },
    ];

    const kridtechDocs = [
        { label: "Certificate", href: "/KT_INT_005_Ganesh_Angadi/KT_INT_005_Ganesh_Angadi_Internship_Certificate.pdf" },
        { label: "Experience Letter", href: "/KT_INT_005_Ganesh_Angadi/KT_INT_005_Ganesh_Angadi_Letter_Of_Experience.pdf" },
        { label: "Recommendation", href: "/KT_INT_005_Ganesh_Angadi/KT_INT_005_Ganesh_Angadi_Letter_Of_Recommendation.pdf" },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <Navbar />
            <main>
                <header className="page-head">
                    <div className="wrap">
                        <span className="cap"><span className="dot" style={{ color: "var(--accent)" }} />~/about · $ whoami</span>
                        <h1>Ganesh Angadi</h1>
                        <p className="mono" style={{ fontSize: 14, color: "var(--fg-2)" }}>Systems engineer · distributed systems, cloud, networking &amp; DevOps</p>
                    </div>
                </header>

                <div className="wrap">
                    <div className="prose-page">
                        <nav className="prose-toc" aria-label="On this page">
                            <a href="#identity">Identity &amp; Focus</a>
                            <a href="#profiles">Official Profiles</a>
                            <a href="#projects">Projects</a>
                            <a href="#skills">Core Skills</a>
                            <a href="#experience">Experience &amp; Milestones</a>
                        </nav>

                        <article className="prose-body">
                            <section id="identity">
                                <h2>Identity &amp; Focus</h2>
                                <p>
                                    I&apos;m Ganesh Angadi, a systems engineer from Mysuru, India. My main project is Fortis Ecosystem:
                                    a privacy-first system that links my Android phone and Linux laptops with an encrypted vault,
                                    fingerprint-approved sudo, laptop remote control and encrypted backups, over Tailscale with no cloud.
                                </p>
                                <p>
                                    Most recently I was the founding software engineer intern at Kridtech, working on Vaniger&apos;s calling
                                    platform and its CI/CD. I won 1st place at an MCP systems engineering hackathon in April 2026.
                                </p>
                            </section>

                            <section id="profiles">
                                <h2>Official Identity Profiles</h2>
                                <p>
                                    Where to find me online:
                                </p>
                                <dl className="panel kv">
                                    {profiles.map(([label, url]) => (
                                        <div key={url} style={{ display: "contents" }}>
                                            <dt>{label}</dt>
                                            <dd><a href={url}>{url}</a></dd>
                                        </div>
                                    ))}
                                </dl>
                            </section>

                            <section id="projects">
                                <h2>Projects</h2>
                                <div style={{ display: "grid", gap: 12 }}>
                                    {projects.map((p) => (
                                        <div key={p.name} className="panel hover" style={{ padding: "18px 20px" }}>
                                            <h3 style={{ fontSize: 17, fontWeight: 650, marginBottom: 4 }}>
                                                {p.href ? <a href={p.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg)", textDecoration: "none" }}>{p.name}</a> : p.name}
                                            </h3>
                                            <p style={{ fontSize: 14.5, color: "var(--muted)", margin: "0 0 8px" }}>{p.desc}</p>
                                            {p.href ? <a href={p.href} target="_blank" rel="noopener noreferrer" className="link">{p.link} ↗</a> : <span className="mono" style={{ fontSize: 12, color: "var(--faint)" }}>private repo · in design</span>}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section id="skills">
                                <h2>Core Skills</h2>
                                <div className="cards-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))" }}>
                                    {skills.map((s) => (
                                        <div key={s.title} className="panel" style={{ padding: 18 }}>
                                            <h3 className="label" style={{ color: "var(--accent)", marginBottom: 8 }}>{s.title}</h3>
                                            <p style={{ fontSize: 14.5, color: "var(--fg-2)", margin: 0 }}>{s.items}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section id="experience">
                                <h2>Experience &amp; Milestones</h2>
                                <div className="timeline">
                                    <div className="panel" style={{ padding: 20 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "baseline" }}>
                                            <strong style={{ fontSize: 16 }}>Founding Software Engineer (Intern) — Vaniger</strong>
                                            <span className="chip accent">Jul – Oct 2026</span>
                                        </div>
                                        <p className="mono" style={{ fontSize: 12.5, color: "var(--accent)", margin: "6px 0 8px" }}>Kridtech Corp. | 27 July 2026 – 27 October 2026</p>
                                        <p style={{ fontSize: 14.5, color: "var(--muted)", margin: 0 }}>Architected browser-native WebRTC calling via Telnyx SIP bridge, Frontier live AI coaching with Deepgram Nova-2 streaming &amp; real-time objection handling, dynamic inbound routing with presence sync, atomic PostgreSQL billing ledger, and automated CI/CD pipelines deploying to Linux VM (PM2/Nginx) and Vercel.</p>
                                        <div className="row-wrap" style={{ marginTop: 12, gap: 8 }}>
                                            {kridtechDocs.map((d) => (
                                                <a key={d.href} href={d.href} target="_blank" rel="noopener noreferrer" className="btn sm">{d.label} ↗</a>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="panel" style={{ padding: 20 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "baseline" }}>
                                            <strong style={{ fontSize: 16 }}>1st Place — Model Context Protocol (MCP) Server Hackathon</strong>
                                            <span className="chip accent">Apr 2026</span>
                                        </div>
                                        <p style={{ fontSize: 14.5, color: "var(--muted)", margin: "8px 0 0" }}>Developed custom integrations and advanced protocol servers</p>
                                    </div>
                                    <div className="panel" style={{ padding: 20 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "baseline" }}>
                                            <strong style={{ fontSize: 16 }}>Fortis Ecosystem — Creator &amp; Maintainer</strong>
                                            <span className="chip" style={{ color: "var(--status-ok)" }}><span className="dot live" /> Active</span>
                                        </div>
                                        <p style={{ fontSize: 14.5, color: "var(--muted)", margin: "8px 0 0" }}>Designed and built a privacy-first phone + Linux laptop platform: Rust agent, PAM module and crypto core, Kotlin Android app, and a written security specification</p>
                                    </div>
                                </div>
                            </section>
                        </article>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
