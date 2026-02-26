import Hero from "@/components/Hero";
import CoreModules from "@/components/CoreModules";
import Projects from "@/components/Projects";
import FailureLog from "@/components/FailureLog";
import InfraStatus from "@/components/InfraStatus";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <CoreModules />
      <Projects />
      <FailureLog />
      <InfraStatus />
      <Footer />
    </>
  );
}
