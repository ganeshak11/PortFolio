"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { href: "#about", label: "About" },
    { href: "#project", label: "Project" },
    { href: "#stack", label: "Stack" },
    { href: "#contact", label: "Contact" },
    { href: "/resume.html", label: "Resume", external: true },
];

const RESUME_PDF_PATH = "/Resume/Ganesh Angadi — Resume.pdf";

export default function Navbar({ onTerminalToggle }: { onTerminalToggle?: () => void }) {
    const { theme, toggle } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <>
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

                    {/* Desktop Nav */}
                    <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        {NAV_LINKS.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                {...((l as any).external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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

                        {/* Download Resume Button */}
                        <a
                            href={RESUME_PDF_PATH}
                            download
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
                                textDecoration: "none",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "var(--accent)";
                                e.currentTarget.style.color = "var(--bg)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "var(--accent)";
                            }}
                        >
                            ↓ CV
                        </a>

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

                    {/* Mobile Hamburger */}
                    <button
                        className="mobile-hamburger"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 8,
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <span style={{
                                width: 24,
                                height: 2,
                                background: "var(--accent)",
                                transition: "all 0.3s",
                                transform: mobileMenuOpen ? "rotate(45deg) translateY(6px)" : "none",
                            }} />
                            <span style={{
                                width: 24,
                                height: 2,
                                background: "var(--accent)",
                                transition: "all 0.3s",
                                opacity: mobileMenuOpen ? 0 : 1,
                            }} />
                            <span style={{
                                width: 24,
                                height: 2,
                                background: "var(--accent)",
                                transition: "all 0.3s",
                                transform: mobileMenuOpen ? "rotate(-45deg) translateY(-6px)" : "none",
                            }} />
                        </div>
                    </button>
                </nav>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "fixed",
                            top: 56,
                            right: 0,
                            bottom: 0,
                            width: "80%",
                            maxWidth: 300,
                            background: "var(--bg)",
                            borderLeft: "1px solid var(--border)",
                            zIndex: 49,
                            padding: "24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                        }}
                    >
                        {NAV_LINKS.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                {...((l as any).external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: 14,
                                    fontWeight: 500,
                                    letterSpacing: "0.05em",
                                    color: "var(--fg)",
                                    textDecoration: "none",
                                    padding: "12px 0",
                                    borderBottom: "1px solid var(--border)",
                                }}
                            >
                                {l.label}
                            </a>
                        ))}

                        <a
                            href={RESUME_PDF_PATH}
                            download
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                                fontFamily: "monospace",
                                fontSize: 12,
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase" as const,
                                padding: "10px 20px",
                                border: "1.5px solid var(--accent)",
                                color: "var(--accent)",
                                background: "transparent",
                                borderRadius: 4,
                                textDecoration: "none",
                                textAlign: "center",
                            }}
                        >
                            ↓ Download CV
                        </a>

                        {onTerminalToggle && (
                            <button
                                onClick={() => {
                                    onTerminalToggle();
                                    setMobileMenuOpen(false);
                                }}
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: 12,
                                    padding: "10px 20px",
                                    border: "1px solid var(--border)",
                                    color: "var(--accent-2)",
                                    background: "transparent",
                                    borderRadius: 4,
                                    cursor: "pointer",
                                }}
                            >
                                [terminal mode]
                            </button>
                        )}

                        <button
                            onClick={() => {
                                toggle();
                                setMobileMenuOpen(false);
                            }}
                            style={{
                                fontFamily: "monospace",
                                fontSize: 12,
                                padding: "10px 20px",
                                border: "1px solid var(--border)",
                                color: "var(--accent)",
                                background: "transparent",
                                borderRadius: 4,
                                cursor: "pointer",
                            }}
                        >
                            {theme === "dark" ? "[light mode]" : "[dark mode]"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
