import React from "react";
import { m, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "./navData";

interface MobileNavProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    theme: string;
    toggle: () => void;
    onTerminalToggle?: () => void;
}

export function MobileNav({
    mobileMenuOpen,
    setMobileMenuOpen,
    theme,
    toggle,
    onTerminalToggle,
}: MobileNavProps) {
    return (
        <>
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
                    <span
                        style={{
                            width: 24,
                            height: 2,
                            background: "var(--accent)",
                            transition:
                                "opacity 0.3s, transform 0.3s, color 0.3s, background-color 0.3s, border-color 0.3s",
                            transform: mobileMenuOpen
                                ? "rotate(45deg) translateY(6px)"
                                : "none",
                        }}
                    />
                    <span
                        style={{
                            width: 24,
                            height: 2,
                            background: "var(--accent)",
                            transition:
                                "opacity 0.3s, transform 0.3s, color 0.3s, background-color 0.3s, border-color 0.3s",
                            opacity: mobileMenuOpen ? 0 : 1,
                        }}
                    />
                    <span
                        style={{
                            width: 24,
                            height: 2,
                            background: "var(--accent)",
                            transition:
                                "opacity 0.3s, transform 0.3s, color 0.3s, background-color 0.3s, border-color 0.3s",
                            transform: mobileMenuOpen
                                ? "rotate(-45deg) translateY(-6px)"
                                : "none",
                        }}
                    />
                </div>
            </button>

            {/* Mobile Menu Content */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <m.div
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
                                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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

                        <button
                            onClick={() => {
                                const resumeWindow = window.open('/resume.html', '_blank');
                                if (resumeWindow) {
                                    resumeWindow.addEventListener('load', () => {
                                        setTimeout(() => {
                                            resumeWindow.print();
                                        }, 500);
                                    });
                                }
                                setMobileMenuOpen(false);
                            }}
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
                                cursor: "pointer",
                                textAlign: "center" as const,
                            }}
                        >
                            ↓ Download CV
                        </button>

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
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}
