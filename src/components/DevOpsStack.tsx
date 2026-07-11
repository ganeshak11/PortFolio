"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";

const SKILL_CATEGORIES = [
    {
        title: "Linux & OS Internals",
        cmd: "ls -lh /proc/sys/kernel",
        items: [
            "File System",
            "systemd Services",
            "Linux Networking Stack",
            "Bash/Shell Scripting",
            "Permissions, Users & Groups"
        ]
    },
    {
        title: "Containerization (Docker)",
        cmd: "docker inspect --format='{{json .Config}}'",
        items: [
            "Docker Images & Container Lifecycle",
            "Bridge & Host Networking",
            "Volumes & Bind Mounts",
            "Docker Compose Orchestration",
            "Dockerfile Writing & Build Basics"
        ]
    },
    {
        title: "Infrastructure as Code",
        cmd: "terraform plan -out=tfplan",
        items: [
            "AWS Resources Provisioning",
            "Variables, Inputs & Outputs",
            "Terraform State Files",
            "Modular Project Structure",
            "Commands (Init, Plan, Apply)"
        ]
    },
    {
        title: "Container Orchestration",
        cmd: "kubectl get pods -n production",
        items: [
            "Pods & Core Workloads",
            "Service Discovery & ClusterIP",
            "Deployments & Scaling",
            "Ingress Routing Basics",
            "ConfigMaps & Secrets"
        ]
    }
];

export default function DevOpsStack() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} id="stack" className="section-pad" style={{ padding: "100px 24px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 48 }}
                >
                    <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em", color: "var(--accent)", marginBottom: 12 }}>
                        $ capabilities --depth=system-level
                    </p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                        Systems Depth &amp; Stack
                    </h2>
                </m.div>

                {/* 2x2 Grid for capabilities */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: 24,
                    width: "100%"
                }}>
                    {SKILL_CATEGORIES.map((cat, i) => (
                        <m.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 24 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 * i, duration: 0.5 }}
                            style={{
                                background: "var(--card-bg)",
                                border: "1px solid var(--border)",
                                borderRadius: 12,
                                padding: 24,
                                fontFamily: "monospace",
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                                transition: "all 0.2s ease-in-out"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "var(--accent)";
                                e.currentTarget.style.boxShadow = "0 8px 24px color-mix(in srgb, var(--accent) 5%, transparent)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "var(--border)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            {/* Card Header */}
                            <div>
                                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--fg)", marginBottom: 4 }}>
                                    {cat.title}
                                </h3>
                                <p style={{ fontSize: 11, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    $ {cat.cmd}
                                </p>
                            </div>

                            {/* Divider line */}
                            <div style={{ height: 1, background: "color-mix(in srgb, var(--border) 60%, transparent)", width: "100%" }} />

                            {/* Tree List */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "var(--fg)" }}>
                                {cat.items.map((item, idx) => {
                                    const isLast = idx === cat.items.length - 1;
                                    return (
                                        <div key={item} style={{ display: "flex", alignItems: "start", gap: 8 }}>
                                            <span style={{ color: "var(--accent)", userSelect: "none" }}>
                                                {isLast ? "└──" : "├──"}
                                            </span>
                                            <span style={{ fontSize: 12, color: "var(--muted)" }}>{item}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
