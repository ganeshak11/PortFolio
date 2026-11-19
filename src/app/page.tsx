import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Ganesh Angadi | Systems Engineer Portfolio",
  description: "Systems engineer building Fortis Ecosystem, a privacy-first phone + Linux laptop platform. Rust, Linux, security and infrastructure. 1st place MCP hackathon winner.",
};

export default function Page() {
  const posts = getBlogPosts();
  return <HomeClient posts={posts} />;
}
