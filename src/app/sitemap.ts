import { MetadataRoute } from 'next';
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DOMAIN = "https://ganeshangadi.online";

export default function sitemap(): MetadataRoute.Sitemap {
    const blogDir = path.join(process.cwd(), "content/blog");
    let blogPosts: MetadataRoute.Sitemap = [];

    try {
        const files = fs.readdirSync(blogDir, { recursive: true }) as string[];
        blogPosts = files
            .filter((file) => file.endsWith(".md"))
            .map((file) => {
                const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
                const { data } = matter(raw);

                // Use filename as the slug to match actual route URLs
                const slug = path.basename(file, ".md");
                const date = data.date ? new Date(data.date) : new Date();

                return {
                    url: `${DOMAIN}/blog/${slug}`,
                    lastModified: date,
                    changeFrequency: 'monthly' as const,
                    priority: 0.7,
                };
            });
    } catch (e) {
        console.warn("Could not read blog directory for sitemap", e);
    }

    return [
        {
            url: `${DOMAIN}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${DOMAIN}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...blogPosts,
    ];
}
