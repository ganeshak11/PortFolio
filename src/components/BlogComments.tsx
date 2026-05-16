"use client";

import { useState } from "react";

export default function BlogComments({ slug }: { slug: string }) {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleComment(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        const res = await fetch(`/api/comments/${slug}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            setForm({ name: "", email: "", message: "" });
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 4000);
        }
        setSubmitting(false);
    }

    const inputStyle: React.CSSProperties = {
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: "1px solid var(--border)",
        padding: "10px 0",
        color: "var(--fg)",
        fontSize: 14,
        outline: "none",
        boxSizing: "border-box",
        fontFamily: "inherit",
        transition: "border-color 0.2s",
    };

    return (
        <div>
            {/* Comment form */}
            <div style={{ marginBottom: 56 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--fg)", marginBottom: 8 }}>Leave a note</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 28, lineHeight: 1.6 }}>
                    Thoughts, corrections, or just saying hi — all welcome.
                </p>
                <form onSubmit={handleComment} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    <div className="comment-name-email" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 4 }}>
                        <input
                            style={inputStyle}
                            placeholder="Name *"
                            value={form.name}
                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                            required
                        />
                        <input
                            style={inputStyle}
                            placeholder="Email (optional)"
                            type="email"
                            value={form.email}
                            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        />
                    </div>
                    <textarea
                        style={{ ...inputStyle, resize: "vertical", minHeight: 80, marginBottom: 20 }}
                        placeholder="Your message *"
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        required
                    />
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <button
                            type="submit"
                            disabled={submitting}
                            style={{
                                fontSize: 13,
                                padding: "8px 20px",
                                border: "1px solid var(--accent)",
                                color: "var(--accent)",
                                background: "none",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                borderRadius: 4,
                                transition: "background 0.2s, color 0.2s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--bg)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--accent)"; }}
                        >
                            {submitting ? "Posting..." : "Post comment"}
                        </button>
                        {submitted && <span style={{ fontSize: 12, color: "var(--status-ok)" }}>✓ Posted — thanks for the note.</span>}
                    </div>
                </form>
            </div>
        </div>
    );
}
