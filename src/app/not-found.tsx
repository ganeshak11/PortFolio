"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { m } from "framer-motion";

export default function NotFound() {
  const { push } = useRouter();
  const [countdown, setCountdown] = useState(3);
  const [currentPath, setCurrentPath] = useState("");
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    if (!mountedRef.current) return;

    if (countdown === 0) {
      window.location.href = "/";
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);


  if (!mountedRef.current) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        padding: "24px",
      }}
    >
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div
          style={{
            padding: "clamp(32px, 5vw, 64px)",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--card-bg)",
          }}
        >
          {/* Terminal-style error */}
          <div
            style={{
              fontFamily: "monospace",
              marginBottom: 32,
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "var(--fg)",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              [ERROR] Page not found
            </p>
            <p
              style={{
                fontSize: 12,
                color: "var(--muted)",
                marginBottom: 4,
              }}
            >
              $ ls {currentPath}
            </p>
            <p
              style={{
                fontSize: 12,
                color: "var(--fg)",
              }}
            >
              ls: cannot access '{currentPath}': No such file or directory
            </p>
          </div>

          {/* 404 Display */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1
              style={{
                fontSize: "clamp(80px, 15vw, 140px)",
                fontWeight: 900,
                color: "var(--fg)",
                lineHeight: 1,
                fontFamily: "monospace",
                marginBottom: 16,
              }}
            >
              404
            </h1>
            <p
              style={{
                fontSize: 18,
                color: "var(--fg)",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Page Not Found
            </p>
            <p
              style={{
                fontSize: 14,
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Countdown */}
          <div
            style={{
              textAlign: "center",
              padding: "24px",
              background: "color-mix(in srgb, var(--fg) 3%, transparent)",
              borderRadius: 6,
              border: "1px solid var(--border)",
            }}
          >
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: "var(--fg)",
                fontWeight: 700,
                marginBottom: 8,
                letterSpacing: "0.05em",
              }}
            >
              [AUTO-REDIRECT]
            </p>
            <p
              style={{
                fontSize: 14,
                color: "var(--muted)",
              }}
            >
              Redirecting to homepage in{" "}
              <span
                style={{
                  color: "var(--fg)",
                  fontWeight: 800,
                  fontSize: 20,
                }}
              >
                {countdown}
              </span>{" "}
              seconds...
            </p>
          </div>

          {/* Manual redirect button */}
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Link
              href="/"
              style={{
                display: "inline-block",
                fontFamily: "monospace",
                fontSize: 13,
                padding: "12px 24px",
                background: "transparent",
                border: "1px solid var(--border)",
                color: "var(--fg)",
                borderRadius: 4,
                cursor: "pointer",
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--fg)";
                e.currentTarget.style.color = "var(--bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--fg)";
              }}
            >
              [Go Home Now]
            </Link>
          </div>
        </div>
      </m.div>
    </div>
  );
}
