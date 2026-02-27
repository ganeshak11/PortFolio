"use client";

/**
 * CometCursor — Aura-of-dots cursor trail
 * ----------------------------------------
 * Each trail point emits a CLUSTER of small dots scattered
 * around it, creating a cloud/aura effect instead of a single line.
 * Head = wide dense cloud, tail = single thin point.
 */

import { useEffect, useRef, useCallback } from "react";

// ─── Tuning ───────────────────────────────────────────────────────────────────
const TRAIL_CAPACITY = 90;   // total path points kept
const FADE_DURATION = 650;  // ms before a point fully fades
const DOT_RADIUS = 0.9;  // px — radius of each micro-dot
const HEAD_SPREAD = 12;   // scatter radius at the cursor head (px)
const LERP_SPEED = 0.13; // lerp to mouse — lower = more trailing lag
const MIN_DIST_SQ = 2;    // add point only if moved ≥ √2 px
const DOTS_PER_POINT = 10;   // scatter dots around each trail point

// Pre-bake per-slot scatter offsets so they never jitter between frames
// Each slot has DOTS_PER_POINT entries of (dx, dy) pairs
const SCATTER_TABLE: Array<Array<[number, number]>> = Array.from(
    { length: TRAIL_CAPACITY },
    () =>
        Array.from({ length: DOTS_PER_POINT }, () => {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.sqrt(Math.random()); // uniform disk distribution
            return [Math.cos(angle) * r, Math.sin(angle) * r] as [number, number];
        })
);

interface TrailPoint {
    x: number;
    y: number;
    t: number;
    slot: number; // index into SCATTER_TABLE for stable scatter
}

export default function CometCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const trailRef = useRef<TrailPoint[]>([]);
    const rawPos = useRef({ x: -999, y: -999 });
    const smoothPos = useRef({ x: -999, y: -999 });
    const rafRef = useRef<number | null>(null);
    const isMobile = useRef(false);
    const slotRef = useRef(0); // round-robin slot counter

    const getAccentRgb = useCallback((): string => {
        if (typeof window === "undefined") return "6,182,212";
        const v = getComputedStyle(document.documentElement)
            .getPropertyValue("--accent").trim();
        return v ? hexToRgb(v) : "6,182,212";
    }, []);

    const tick = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) { rafRef.current = requestAnimationFrame(tick); return; }
        const ctx = canvas.getContext("2d");
        if (!ctx) { rafRef.current = requestAnimationFrame(tick); return; }

        const now = Date.now();
        const rgb = getAccentRgb();

        // 1. Lerp smooth head toward raw mouse
        smoothPos.current.x += (rawPos.current.x - smoothPos.current.x) * LERP_SPEED;
        smoothPos.current.y += (rawPos.current.y - smoothPos.current.y) * LERP_SPEED;

        // 2. Append to trail when cursor moved enough
        const last = trailRef.current[trailRef.current.length - 1];
        const dx = smoothPos.current.x - (last?.x ?? -9999);
        const dy = smoothPos.current.y - (last?.y ?? -9999);
        if (dx * dx + dy * dy > MIN_DIST_SQ && rawPos.current.x > 0) {
            const slot = slotRef.current % TRAIL_CAPACITY;
            slotRef.current++;
            trailRef.current.push({ x: smoothPos.current.x, y: smoothPos.current.y, t: now, slot });
            if (trailRef.current.length > TRAIL_CAPACITY) trailRef.current.shift();
        }

        // 3. Prune expired
        trailRef.current = trailRef.current.filter((p) => now - p.t < FADE_DURATION);

        // 4. Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const trail = trailRef.current;
        const total = trail.length;

        // 5. Draw dot cluster at each trail point
        for (let i = 0; i < total; i++) {
            const p = trail[i];
            const progress = i / Math.max(total - 1, 1);   // 0=tail → 1=head
            const age = 1 - (now - p.t) / FADE_DURATION;
            const alpha = Math.pow(progress, 0.5) * age;
            if (alpha < 0.015) continue;

            // Scatter radius: 0 at tail, HEAD_SPREAD at head
            const spread = HEAD_SPREAD * progress;
            const offsets = SCATTER_TABLE[p.slot % TRAIL_CAPACITY];

            for (let d = 0; d < DOTS_PER_POINT; d++) {
                const [ox, oy] = offsets[d];
                // Each dot gets its own slight alpha jitter for organic feel
                const dotAlpha = alpha * (0.55 + 0.45 * ((d * 7 + i) % 10) / 10);

                ctx.beginPath();
                ctx.arc(
                    p.x + ox * spread,
                    p.y + oy * spread,
                    DOT_RADIUS,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = `rgba(${rgb},${dotAlpha.toFixed(3)})`;
                ctx.fill();
            }
        }

        rafRef.current = requestAnimationFrame(tick);
    }, [getAccentRgb]);

    useEffect(() => {
        isMobile.current =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia("(pointer: coarse)").matches;

        if (isMobile.current) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();

        const onMove = (e: MouseEvent) => {
            rawPos.current = { x: e.clientX, y: e.clientY };
            if (smoothPos.current.x < 0) smoothPos.current = { ...rawPos.current };
        };
        const onLeave = () => {
            rawPos.current = { x: -999, y: -999 };
            trailRef.current = [];
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mouseleave", onLeave);
        window.addEventListener("resize", resize);
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("resize", resize);
        };
    }, [tick]);

    if (typeof window !== "undefined" && isMobile.current) return null;

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 0,
            }}
            aria-hidden="true"
        />
    );
}

function hexToRgb(hex: string): string {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const n = parseInt(hex, 16);
    return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}
