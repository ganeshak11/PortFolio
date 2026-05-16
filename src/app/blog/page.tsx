import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogList from "@/components/BlogList";

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    hook: string;
    tags: string[];
    readingTime: number;
    featured: boolean;
}

function getBlogPosts(): BlogPost[] {
    const blogDir = path.join(process.cwd(), "content/blog");
    const files = fs.readdirSync(blogDir);

    const posts = files
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
            const slug = file.replace(".md", "");
            const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
            const { data, content } = matter(raw);
            const words = content.trim().split(/\s+/).length;
            const readingTime = Math.max(1, Math.round(words / 200));

            return {
                slug,
                title: data.title,
                date: data.date,
                excerpt: data.excerpt || "",
                hook: data.hook || "",
                tags: data.tags || [],
                readingTime,
                featured: data.featured || false,
            };
        })
        .sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    return posts;
}

export default function BlogIndex() {
    const posts = getBlogPosts();
    return <BlogList posts={posts} />;
}
