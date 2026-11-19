"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead, Reveal } from "@/components/ui/SectionHead";

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    hook: string;
    tags: string[];
    readingTime: number;
    featured?: boolean;
    series?: string;
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export default function LatestBlogs({ posts }: { posts: BlogPost[] }) {
    const latestPosts = [...posts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    return (
        <section id="latest-blogs" className="section">
            <div className="wrap">
                <SectionHead index="05" cmd="writing" title="Writing" />

                <Reveal className="post-list">
                    {latestPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="post-row">
                            <time className="post-date" dateTime={post.date}>{fmt(post.date)}</time>
                            <div style={{ minWidth: 0 }}>
                                <h3 className="post-title">{post.title}</h3>
                                {post.series && <div className="row-wrap" style={{ marginTop: 8 }}><span className="chip accent">{post.series}</span></div>}
                            </div>
                            <span className="post-meta">{post.readingTime} min read</span>
                        </Link>
                    ))}
                </Reveal>

                <div style={{ marginTop: 28 }}>
                    <Link href="/blog" className="btn">
                        All posts <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
