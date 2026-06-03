"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export function useScrambleHover(text: string) {
    const [display, setDisplay] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isHovering) {
            // When hover ends, ensure it quickly sets back to original text
            // or let the scramble finish. We'll just let it finish or snap to text.
            setDisplay(text);
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            return;
        }

        let iteration = 0;
        const total = text.length * 2;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplay(
                text.split("").map((char, i) => {
                    if (char === " ") return " ";
                    if (i < iteration / 2) return text[i];
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join("")
            );
            iteration++;
            if (iteration > total) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
        }, 30);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isHovering, text]);

    return { display, setIsHovering };
}
