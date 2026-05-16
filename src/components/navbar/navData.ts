export interface NavLink {
    href: string;
    label: string;
    external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
    { href: "#about", label: "About" },
    { href: "#achievements", label: "Awards" },
    { href: "#projects", label: "Projects" },
    { href: "#stack", label: "Stack" },
    { href: "#thinking", label: "Thinking" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
];

