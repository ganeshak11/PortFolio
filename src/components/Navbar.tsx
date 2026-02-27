"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";

const NAV_LINKS = [
    { href: "#about", label: "About" },
    { href: "#project", label: "Project" },
    { href: "#stack", label: "Stack" },
    { href: "#contact", label: "Contact" },
];

export default function Navbar({ onTerminalToggle }: { onTerminalToggle?: () => void }) {
    const { theme, toggle } = useTheme();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: "background 0.3s, border-color 0.3s",
                background: scrolled ? "var(--bg)" : "transparent",
                borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
            }}
        >
            <nav
                style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "0 24px",
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Wordmark */}
                <Link
                    href="/"
                    style={{
                        fontFamily: "monospace",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        color: "var(--accent)",
                        textDecoration: "none",
                    }}
                >
                    ~/ganesh
                </Link>

                {/* Nav links */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {NAV_LINKS.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="nav-link"
                            style={{
                                fontSize: 13,
                                fontWeight: 500,
                                letterSpacing: "0.05em",
                                color: "var(--muted)",
                                textDecoration: "none",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "var(--muted)")
                            }
                        >
                            {l.label}
                        </a>
                    ))}

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
            </nav>
        </header>
    );
}
