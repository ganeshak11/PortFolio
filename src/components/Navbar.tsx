"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { NAV_LINKS } from "./navbar/navData";

const SECTION_IDS = ["hero", "about", "achievements", "fortis", "projects", "latest-blogs", "contact"];

export default function Navbar() {
    const [active, setActive] = useState<string>("");
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";

    const resolveHref = (href: string) => (href.startsWith("/") || isHome ? href : `/${href}`);

    useEffect(() => {
        if (!isHome) {
            setActive(pathname.startsWith("/blog") ? "/blog" : "");
            return;
        }
        const onScroll = () => {
            let current = "";
            for (const id of SECTION_IDS) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
            }
            setActive(current);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHome, pathname]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const isActive = (href: string) => (href.startsWith("/") ? active === href : active === href.slice(1));

    return (
        <>
            <header className="topbar">
                <div className="wrap topbar-inner">
                    <Link href="/" className="brand" aria-label="Ganesh Angadi — home">
                        <span className="brand-mark" aria-hidden="true">g</span>
                        <span className="brand-name">ganesh</span>
                    </Link>

                    <nav className="topnav" aria-label="Primary">
                        {NAV_LINKS.map((l) => (
                            <a key={l.href} href={resolveHref(l.href)} className={isActive(l.href) ? "active" : undefined}>
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    <div className="topbar-actions">
                        <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="Open resume" title="Resume">
                            <FileText size={15} />
                        </a>
                        <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
                            {open ? <X size={16} /> : <Menu size={16} />}
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <m.nav
                        className="mobile-sheet"
                        aria-label="Mobile"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {NAV_LINKS.map((l, i) => (
                            <a key={l.href} href={resolveHref(l.href)} onClick={() => setOpen(false)}>
                                {l.label}
                                <span>{String(i + 1).padStart(2, "0")}</span>
                            </a>
                        ))}
                    </m.nav>
                )}
            </AnimatePresence>
        </>
    );
}
