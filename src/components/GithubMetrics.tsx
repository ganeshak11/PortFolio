"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function GithubMetrics() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const { theme } = useTheme();

    const isDark = theme === "dark";

    // Dynamic stats card parameters to match monochromatic themes
    const bgColor = isDark ? "111111" : "f5f5f5";
    const titleColor = isDark ? "ffffff" : "000000";
    const textColor = isDark ? "cccccc" : "333333";
    const iconColor = isDark ? "ffffff" : "000000";
    const borderColor = isDark ? "333333" : "000000";

    const statsUrl = `https://github-readme-stats-rho-six-90.vercel.app/api?username=ganeshak11&show_icons=true&bg_color=${bgColor}&title_color=${titleColor}&text_color=${textColor}&icon_color=${iconColor}&border_color=${borderColor}&count_private=true`;
    const langsUrl = `https://github-readme-stats-rho-six-90.vercel.app/api/top-langs/?username=ganeshak11&layout=compact&bg_color=${bgColor}&title_color=${titleColor}&text_color=${textColor}&border_color=${borderColor}`;

    // 3D contribution graph URL
    const github3dUrl = isDark
        ? "https://raw.githubusercontent.com/ganeshak11/ganeshak11/main/profile-3d-contrib/profile-night-view.svg"
        : "https://raw.githubusercontent.com/ganeshak11/ganeshak11/main/profile-3d-contrib/profile-green.svg";

    return (
        <section ref={ref} id="github-metrics" style={{ padding: "80px 24px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 40 }}
                >
                    <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 12 }}>
                        $ tail -f /var/log/github/metrics.log
                    </p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                        GitHub Contributions &amp; Stats
                    </h2>
                </m.div>

                <m.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.2s ease-in-out"
                    }}
                >
                    {/* Terminal Titlebar */}
                    <div style={{
                        height: 32,
                        background: "color-mix(in srgb, var(--fg) 3%, transparent)",
                        borderBottom: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 16px",
                        position: "relative"
                    }}>
                        <div style={{ display: "flex", gap: 6 }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f56" }} />
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e" }} />
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27c93f" }} />
                        </div>
                        <span style={{
                            fontFamily: "monospace",
                            fontSize: 11,
                            color: "var(--muted)",
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            letterSpacing: "0.02em"
                        }}>
                            github_metrics.log
                        </span>
                    </div>

                    {/* Terminal Body */}
                    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 24 }}>
                        {/* Command Line prompt */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ color: "var(--accent)", fontFamily: "monospace", fontSize: 13, fontWeight: 700 }}>$</span>
                            <span style={{ fontFamily: "monospace", fontSize: 13, color: "var(--fg)" }}>
                                cat github_metrics.log
                            </span>
                        </div>

                        {/* Stats Cards Grid */}
                        <div className="github-stats-grid" style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: 20,
                            justifyItems: "center"
                        }}>
                            <img
                                src={statsUrl}
                                alt="GitHub Stats"
                                style={{ width: "100%", height: "auto", maxWidth: "450px", border: "none", borderRadius: "6px" }}
                                loading="lazy"
                            />
                            <img
                                src={langsUrl}
                                alt="Top Languages"
                                style={{ width: "100%", height: "auto", maxWidth: "450px", border: "none", borderRadius: "6px" }}
                                loading="lazy"
                            />
                        </div>

                        {/* 3D Contribution Graph */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                            alignItems: "center",
                            borderTop: "1px dashed var(--border)",
                            paddingTop: 24,
                            width: "100%"
                        }}>
                            <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                <span style={{ color: "var(--accent)", fontFamily: "monospace", fontSize: 13, fontWeight: 700 }}>$</span>
                                <span style={{ fontFamily: "monospace", fontSize: 13, color: "var(--fg)" }}>
                                    render-3d-contrib-graph --theme={isDark ? "night" : "green"}
                                </span>
                            </div>
                            <img
                                src={github3dUrl}
                                alt="3D Contribution Graph"
                                style={{ width: "100%", height: "auto", maxWidth: "800px", borderRadius: "6px" }}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </m.div>
            </div>
        </section>
    );
}
