"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { href: "#about", label: "About" },
    { href: "#achievements", label: "Awards" },
    { href: "#projects", label: "Projects" },
    { href: "#stack", label: "Stack" },
    { href: "/blog", label: "Blog" },
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
                            letterSpacing: "0.05em",
                            color: "var(--accent)",
                            textDecoration: "none",
                        }}
                    >
                        ~/ganesh
                    </Link>

                    {/* Desktop Nav */}
                    <DesktopNav theme={theme} toggle={toggle} onTerminalToggle={onTerminalToggle} />

                    {/* Mobile Hamburger & Menu */}
                    <MobileNav
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}
                        theme={theme}
                        toggle={toggle}
                        onTerminalToggle={onTerminalToggle}
                    />
                </nav>
            </header>
        </>
    );
}
