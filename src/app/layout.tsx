import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClientProviders } from "@/components/ClientProviders";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const rufscript = localFont({
  src: "./fonts/Rufscript.ttf",
  variable: "--font-rufscript",
  display: "swap",
});

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark")document.documentElement.classList.add("dark")}catch(e){document.documentElement.classList.add("dark")}})();`;

export const metadata: Metadata = {
  title: "Ganesh Angadi | Systems Engineer | Rust • Linux • Security • Infrastructure",
  description:
    "Systems engineer building Fortis Ecosystem: a privacy-first vault, autofill, fingerprint sudo and laptop remote for an Android phone and Linux laptops, over Tailscale with no cloud. Rust, Linux, security and infrastructure (Docker, CI/CD, Terraform, AWS). 1st place MCP hackathon.",
  keywords: [
    "Ganesh Angadi",
    "ganesh angadi",
    "ganeshak11",
    "Ganesh Raju Angadi",
    "Systems Engineer",
    "DevOps Engineer",
    "DevOps portfolio",
    "student devops portfolio",
    "aws devops portfolio",
    "kubernetes portfolio",
    "terraform portfolio",
    "devops engineer portfolio india",
    "Fortis Ecosystem",
    "Fortis-OS",
    "privacy-first password manager",
    "fingerprint sudo",
    "Tailscale",
    "Rust",
    "Docker",
    "Kubernetes",
    "AWS",
    "Terraform",
    "Linux",
    "CI/CD",
    "GitHub Actions",
    "System Design",
    "MCP Server",
    "Model Context Protocol",
    "Node.js",
    "PostgreSQL",
    "Neo4j",
    "Next.js",
    "DevOps automation",
    "1st place hackathon winner",
  ],
  authors: [{ name: "Ganesh Angadi" }],
  creator: "Ganesh Angadi",
  openGraph: {
    title: "Ganesh Angadi | Systems Engineer | Building Fortis Ecosystem",
    description: "Systems engineer building Fortis Ecosystem: a privacy-first vault, autofill, fingerprint sudo and laptop remote for an Android phone and Linux laptops, over Tailscale with no cloud. Rust, Linux, security and infrastructure (Docker, CI/CD, Terraform, AWS). 1st place MCP hackathon.",
    type: "website",
    url: "https://ganeshangadi.online",
    siteName: "Ganesh Angadi Portfolio",
    images: [
      {
        url: "https://ganeshangadi.online/og-profile.jpg",
        width: 800,
        height: 800,
        alt: "Ganesh Angadi - Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh Angadi | Systems Engineer | Building Fortis Ecosystem",
    description: "Systems engineer building Fortis Ecosystem, a privacy-first phone + Linux laptop platform over Tailscale. Rust • Linux • Security • Infrastructure | 1st place MCP hackathon",
    images: ["https://ganeshangadi.online/og-profile.jpg"],
    creator: "@ganeshak11",
  },
  metadataBase: new URL("https://ganeshangadi.online"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ganesh Angadi",
    alternateName: "ganeshak11",
    url: "https://ganeshangadi.online",
    image: "https://ganeshangadi.online/profile.png",
    jobTitle: "Systems Engineer",
    description:
      "Systems engineer building Fortis Ecosystem: a privacy-first vault, autofill, fingerprint sudo and laptop remote for an Android phone and Linux laptops, over Tailscale with no cloud. Rust, Linux, security and infrastructure (Docker, CI/CD, Terraform, AWS). 1st place MCP hackathon.",
    knowsAbout: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Terraform",
      "Linux System Administration",
      "CI/CD Pipelines",
      "GitHub Actions",
      "System Design",
      "Applied Cryptography",
      "Rust",
      "Android",
      "Linux PAM",
      "Model Context Protocol (MCP)",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Bash",
      "System Architecture",
      "DevOps Automation",
      "Container Orchestration",
    ],
    sameAs: [
      "https://github.com/ganeshak11",
      "https://linkedin.com/in/ganeshangadi1301",
      "https://dev.to/ganeshak11",
      "https://reddit.com/u/ganeshak11",
      "https://x.com/Ganeshangadi16"
    ],
    award: "1st Place - MCP Server Hackathon 2026",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ganesh Angadi Portfolio",
    url: "https://ganeshangadi.online",
    description: "Portfolio and blog of Ganesh Angadi, systems engineer and builder of Fortis Ecosystem.",
    author: { "@type": "Person", name: "Ganesh Angadi" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://ganeshangadi.online/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const fortisSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Fortis Ecosystem",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Linux, Android",
    description:
      "A privacy-first system for an Android phone and Linux laptops: encrypted password vault with autofill, TOTP codes, fingerprint-approved sudo, laptop remote control, phone-as-webcam and encrypted backups, joined over Tailscale with no cloud service in between.",
    author: { "@type": "Person", name: "Ganesh Angadi", url: "https://ganeshangadi.online" },
    url: "https://github.com/Fortis-OS/fortis-ecosystem",
    keywords: "password manager, fingerprint sudo, PAM, Tailscale, Rust, Android, privacy",
  };

  const jsonLd = [personSchema, websiteSchema, fortisSchema];

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable} ${rufscript.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="me" href="https://github.com/ganeshak11" />
        <link rel="me" href="https://linkedin.com/in/ganeshangadi1301" />
        <link rel="me" href="https://dev.to/ganeshak11" />
        <link rel="me" href="https://reddit.com/u/ganeshak11" />
        <link rel="me" href="https://x.com/Ganeshangadi16" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <ClientProviders>
            {children}
          </ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
