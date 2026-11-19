"use client";

import { ArrowUpRight, Lock, KeyRound, Fingerprint, MonitorSmartphone, Camera, HardDriveDownload, ShieldCheck } from "lucide-react";
import { SectionHead, Reveal } from "@/components/ui/SectionHead";

const REPO = "https://github.com/Fortis-OS/fortis-ecosystem";

const STATS = [
    { n: "13.2k", l: "lines of Rust" },
    { n: "9.7k", l: "lines of Kotlin" },
    { n: "9", l: "components" },
    { n: "4.2k", l: "lines of spec" },
];

const FEATURES = [
    { Icon: Lock, title: "Encrypted vault + autofill", desc: "SQLCipher vault on the laptop, an encrypted copy on the phone. Autofill through Android's Autofill framework and a browser extension on the laptop." },
    { Icon: Fingerprint, title: "Fingerprint-approved sudo", desc: "A Rust PAM module asks the phone. It checks the phone's signature itself against a root-owned key, so malware running as you can't forge an approval." },
    { Icon: KeyRound, title: "TOTP codes", desc: "2FA codes on both devices, generated from the same encrypted vault." },
    { Icon: MonitorSmartphone, title: "Laptop remote", desc: "Files, actions, notification mirroring and keyboard/mouse control from the phone. Remote input needs a fresh fingerprint." },
    { Icon: Camera, title: "Phone as webcam", desc: "Streams only on the phone's Tailscale address, with a one-time token, to the paired laptop only." },
    { Icon: HardDriveDownload, title: "Encrypted backups", desc: "Mirror + hard-linked snapshots on a systemd timer, with an off-site copy pushed to the phone over Tailscale." },
];

const THREATS: [string, string][] = [
    ["Thief with the laptop", "Vault is SQLCipher-encrypted with a key derived from the master password"],
    ["Thief with the phone", "Phone vault key is wrapped by a hardware Keystore key behind biometrics"],
    ["Another device on the Wi-Fi", "The agent never listens on LAN interfaces"],
    ["Another device on the tailnet", "Every request must be signed by a paired device key"],
    ["A malicious web page", "No CORS, Host allow-list, token never exposed to web content"],
    ["Replay of a captured approval", "Timestamps, nonces and single-use challenge IDs"],
];

const CRYPTO = ["Argon2id", "HKDF-SHA-256", "SQLCipher 4", "XChaCha20-Poly1305", "ECDSA P-256 (Android Keystore)", "RFC 6238 TOTP"];

const FAMILY = [
    {
        name: "FortisOS",
        tag: "the dream",
        badge: "private · in design",
        desc: "Computing started with mainframes: one big machine, many users. Then one PC, one OS, and either many users on a machine or one user juggling many devices and many OSes. Then came the ecosystem wars between Apple and Samsung. FortisOS asks why fight: one user, many devices, one OS.",
        points: ["M0 skeleton, M1 metadata engine, M2 encrypted chunk store done", "Deterministic simulator: seeded network faults, clock skew, crashes", "Power cut after every write in crash tests, plus mutation testing"],
        href: undefined as string | undefined,
        post: "/blog/fortis-pseudo-os",
        stack: ["Rust", "Distributed systems"],
    },
    {
        name: "fortis-share",
        tag: "AirDrop for Linux → Android",
        badge: "npm",
        desc: "Send files, folders, screenshots and the clipboard from the laptop to the phone in one command or one right-click, over Tailscale + Termux sshd.",
        points: ["One-time QR download link when the phone isn't reachable", "Dolphin right-click “Send to phone” + clipboard hotkey", "No cloud: laptop → phone directly"],
        href: "https://github.com/Fortis-Tools/fortis-share",
        post: undefined as string | undefined,
        stack: ["Python", "rsync", "Tailscale"],
    },
    {
        name: "Fortis-Tools · healthcheck",
        tag: "npx @fortis-tools/healthcheck",
        badge: "npm",
        desc: "A miniature SRE observability CLI: DNS, SSL, HTTP/2 via ALPN, security headers, port exposure, SPF/DMARC and a sitemap spider, rolled into a health score.",
        points: ["Multi-domain comparison table", "--json output and exit codes for CI/CD", "Built on Node's native dns / tls / https"],
        href: "https://github.com/Fortis-Tools/healthcheck",
        post: undefined as string | undefined,
        stack: ["TypeScript", "Node.js"],
    },
];

function Node({ name, sub, hub }: { name: string; sub: string; hub?: boolean }) {
    return (
        <div className={`fx-node${hub ? " hub" : ""}`}>
            <b>{name}</b>
            <span>{sub}</span>
        </div>
    );
}

export default function FortisEcosystem() {
    return (
        <section id="fortis" className="section fortis">
            <div className="wrap">
                <SectionHead
                    index="02"
                    cmd="flagship"
                    title={<>Fortis <em>Ecosystem</em></>}
                    lede="My main project since July 2026. The docs are the specification: the code has to follow them, and a broken MUST rule blocks a release."
                />

                {/* Hero panel */}
                <Reveal className="panel fx-hero">
                    <div className="panel-bar">
                        <span className="win-dots" aria-hidden="true"><i /><i /><i /></span>
                        <span className="title">Fortis-OS/fortis-ecosystem</span>
                        <span className="chip solid">flagship</span>
                    </div>
                    <div className="fx-hero-body">
                        <div className="fx-pitch">
                            <p className="fx-quote">A password vault, autofill, fingerprint sudo and laptop remote for my Android phone and Linux laptops. Over Tailscale, no cloud.</p>
                            <div className="row-wrap">
                                {["Rust", "Kotlin / Compose", "Tauri", "UniFFI", "PAM", "SQLCipher", "Tailscale", "systemd"].map((t) => (
                                    <span key={t} className="chip">{t}</span>
                                ))}
                            </div>
                            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
                                <a href={REPO} target="_blank" rel="me noopener noreferrer" className="btn primary">View the repo <ArrowUpRight size={14} /></a>
                                <a href={`${REPO}/tree/main/docs`} target="_blank" rel="noopener noreferrer" className="btn">Read the spec</a>
                                <a href={`${REPO}/blob/main/docs/security/README.md`} target="_blank" rel="noopener noreferrer" className="btn"><ShieldCheck size={14} /> Security model</a>
                            </div>
                        </div>
                        <div className="fx-stats">
                            {STATS.map((s) => (
                                <div key={s.l}>
                                    <b>{s.n}</b>
                                    <span>{s.l}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* Why + hardest part */}
                <div className="fx-story">
                    <Reveal className="panel fx-why">
                        <p className="label">Why it exists</p>
                        <p>
                            It started with laziness. I SSH&apos;d into my laptop from Termux just to shut it down from across the room,
                            then added Tailscale so it worked from anywhere, then nightly snapshots with my phone as the off-site backup.
                        </p>
                        <p>
                            One evening a &ldquo;Deploy NOW&rdquo; message reached me at a cricket ground, and I shipped a production release
                            from my phone to a laptop five miles away. That night I looked at what I had built the way an attacker would:
                            a remote shell with a pretty face. So I threw it away and rebuilt it, spec first.
                        </p>
                        <a href="/blog/fortis-ecosystem" className="link" style={{ alignSelf: "flex-start" }}>Read the full story →</a>
                    </Reveal>
                    <Reveal className="panel fx-why hard" delay={0.06}>
                        <p className="label">The hardest part: sudo</p>
                        <p>
                            PAM was the biggest problem. Not because it&apos;s hard to code; AI can write a PAM module in minutes.
                            The problem was the consequences: if I locked myself out of sudo by accident, everything was gone.
                        </p>
                        <p>
                            So every failure path (phone off, network down, a signature that doesn&apos;t check out) falls back to the
                            normal password prompt.
                        </p>
                        <p className="fx-pull">&ldquo;A clever login system that can lock you out of your own machine is worse than no clever login system at all.&rdquo;</p>
                    </Reveal>
                </div>

                {/* Architecture */}
                <Reveal className="panel fx-arch" delay={0.05}>
                    <p className="label">Architecture</p>
                    <div className="fx-diagram">
                        <div className="fx-col">
                            <p className="fx-col-title">📱 Android phone</p>
                            <Node name="fortis-mobile" sub="Kotlin · Compose: vault, autofill, sudo approvals, remote, webcam" />
                            <Node name="fortis-bindings" sub="fortis-core crypto via Rust + UniFFI" />
                            <Node name="Termux sshd" sub="off-site backup target" />
                        </div>
                        <div className="fx-link" aria-hidden="true">
                            <span className="fx-wire" />
                            <span className="fx-wire-label">Tailscale · WireGuard<br />signed requests + event stream</span>
                            <span className="fx-wire" />
                        </div>
                        <div className="fx-col">
                            <p className="fx-col-title">💻 Linux laptop</p>
                            <Node hub name="fortis-agent" sub="Rust daemon: REST on 127.0.0.1 + tailnet, IPC socket" />
                            <div className="fx-pair">
                                <Node name="fortis-core" sub="crypto · vault.db (SQLCipher)" />
                                <Node name="pam_fortis.so" sub="biometric sudo" />
                            </div>
                            <div className="fx-pair">
                                <Node name="desktop · cli" sub="Tauri app · terminal client" />
                                <Node name="browser host" sub="extension → native messaging" />
                            </div>
                            <Node name="fortis-backup" sub="snapshots → /mnt/FortisVault + phone" />
                        </div>
                    </div>
                </Reveal>

                {/* Features */}
                <div className="fx-features">
                    {FEATURES.map(({ Icon, title, desc }, i) => (
                        <Reveal key={title} delay={(i % 3) * 0.05} className="panel hover fx-feature">
                            <span className="tl-icon"><Icon size={17} strokeWidth={1.6} /></span>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </Reveal>
                    ))}
                </div>

                {/* Security */}
                <Reveal className="panel fx-sec" delay={0.05}>
                    <div>
                        <p className="label">Threat model: who it defends against</p>
                        <ul className="fx-threats">
                            {THREATS.map(([who, how]) => (
                                <li key={who}><b>{who}</b><span>{how}</span></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="label">Only these primitives are allowed</p>
                        <div className="row-wrap" style={{ gap: 8 }}>
                            {CRYPTO.map((c) => <span key={c} className="chip accent">{c}</span>)}
                        </div>
                        <p className="fx-note">
                            Every rule in the spec is a MUST / MUST NOT / SHOULD, and a broken MUST blocks a release.
                            Accepted risks (root compromise, a weak master password) are written down too, not hidden.
                        </p>
                    </div>
                </Reveal>

                {/* Fortis family */}
                <div style={{ marginTop: 56 }}>
                    <p className="eyebrow" style={{ marginBottom: 16 }}><span className="idx">02.1</span><span className="rule" /><span>the Fortis family</span></p>
                    <div className="cards-3">
                        {FAMILY.map((f, i) => (
                            <Reveal key={f.name} delay={i * 0.05} className={`panel hover fx-family${i === 0 ? " dream" : ""}`}>
                                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                                    <span className="mono" style={{ fontSize: 11.5, color: "var(--accent)" }}>{f.tag}</span>
                                    <span className="chip">{f.badge}</span>
                                </div>
                                <h3>{f.name}</h3>
                                <p>{f.desc}</p>
                                <ul className="lim fx-points">
                                    {f.points.map((p) => <li key={p}>{p}</li>)}
                                </ul>
                                <div className="row-wrap" style={{ marginTop: "auto" }}>
                                    {f.stack.map((s) => <span key={s} className="chip">{s}</span>)}
                                </div>
                                {f.href ? (
                                    <a href={f.href} target="_blank" rel="me noopener noreferrer" className="link" style={{ alignSelf: "flex-start" }}>View on GitHub ↗</a>
                                ) : (
                                    <span className="mono" style={{ fontSize: 12, color: "var(--faint)" }}>repo is private while the design settles</span>
                                )}
                                {f.post && (
                                    <a href={f.post} className="link" style={{ alignSelf: "flex-start" }}>Read: One User, Many Machines →</a>
                                )}
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
