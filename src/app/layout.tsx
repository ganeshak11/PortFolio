import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClientProviders } from "@/components/ClientProviders";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ganesh Angadi | DevOps Engineer | AWS • Kubernetes • Terraform • CI/CD",
  description:
    "Creator of Fortis-CI, an open-source graph-native deployment observability platform. DevOps engineer focused on AWS, Kubernetes, Terraform, and CI/CD automation. 1st place MCP hackathon winner.",
  keywords: [
    "Ganesh Angadi",
    "ganesh angadi",
    "ganeshak11",
    "Ganesh Raju Angadi",
    "DevOps Engineer",
    "DevOps portfolio",
    "student devops portfolio",
    "aws devops portfolio",
    "kubernetes portfolio",
    "terraform portfolio",
    "devops engineer portfolio india",
    "Fortis-CI",
    "graph native observability",
    "deployment observability",
    "neo4j observability",
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
    title: "Ganesh Angadi | DevOps Engineer | Creator of Fortis-CI",
    description: "Creator of Fortis-CI, an open-source graph-native deployment observability platform. DevOps engineer focused on AWS, Kubernetes, Terraform, and CI/CD. 1st place MCP hackathon winner.",
    type: "website",
    url: "https://ganeshangadi.online",
    siteName: "Ganesh Angadi Portfolio",
    images: [
      {
        url: "https://ganeshangadi.online/profile.jpg",
        width: 800,
        height: 800,
        alt: "Ganesh Angadi - DevOps Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh Angadi | DevOps Engineer | Creator of Fortis-CI",
    description: "Creator of Fortis-CI — graph-native deployment observability. DevOps engineer | AWS • Kubernetes • Terraform | 1st Place MCP Hackathon Winner",
    images: ["https://ganeshangadi.online/profile.jpg"],
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
    image: "https://ganeshangadi.online/profile.jpg",
    jobTitle: "DevOps Engineer",
    description:
      "Creator of Fortis-CI, an open-source graph-native deployment observability platform. DevOps engineer focused on AWS, Kubernetes, Terraform, and CI/CD automation. 1st place MCP server hackathon winner.",
    knowsAbout: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Terraform",
      "Linux System Administration",
      "CI/CD Pipelines",
      "GitHub Actions",
      "System Design",
      "Deployment Observability",
      "Graph Databases",
      "Neo4j",
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
    ],
    award: "1st Place - MCP Server Hackathon 2026",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ganesh Angadi Portfolio",
    url: "https://ganeshangadi.online",
    description: "Portfolio and blog of Ganesh Angadi — DevOps engineer and creator of Fortis-CI.",
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

  const fortisCISchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Fortis-CI",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    description:
      "An open-source graph-native deployment observability platform built on Neo4j. Tracks deployment pipelines as a graph, enabling real-time observability and dependency mapping for CI/CD workflows.",
    author: { "@type": "Person", name: "Ganesh Angadi", url: "https://ganeshangadi.online" },
    url: "https://github.com/ganeshak11",
    keywords: "deployment observability, graph-native, Neo4j, CI/CD, DevOps",
  };

  const jsonLd = [personSchema, websiteSchema, fortisCISchema];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <div className="noise" />
        <CustomCursor />
        <ThemeProvider>
          <ClientProviders>
            {children}
          </ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
