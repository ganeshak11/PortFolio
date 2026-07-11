import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Ganesh Angadi | DevOps Engineer Portfolio",
  description: "DevOps Engineer specializing in Docker, Kubernetes, Linux, CI/CD. 1st place MCP hackathon winner.",
};

export default function Page() {
  const posts = getBlogPosts();
  return <HomeClient posts={posts} />;
}
