"use client";

import { useEffect } from "react";

export default function StealthUrlCleaner({ initialRef }: { initialRef?: string }) {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const params = new URLSearchParams(window.location.search);
        const refVal = params.get("ref") || params.get("access") || params.get("key") || initialRef;

        if (refVal) {
            // Persist the 1-year access cookie in the browser
            document.cookie = `__story_session=${encodeURIComponent(refVal.trim().toLowerCase())}; path=/; max-age=31536000; SameSite=Lax`;

            // Clean the query parameter from the URL address bar immediately without reloading
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }, [initialRef]);

    return null;
}
