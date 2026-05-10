import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogList from "@/components/BlogList";

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
}

function getBlogPosts(): BlogPost[] {
    const blogDir = path.join(process.cwd(), "content/blog");
    const files = fs.readdirSync(blogDir);
    
    const posts = files
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
            const slug = file.replace(".md", "");
            const content = fs.readFileSync(path.join(blogDir, file), "utf8");
            const { data } = matter(content);
            
            return {
                slug,
                title: data.title,
                date: data.date,
                excerpt: data.excerpt,
                tags: data.tags || [],
            };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return posts;
}

export default function BlogIndex() {
    const posts = getBlogPosts();
    
    return <BlogList posts={posts} />;
}
