import { MetadataRoute } from 'next';
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DOMAIN = "https://ganeshangadi.online";

export default function sitemap(): MetadataRoute.Sitemap {
    const blogDir = path.join(process.cwd(), "content/blog");
    let blogPosts: MetadataRoute.Sitemap = [];

    try {
        const files = fs.readdirSync(blogDir);
        blogPosts = files
            .filter((file) => file.endsWith(".md"))
            .map((file) => {
                const slug = file.replace(".md", "");
                const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
                const { data } = matter(raw);
                
                // Fallback to today if no date in matter
                const date = data.date ? new Date(data.date) : new Date();

                return {
                    url: `${DOMAIN}/blog/${slug}`,
                    lastModified: date,
                    changeFrequency: 'monthly',
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
