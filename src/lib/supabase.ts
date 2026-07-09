import { createClient } from "@supabase/supabase-js";

let clientInstance: ReturnType<typeof createClient> | null = null;

function getClient() {
    if (!clientInstance) {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!url || !key) {
            // Throw a detailed error only when code attempts to execute database queries without configuration
            throw new Error(
                "Supabase client initialization failed: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
            );
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

