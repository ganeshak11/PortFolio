"use client";

import React, { createContext, use, useEffect } from "react";

// Frost is dark only, like the desktop it comes from. The context stays so
// existing callers keep working; toggle does nothing.
type Theme = "dark" | "light";

const ThemeContext = createContext<{
    theme: Theme;
    toggle: () => void;
}>({ theme: "dark", toggle: () => { } });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        document.documentElement.classList.add("dark");
        try { localStorage.removeItem("theme"); } catch { }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme: "dark", toggle: () => { } }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => use(ThemeContext);
