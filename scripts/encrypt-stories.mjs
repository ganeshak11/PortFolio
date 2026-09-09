import fs from "fs";
import path from "path";
import crypto from "crypto";
import matter from "gray-matter";

const ALGORITHM = "aes-256-gcm";

// Helper to derive 32-byte AES key
function getDerivedKey(secret) {
    return crypto.createHash("sha256").update(secret).digest();
}

// Encrypt string with AES-256-GCM
export function encryptPayload(plainText, secret) {
    const key = getDerivedKey(secret);
    const iv = crypto.randomBytes(12); // 96-bit IV
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(plainText, "utf8", "hex");
    encrypted += cipher.final("hex");
    const tag = cipher.getAuthTag();

    return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted}`;
}

// Decrypt string with AES-256-GCM
export function decryptPayload(payload, secret) {
    const key = getDerivedKey(secret);
    const [ivHex, tagHex, encryptedHex] = payload.split(":");
    if (!ivHex || !tagHex || !encryptedHex) {
        throw new Error("Invalid payload format");
    }

    const iv = Buffer.from(ivHex, "hex");
    const tag = Buffer.from(tagHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

// Simple .env reader
function loadEnv() {
    const envPaths = [".env.local", ".env", ".env.prod"];
    for (const p of envPaths) {
        const full = path.join(process.cwd(), p);
        if (fs.existsSync(full)) {
            const content = fs.readFileSync(full, "utf8");
            for (const line of content.split("\n")) {
                const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
                if (match) {
                    const key = match[1];
                    let val = (match[2] || "").trim();
                    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                        val = val.slice(1, -1);
                    }
                    if (!process.env[key]) {
                        process.env[key] = val;
                    }
                }
            }
        }
    }
}

async function main() {
    loadEnv();

    const secret = process.argv[2] || process.env.STORY_SECRET_KEY;
    if (!secret) {
        console.error("Error: No STORY_SECRET_KEY found. Please set STORY_SECRET_KEY in your .env file or pass it as an argument: node scripts/encrypt-stories.mjs <secret>");
        process.exit(1);
    }

    const storyDir = path.join(process.cwd(), "content/story");
    if (!fs.existsSync(storyDir)) {
        console.error(`Error: Directory not found: ${storyDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(storyDir).filter((f) => f.endsWith(".md"));
    if (files.length === 0) {
        console.log("No markdown (.md) stories found in content/story/");
        return;
    }

    console.log(`🔒 Encrypting ${files.length} story file(s) with AES-256-GCM...\n`);

    for (const file of files) {
        const filePath = path.join(storyDir, file);
        const raw = fs.readFileSync(filePath, "utf8");
        const { data } = matter(raw);

        const slug = data.slug || path.basename(file, ".md");
        const encrypted = encryptPayload(raw, secret);

        const outPath = path.join(storyDir, `${slug}.enc`);
        fs.writeFileSync(outPath, encrypted, "utf8");

        console.log(`✓ Encrypted: content/story/${file} -> content/story/${slug}.enc`);
        console.log(`  Slug:  "${slug}"`);
        console.log(`  Title: "${data.title || "Untitled"}"`);
        console.log(`  Size:  ${(raw.length / 1024).toFixed(1)} KB plaintext -> ${(encrypted.length / 1024).toFixed(1)} KB ciphertext\n`);
    }

    console.log(`🎉 Done! You can safely commit *.enc files to Git.`);
    console.log(`⚠️  Reminder: Set STORY_SECRET_KEY in your Vercel Project Environment Variables.`);
}

if (process.argv[1]?.endsWith("encrypt-stories.mjs")) {
    main().catch((err) => {
        console.error("Encryption failed:", err);
        process.exit(1);
    });
}
