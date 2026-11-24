export interface NavLink {
    href: string;
    label: string;
    external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
    { href: "#about", label: "About" },
    { href: "#achievements", label: "Experience" },
    { href: "#fortis", label: "Fortis" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
];
