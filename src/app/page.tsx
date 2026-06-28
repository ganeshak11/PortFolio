import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Ganesh Angadi | DevOps Engineer Portfolio",
  description: "DevOps Engineer specializing in Docker, Kubernetes, Linux, CI/CD. 1st place MCP hackathon winner.",
};

export default function Page() {
  return (
    <>
      <div style={{ position: 'relative', zIndex: 99999, background: 'yellow', textAlign: 'center', padding: '10px' }}>
        <a href="/spam.csv" download style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline' }}>Download spam.csv for ML Lab</a>
      </div>
      <HomeClient />
    </>
  );
}
