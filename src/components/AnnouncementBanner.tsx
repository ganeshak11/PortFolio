"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AnnouncementBanner() {
    const [visible, setVisible] = useState(true);

    return (
        <AnimatePresence>
            {visible && (
                <m.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999, // Above navbar and terminal
                        background: "var(--accent)",
                        color: "var(--bg)",
                        padding: "12px 16px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                >
                    <div style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16
                    }}>
                        <div style={{ flex: 1, display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center" }}>
                            <p style={{ margin: 0, fontSize: "clamp(12px, 2.5vw, 14px)", fontWeight: 600, lineHeight: 1.4 }}>
                                🚨 New Series: <span style={{ fontWeight: 900 }}>DevOps Duels</span> drops every Sunday & Thursday!{" "}
                                <Link href="/blog" style={{ textDecoration: "underline", fontWeight: 800, marginLeft: 4 }}>
                                    Check it out!
                                </Link>
                            </p>
                        </div>
                        <button
                            onClick={() => setVisible(false)}
                            aria-label="Close banner"
                            style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--bg)",
                                padding: 4,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "4px",
                                transition: "background 0.2s ease"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.1)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                            <X size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
}
