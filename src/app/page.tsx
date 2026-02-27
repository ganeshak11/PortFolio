"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedProject from "@/components/FeaturedProject";
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

      <Hero />
      <About />
      <FeaturedProject />
      <DevOpsStack />
      <SystemThinking />
      <CurrentlyBuilding />
      <Contact />
      <Footer />
    </>
  );
}
