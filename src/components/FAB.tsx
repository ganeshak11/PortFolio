"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Sun, Moon, Code2, Download, Layers, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import Magnetic from "@/components/Magnetic";

interface FABProps {
    onTerminalOpen: () => void;
}

const btnStyle = (color: string): React.CSSProperties => ({
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: `1px solid ${color}`,
    background: "var(--card-bg)",
    color: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
});

const ACTIONS = [
    { id: "resume",   label: "Resume"   },
    { id: "terminal", label: "Terminal" },
    { id: "theme",    label: "Theme"    },
];

export default function FAB({ onTerminalOpen }: FABProps) {
    const [open, setOpen] = useState(false);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const { theme, toggle } = useTheme();

    const handleAction = (id: string) => {
        if (id === "theme") toggle();
        if (id === "terminal") onTerminalOpen();
        if (id === "resume") {
            const w = window.open("/resume.html", "_blank");
            if (w) w.addEventListener("load", () => setTimeout(() => w.print(), 500));
        }
        setOpen(false);
    };

    const getIcon = (id: string, size = 18) => {
        const animated = hoveredId === id;
        if (id === "theme") return theme === "dark"
            ? <Sun size={size} style={{ transition: "transform 0.4s", transform: animated ? "rotate(180deg)" : "rotate(0deg)" }} />
            : <Moon size={size} style={{ transition: "transform 0.4s", transform: animated ? "rotate(-30deg)" : "rotate(0deg)" }} />;
        if (id === "terminal") return <Code2 size={size} style={{ transition: "transform 0.3s", transform: animated ? "scale(1.2)" : "scale(1)" }} />;
        if (id === "resume") return <Download size={size} style={{ transition: "transform 0.3s", transform: animated ? "translateY(3px)" : "translateY(0)" }} />;
    };

    return (
        <div className="fab-container" style={{ position: "fixed", bottom: 28, right: 28, zIndex: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>

            {/* Fan-out action buttons */}
            <AnimatePresence>
                {open && ACTIONS.map((action, i) => (
                    <m.div
                        key={action.id}
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 28 }}
                        style={{ display: "flex", alignItems: "center", gap: 10, flexDirection: "row-reverse" }}
                    >
                        {/* Label */}
                        <m.span
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ delay: i * 0.06 + 0.05 }}
                            style={{
                                fontSize: 11,
                                fontFamily: "monospace",
                                color: "var(--muted)",
                                letterSpacing: "0.05em",
                                background: "var(--card-bg)",
                                padding: "3px 8px",
                                borderRadius: 4,
                                border: "1px solid var(--border)",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {action.label}
                        </m.span>

                        {/* Button */}
                        <Magnetic>
                            <button
                                onClick={() => handleAction(action.id)}
                                onMouseEnter={() => setHoveredId(action.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={btnStyle("var(--accent)")}
                                aria-label={action.label}
                            >
                                {getIcon(action.id)}
                            </button>
                        </Magnetic>
                    </m.div>
                ))}
            </AnimatePresence>

            {/* Main FAB button */}
            <Magnetic>
                <button
                    onClick={() => setOpen(!open)}
                    style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        border: "1px solid var(--accent)",
                        background: "var(--accent)",
                        color: "var(--bg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                    aria-label="Actions"
                >
                    <m.div animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                        {open ? <X size={20} /> : <Layers size={20} />}
                    </m.div>
                </button>
            </Magnetic>
        </div>
    );
}
