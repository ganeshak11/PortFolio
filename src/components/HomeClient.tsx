"use client";

import { useEffect, useRef, useState } from "react";
import { getOrCreateVisitorId } from "@/lib/visitorId";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import DevOpsStack from "@/components/DevOpsStack";
import SystemThinking from "@/components/SystemThinking";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TerminalMode from "@/components/TerminalMode";
import FAB from "@/components/FAB";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const hasTrackedVisit = useRef(false);

  useEffect(() => {
    if (!hasTrackedVisit.current) {
      hasTrackedVisit.current = true;
      // Get or generate a stable visitor UUID stored in localStorage
      const visitorId = getOrCreateVisitorId();
      // Track portfolio homepage visit using the same views API with slug "portfolio"
      fetch("/api/views/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId }),
      }).catch(() => {});

      // Send telemetry to Fortis Observe
      const fortisUrl = process.env.NEXT_PUBLIC_FORTIS_URL || (process.env.NODE_ENV === 'production' ? 'https://analytics.ganeshangadi.online' : 'http://localhost:3000');
      fetch(`${fortisUrl}/api/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, path: "/" }),
      }).catch(() => {});
    }
  }, []);

  return (
    <>
      <Navbar />

      <AnimatePresence>
        {terminalOpen && <TerminalMode onExit={() => setTerminalOpen(false)} />}
      </AnimatePresence>

      <FAB onTerminalOpen={() => setTerminalOpen(true)} />

      <main>
        <h1 className="sr-only">Ganesh Angadi - DevOps Engineer</h1>

        <section id="hero" aria-label="Introduction">
          <Hero />
        </section>

        <section id="about" aria-labelledby="about-heading">
          <h2 id="about-heading" className="sr-only">About Ganesh Angadi</h2>
          <About />
        </section>

        <section id="achievements" aria-labelledby="achievements-heading">
          <h2 id="achievements-heading" className="sr-only">Achievements & Awards</h2>
          <Achievements />
        </section>

        <section id="projects" aria-labelledby="projects-heading">
          <h2 id="projects-heading" className="sr-only">DevOps Projects</h2>
          <Projects />
        </section>

        <section id="currently-building" aria-labelledby="currently-building-heading">
          <h2 id="currently-building-heading" className="sr-only">Currently Building</h2>
          <CurrentlyBuilding />
        </section>

        <section id="stack" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="sr-only">DevOps Skills & Technologies</h2>
          <DevOpsStack />
        </section>

        <section id="thinking" aria-labelledby="architecture-heading">
          <h2 id="architecture-heading" className="sr-only">System Architecture & Engineering Principles</h2>
          <SystemThinking />
        </section>

        <section id="services" aria-labelledby="services-heading">
          <h2 id="services-heading" className="sr-only">Services</h2>
          <Services />
        </section>

        <section id="contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="sr-only">Contact Ganesh Angadi</h2>
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}
