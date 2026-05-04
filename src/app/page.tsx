"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import DevOpsStack from "@/components/DevOpsStack";
import SystemThinking from "@/components/SystemThinking";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TerminalMode from "@/components/TerminalMode";

export default function Home() {
  const [terminalMode, setTerminalMode] = useState(false);

  return (
    <>
      <Navbar onTerminalToggle={() => setTerminalMode(true)} />
      
      <AnimatePresence>
        {terminalMode && (
          <TerminalMode onExit={() => setTerminalMode(false)} />
        )}
      </AnimatePresence>

      <main>
        <h1 className="sr-only">Ganesh Angadi - DevOps Engineer</h1>
        
        <section aria-label="Introduction">
          <Hero />
        </section>

        <section aria-labelledby="about-heading">
          <h2 id="about-heading" className="sr-only">About Ganesh Angadi</h2>
          <About />
        </section>

        <section aria-labelledby="achievements-heading">
          <h2 id="achievements-heading" className="sr-only">Achievements & Awards</h2>
          <Achievements />
        </section>

        <section aria-labelledby="projects-heading">
          <h2 id="projects-heading" className="sr-only">DevOps Projects</h2>
          <Projects />
          <CurrentlyBuilding />
        </section>

        <section aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="sr-only">DevOps Skills & Technologies</h2>
          <DevOpsStack />
        </section>

        <section aria-labelledby="architecture-heading">
          <h2 id="architecture-heading" className="sr-only">System Architecture & Engineering Principles</h2>
          <SystemThinking />
        </section>

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="sr-only">Contact Ganesh Angadi</h2>
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}
