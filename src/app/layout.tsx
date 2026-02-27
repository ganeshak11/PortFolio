import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

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
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
