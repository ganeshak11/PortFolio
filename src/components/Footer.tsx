"use client";

export default function Footer() {
    return (
        <footer
            style={{
                padding: "48px 24px",
                borderTop: "1px solid var(--border)",
                background: "var(--bg)",
            }}
        >
            <div
                style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    textAlign: "center",
                }}
            >
                <p
                    style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: "var(--muted)",
                    }}
                >
                    $ echo &quot;Built to last, not to impress.&quot;
                </p>
            </div>
        </footer>
    );
}
