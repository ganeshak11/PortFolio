"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "./navbar/navData";
import { useScrambleHover } from "@/lib/useScrambleHover";

const SECTION_IDS = ["hero", "about", "achievements", "projects", "stack", "github-metrics", "latest-blogs", "thinking", "services", "contact"];
const PRIMARY = ["#about", "#projects", "#contact","#achievements","#stack","#thinking","#services","/blog"]; // Primary sections to highlight
const UTILITY = [""];

export default function Navbar() {
    const [active, setActive] = useState<string>("");
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const pathname = usePathname();
    const isHome = pathname === "/";
    const lockedRef = useRef(false);

    const resolveHref = (href: string) => {
        if (href.startsWith("/")) return href;
        return isHome ? href : `/${href}`;
    };

    const handleNavClick = (sectionId: string) => {
        if (!sectionId.startsWith("/")) {
            setActive(sectionId);
            lockedRef.current = true;
            setTimeout(() => { lockedRef.current = false; }, 1000);
        }
    };

    // Track active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (lockedRef.current) return;
            let current = "";
            SECTION_IDS.forEach((id) => {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= window.innerHeight * 0.4) {
                        current = id;
                    }
                }
            });
            if (current) setActive(current);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Move indicator to active link
    useEffect(() => {
        const activeLink = NAV_LINKS.find(
            (l) => l.href === `#${active}`
                || (active === "hero" && l.href === "#about")
                || (active === "github-metrics" && l.href === "#stack")
                || (active === "latest-blogs" && l.href === "/blog")
        );
        if (!activeLink) return;

        const key = activeLink.href;
        const el = linkRefs.current[key];
        const nav = navRef.current;
        if (!el || !nav) return;

        const navRect = nav.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        setIndicatorStyle({
            left: elRect.left - navRect.left,
            width: elRect.width,
        });
    }, [active]);

    return (
        <>
            {/* ── Desktop floating dock ── */}
            <header
                style={{
                    position: "fixed",
                    top: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 50,
                    display: "flex",
                }}
                className="desktop-nav"
            >
                <div
                    ref={navRef}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        padding: "4px 8px",
                        background: "var(--card-bg)",
                        border: "1px solid var(--border)",
                        borderRadius: 999,
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: "0 2px 16px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)",
                        position: "relative",
                    }}
                >
                    {/* Animated pill indicator */}
                    <AnimatePresence>
                        {indicatorStyle.width > 0 && (
                            <m.div
                                layoutId="nav-indicator"
                                initial={false}
                                animate={{
                                    left: indicatorStyle.left,
                                    width: indicatorStyle.width,
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                style={{
                                    position: "absolute",
                                    top: 6,
                                    height: "calc(100% - 12px)",
                                    background: "var(--accent)",
                                    borderRadius: 999,
                                    zIndex: 0,
                                    opacity: 0.15,
                                }}
                            />
                        )}
                    </AnimatePresence>

                    {NAV_LINKS.map((link) => {
                        const sectionId = link.href.replace("#", "");
                        const isActive = active === sectionId
                                || (active === "hero" && link.href === "#about")
                                || (active === "github-metrics" && link.href === "#stack")
                                || (active === "latest-blogs" && link.href === "/blog");
                        const isUtility = UTILITY.includes(link.href);
                        const isPrimary = PRIMARY.includes(link.href);

                        return (
                            <NavItem
                                key={link.href}
                                link={link}
                                isActive={isActive}
                                isUtility={isUtility}
                                isPrimary={isPrimary}
                                resolveHref={resolveHref}
                                linkRefs={linkRefs}
                                handleNavClick={handleNavClick}
                            />
                        );
                    })}
                </div>
            </header>

            {/* ── Mobile hamburger ── */}
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: "12px 20px",
                    background: mobileOpen ? "var(--bg)" : "transparent",
                    borderBottom: mobileOpen ? "1px solid var(--border)" : "none",
                    transition: "background 0.2s",
                }}
                className="mobile-hamburger"
            >
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    style={{ 
                        background: "var(--card-bg)", 
                        border: "1px solid var(--border)", 
                        borderRadius: 12, 
                        cursor: "pointer", 
                        padding: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {[0, 1, 2].map((i) => (
                            <span key={i} style={{
                                width: 24, height: 2,
                                background: "var(--accent)",
                                display: "block",
                                transition: "transform 0.3s, opacity 0.3s",
                                transform: mobileOpen
                                    ? i === 0 ? "rotate(45deg) translateY(6px)"
                                    : i === 2 ? "rotate(-45deg) translateY(-6px)"
                                    : "none"
                                    : "none",
                                opacity: mobileOpen && i === 1 ? 0 : 1,
                            }} />
                        ))}
                    </div>
                </button>
            </header>

            {/* ── Mobile menu ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <m.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: "fixed",
                            top: 52,
                            left: 0,
                            right: 0,
                            zIndex: 49,
                            background: "var(--bg)",
                            borderBottom: "1px solid var(--border)",
                            padding: "16px 24px 24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 0,
                        }}
                    >
                        {NAV_LINKS.map((link, i) => (
                            <m.a
                                key={link.href}
                                href={resolveHref(link.href)}
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06 }}
                                onClick={() => { setMobileOpen(false); handleNavClick(link.href.replace("#", "")); }}
                                style={{
                                    fontSize: 15,
                                    fontWeight: 500,
                                    color: "var(--fg)",
                                    textDecoration: "none",
                                    padding: "14px 0",
                                    borderBottom: "1px solid var(--border)",
                                    letterSpacing: "0.02em",
                                }}
                            >
                                {link.label}
                            </m.a>
                        ))}
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}

function NavItem({ 
    link, 
    isActive, 
    isUtility, 
    isPrimary, 
    resolveHref, 
    linkRefs, 
    handleNavClick 
}: any) {
    const { display, setIsHovering } = useScrambleHover(link.label);
    
    return (
        <a
            href={resolveHref(link.href)}
            ref={(el) => { linkRefs.current[link.href] = el; }}
            onClick={() => handleNavClick(link.href.replace("#", ""))}
            style={{
                position: "relative",
                zIndex: 1,
                fontSize: isUtility ? 11 : isPrimary ? 12 : 11,
                fontWeight: isActive ? 600 : isPrimary ? 500 : 400,
                letterSpacing: "0.03em",
                color: isActive ? "var(--accent)" : isUtility ? "var(--muted)" : isPrimary ? "var(--fg)" : "var(--muted)",
                opacity: isUtility ? 0.6 : 1,
                textDecoration: "none",
                padding: isUtility ? "5px 8px" : "5px 10px",
                borderRadius: 999,
                transition: "color 0.2s, opacity 0.2s",
                whiteSpace: "nowrap",
                fontFamily: "monospace",
            }}
            onMouseEnter={(e) => { 
                setIsHovering(true);
                e.currentTarget.style.color = "var(--fg)"; 
                e.currentTarget.style.opacity = "1"; 
            }}
            onMouseLeave={(e) => { 
                setIsHovering(false);
                e.currentTarget.style.color = isActive ? "var(--accent)" : isUtility ? "var(--muted)" : isPrimary ? "var(--fg)" : "var(--muted)"; 
                e.currentTarget.style.opacity = isUtility ? "0.6" : "1"; 
            }}
        >
            {display}
        </a>
    );
}
