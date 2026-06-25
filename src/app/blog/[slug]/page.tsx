import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogPostContent from "@/components/BlogPostContent";

const DOMAIN = "https://ganeshangadi.online";

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

    // Estimate reading time: avg 200 words/min
    const wordCount = markdown.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
        title: data.title as string,
        date: data.date as string,
        tags: (data.tags || []) as string[],
        excerpt: (data.excerpt || "") as string,
        hook: (data.hook || "") as string,
        content: markdown,
        slug,
        readingTime,
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

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return { title: "Post Not Found | Ganesh Angadi" };
    }

    const url = `${DOMAIN}/blog/${slug}`;
    const description = post.excerpt || post.hook || `${post.title} — by Ganesh Angadi`;
    const ogImage = `${DOMAIN}/profile.jpg`;

    return {
        title: `${post.title} | Ganesh Angadi`,
        description,
        keywords: [...post.tags, "Ganesh Angadi", "DevOps", "blog"],
        authors: [{ name: "Ganesh Angadi", url: DOMAIN }],
        openGraph: {
            title: post.title,
            description,
            type: "article",
            url,
            publishedTime: post.date,
            authors: ["Ganesh Angadi"],
            tags: post.tags,
            images: [{ url: ogImage, width: 800, height: 800, alt: post.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description,
            images: [ogImage],
            creator: "@ganeshak11",
        },
        alternates: {
            canonical: url,
        },
    };
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    // Article structured data for Google
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt || post.hook,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            "@type": "Person",
            name: "Ganesh Angadi",
            url: DOMAIN,
            sameAs: [
                "https://github.com/ganeshak11",
                "https://linkedin.com/in/ganeshangadi1301",
            ],
        },
        publisher: {
            "@type": "Person",
            name: "Ganesh Angadi",
            url: DOMAIN,
        },
        url: `${DOMAIN}/blog/${slug}`,
        image: `${DOMAIN}/profile.jpg`,
        keywords: post.tags.join(", "),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${DOMAIN}/blog/${slug}`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <BlogPostContent post={post} slug={slug} />
        </>
    );
}
