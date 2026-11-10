---
title: "The Journey from Remote Shutdown Scripts to a Personal Ecosystem"
date: "2026-09-13"
slug: "fortis-ecosystem"
excerpt: "From a simple shutdown script to a fingerprint-secured ecosystem that turns my laptop and phone into one machine — and why I had to tear it all down to get there."
hook: "How much can you automate before you lose control?"
tags: ["personal", "automation", "linux", "security", "rust", "fortis"]
---

# What Led to Building a Distributed Ecosystem Between My Phone and Laptop

## How It Started: The Genesis of Peak Laziness

It all started when I moved to Linux. That single decision fundamentally rewired my brain—how I think, what I build, and how I approach problems. Around that time, I was diving into AWS. That’s where I first encountered SSH, public/private keys, and GitHub authentication. The first time I logged into an EC2 instance, I felt like an absolute wizard: I was sitting in my room, manipulating a machine spinning in a data center on the other side of the planet. What more could an engineer want? 

Naturally, I fell deep down the rabbit hole. I wanted to understand how everything worked under the hood. I even flirted with the idea of setting up a VS Code remote server to do all my development in the cloud—until the harsh reality of an AWS bill slapped me back to earth. AWS costs aside, my obsession with networking protocols was cemented: SSH, SCP, SFTP, FTP. The sheer power of being able to control a remote machine securely was addictive.

Then, the inevitable thought hit me: *“Can I SSH into my own laptop?”* There was just one problem: I didn't have a second computer to test it with. Enter **Termux**—arguably the greatest piece of software ever conceived by Android developers. I fired up Termux on my phone, typed the magic incantation:

```bash
ssh ganeshak11@<laptop_private_ip>
```

It prompted for a password. I held my breath, typed it in, and pressed Enter. *Boom.* I was inside my laptop from my phone. I could barely contain my excitement. I ran `ls`—my laptop's entire home directory popped up on my 6-inch phone screen. I typed `mkdir newfolder`, looked up at my laptop, and watched the folder materialize in real-time. Naturally, the next logical command for any sane developer was:

```bash
shutdown -P now
```

*Clack.* The screen went black. The laptop died instantly. I was in awe.

---

### The Art of the College Flex

Once you have the ability to remotely execute terminal commands on your computer from your pocket, you don't just keep it to yourself; my inner show-off took complete control. I started casually leaving my laptop open on a desk, walking away with my friends, and after taking a few steps, acting like I had an epiphany: *"Oh shoot, I forgot to shut down my laptop."* Instead of walking back like a mortal, I’d pull out my phone, tap a quick script in Termux, and across the room, my laptop would instantly go dark. My friends thought I was running black-magic zero-day exploits. In reality, I was just executing a glorified bash command over Wi-Fi.

---

### The Reality Check: Leaving the Nest

The trick worked flawlessly until one day, I walked a little too far. I pulled out my phone, tapped the script, and... *connection timed out.* That was the moment I ran straight into the fundamentals of local networking: my phone and laptop only talked because they were sitting on the exact same Wi-Fi subnet. The second I stepped off that network, the bridge collapsed.

Now, I had two options. The dumb option was to expose port 22 on my home router to the public internet—which is the digital equivalent of unlocking your front door, taping a sign saying "Nobody's home for the next week," and waiting for every botnet in existence to ransack your house. The smart option was to build a private tunnel. After some research, I found the holy grail: **Tailscale**.

Tailscale uses WireGuard to build a zero-config, encrypted mesh network between all your devices. The moment I logged into Tailscale on both my phone and laptop, physical distance stopped mattering: whether I was in the next room, across campus, or on the other side of the planet, my phone could talk directly to my machine. Problem solved, right? Not quite.

---

### If You're Too Lazy to Stand Up, You're Too Lazy to Type

Think about it: the entire reason I built this was because I was too lazy to walk five steps to close a laptop lid. How on earth could you expect me to manually open Termux, type an IP address, enter a 20-character password, and write a full command every single time? Efficiency demands laziness. So, I applied two classic Linux fixes: eliminating passwords entirely with SSH key pairs, and creating aliases inside `~/.ssh/config`. Instead of remembering IP addresses and flags, my config turned the entire connection into:

```bash
ssh mylaptop
```

One command, zero passwords, instant access. At this point, my phone and laptop were still just two separate devices. But they had officially found the most reliable, robust, and over-engineered way to communicate—and more importantly, to flex.

---

## Phase 2: What If Two Devices Became One?

Once you break the communication barrier between two devices, your brain doesn't just stop there. A dangerous thought entered my head: *“Right now, these are two separate devices talking over a network. What if I broke one more barrier and treated them as the exact same machine?”* Enter the next rabbit hole: **building a custom backup and sync engine.**

---

### Step 1: "How Hard Can Backups Really Be?"

At first, I thought this was dead simple: every night at 11:45 PM, just copy my entire `~/projects` directory to a backup folder by writing a quick `.sh` script, throwing an `rsync` command inside, and wiring it up to a `systemd` service and timer to fire off automatically at 11:45 PM every single day. I set it up, watched the timer activate, and leaned back in my chair feeling like a senior infrastructure architect—clean, automated, beautiful.

Until the classic DevOps realization hit me. Imagine this scenario: the backup runs like clockwork at 11:45 PM. At 11:42 PM, you run a bad command or accidentally delete a critical project. Three minutes later, the automated backup wakes up, notices the files are missing, and because you used `rsync --delete`, it cheerfully deletes them from the backup mirror too. Congratulations: you haven't built a backup system; you’ve built an automated disaster propagation machine.

---

### Step 2: Snapshots over Mirrors ("Fortis Git")

Mirroring wasn't enough; I needed time travel. So, I built a snapshot-based versioning layer. Instead of a single destructive mirror, it captured immutable daily snapshots. Now, if I nuked my codebase at 11:42 PM, today's mirror might be ruined, but yesterday's snapshot was frozen in time. A single rollback, and everything was right back where I left it the previous night. Blast radius: controlled.

---

### Step 3: The 3-2-1 Rule (On a College Budget)

I felt invincible, but then hardware paranoia kicked in: *“What happens if the laptop's physical SSD corrupts or the drive dies completely?”* All the local snapshots in the world won’t save you if the disk itself goes up in smoke. Industry best practice says you need offsite, remote cloud backups, but industry best practice also assumes you have an enterprise budget to pay for AWS S3 buckets. As established earlier, cloud invoices cause me physical pain.

Then I looked at the Android phone sitting on my desk with dozens of gigabytes of free flash storage. *Wait. Why pay Jeff Bezos when my phone is already on my private Tailscale mesh?* I turned my phone into an offsite, remote backup vault. Every night, an automated 3rd-layer backup bundled my entire projects directory, dotfiles, and secrets, shipping them silently over SCP straight into my phone via Tailscale. Now, both devices were completely in lockstep: identical dotfiles, latest code snapshots, cross-device redundancy, and zero cloud hosting costs. Everything was running smoothly, reliably, and elegantly. And, just like any other software engineer who should have stopped while they were ahead... **I couldn’t just leave it alone.**

---

## Phase 3: The Architecture of Absolute Over-Engineering

At this point, a normal person would have been satisfied. I had remote access, private networking, automated versioned backups, and offsite storage. Naturally, I sat down in my chair, pulled out a pen and a notebook, and decided to take things completely out of hand. I didn't want a loose collection of bash scripts anymore; I wanted an **architecture**.

It began innocently enough: build a simple Android app with a few buttons to execute commands over SSH. But once you give an engineer an API to their own operating system, feature creep is not just a risk—it is an inevitability. The domino effect was unstoppable:

Buttons to run terminal scripts led to hooking into `playerctl` for physical media controls so I wouldn't have to alt-tab to pause music. That led to clipboard sync, because messaging myself links on WhatsApp like a caveman felt unacceptable when copying text on my phone could instantly appear in my laptop's clipboard. Then came a remote file manager to browse, download, and drop files directly into my laptop’s filesystem from my bed. Why buy an expensive webcam when my phone has a 108-megapixel lens? So I routed the phone's camera stream directly into Linux as a virtual video device. That demanded live telemetry to graph CPU temps, RAM pressure, and disk health in real-time on my phone from another room. Notification sync pinged my pocket whenever a build finished or an alert fired. A backup controller monitored snapshot health, timers, and storage capacity directly from the app. And finally, an encrypted vault and two-factor authenticator dashboard eliminated third-party password managers entirely. One feature after another, what started as a simple shutdown script mutated into a distributed control plane. (Hold that thought. This version had a problem I didn't notice yet.)

---

## "Who Cares? Why Waste Time on This?"

You might ask: *“Why spend weeks building an over-engineered distributed system that only a few hyper-niche Linux nerds would ever care about?”* The honest answer? Nobody cares. Nobody asked for it. Until the day it saved my skin in production.

---

### The Most Unhinged CI/CD Pipeline in Existence

I was working at a company as an intern, juggling both backend development and DevOps deployments. We ran into an annoying permissions issue with our private repository where other team members' commits were getting blocked from triggering automatic Vercel deployments. Instead of waiting days for corporate repository permissions to get sorted out, I engineered a classic "temporary" hack that inevitably became permanent: I forked the private repo to my personal GitHub account, hooked Vercel up to my fork, and every time someone pushed code to the main repo, I had to manually sit at my laptop and execute an unholy 5-step Git ritual:

```bash
# 1. Pull the team's latest changes
git pull origin experiment

# 2. Forge an empty commit to wake up Vercel
git commit --allow-empty -m "Empty commit to trigger vercel redeploy"

# 3. Push to my fork so Vercel builds
git push myfork experiment

# <Stare anxiously at the Vercel dashboard until it turns green>

# 4. Erase the evidence of the empty commit
git reset HEAD~1

# 5. Force-push to keep the fork clean
git push myfork experiment --force
```

Yes, I was personally acting as a human GitHub Actions runner. But hey, it worked.

---

### The Emergency Ping

For a few days, this scotch-taped pipeline ran smoothly. Then came the inevitable evening: I was out with my friends, enjoying life, nowhere near my desk. Suddenly, my phone buzzed with an urgent message:

> **"Deploy NOW"**

Immediate cold sweat. Pure developer panic. My laptop was miles away, sitting closed on my desk at home. How was I supposed to run a manual 5-step Git rebase and force-push pipeline from a cricket ground? Then, the realization hit me: *wait, didn't I just spend months turning my phone and laptop into the exact same machine?*

While everyone else was talking, I calmly pulled out my phone, opened Termux, connected over Tailscale, and was instantly inside my laptop back home:

```bash
cd ~/projects/<repo>
git pull origin experiment
git commit --allow-empty -m "Empty commit to trigger redeploy"
git push myfork experiment
```

I watched the Vercel webhook fire, waited for the build to pass, ran the `git reset`, and force-pushed. *Boom.* Production was updated. The changes were live. I slipped my phone back into my pocket and went right back to my conversation. Nobody around me had any idea I had just deployed a production release from the palm of my hand to a machine sleeping five miles away. That was the moment I realized: you don't build personal ecosystems because you need them every day. You build them for the exact moment when you desperately need a superpower.

---

## Phase 4: Burning It Down to Build It Right

That night felt like the peak. I walked home grinning, opened my laptop, and for the first time looked at what I had built through the eyes of an attacker instead of a show-off. The grin didn't last long.

Strip away the nice buttons and the whole app was one thing: **a remote shell with a pretty face.** Every button ended up as a command string running on my laptop. Whoever held my phone, or anything else that could reach the laptop over the tailnet, could run anything I could run. The password vault was encrypted, but its key derivation was weak, and the secret that guarded the whole thing sat in a config file. I had spent months removing every barrier between my two devices, and I had removed the security barriers along with them.

So I did the thing every engineer dreads: I threw it away and started again. This time the rule was simple: **write the specification first, then the code, and whenever they disagree, the code is wrong.** Before a single line of the new version existed, I wrote down the threat model, the cryptography, every API endpoint, and exactly what a stolen phone or a compromised user account should and shouldn't be able to do.

---

### No More Remote Shell

The first decision hurt the most: **Fortis v2 has no remote shell at all.** If I genuinely need a terminal on my laptop, I use plain SSH over Tailscale, a tool built by people who have been doing this for decades. The app itself can only ask for things from a fixed list: lock, suspend, shut down, change the volume, control media, sync the clipboard, browse files. There is no endpoint that runs an arbitrary command, so there is nothing to abuse.

Every request the phone sends is now **signed by a P-256 key that lives inside the phone's secure hardware** and never leaves it. Each signature carries a timestamp and a one-time nonce, so a captured request can't be replayed. The laptop side is a single Rust daemon, `fortis-agent`, that listens on exactly two addresses: `127.0.0.1` for apps on the laptop, and the laptop's Tailscale IP for the phone. It never listens on the café Wi-Fi.

---

### A Vault I Would Actually Trust

The password manager was rebuilt from the ground up. The master password is stretched with **Argon2id** using a random salt per vault. The resulting key is split with **HKDF** into separate keys for separate jobs: the database is encrypted with SQLCipher, and every single entry is encrypted again on its own with **XChaCha20-Poly1305**. The vault locks itself after 15 minutes of idling, and guessing the password gets slower with every wrong attempt.

The phone keeps its **own encrypted copy** of the vault and syncs it over Tailscale, so I can still pull up a password when the laptop is off. Then I added the feature that finally let me delete every other password manager: **autofill on both devices.** On the phone, Fortis plugs into Android's autofill system for apps and browsers. On the laptop, a small browser extension talks to the agent through a native host. Both sides use the *exact same* site-matching rule, written once in Rust and shared by both, so a password saved for `github.com` will never fill into `github.com.evil.io`, and nothing is ever filled into a plain-`http` page.

---

### My Fingerprint Is My `sudo` Password

This is the feature that makes people stop and stare. When I type `sudo` on my laptop, my phone lights up with a full-screen prompt: **"Approve sudo?"**, showing which user, which laptop and which terminal is asking, with a countdown before it expires. I touch the fingerprint sensor, and the command runs on the laptop before I've even looked back at the screen.

Under the hood, that is a custom **PAM module** written in Rust. The phone signs the approval with a dedicated key, unlocked only by my fingerprint, and the PAM module checks that signature against a public key stored in a **root-owned file**. Even if someone took over my normal user account, they couldn't forge an approval, because they can't touch that file. And if anything goes wrong — the phone is off, the network is down, or the signature doesn't check out — it simply falls back to the normal password prompt. A clever login system that can lock you out of your own machine is worse than no clever login system at all.

Getting the prompt to actually *arrive* was its own war. My phone's Android skin aggressively freezes any app running in the background, so the approval request would sit there unseen until I opened the app myself. The fix ended up being half code (a proper foreground service and the right notification permissions) and half humility: going into the phone's settings and politely asking it to leave my app alone.

---

### Everything Else, Done Properly

The rest of the old feature list came back, with the security built in this time:

- **Remote keyboard and mouse** — my phone becomes a touchpad and keyboard for the laptop, over the network or Bluetooth. It's off by default, needs a fresh fingerprint to start, and shows a notification on the laptop the entire time it's active, so it can never run quietly in the background.
- **Phone as a webcam** — the phone's camera appears on Linux as `/dev/video10`, streamed only over Tailscale with a one-time token, and to one viewer at a time.
- **Telemetry, media, volume, clipboard and files** — all from the app or a home-screen widget.
- **Notification mirroring and camera-roll sync** — both off by default, so I choose exactly what leaves my phone.
- **Backups** — the same mirror + snapshot + off-site-phone design from Phase 2, now controlled from the app.

All of it now lives in a single public repository: **[fortis-os/fortis-ecosystem](https://github.com/fortis-os/fortis-ecosystem)**. It holds the Rust core and agent, the PAM module, the CLI, the Tauri desktop app, the Kotlin Android app, the browser extension, the backup engine, and the specification that all of it has to obey.

---

## Two Devices, One Machine

Looking back at where this journey started, it's almost comical. It began with a cheap laptop, an Android phone, and a developer who was genuinely too lazy to stand up and close a lid. But solving that one tiny problem of physical friction cracked open the entire world of networking, automation, and systems architecture.

### The Real Paradigm Shift: How My Workflow Changed

The real value wasn't just having a fun weekend project to talk about; it fundamentally altered how I interact with computers. In the old workflow, needing a deployment, file, or action required a physical laptop, the same local Wi-Fi network, and manual configs with a terminal open. In the new workflow, you simply grab whichever device is closest to your hand and execute.

```text
The Old Workflow:
Need deployment / file / action ──► Need physical laptop ──► Need local Wi-Fi ──► Manual configs ──► Execute

The New Workflow:
Need deployment / file / action ──► Grab whichever device is closest ──► Execute
```

Today, my phone and laptop aren't two separate devices that occasionally email each other files; the boundary between them has completely dissolved. Whether it’s approving `sudo`, filling a password, managing files, controlling media, monitoring system health, or turning into a webcam—my phone is a direct extension of my operating system. Two distinct pieces of hardware, forming one single, unified machine.

---

### The Real Takeaway

The biggest lesson from all of this wasn't mastering SSH, Tailscale, snapshot backups, or Android development. It was realizing that **personal devices can be treated exactly like infrastructure**—and that infrastructure deserves a threat model. Building the first version taught me how to connect machines. Tearing it down taught me that a feature you can't trust is a liability, not a feature. Once you start thinking about your everyday hardware in terms of networking, replication, observability, automation, and recovery, the artificial distinction between "phone" and "laptop" completely evaporates. You stop treating them as isolated consumer gadgets and start managing them as nodes in a personal, high-availability cluster.

And the best part? I still don't have to get out of bed to shut it down.

---

### The Series

> ✦ **Fortis Series**:
> - **Part 1: The Journey from Remote Shutdown Scripts to a Personal Ecosystem** (Current)
> - [Part 2: One User, Many Machines: The Question That Ruined My Sleep](/blog/fortis-pseudo-os)

