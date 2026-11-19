"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="wrap footer-inner">
                <span>$ echo &quot;Built to last, not to impress.&quot;</span>
                <span style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <Link href="/">home</Link>
                    <Link href="/about">about</Link>
                    <Link href="/blog">blog</Link>
                    <a href="/resume.html" target="_blank" rel="noopener noreferrer">resume</a>
                    <a href="https://github.com/ganeshak11" target="_blank" rel="me noopener noreferrer">github</a>
                </span>
                <span>© {new Date().getFullYear()} Ganesh Angadi</span>
            </div>
        </footer>
    );
}
