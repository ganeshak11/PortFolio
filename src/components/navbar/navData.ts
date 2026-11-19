export interface NavLink {
    href: string;
    label: string;
    external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
    { href: "#about", label: "About" },
    { href: "#fortis", label: "Fortis" },
    { href: "#achievements", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#latest-blogs", label: "Writing" },
    { href: "#contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
];
