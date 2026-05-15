import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import BlogPostContent from "@/components/BlogPostContent";

interface BlogPostProps {
    params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
    const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
        return null;
    }
    
    const content = fs.readFileSync(filePath, "utf8");
    const { data, content: markdown } = matter(content);
    
    return {
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        content: markdown,
    };
}

export async function generateStaticParams() {
    const blogDir = path.join(process.cwd(), "content/blog");
    const files = fs.readdirSync(blogDir);
    
    return files
        .filter((file) => file.endsWith(".md"))
        .map((file) => ({
            slug: file.replace(".md", ""),
        }));
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { slug } = await params;
    const post = await getPost(slug);
    
    if (!post) {
        notFound();
    }
    
    return <BlogPostContent post={post} slug={slug} />;
}
