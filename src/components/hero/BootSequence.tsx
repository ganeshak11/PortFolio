import { useEffect, useReducer, useState } from "react";
import { m } from "framer-motion";

const BOOT_LINES = [
    "BIOS v2.4.1 — Initializing hardware...",
    "CPU: 8-core @ 3.6GHz ✓",
    "RAM: 32GB DDR5 ✓",
    "Loading kernel modules...",
    "Mounting filesystems...",
    "[  OK  ] Started systemd-journald.service",
    "[  OK  ] Reached target Graphical Interface",
    "Starting portfolio.service...",
    "[  OK  ] portfolio.service — Active (running)",
    "Ready.",
];

type BootState = { lineIdx: number; typedLines: string[] };
type BootAction = { type: "advance"; line: string };

function bootReducer(state: BootState, action: BootAction): BootState {
    switch (action.type) {
        case "advance":
            return { lineIdx: state.lineIdx + 1, typedLines: [...state.typedLines, action.line] };
        default:
            return state;
    }
}

export function BootSequence({ setBootDone }: { setBootDone: (done: boolean) => void }) {
    const [bootState, dispatch] = useReducer(bootReducer, { lineIdx: 0, typedLines: [] });
    const [skipped, setSkipped] = useState(false);

    // Skip instantly if completed in current session
    useEffect(() => {
        if (typeof window !== "undefined" && window.sessionStorage.getItem("boot_sequence_completed") === "true") {
            setBootDone(true);
            setSkipped(true);
        }
    }, [setBootDone]);

    // Lock scroll during active boot
    useEffect(() => {
        if (skipped) return;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, [skipped]);

    useEffect(() => {
        if (skipped) return;
        if (bootState.lineIdx >= BOOT_LINES.length) {
            setTimeout(() => {
                if (typeof window !== "undefined") {
                    window.sessionStorage.setItem("boot_sequence_completed", "true");
                }
                document.body.style.overflow = "";
                setBootDone(true);
            }, 800);
            return;
        }
        const delay = bootState.lineIdx === 0 ? 1000 : 400 + Math.random() * 500;
        const t = setTimeout(() => {
            dispatch({ type: "advance", line: BOOT_LINES[bootState.lineIdx] });
        }, delay);
        return () => clearTimeout(t);
    }, [bootState.lineIdx, setBootDone, skipped]);

    const handleSkip = () => {
        if (typeof window !== "undefined") {
            window.sessionStorage.setItem("boot_sequence_completed", "true");
        }
        document.body.style.overflow = "";
        setBootDone(true);
        setSkipped(true);
    };

    if (skipped) return null;

    return (
        <section
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "80px 24px 40px",
                background: "#0a0a0f",
                color: "#39ff14",
                position: "fixed",
                inset: 0,
                width: "100%",
                zIndex: 99999,
            }}
        >
            {/* Skip Sequence Button */}
            <button
                onClick={handleSkip}
                style={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                    background: "transparent",
                    border: "1px solid #39ff14",
                    color: "#39ff14",
                    fontFamily: "monospace",
                    fontSize: 11,
                    padding: "6px 12px",
                    borderRadius: 4,
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(57, 255, 20, 0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
                [Skip Sequence]
            </button>

            <div
                style={{
                    maxWidth: 640,
                    margin: "0 auto",
                    width: "100%",
                    fontFamily: "monospace",
                    fontSize: "clamp(12px, 1.5vw, 14px)",
                    lineHeight: 1.8,
                }}
            >
                {bootState.typedLines.map((line) => (
                    <m.div
                        key={line}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            color: line.startsWith("[  OK  ]") ? "#39ff14"
                                : line.startsWith("Starting") ? "#facc15"
                                    : "#ccc",
                        }}
                    >
                        {line}
                    </m.div>
                ))}
                {bootState.lineIdx < BOOT_LINES.length && (
                    <span className="cursor-blink" style={{ marginTop: 4, display: "block", height: 14 }} />
                )}
            </div>
        </section>
    );
}
