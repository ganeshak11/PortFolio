"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { SectionHead, Reveal } from "@/components/ui/SectionHead";

type GraphTheme = "gitblock" | "green" | "season" | "south-season" | "night-green" | "night-rainbow";

const THEME_FILES: Record<GraphTheme, string> = {
    "gitblock": "gitblock.svg",
    "green": "green-animate.svg",
    "season": "season-animate.svg",
    "south-season": "south-season-animate.svg",
    "night-green": "night-green.svg",
    "night-rainbow": "night-rainbow.svg"
};

export default function GithubMetrics() {
    const { theme } = useTheme();
    const [activeGraphTheme, setActiveGraphTheme] = useState<GraphTheme>("gitblock");

    const isDark = theme === "dark";

    // Stats card colours follow the Frost palette
    const bgColor = isDark ? "17181D" : "ffffff";
    const titleColor = isDark ? "ECECF1" : "1E1F24";
    const textColor = isDark ? "C9CAD2" : "3A3B42";
    const iconColor = isDark ? "F21D43" : "D3153A";
    const borderColor = isDark ? "26272E" : "DDDDE3";

    const statsUrl = `https://github-readme-stats-rho-six-90.vercel.app/api?username=ganeshak11&show_icons=true&bg_color=${bgColor}&title_color=${titleColor}&text_color=${textColor}&icon_color=${iconColor}&border_color=${borderColor}&count_private=true`;
    const langsUrl = `https://github-readme-stats-rho-six-90.vercel.app/api/top-langs/?username=ganeshak11&layout=compact&bg_color=${bgColor}&title_color=${titleColor}&text_color=${textColor}&border_color=${borderColor}`;

    // 3D animated contribution graph URL
    const github3dUrl = `https://raw.githubusercontent.com/ganeshak11/ganeshak11/main/profile-3d-contrib/profile-${THEME_FILES[activeGraphTheme]}`;

    return (
        <section id="github-metrics" className="section">
            <div className="wrap">
                <SectionHead index="06" cmd="tail -f /var/log/github/metrics.log" title={<>GitHub contributions &amp; <em>stats</em></>} />

                <Reveal className="panel">
                    <div className="panel-bar">
                        <span className="win-dots" aria-hidden="true"><i /><i /><i /></span>
                        <span className="title">github_metrics.log</span>
                        <span>@ganeshak11</span>
                    </div>
                    <div className="gh-body">
                        <div className="gh-stats">
                            <img src={statsUrl} alt="GitHub Stats" loading="lazy" />
                            <img src={langsUrl} alt="Top Languages" loading="lazy" />
                        </div>

                        <div style={{ borderTop: "1px dashed var(--border)", paddingTop: 22, display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", width: "100%" }}>
                                <span className="mono" style={{ fontSize: 12.5, color: "var(--fg-2)", overflowWrap: "anywhere" }}>
                                    <span style={{ color: "var(--accent)" }}>$</span> render-3d-contrib --theme={activeGraphTheme}
                                </span>
                                <div className="seg" role="group" aria-label="Contribution graph theme">
                                    {(Object.keys(THEME_FILES) as GraphTheme[]).map((t) => (
                                        <button key={t} onClick={() => setActiveGraphTheme(t)} aria-pressed={activeGraphTheme === t}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <img
                                src={github3dUrl}
                                alt="3D Contribution Graph"
                                style={{ width: "100%", height: "auto", maxWidth: 820, borderRadius: 8 }}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
