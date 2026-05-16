"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export function useScramble(text: string, trigger: boolean, delay = 0) {
    const [display, setDisplay] = useState(text);
    const started = useRef(false);

    useEffect(() => {
        if (!trigger || started.current) return;
        started.current = true;

        const timeout = setTimeout(() => {
            let iteration = 0;
            const total = text.length * 3;
            const interval = setInterval(() => {
                setDisplay(
                    text.split("").map((char, i) => {
                        if (char === " ") return " ";
                        if (i < iteration / 3) return text[i];
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    }).join("")
                );
                iteration++;
                if (iteration > total) clearInterval(interval);
            }, 40);
        }, delay);

        return () => clearTimeout(timeout);
    }, [trigger, text, delay]);

    return display;
}
