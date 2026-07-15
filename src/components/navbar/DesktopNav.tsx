import React from "react";
import { NAV_LINKS } from "./navData";

interface DesktopNavProps {
    theme: string;
    toggle: () => void;
    onTerminalToggle?: () => void;
}

export function DesktopNav({ theme, toggle, onTerminalToggle }: DesktopNavProps) {
    return (
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {NAV_LINKS.map((l) => (
                <a
                    key={l.href}
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "me noopener noreferrer" } : {})}
                    className="nav-underline"
                    style={{
                        fontSize: 13,
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                        color: "var(--muted)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                    {l.label}
                </a>
            ))}

            {/* Download Resume Button */}
            <button
                className="btn-slide"
                onClick={() => {
                    const resumeWindow = window.open('/resume.html', '_blank');
                    if (resumeWindow) {
                        resumeWindow.addEventListener('load', () => {
                            setTimeout(() => {
                                resumeWindow.print();
                            }, 500);
                        });
                    }
                }}
                style={{
                    fontSize: 11.5,
                    fontWeight: 500,
                    fontFamily: "monospace",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                    padding: "5px 14px",
                    border: "1.5px solid var(--accent)",
                    color: "var(--accent)",
                    background: "transparent",
                    borderRadius: 4,
                    cursor: "pointer",
                }}
            >
                ↓ CV
            </button>

            {/* Terminal Mode Toggle */}
            {onTerminalToggle && (
                <button
                    onClick={onTerminalToggle}
                    aria-label="Toggle terminal mode"
                    style={{
                        background: "none",
                        border: "1px solid var(--border)",
                        borderRadius: 4,
                        padding: "4px 10px",
                        cursor: "pointer",
                        fontSize: 12,
                        fontFamily: "monospace",
                        color: "var(--accent-2)",
                        letterSpacing: "0.05em",
                        transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent-2)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                    }}
                >
                    [terminal]
                </button>
            )}

            {/* Theme toggle */}
            <button
                onClick={toggle}
                aria-label="Toggle theme"
                style={{
                    background: "none",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    padding: "4px 10px",
                    cursor: "pointer",
                    fontSize: 12,
                    fontFamily: "monospace",
                    color: "var(--accent)",
                    letterSpacing: "0.05em",
                    transition: "border-color 0.2s, color 0.2s",
                }}
            >
                {theme === "dark" ? "[light]" : "[dark]"}
            </button>
        </div>
    );
}
