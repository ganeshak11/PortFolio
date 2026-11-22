---
title: "Designing the Pseudo-OS: The Architecture Behind One User, Many Machines"
date: "2026-09-19"
slug: "fortis-pseudo-os-part-2"
excerpt: "Moving from philosophy to systems design: the theoretical blueprint for VFS caching, Content-Addressable Storage, Hybrid Logical Clocks, and surviving Android."
hook: "The moment you try to plan an operating system that treats all your devices as one computer, traditional filesystems immediately break down."
tags: ["distributed-systems", "linux", "architecture", "fortis", "systems-engineering"]
---

# Designing the Pseudo-OS: The Architecture Behind One User, Many Machines

In [Part 1: The Question That Ruined My Sleep](/blog/fortis-pseudo-os), I talked about how a corrupted Git repository led me to a radical conclusion: we don't need better file synchronization, we need to eliminate the device barrier entirely. Traditional operating systems assume **One Device, Many Users**. Fortis flips that premise upside down to **One User, Many Devices**. The hardware becomes disposable terminals, while the user’s environment—files, configs, secrets, state, and identity—becomes the permanent, living system.

It sounded brilliant on paper. I had five pages of clean architecture diagrams, an empty coffee mug, and a sense of boundless optimism. But let's be completely transparent: I don't have a dedicated home server humming in a rack yet. That is a future hardware milestone. Everything I'm laying out here is a **purely theoretical architecture**—a systems design blueprint worked out in my notebook. Before buying hardware, provisioning dedicated machines, or writing production code, I needed to know whether the architecture was even fundamentally sound. Turning a philosophical concept into a functional system isn't a matter of writing another quick bash script; it demands solving fundamental problems in storage, networking, OS constraints, and consensus on paper first. Here is the theoretical blueprint.

---

# The Trap of "Simple" Solutions

Whenever you pitch an idea like this to an engineer, their immediate response is: *"Why don't you just use NFS? Or Samba? Or SSHFS over Tailscale?"* It sounds reasonable on the surface. Network filesystems have existed since the 1980s, so why reinvent the wheel? To test the concept, I experimented with mounting remote storage over Tailscale using SSHFS. I opened my terminal, pointed it at a remote mount, and typed:

```bash
ls ~/remote-storage
```

It worked initially, and I smiled. But then I closed my laptop lid, walked into a coffee shop, opened the laptop again, and typed `ls ~/remote-storage`. Nothing happened. The cursor just sat there, blinking. I pressed `Ctrl+C`—nothing. I pressed `Ctrl+Z`—nothing. I tried opening another terminal tab to run `kill -9`, but the new terminal froze the moment it tried to evaluate my `$PATH`.

My entire desktop environment began grinding to a halt. Why? Because traditional network filesystems were built for local area networks in climate-controlled server rooms in 1985. They assume network latency is near zero, connections are permanent, and packet loss is an anomaly. In the real world of personal mobile computing, every single one of those assumptions is false: Wi-Fi drops, phones switch between 5G towers, and laptops sleep while walking across campus. The second a network socket drops, a traditional remote mount holds the kernel hostage. If I wanted an operating system layer that felt local on every device, I couldn't just mount a remote hard drive over a network pipe; I had to rethink how data is structured across physical silicon.

---

# Pillar 1: Files Are an Illusion. Blobs Are Truth.

In Linux, Windows, and macOS, a file is a rigid concept:

```text
/home/ganesh/dev/Fortis/Fortis-Ecosystem/fortis-backup.sh
```

That single path binds three distinct things together into one locked unit: its name and path (`fortis-backup.sh` in `dev/Fortis/Fortis-Ecosystem/`), its identity (an inode on a specific disk sector), and its raw data (the bytes stored on that physical drive). If you rename the folder, the path changes. If you copy the file, the data duplicates. If you move it across partitions, the entire payload has to be rewritten block by block. In a distributed personal OS, treating a file as a single entity is a recipe for failure.

Therefore, the Fortis architecture cleanly splits every single file into two completely independent realities:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                          OBJECT ID: 018f23b1-7a54                           │
├──────────────────────────────────────┬──────────────────────────────────────┤
│            METADATA HASH             │             CONTENT HASH             │
│          BLAKE3(Attributes)          │          BLAKE3(Raw Bytes)           │
│ "fortis-backup.sh", parent_id, tags  │     a8f5c3... (Raw source code)      │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

**1. Metadata (The Identity):** Every file or directory receives an immutable identity: a timestamp-sortable UUIDv7. It tracks its name, its parent directory ID, its creation time, its version number, and its tags. In the planned design, all metadata will live inside an ultra-fast, local SQLite database with WAL mode on every participating device.

**2. Content (The Payload):** The actual raw bytes will not live in a hierarchical folder. They will live in a Content-Addressable Storage (CAS) pool, hashed using BLAKE3. Instead of storing files by name, Fortis will store them purely by what they *are*:

```text
objects/
├── a8/
│   └── a8f5c3b12...  (Encrypted Data Chunk)
└── d4/
    └── d41d8cd98...  (Encrypted Data Chunk)
```

Why does this matter? Because this clean separation unlocks architectural superpowers. Renaming a 50GB directory in a traditional sync engine often triggers re-indexing or massive uploads; in Fortis, the content hash won't change by a single bit, and only a few bytes of SQLite metadata will update, resulting in a network transfer of 0 bytes. Moving files between folders will transfer zero bytes. Duplicating a 4GB ISO or video file will simply create a new metadata pointer to the existing content hash in the CAS pool, consuming 0 bytes of additional storage. And when editing a single line in a large file, FastCDC (Content-Defined Chunking) will slice data into variable-sized cryptographic chunks, so modifying two lines in a 100MB file only requires uploading the changed 64KB chunk. Files are just human-friendly illusions; under the hood, Fortis is designed to deal strictly in immutable cryptographic blocks.

---

# Pillar 2: Demand Paging for Personal Files (The VFS)

This leads to the central storage paradox: in this planned design, a future central Home Server node would hold terabytes of canonical storage, while a laptop has a 512GB SSD and a phone has 256GB of flash storage. How would a phone and a laptop get instant access to a multi-terabyte universe without running out of disk space? The architectural answer borrows directly from virtual memory and demand paging: your OS doesn't load a 16GB game into RAM all at once, but pages data in on demand. The Fortis VFS design applies the exact same principle to personal files.

```text
Laptop User Space
       │
       ▼  (Kernel stat() / read())
┌──────────────────────────────┐
│       Fortis FUSE VFS        │  Mount point: ~/Fortis
└──────────────┬───────────────┘
               │
       Is chunk in local LRU?
       ├── YES ──► Return from local disk immediately
       └── NO  ──► Fetch chunk over QUIC / Tailscale
                   Stream to app + save to local cache
```

On Linux, the plan is to implement a native FUSE driver mounted at `~/Fortis`. Under this design, browsing would be instant because every file and folder name is read directly from the local SQLite metadata replica, making directory navigation instantaneous even while completely offline. Reading would be demand-paged: when an application opens a file, FUSE intercepts the `read()` call, serving it immediately from local SSD if cached, or streaming the required byte range over an encrypted QUIC tunnel from the planned central storage node if cold. To protect against offline dead-zones, a Pinning Engine would guarantee that critical folders (like `~/Fortis/Projects` or `~/Fortis/Vault`) marked `pinned: true` are never evicted from local disk. Meanwhile, unpinned files would enter an automated Least-Recently-Used (LRU) cache that prunes cold chunks once cache capacity crosses 85%, leaving metadata intact. To the user, the entire filesystem would look and feel local, while the hardware boundaries dissolve.

---

# Pillar 3: The Android Strategy (Working With the Platform)

Designing for Linux is straightforward on paper because the kernel provides FUSE, `inotify`, systemd services, and raw network sockets. But bringing Android into the theoretical cluster requires a fundamentally different mindset. Android is a hyper-paranoid fortress designed to preserve battery life by aggressively killing background activity.

The architecture has to account for two hard constraints. First, Android prevents user-space applications from mounting arbitrary FUSE filesystems to root directories without root privileges, and requiring a daily-driver phone to be rooted is an unacceptable compromise. Second is the process lifecycle: under Android’s Doze Mode and proprietary OEM battery optimizations (like Samsung and Xiaomi), background processes are regularly suspended or issued a `SIGKILL` within minutes of screen-off time.

```text
┌─────────────────────────────────────────────────────────┐
│                     Android System                      │
│        (System File Picker / Gallery / Files App)       │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│            Fortis DocumentsProvider (SAF)               │
│      Exposes virtual metadata hierarchy natively        │
└────────────────────────────┬────────────────────────────┘
                             │
        ┌────────────────────┴────────────────────┐
        ▼                                         ▼
┌───────────────────────────────┐ ┌───────────────────────────────┐
│ Foreground Data-Sync Service  │ │ WorkManager (Deferred Tasks)  │
│ - Persistent low-profile notif│ │ - Thumbnail generation        │
│ - Instant QUIC event bus      │ │ - Heavy background GC         │
│ - Wakes on network/screen     │ │ - Requires WiFi + Charging    │
└───────────────────────────────┘ └───────────────────────────────┘
```

The Fortis Android blueprint therefore bypasses these roadblocks by embracing native Android APIs. Rather than fighting for a FUSE mount, Fortis on Android is designed to implement a native `DocumentsProvider` through the Storage Access Framework (SAF). This will expose the virtual metadata hierarchy directly to the Android system file picker, Google Files, and photo galleries without requiring root. To keep real-time event sync active without being killed by the OS, Fortis would run as an explicit foreground service (`FOREGROUND_SERVICE_DATA_SYNC` under API 34+) with a persistent low-profile notification. Resource-heavy background operations—such as syncing photo thumbnails or running database compactions—would be scheduled via `WorkManager` with explicit hardware constraints: executing only when connected to unmetered Wi-Fi and actively charging. This ensures mobile sync can remain responsive without sacrificing battery life.

---

# Pillar 4: The Concurrency Nightmare (When Devices Collide)

A distributed system across portable personal devices will inevitably encounter offline divergence. Consider this theoretical scenario: you're on a flight with your laptop open, completely offline, and you edit three lines in `notes/todo.md`. Concurrently, you pull out your phone and add two bullet points to the same note. Two hours later, you land, both devices connect to airport Wi-Fi, and both attempt to push their changes.

Most consumer tools handle this with Last-Write-Wins (LWW) based on wall-clock timestamps. But LWW is not a conflict resolution strategy—it is a polite euphemism for silent data loss. If one device's clock drifts by a few seconds, or a write timestamp registers slightly later, one set of edits is quietly erased.

Because physical clocks cannot be trusted in distributed environments due to clock skew and network drift, the Fortis architecture incorporates Hybrid Logical Clocks (HLC): `HLC = (physical_time: u64, logical_counter: u32)` alongside object version vectors. This will allow the system to mathematically determine whether two events are causally ordered or genuinely concurrent. If concurrent, the design enforces a strict policy: **Zero Silent Data Loss**.

```text
todo.md                                       ← Winner (Primary active version)
todo.conflict-node-phone-2026-09-19T14-22.md  ← Conflict Sibling (Preserved)
```

For file contents, both conflicting blobs will be preserved in the CAS; the deterministic tie-break winner will remain the primary file, while the competing edit will be forked into a designated conflict sibling so no work is lost. For metadata changes like renames and moves, Fortis will resolve the active path deterministically while recording the alternative proposal in the object’s version history rather than spawning ghost directories. Tag updates will merge through an OR-Set CRDT so concurrent tags are unioned rather than overwritten, and pinned cache flags will follow an OR-merge so that a stale event from one machine can never unpin offline files on another.

---

# Pillar 5: Cryptographic Sovereignty and Key Ceremonies

A platform intended to host an entire personal digital life—code repositories, dotfiles, credentials, notes, and private documents—requires zero-trust security engineered into the foundation. If a laptop is misplaced or a future central server encounters hardware failure, security and recovery cannot rely on fragile manual workarounds.

```text
┌─────────────────────────────────────────────┐
│            MASTER IDENTITY KEY              │
│        (Ed25519 Signing Keypair)            │
│   Split via 3-of-5 Shamir's Secret Sharing  │
└──────────────────┬──────────────────────────┘
                   │ Signs Device Certificates
       ┌───────────┼───────────┐
       ▼           ▼           ▼
   node-laptop   node-phone   node-desktop
  (Ed25519 Key) (Ed25519 Key)(Ed25519 Key)
```

In this architecture, passwords are eliminated entirely. Every enrolled device will generate its own Ed25519 keypair stored in hardware keystores (Linux kernel keyring or Android Keystore). Node-to-node communication will strictly mandate Mutual TLS (mTLS), authenticating peers cryptographically before any metadata is exchanged. Furthermore, Fortis will not rely solely on host OS disk encryption: every individual CAS chunk will be encrypted at rest using XChaCha20-Poly1305 (AEAD), ensuring that physical theft of a drive yields only unreadable ciphertext.

To solve the single-point-of-failure problem of a central server, the design avoids storing the master signing key whole on any single machine. Instead, the Master Key will be partitioned using Shamir's Secret Sharing (SSS) with a 3-of-5 threshold across five distinct custody points: the laptop keystore, the phone keystore (Fortis Vault), the desktop keystore, a printed paper QR code in a physical safe, and an offline hardware key. Enrolling a replacement device or recovering from a disaster will require combining any three shares, reconstructing the key transiently in RAM for the few seconds necessary to sign the new certificate, re-splitting the key into a fresh share set, and immediately zeroing the memory buffer. Revoking a lost device will take a single signed command, immediately cutting it off from the mesh.

---

# The Horizon: The Blueprint for a Unified Environment

Designing this architecture has fundamentally reshaped how I think about personal computing. Consumer technology has spent decades conditioning us to believe our digital lives must be fragmented across corporate walled gardens—treating our phone as one ecosystem, our laptop as another, and our cloud storage as an external repository. They convinced us that devices are primary, and that we are merely visitors logging into them.

The blueprint for a pseudo-operating system is built on the opposite truth: hardware is transient. Machines break, batteries drain, and devices are eventually replaced. **The user is the only permanent element in computing.**

By architecting a layer where Content-Addressable Storage, demand-paged VFS, mobile background providers, causal event clocks, and cryptographic keyrings work together, the end goal becomes clear: a unified digital environment where the hardware is merely an interchangeable viewport into a single, sovereign system. I don't have the physical home server humming in my room yet, but the theoretical foundation is built. The next step will be turning this blueprint into reality.

---

### The Series

> ✦ **Fortis Series**:
> - [Part 1: The Journey from Remote Shutdown Scripts to a Personal Ecosystem](/blog/fortis-ecosystem)
> - [Part 2: One User, Many Machines: The Question That Ruined My Sleep](/blog/fortis-pseudo-os)
> - **Part 3: Designing the Pseudo-OS: The Architecture Behind One User, Many Machines** (Current)
