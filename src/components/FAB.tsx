"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Sun, Moon, Code2, Download, Layers, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface FABProps {
    onTerminalOpen: () => void;
}

const ACTIONS = [
    { id: "resume", label: "Resume" },
    { id: "terminal", label: "Terminal" },
    { id: "theme", label: "Theme" },
] as const;

export default function FAB({ onTerminalOpen }: FABProps) {
    const [open, setOpen] = useState(false);
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

    const icon = (id: string) => {
        if (id === "theme") return theme === "dark" ? <Sun size={17} /> : <Moon size={17} />;
        if (id === "terminal") return <Code2 size={17} />;
        return <Download size={17} />;
    };

    return (
        <div className="fab-container">
            <AnimatePresence>
                {open && ACTIONS.map((action, i) => (
                    <m.div
                        key={action.id}
                        className="fab-item"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ delay: (ACTIONS.length - 1 - i) * 0.04, duration: 0.18 }}
                    >
                        <span className="tip">{action.label}</span>
                        <button className="icon-btn" onClick={() => handleAction(action.id)} aria-label={action.label}>
                            {icon(action.id)}
                        </button>
                    </m.div>
                ))}
            </AnimatePresence>

            <button className="fab-main" onClick={() => setOpen(!open)} aria-label="Actions" aria-expanded={open}>
                <m.span style={{ display: "grid" }} animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
                    {open ? <X size={20} /> : <Layers size={20} />}
                </m.span>
            </button>
        </div>
    );
}
