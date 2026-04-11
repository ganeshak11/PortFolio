"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const [currentPath, setCurrentPath] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (countdown === 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, mounted, router]);

  if (!mounted) {
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div
          className="glass-card"
          style={{
            padding: "clamp(32px, 5vw, 64px)",
            borderRadius: 8,
            border: "1px solid var(--status-err)",
            background: "rgba(220, 38, 38, 0.05)",
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
                color: "var(--status-err)",
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
                color: "var(--status-err)",
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
                color: "var(--status-err)",
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
              background: "var(--card-bg)",
              borderRadius: 6,
              border: "1px solid var(--border)",
            }}
          >
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: "var(--accent)",
                marginBottom: 8,
                letterSpacing: "0.1em",
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
                  color: "var(--accent)",
                  fontWeight: 700,
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
            <button
              onClick={() => router.push("/")}
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                padding: "12px 24px",
                background: "transparent",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                borderRadius: 4,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.color = "var(--bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--accent)";
              }}
            >
              [Go Home Now]
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
