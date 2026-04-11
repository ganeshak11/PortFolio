import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CyberneticGridShader from "@/components/ui/cybernetic-grid-shader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ganesh Angadi | DevOps Engineer | Docker, Kubernetes, Linux, CI/CD | 1st Place MCP Hackathon Winner",
  description:
    "Ganesh Angadi - DevOps Engineer specializing in Docker, Kubernetes, Linux systems, and CI/CD automation. 1st place MCP hackathon winner for Indian Sign Language translation wrapper with proven system design expertise.",
  keywords: [
    "Ganesh Angadi",
    "ganesh angadi",
    "ganeshak11",
    "DevOps Engineer",
    "DevOps portfolio",
    "Docker",
    "Docker projects",
    "Kubernetes",
    "Kubernetes learning",
    "Linux",
    "Linux engineering",
    "Linux fundamentals",
    "CI/CD",
    "System Design",
    "System design portfolio",
    "MCP Server",
    "MCP server architecture",
    "Model Context Protocol",
    "Node.js",
    "PostgreSQL",
    "React Native",
    "Next.js",
    "Git",
    "Bash",
    "DevOps automation",
    "MY(suru) BUS",
    "1st place hackathon winner",
  ],
  authors: [{ name: "Ganesh Angadi" }],
  creator: "Ganesh Angadi",
  openGraph: {
    title: "Ganesh Angadi | DevOps Engineer Portfolio",
    description: "DevOps Engineer specializing in Docker, Kubernetes, Linux, CI/CD. 1st place MCP hackathon winner.",
    type: "website",
    url: "https://ganeshangadi.online",
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
    title: "Ganesh Angadi | DevOps Engineer",
    description: "DevOps Engineer | Docker, Kubernetes, Linux | 1st Place MCP Hackathon Winner",
    images: ["https://ganeshangadi.online/profile.jpg"],
  },
  metadataBase: new URL("https://ganeshangadi.online"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ganesh Angadi",
    alternateName: "ganeshak11",
    url: "https://ganeshangadi.online",
    image: "https://ganeshangadi.online/profile.jpg",
    jobTitle: "DevOps Engineer",
    description:
      "DevOps Engineer specializing in Docker, Kubernetes, Linux system administration, CI/CD pipelines, and cloud infrastructure automation. 1st place MCP server hackathon winner.",
    knowsAbout: [
      "Docker",
      "Kubernetes",
      "Linux System Administration",
      "CI/CD Pipelines",
      "System Design",
      "Model Context Protocol (MCP)",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Bash",
      "System Architecture",
      "DevOps Automation",
      "Container Orchestration",
      "React Native",
      "Next.js",
    ],
    sameAs: [
      "https://github.com/ganeshak11",
      "https://linkedin.com/in/ganeshangadi1301",
    ],
    award: "1st Place - MCP Server Hackathon 2024",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "DevOps Engineering",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <div style={{ position: "relative", minHeight: "100vh" }}>
            <CyberneticGridShader />
            <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
