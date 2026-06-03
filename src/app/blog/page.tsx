import { getBlogPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export default function BlogIndex() {
    const posts = getBlogPosts();
    return <BlogList posts={posts} />;
}
