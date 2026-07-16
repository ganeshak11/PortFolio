import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DOMAIN = "https://ganeshangadi.online";

export const metadata: Metadata = {
    title: "About Ganesh Angadi | DevOps Engineer Portfolio",
    description:
        "Welcome to the official systems-first DevOps portfolio of Ganesh Angadi, detailing platform engineering projects, systems thinking, and custom architectures.",
    keywords: [
        "Ganesh Angadi",
        "DevOps Portfolio",
        "DevOps Engineer Portfolio",
        "DevOps Engineer",
        "Backend Engineer",
        "Platform Engineering",
        "Fortis-CI",
        "System Thinker",
        "About Ganesh Angadi"
    ],
    authors: [{ name: "Ganesh Angadi", url: DOMAIN }],
    creator: "Ganesh Angadi",
    openGraph: {
        title: "About Ganesh Angadi | DevOps Engineer",
        description:
            "Systems-first DevOps portfolio of Ganesh Angadi. Creator of Fortis-CI, hackathon winner, platform engineer focused on AWS, Kubernetes, Terraform, and CI/CD automation.",
        type: "profile",
        url: `${DOMAIN}/about`,
        siteName: "Ganesh Angadi Portfolio",
        images: [
            {
                url: `${DOMAIN}/og-profile.jpg`,
                width: 800,
                height: 800,
                alt: "Ganesh Angadi - DevOps Engineer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Ganesh Angadi | DevOps Engineer",
        description:
            "Systems-first DevOps portfolio. Creator of Fortis-CI — graph-native deployment observability. AWS • Kubernetes • Terraform | 1st Place MCP Hackathon Winner",
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
        jobTitle: "DevOps Engineer",
        description:
            "DevOps and Backend Engineer focused on AWS, Kubernetes, Terraform, and CI/CD automation. Creator of Fortis-CI, an open-source graph-native deployment observability platform. 1st place MCP hackathon winner.",
        knowsAbout: [
            "Docker",
            "Kubernetes",
            "AWS",
            "Terraform",
            "Linux System Administration",
            "CI/CD Pipelines",
            "GitHub Actions",
            "System Design",
            "Deployment Observability",
            "Graph Databases",
            "Neo4j",
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

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <Navbar />
            <main style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 60, paddingLeft: 20, paddingRight: 20 }}>
                <article style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
                    {/* Glowing Orb Background */}
                    <div style={{
                        position: "absolute",
                        top: -100, left: "50%",
                        transform: "translateX(-50%)",
                        width: "100%", height: 300,
                        background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)",
                        opacity: 0.05,
                        filter: "blur(60px)",
                        pointerEvents: "none",
                        zIndex: -1
                    }} />

                    {/* Header */}
                    <header style={{ marginBottom: 36, position: "relative", zIndex: 1 }}>
                        <p style={{ fontFamily: "monospace", fontSize: 13, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 12 }}>
                            $ man ganesh
                        </p>
                        <h1 style={{
                            fontSize: "clamp(36px, 6vw, 56px)",
                            fontWeight: 800,
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                            color: "var(--fg)",
                            marginBottom: 8,
                        }}>
                            Ganesh Angadi
                        </h1>
                        <p style={{
                            fontSize: "clamp(16px, 2.5vw, 19px)",
                            fontFamily: "monospace",
                            color: "var(--muted)",
                            margin: 0,
                            fontWeight: 600
                        }}>
                            DevOps Engineer • Backend Engineer • Platform Engineering
                        </p>
                        <hr style={{ border: "none", borderTop: "1px solid var(--border)", opacity: 0.2, margin: "24px 0 0 0" }} />
                    </header>

                    {/* Content Section */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 32, fontSize: 16, lineHeight: 1.75, color: "var(--fg)" }}>
                        
                        {/* Biography */}
                        <section>
                            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--fg)", marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
                                Identity & Focus
                            </h2>
                            <p style={{ marginBottom: 16, color: "color-mix(in srgb, var(--fg) 90%, transparent)" }}>
                                Welcome to my DevOps portfolio. I design and build reliable, observable software infrastructures that fail gracefully. My work is focused on the intersection of Linux internals, container orchestration, declarative infrastructure, and real-time observability.
                            </p>
                            <p style={{ color: "color-mix(in srgb, var(--fg) 90%, transparent)" }}>
                                I believe infrastructure decisions must be explicit, measurable, and documented. Instead of building superficial features, I architect the underlying platforms that keep applications running smoothly.
                            </p>
                        </section>

                        {/* Authoritative Profile Graph */}
                        <section style={{ padding: "24px", border: "1px solid var(--border)", borderRadius: 8, background: "var(--card-bg)" }}>
                            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--fg)", marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
                                Official Identity Profiles
                            </h2>
                            <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 16 }}>
                                These are the primary accounts that construct my entity graph. Search engines can index my work through these plain-text links:
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                                <li>
                                    <strong style={{ fontFamily: "monospace", fontSize: 14 }}>🌐 Portfolio Website:</strong>{" "}
                                    <a href="https://ganeshangadi.online" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                                        https://ganeshangadi.online
                                    </a>
                                </li>
                                <li>
                                    <strong style={{ fontFamily: "monospace", fontSize: 14 }}>🐙 GitHub Profile:</strong>{" "}
                                    <a href="https://github.com/ganeshak11" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                                        https://github.com/ganeshak11
                                    </a>
                                </li>
                                <li>
                                    <strong style={{ fontFamily: "monospace", fontSize: 14 }}>💼 LinkedIn Connect:</strong>{" "}
                                    <a href="https://linkedin.com/in/ganeshangadi1301" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                                        https://linkedin.com/in/ganeshangadi1301
                                    </a>
                                </li>
                                <li>
                                    <strong style={{ fontFamily: "monospace", fontSize: 14 }}>✍️ Dev.to Articles:</strong>{" "}
                                    <a href="https://dev.to/ganeshak11" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                                        https://dev.to/ganeshak11
                                    </a>
                                </li>
                                <li>
                                    <strong style={{ fontFamily: "monospace", fontSize: 14 }}>💬 Reddit Profile:</strong>{" "}
                                    <a href="https://reddit.com/u/ganeshak11" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                                        https://reddit.com/u/ganeshak11
                                    </a>
                                </li>
                                <li>
                                    <strong style={{ fontFamily: "monospace", fontSize: 14 }}>🐦 X / Twitter Feed:</strong>{" "}
                                    <a href="https://x.com/Ganeshangadi16" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                                        https://x.com/Ganeshangadi16
                                    </a>
                                </li>
                            </ul>
                        </section>

                        {/* Projects */}
                        <section>
                            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--fg)", marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
                                Projects
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: 16 }}>
                                    <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 4px 0" }}>
                                        <a href="https://github.com/Fortis-CI/Fortis-CI" target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg)", textDecoration: "none" }}>
                                            Fortis-CI
                                        </a>
                                    </h3>
                                    <p style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 6px 0" }}>
                                        Graph-native deployment observability platform. Built on Neo4j.
                                    </p>
                                    <a href="https://github.com/Fortis-CI/Fortis-CI" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "underline" }}>
                                        Fortis-CI Repository
                                    </a>
                                </div>

                                <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: 16 }}>
                                    <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 4px 0" }}>
                                        <a href="https://github.com/Fortis-Tools" target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg)", textDecoration: "none" }}>
                                            Fortis-Tools
                                        </a>
                                    </h3>
                                    <p style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 6px 0" }}>
                                        Open-source developer tools, CLI utilities, and DevOps automation.
                                    </p>
                                    <a href="https://github.com/Fortis-Tools" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "underline" }}>
                                        Fortis-Tools Organization
                                    </a>
                                </div>

                                <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: 16 }}>
                                    <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 4px 0" }}>
                                        <a href="https://github.com/ganeshak11/MY-suru-BUS" target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg)", textDecoration: "none" }}>
                                            MY(suru) BUS
                                        </a>
                                    </h3>
                                    <p style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 6px 0" }}>
                                        Real-time city transportation platform with live GPS tracking.
                                    </p>
                                    <a href="https://github.com/ganeshak11/MY-suru-BUS" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "underline" }}>
                                        MY(suru) BUS Repository
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Core Skills */}
                        <section>
                            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--fg)", marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
                                Core Skills
                            </h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                                <div>
                                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Systems & Cloud</h4>
                                    <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>Linux, AWS, Kubernetes, Terraform, Docker, Bash, Networking</p>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Backend & Query</h4>
                                    <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>Node.js, Express, PostgreSQL, Neo4j, Redis, Supabase, Git</p>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Programming</h4>
                                    <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>TypeScript, JavaScript, Python, C, Shell Scripting</p>
                                </div>
                            </div>
                        </section>

                        {/* Timeline / Achievements */}
                        <section style={{ marginBottom: 20 }}>
                            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--fg)", marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
                                Achievements & History
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                                    <div>
                                        <strong style={{ display: "block", fontSize: 15 }}>1st Place — Model Context Protocol (MCP) Server Hackathon</strong>
                                        <span style={{ fontSize: 14, color: "var(--muted)" }}>Developed custom integrations and advanced protocol servers</span>
                                    </div>
                                    <span style={{ fontSize: 13, fontFamily: "monospace", color: "var(--accent)", flexShrink: 0 }}>2026</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                                    <div>
                                        <strong style={{ display: "block", fontSize: 15 }}>Fortis Ecosystem Core Maintainer</strong>
                                        <span style={{ fontSize: 14, color: "var(--muted)" }}>Architected deployment graphs and observability platform</span>
                                    </div>
                                    <span style={{ fontSize: 13, fontFamily: "monospace", color: "var(--accent)", flexShrink: 0 }}>Active</span>
                                </div>
                            </div>
                        </section>

                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}
