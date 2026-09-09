import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getStory, verifyStoryAccess, STORY_COOKIE_NAME } from "@/lib/story";
import BlogPostContent from "@/components/BlogPostContent";
import StealthUrlCleaner from "@/components/StealthUrlCleaner";

interface StoryPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params, searchParams }: StoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const search = await searchParams;
    const cookieStore = await cookies();

    const cookieValue = cookieStore.get(STORY_COOKIE_NAME)?.value;
    const queryValue = search.ref || search.access || search.key;

    if (!verifyStoryAccess(cookieValue, queryValue)) {
        return {
            title: "Post Not Found | Ganesh Angadi",
            robots: { index: false, follow: false },
        };
    }

    const story = getStory(slug);
    if (!story) {
        return {
            title: "Post Not Found | Ganesh Angadi",
            robots: { index: false, follow: false },
        };
    }

    return {
        title: `${story.title} | Ganesh Angadi`,
        description: story.excerpt || story.hook || `${story.title} — by Ganesh Angadi`,
        robots: {
            index: false,
            follow: false,
            nocache: true,
            googleBot: {
                index: false,
                follow: false,
                noimageindex: true,
            },
        },
    };
}

export default async function StoryPage({ params, searchParams }: StoryPageProps) {
    const { slug } = await params;
    const search = await searchParams;
    const cookieStore = await cookies();

    const cookieValue = cookieStore.get(STORY_COOKIE_NAME)?.value;
    const queryValue = search.ref || search.access || search.key;

    // Strict Access Control: Anyone without the cookie or valid query key gets 404
    if (!verifyStoryAccess(cookieValue, queryValue)) {
        notFound();
    }

    const story = getStory(slug);
    if (!story) {
        notFound();
    }

    const refString = typeof queryValue === "string" ? queryValue : undefined;

    return (
        <>
            <StealthUrlCleaner initialRef={refString} />
            <BlogPostContent post={story} slug={slug} isStory={true} />
        </>
    );
}
