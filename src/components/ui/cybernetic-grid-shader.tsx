"use client";

/**
 * CyberneticGrid — Canvas 2D fallback (no WebGL required)
 * Implements the same visual as the shader:
 *  • Perspective grid that converges to a horizon
 *  • Mouse-reactive ripple distortion on the grid
 *  • Energy pulse dots that travel along grid lines
 *  • Soft glow bloom around the cursor
 */

import { useEffect, useRef, useCallback } from "react";

const GRID_COLOR = "6,182,212";   // matches --accent cyan in dark mode
const PULSE_COLOR = "220,50,200";  // magenta energy pulses
const COLS = 14;            // vertical grid columns
const ROWS = 10;            // horizontal grid rows

interface Pulse {
    col: number;       // which column line
    t: number;       // 0→1 along the line from horizon to bottom
    spd: number;       // travel speed
}

export default function CyberneticGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 }); // normalised 0–1
    const timeRef = useRef(0);
    const pulseRef = useRef<Pulse[]>([]);
    const rafRef = useRef<number | null>(null);

    const spawnPulse = useCallback(() => {
        pulseRef.current.push({
            col: Math.floor(Math.random() * COLS),
            t: 0,
            spd: 0.003 + Math.random() * 0.004,
        });
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        timeRef.current += 0.008;
        const t = timeRef.current;
        const mx = mouseRef.current.x * W;
        const my = mouseRef.current.y * H;

        ctx.clearRect(0, 0, W, H);

        // ── Horizon / vanishing point ────────────────────────────────
        const vpX = W * 0.5 + (mouseRef.current.x - 0.5) * W * 0.15;
        const vpY = H * 0.38;

        // ── Grid line helper ──────────────────────────────────────────
        // Returns screen-space x for column index at a given y
        const colX = (col: number, y: number): number => {
            const frac = (y - vpY) / (H - vpY); // 0 at horizon, 1 at bottom
            const spread = W * 0.9 * frac;
            const step = spread / (COLS - 1);
            return vpX - spread / 2 + col * step;
        };

        // ── Draw vertical (converging) lines ─────────────────────────
        for (let c = 0; c < COLS; c++) {
            const xBottom = colX(c, H);

            // Mouse-proximity warp on the bottom half
            const distToMouse = Math.abs(xBottom - mx) / W;
            const warp = Math.sin(distToMouse * 12 - t * 3) * 18
                * Math.max(0, 1 - distToMouse * 2.5)
                * Math.max(0, (mouseRef.current.y - 0.3) / 0.7);
            const xW = xBottom + warp;

            const baseAlpha = 0.12 + 0.05 * Math.sin(t * 1.5 + c * 0.4);

            const grad = ctx.createLinearGradient(vpX, vpY, xW, H);
            grad.addColorStop(0, `rgba(${GRID_COLOR},0)`);
            grad.addColorStop(0.3, `rgba(${GRID_COLOR},${baseAlpha.toFixed(3)})`);
            grad.addColorStop(1, `rgba(${GRID_COLOR},${(baseAlpha * 1.6).toFixed(3)})`);

            ctx.beginPath();
            ctx.moveTo(vpX, vpY);
            ctx.quadraticCurveTo(
                (vpX + xW) * 0.5, vpY + (H - vpY) * 0.5 + warp * 0.4,
                xW, H
            );
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8 + (1 - distToMouse) * 0.4;
            ctx.stroke();
        }

        // ── Draw horizontal (perspective) lines ───────────────────────
        for (let r = 1; r <= ROWS; r++) {
            const frac = Math.pow(r / ROWS, 1.8); // perspective spacing
            const y = vpY + (H - vpY) * frac;
            const xL = colX(0, y);
            const xR = colX(COLS - 1, y);

            const alpha = 0.06 + 0.04 * Math.sin(t * 2 - r * 0.5);

            const grad = ctx.createLinearGradient(xL, y, xR, y);
            grad.addColorStop(0, `rgba(${GRID_COLOR},0)`);
            grad.addColorStop(0.15, `rgba(${GRID_COLOR},${alpha.toFixed(3)})`);
            grad.addColorStop(0.85, `rgba(${GRID_COLOR},${alpha.toFixed(3)})`);
            grad.addColorStop(1, `rgba(${GRID_COLOR},0)`);

            ctx.beginPath();
            ctx.moveTo(xL, y);
            ctx.lineTo(xR, y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.7;
            ctx.stroke();
        }

        // ── Energy pulses traveling down column lines ─────────────────
        // Advance + prune pulses
        pulseRef.current = pulseRef.current.filter((p) => p.t <= 1);
        for (const p of pulseRef.current) {
            p.t += p.spd;
            const y = vpY + (H - vpY) * Math.pow(p.t, 0.6);
            const x = colX(p.col, y);
            const alp = (1 - p.t) * 0.85;
            const r = 2.5 + p.t * 3;

            const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
            grd.addColorStop(0, `rgba(255,255,255,${alp.toFixed(3)})`);
            grd.addColorStop(0.4, `rgba(${PULSE_COLOR},${(alp * 0.7).toFixed(3)})`);
            grd.addColorStop(1, `rgba(${PULSE_COLOR},0)`);

            ctx.beginPath();
            ctx.arc(x, y, r * 3, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
        }

        // Randomly spawn new pulses
        if (Math.random() < 0.04) spawnPulse();

        // ── Cursor glow bloom ─────────────────────────────────────────
        if (mouseRef.current.x > 0) {
            const glowR = 120;
            const glow = ctx.createRadialGradient(mx, my, 0, mx, my, glowR);
            glow.addColorStop(0, `rgba(${GRID_COLOR},0.12)`);
            glow.addColorStop(0.5, `rgba(${GRID_COLOR},0.04)`);
            glow.addColorStop(1, `rgba(${GRID_COLOR},0)`);
            ctx.beginPath();
            ctx.arc(mx, my, glowR, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();
        }

        // ── Horizon fade line ─────────────────────────────────────────
        const hGrad = ctx.createLinearGradient(0, vpY - 8, 0, vpY + 8);
        hGrad.addColorStop(0, `rgba(${GRID_COLOR},0)`);
        hGrad.addColorStop(0.5, `rgba(${GRID_COLOR},0.18)`);
        hGrad.addColorStop(1, `rgba(${GRID_COLOR},0)`);
        ctx.beginPath();
        ctx.moveTo(0, vpY);
        ctx.lineTo(W, vpY);
        ctx.strokeStyle = hGrad;
        ctx.lineWidth = 1;
        ctx.stroke();

        rafRef.current = requestAnimationFrame(draw);
    }, [spawnPulse]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();

        const onMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            };
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove, { passive: true });
        rafRef.current = requestAnimationFrame(draw);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
        };
    }, [draw]);

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
                opacity: 1,
            }}
            aria-hidden="true"
        />
    );
}
