"use client";

import { useEffect, useState } from "react";

interface Comment {
    id: string;
    name: string;
    message: string;
    created_at: string;
}

const s: Record<string, React.CSSProperties> = {
    wrap: { marginTop: 32, display: "flex", flexDirection: "column", gap: 24 },
    card: { background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "clamp(20px, 4vw, 28px)" },
    mono: { fontFamily: "monospace", fontSize: 13, color: "var(--accent)", marginBottom: 16 },
    input: { width: "100%", background: "transparent", border: "1px solid var(--border)", borderRadius: 6, padding: "10px 14px", color: "var(--fg)", fontFamily: "monospace", fontSize: 14, outline: "none", boxSizing: "border-box" },
    btn: { fontFamily: "monospace", fontSize: 13, padding: "10px 20px", background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)", borderRadius: 6, cursor: "pointer" },
};

export default function BlogComments({ slug }: { slug: string }) {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        fetch(`/api/likes/${slug}`).then(r => r.json()).then(d => setLikes(d.count));
        fetch(`/api/comments/${slug}`).then(r => r.json()).then(setComments);
        setLiked(!!localStorage.getItem(`liked:${slug}`));
    }, [slug]);

    async function handleLike() {
        if (liked) return;
        const res = await fetch(`/api/likes/${slug}`, { method: "POST" });
        const data = await res.json();
        setLikes(data.count);
        setLiked(true);
        localStorage.setItem(`liked:${slug}`, "1");
    }

    async function handleComment(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        const res = await fetch(`/api/comments/${slug}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            const newComment = await res.json();
            setComments(prev => [newComment, ...prev]);
            setForm({ name: "", email: "", message: "" });
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        }
        setSubmitting(false);
    }

    return (
        <div style={s.wrap}>
            {/* Likes */}
            <div style={s.card}>
                <p style={s.mono}>ganesh@portfolio:~/blog$ react --likes</p>
                <button
                    onClick={handleLike}
                    disabled={liked}
                    style={{
                        ...s.btn,
                        borderColor: liked ? "var(--fg-muted)" : "var(--accent)",
                        color: liked ? "var(--fg-muted)" : "var(--accent)",
                        cursor: liked ? "default" : "pointer",
                        opacity: liked ? 0.6 : 1,
                    }}
                >
                    {liked ? "▲ liked" : "▲ like"} · {likes}
                </button>
            </div>

            {/* Comment form */}
            <div style={s.card}>
                <p style={s.mono}>ganesh@portfolio:~/blog$ git commit -m "leave a comment"</p>
                <form onSubmit={handleComment} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <input
                            style={s.input}
                            placeholder="name *"
                            value={form.name}
                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                            required
                        />
                        <input
                            style={s.input}
                            placeholder="email (optional)"
                            type="email"
                            value={form.email}
                            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        />
                    </div>
                    <textarea
                        style={{ ...s.input, resize: "vertical", minHeight: 100 }}
                        placeholder="message *"
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        required
                    />
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <button type="submit" style={s.btn} disabled={submitting}>
                            {submitting ? "posting..." : "$ post comment"}
                        </button>
                        {submitted && <span style={{ fontFamily: "monospace", fontSize: 12, color: "#27c93f" }}>✓ comment posted</span>}
                    </div>
                </form>
            </div>

            {/* Comments list */}
            {comments.length > 0 && (
                <div style={s.card}>
                    <p style={s.mono}>ganesh@portfolio:~/blog$ git log --comments ({comments.length})</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {comments.map(c => (
                            <div key={c.id} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 16 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                    <span style={{ fontFamily: "monospace", fontSize: 13, color: "var(--accent)" }}>{c.name}</span>
                                    <time style={{ fontFamily: "monospace", fontSize: 11, color: "var(--fg-muted)" }}>
                                        {new Date(c.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                    </time>
                                </div>
                                <p style={{ margin: 0, fontSize: 14, color: "var(--fg)", lineHeight: 1.6 }}>{c.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
