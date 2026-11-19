"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHead({
    index,
    cmd,
    title,
    lede,
    id,
}: {
    index: string;
    cmd: string;
    title: ReactNode;
    lede?: ReactNode;
    id?: string;
}) {
    return (
        <m.header
            className="section-head"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
            <span className="eyebrow">
                <span className="idx">{index}</span>
                <span className="rule" />
                <span>{cmd}</span>
            </span>
            <h2 className="section-title" id={id}>{title}</h2>
            {lede && <p className="section-lede">{lede}</p>}
        </m.header>
    );
}

export function Reveal({ children, delay = 0, className, style }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
    return (
        <m.div
            className={className}
            style={style}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </m.div>
    );
}
