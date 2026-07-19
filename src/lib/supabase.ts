import { createClient } from "@supabase/supabase-js";

let clientInstance: ReturnType<typeof createClient> | null = null;

function getClient() {
    if (!clientInstance) {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/^["']|["']$/g, '').trim();
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.replace(/^["']|["']$/g, '').trim();
        
        if (!url || !key || url === 'undefined' || key === 'undefined') {
            const keySuffix = key ? key.slice(-8) : 'missing';
            throw new Error(
                `Supabase client initialization failed: Missing env vars. URL: "${url}", Key ends with: "...${keySuffix}"`
            );
        }

        // Always log what key suffix we are about to use (will appear in Vercel logs)
        console.log(`[Supabase Init] URL: ${url}, Key ends with: ...${key.slice(-8)}`);

        try {
            new URL(url);
        } catch (e) {
            throw new Error(`Supabase client initialization failed: NEXT_PUBLIC_SUPABASE_URL is not a valid URL. You provided: "${url}". Make sure it starts with https://`);
        }

        clientInstance = createClient(url, key);
    }
    return clientInstance;
}

// Export a Proxy that intercepts properties dynamically at runtime
export const supabase = new Proxy({} as any, {
    get(target, prop, receiver) {
        return Reflect.get(getClient(), prop, receiver);
    }
});

