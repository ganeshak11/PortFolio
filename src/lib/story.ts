import fs from "fs";
import path from "path";
import crypto from "crypto";
import matter from "gray-matter";

export interface Story {
    title: string;
    date: string;
    slug: string;
    excerpt: string;
    hook: string;
    tags: string[];
    author: string;
    readingTime: number;
    content: string;
}

export const STORY_COOKIE_NAME = "__story_session";
export const STORY_ACCESS_SECRET = (process.env.STORY_ACCESS_SECRET || "").trim().toLowerCase();
export const STORY_ENCRYPTION_SECRET = (process.env.STORY_SECRET_KEY || "").trim();

const ALGORITHM = "aes-256-gcm";

function getDerivedKey(secret: string): Buffer {
    return crypto.createHash("sha256").update(secret).digest();
}

export function decryptStoryPayload(payload: string, secret: string): string {
    if (!secret) {
        throw new Error("STORY_SECRET_KEY is missing from environment variables");
    }
    const key = getDerivedKey(secret);
    const [ivHex, tagHex, encryptedHex] = payload.split(":");
    if (!ivHex || !tagHex || !encryptedHex) {
        throw new Error("Invalid encrypted story format");
    }

    const iv = Buffer.from(ivHex, "hex");
    const tag = Buffer.from(tagHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

export function verifyStoryAccess(
    cookieValue?: string | null,
    queryValue?: string | string[] | null
): boolean {
    const validSecret = STORY_ACCESS_SECRET;
    if (!validSecret) {
        // Fail-closed: If no access secret is configured in environment, deny all access
        return false;
    }
    
    if (cookieValue && cookieValue.trim().toLowerCase() === validSecret) {
        return true;
    }
    
    if (typeof queryValue === "string" && queryValue.trim().toLowerCase() === validSecret) {
        return true;
    }

    if (Array.isArray(queryValue) && queryValue.some(val => val.trim().toLowerCase() === validSecret)) {
        return true;
    }

    return false;
}

export function getStory(slug: string): Story | null {
    const storyDir = path.join(process.cwd(), "content/story");
    if (!fs.existsSync(storyDir)) {
        return null;
    }

    let rawMarkdown: string | null = null;

    // 1. Check for local plaintext markdown (development mode / local authoring)
    const mdFiles = fs.readdirSync(storyDir).filter((file) => file.endsWith(".md"));
    for (const file of mdFiles) {
        const filePath = path.join(storyDir, file);
        const raw = fs.readFileSync(filePath, "utf8");
        const { data } = matter(raw);
        const fileSlug = data.slug || path.basename(file, ".md");

        if (fileSlug === slug || path.basename(file, ".md") === slug) {
            rawMarkdown = raw;
            break;
        }
    }

    // 2. If no plaintext markdown found, read from encrypted .enc file (production deployment)
    if (!rawMarkdown) {
        const encFiles = fs.readdirSync(storyDir).filter((file) => file.endsWith(".enc"));
        for (const file of encFiles) {
            const baseName = path.basename(file, ".enc");
            if (baseName === slug) {
                const filePath = path.join(storyDir, file);
                const encPayload = fs.readFileSync(filePath, "utf8");
                try {
                    rawMarkdown = decryptStoryPayload(encPayload, STORY_ENCRYPTION_SECRET);
                } catch (e) {
                    console.error(`Failed to decrypt story file ${file}:`, e);
                    return null;
                }
                break;
            }
        }
    }

    if (!rawMarkdown) {
        return null;
    }

    const { data, content } = matter(rawMarkdown);
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
        title: (data.title as string) || "Untitled Story",
        date: (data.date as string) || new Date().toISOString().split("T")[0],
        slug,
        excerpt: (data.excerpt as string) || "",
        hook: (data.hook as string) || "",
        tags: (data.tags as string[]) || [],
        author: (data.author as string) || "Ganesh Angadi",
        readingTime,
        content,
    };
}
