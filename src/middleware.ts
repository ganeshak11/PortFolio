import { NextRequest, NextResponse } from "next/server";

// ─── ANSI helpers ────────────────────────────────────────────────────────────
const R = "\x1b[0m";       // reset
const B = "\x1b[1m";       // bold
const DIM = "\x1b[2m";     // dim
const CYAN = "\x1b[36m";   // cyan
const GREEN = "\x1b[32m";  // green
const YELLOW = "\x1b[33m"; // yellow
const MAGENTA = "\x1b[35m";// magenta
const WHITE = "\x1b[97m";  // bright white

// ─── curl card ───────────────────────────────────────────────────────────────
function buildCard(): string {
    return [
        "",
        `${CYAN}${B}  ╔══════════════════════════════════════════════════╗${R}`,
        `${CYAN}${B}  ║${R}  ${WHITE}${B}GANESH ANGADI${R}                                   ${CYAN}${B}║${R}`,
        `${CYAN}${B}  ║${R}  ${YELLOW}DevOps Engineer  •  Creator of Fortis-CI${R}        ${CYAN}${B}║${R}`,
        `${CYAN}${B}  ╚══════════════════════════════════════════════════╝${R}`,
        "",
        `  ${GREEN}${B}About${R}`,
        `  ${DIM}────────────────────────────────────────────${R}`,
        `  Building infrastructure that doesn't break at 3AM.`,
        `  Graph-native deployment observability with Neo4j.`,
        `  1st Place — MCP Server Hackathon 2024 🏆`,
        "",
        `  ${GREEN}${B}Stack${R}`,
        `  ${DIM}────────────────────────────────────────────${R}`,
        `  ${CYAN}AWS${R}  ${CYAN}Kubernetes${R}  ${CYAN}Terraform${R}  ${CYAN}Docker${R}  ${CYAN}Linux${R}  ${CYAN}CI/CD${R}`,
        `  ${CYAN}Neo4j${R}  ${CYAN}GitHub Actions${R}  ${CYAN}Node.js${R}  ${CYAN}PostgreSQL${R}`,
        "",
        `  ${GREEN}${B}Links${R}`,
        `  ${DIM}────────────────────────────────────────────${R}`,
        `  ${MAGENTA}Web${R}       →  https://ganeshangadi.online`,
        `  ${MAGENTA}Blog${R}      →  https://ganeshangadi.online/blog`,
        `  ${MAGENTA}GitHub${R}    →  https://github.com/ganeshak11`,
        `  ${MAGENTA}LinkedIn${R}  →  https://linkedin.com/in/ganeshangadi1301`,
        "",
        `  ${GREEN}${B}Projects${R}`,
        `  ${DIM}────────────────────────────────────────────${R}`,
        `  ${YELLOW}Fortis-CI${R}   Graph-native deployment observability (Neo4j)`,
        `  ${YELLOW}MY(suru) BUS${R}  Real-time KSRTC bus tracking, React Native`,
        `  ${YELLOW}TicketFlow${R}  Event ticketing platform, microservices`,
        "",
        `  ${DIM}────────────────────────────────────────────${R}`,
        `  ${DIM}tip: open https://ganeshangadi.online in a browser${R}`,
        `  ${DIM}     for the full experience.${R}`,
        "",
    ].join("\n");
}

// ─── Slug redirects ───────────────────────────────────────────────────────────
const SLUG_REDIRECTS: Record<string, string> = {
    "My_First_Hackathon_Win":   "my-first-hackathon-win",
    "Hackathon_Internet_Block": "accidentally-blocked-the-internet",
    "How_I_Became_Linux_User":  "how-i-became-a-linux-user",
    "Distro_to_choose_from":    "which-linux-distro-to-choose",
};

// ─── Middleware ───────────────────────────────────────────────────────────────
export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const ua = req.headers.get("user-agent") || "";
    const isCurl = ua.toLowerCase().startsWith("curl");

    // Root "/" — return the card only when the request comes from curl
    if (pathname === "/" && isCurl) {
        return new Response(buildCard(), {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "X-Content-Type-Options": "nosniff",
            },
        });
    }

    // 3. 301 redirects for old underscore blog slugs → new hyphen slugs
    if (pathname.startsWith("/blog/")) {
        const slug = pathname.replace("/blog/", "").split("?")[0];
        const newSlug = SLUG_REDIRECTS[slug];
        if (newSlug) {
            const url = req.nextUrl.clone();
            url.pathname = `/blog/${newSlug}`;
            return NextResponse.redirect(url, { status: 301 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/blog/:slug*"],
};
