"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionHead, Reveal } from "@/components/ui/SectionHead";

const WIP_PROJECTS = [
    {
        name: "Fortis-CI",
        github: "https://github.com/Fortis-CI/Fortis-CI",
        tags: ["OPEN SOURCE", "Self-Hosted"],
        desc: "Building a centralized observability and recovery layer for software deployments. Open source, graph-native deployment tracking with root cause analysis and automated rollbacks.",
        note: "🚀 Looking for open-source developers to collaborate! If you're interested in system architecture, graphs, or DevOps tools, I'd love to build this together."
    },
    {
        name: "Fortis-Tools",
        github: "https://github.com/Fortis-Tools",
        tags: ["CLI", "DevOps"],
        desc: "A suite of infrastructure tools and scripts designed for system observability and reliability.",
        note: "Currently building tools like fortis-healthcheck for active polling and service health monitoring."
    }
];

export default function CurrentlyBuilding() {
    return (
        <section id="building" className="section" aria-labelledby="currently-building-heading">
            <div className="wrap">
                <SectionHead index="04" cmd="ps aux | grep wip" id="currently-building-heading" title={<>Things I&apos;m <em>building</em></>} />
                <div className="wip-grid">
                    {WIP_PROJECTS.map((project, i) => (
                        <Reveal key={project.name} delay={i * 0.06} className="panel hover wip">
                            <div className="row-wrap">
                                <span className="chip accent"><span className="dot live" /> WIP</span>
                                {project.tags.map((t) => (
                                    <span key={t} className={t === "OPEN SOURCE" ? "chip solid" : "chip"}>{t}</span>
                                ))}
                            </div>
                            <h3>{project.name}</h3>
                            <p>{project.desc}</p>
                            <p className="note">{project.note}</p>
                            <div>
                                <a href={project.github} target="_blank" rel="me noopener noreferrer" className="btn sm">
                                    GitHub / contribute <ArrowUpRight size={13} />
                                </a>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
