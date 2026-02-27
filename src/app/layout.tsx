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
  title: "Ganesh Angadi — DevOps Engineer",
  description:
    "DevOps engineer who builds reliable systems and questions fragile architecture. Specialist in Linux internals, CI/CD, containerisation, and infrastructure design.",
  keywords: [
    "DevOps",
    "Infrastructure",
    "Linux",
    "Kubernetes",
    "CI/CD",
    "System Design",
  ],
  openGraph: {
    title: "Ganesh Angadi — DevOps Engineer",
    description: "Building reliable systems. Questioning fragile architecture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
