"use client";

// The navbar as Frost's Dynamic Island: a black pill at the top centre.
//  - Desktop: open (logo, links, resume) at the top of the page, on hover and while focused;
//    while you scroll it shrinks to a compact pill with the current section and a progress ring.
//  - Phones: always the compact pill; a tap opens it into a menu.
// Which parts show is decided in CSS from data-mode, so the server render is already right.

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { FileText, X } from "lucide-react";
import { NAV_LINKS } from "./navbar/navData";

const SECTIONS: { id: string; label: string }[] = [
    { id: "hero", label: "Home" },
    { id: "about", label: "01 · About" },
    { id: "achievements", label: "02 · Experience" },
    { id: "fortis", label: "03 · Fortis" },
    { id: "projects", label: "04 · Projects" },
    { id: "latest-blogs", label: "05 · Writing" },
    { id: "contact", label: "06 · Contact" },
];

const SPRING = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.8 };

function istTime() {
    return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
}

// reading: on a blog post the compact island becomes a live "Reading · 42%" activity.
export default function Navbar({ reading = false }: { reading?: boolean }) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    const [active, setActive] = useState("");          // section id on the home page, or "/blog"
    const [atTop, setAtTop] = useState(true);
    const [progress, setProgress] = useState(0);
    const [hover, setHover] = useState(false);
    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);          // phones: menu open
    const [wide, setWide] = useState(true);
    const [time, setTime] = useState<string | null>(null);
    const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const islandRef = useRef<HTMLElement>(null);

    const resolveHref = (href: string) => (href.startsWith("/") || isHome ? href : `/${href}`);
    const isActive = (href: string) => (href.startsWith("/") ? active === href : active === href.slice(1));

    // Wide screen or phone
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 900px)");
        const apply = () => { setWide(mq.matches); if (mq.matches) setOpen(false); };
        apply();
        mq.addEventListener("change", apply);
        return () => mq.removeEventListener("change", apply);
    }, []);

    // Scroll: top of page, progress, current section
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setAtTop(y < 80);
            setProgress(max > 0 ? Math.min(1, y / max) : 0);
            if (isHome) {
                let current = "";
                for (const { id } of SECTIONS) {
                    const el = document.getElementById(id);
                    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
                }
                setActive(current);
            }
        };
        if (!isHome) setActive(pathname.startsWith("/blog") ? "/blog" : "");
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
    }, [isHome, pathname]);

    // Mysuru time for the idle island
    useEffect(() => {
        setTime(istTime());
        const t = setInterval(() => setTime(istTime()), 15000);
        return () => clearInterval(t);
    }, []);

    // Phones: close on Escape or a tap outside
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        const onDown = (e: PointerEvent) => { if (!islandRef.current?.contains(e.target as Node)) setOpen(false); };
        window.addEventListener("keydown", onKey);
        window.addEventListener("pointerdown", onDown);
        return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("pointerdown", onDown); };
    }, [open]);

    const mode = wide ? (atTop || hover || focused ? "full" : "compact") : (open ? "open" : "compact");

    const pageLabel = pathname.startsWith("/blog") ? "Blog" : pathname.startsWith("/about") ? "About" : "";
    const sectionLabel = SECTIONS.find((s) => s.id === active)?.label;
    const label = reading
        ? `Reading · ${Math.round(progress * 100)}%`
        : isHome ? (sectionLabel && active !== "hero" ? sectionLabel : null) : pageLabel || null;

    const R = 8, C = 2 * Math.PI * R;

    return (
        <header className="island-wrap">
            <m.nav
                ref={islandRef}
                layout
                transition={SPRING}
                style={{ borderRadius: mode === "open" ? 26 : 999 }}
                className="island"
                data-mode={mode}
                aria-label="Primary"
                onMouseEnter={() => { if (leaveTimer.current) clearTimeout(leaveTimer.current); setHover(true); }}
                onMouseLeave={() => { leaveTimer.current = setTimeout(() => setHover(false), 220); }}
                onFocus={() => setFocused(true)}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false); }}
            >
                <m.div layout="position" transition={SPRING} className="i-head">
                    <Link href="/" className="i-brand" aria-label="Ganesh Angadi — home" onClick={() => setOpen(false)}>
                        <span className="i-mark" aria-hidden="true">g</span>
                        <span className="i-name">ganesh</span>
                    </Link>

                    {/* compact: what's live right now. On phones it is the button that opens the menu. */}
                    <button
                        type="button"
                        className="i-toggle"
                        onClick={() => (wide ? setHover(true) : setOpen(true))}
                        aria-expanded={mode === "open"}
                        aria-controls="island-links"
                        aria-label={`Open navigation${label ? `, currently at ${label}` : ""}`}
                    >
                        <span className="i-live" aria-hidden="true" />
                        <span className="i-label">{label ?? (time ? `Mysuru · ${time}` : "Menu")}</span>
                        <svg className="i-ring" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                            <circle cx="10" cy="10" r={R} className="i-ring-bg" />
                            <circle cx="10" cy="10" r={R} className="i-ring-fg" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} />
                        </svg>
                    </button>

                    <button type="button" className="i-close" onClick={() => setOpen(false)} aria-label="Close navigation">
                        <X size={16} />
                    </button>
                </m.div>

                <m.div layout="position" transition={SPRING} className="i-links" id="island-links">
                    {NAV_LINKS.map((l, i) => (
                        <a
                            key={l.href}
                            href={resolveHref(l.href)}
                            className={isActive(l.href) ? "active" : undefined}
                            aria-current={isActive(l.href) ? "true" : undefined}
                            onClick={() => setOpen(false)}
                        >
                            {l.label}
                            <span className="i-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                        </a>
                    ))}
                    <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="i-resume" aria-label="Open resume" title="Resume">
                        <FileText size={14} /> <span>Resume</span>
                    </a>
                </m.div>
            </m.nav>
        </header>
    );
}
