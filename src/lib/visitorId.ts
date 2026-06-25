/**
 * Generates a UUID v4 that works in all browsers and contexts:
 * 1. crypto.randomUUID()     — modern browsers on HTTPS
 * 2. crypto.getRandomValues() — all modern browsers, including HTTP (Brave, Firefox, etc.)
 * 3. Math.random()            — absolute last resort fallback
 */
function generateUUID(): string {
    // Attempt 1: native randomUUID (HTTPS only in most browsers)
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        try {
            return crypto.randomUUID();
        } catch {
            // Falls through to next method
        }
    }

    // Attempt 2: crypto.getRandomValues — works even over HTTP
    if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        // Set version bits (version 4)
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        // Set variant bits
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }

    // Attempt 3: Math.random fallback
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 * Returns the persistent visitor UUID from localStorage,
 * creating and storing one if it doesn't exist yet.
 */
export function getOrCreateVisitorId(): string {
    const key = "visitor_id";
    try {
        let id = localStorage.getItem(key);
        if (!id) {
            id = generateUUID();
            localStorage.setItem(key, id);
        }
        return id;
    } catch {
        // localStorage may be blocked (e.g. private mode on some browsers)
        return generateUUID();
    }
}
