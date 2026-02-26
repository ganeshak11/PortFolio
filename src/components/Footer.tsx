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
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
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

                <div
                    style={{
                        display: "flex",
                        gap: 24,
                        fontFamily: "monospace",
                        fontSize: 12,
                    }}
                >
                    {[
                        { label: "GitHub", href: "https://github.com" },
                        { label: "LinkedIn", href: "https://linkedin.com" },
                        { label: "Email", href: "mailto:ganesh@example.com" },
                    ].map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: "var(--muted)",
                                textDecoration: "none",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "var(--accent)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "var(--muted)")
                            }
                        >
                            {l.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
