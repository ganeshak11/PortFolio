"use client";

import { SectionHead, Reveal } from "@/components/ui/SectionHead";

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
    return (
        <section id="stack" className="section">
            <div className="wrap">
                <SectionHead index="05" cmd="capabilities --depth=system-level" title={<>Systems depth &amp; <em>stack</em></>} />
                <div className="stack-grid">
                    {SKILL_CATEGORIES.map((cat, i) => (
                        <Reveal key={cat.title} delay={i * 0.05} className="panel hover stack-card">
                            <h3>{cat.title}</h3>
                            <p className="cmd" title={`$ ${cat.cmd}`}>$ {cat.cmd}</p>
                            <ul>
                                {cat.items.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
