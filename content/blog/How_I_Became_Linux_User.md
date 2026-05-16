---
title: "How I Accidentally Became a Linux User"
date: "2025-01-15"
slug: "I become a guy who says 'I use LINUX btw'"
excerpt: "I didn't choose Linux. Linux chose me — after destroying my Windows installation, corrupting a USB, and nearly giving my roommates a heart attack."
hook: "Sometimes the system failure is the feature."
featured: true
tags: ["linux", "kubuntu", "devops", "story"]
---

# I become the guy who says 'I use LINUX btw'

**Incident Date:** ~4-5 months ago   
**Severity:** P0 — total OS loss, psychological damage, roommate disturbance   
**Root Cause:** One wrong click   
**Resolution:** Became a Linux loyalist forever

---

## The Accused: My Laptop

Let me introduce the machine at the center of this disaster.

- **CPU:** Ryzen 5 3500U
- **GPU:** Integrated Radeon Vega (the "GPU" in air quotes)
- **RAM:** 8GB
- **Storage:** HDD — yes, a spinning disk, in this economy

On paper, not terrible. In practice, running Windows on this thing was like asking a rickshaw to do Formula 1 laps. Unlocking the screen alone was a 30-second spiritual experience. Opening Chrome? Grab a coffee. Opening Chrome with two tabs? Write a will.

Something had to change.

---

## The Research Phase

I did what every engineer does when something is broken — I Googled it at 2am.

Somewhere between "how to make Windows faster" and "should I just throw this laptop into the sea", I stumbled upon Linux. The internet told me Linux runs on everything. Old laptops. Raspberry Pis. Smartwatches. Probably refrigerators. If it has a screen and a processor, Linux will boot on it.

I was sold.

---

## The Plan (It Was a Good Plan)

Dual boot. Simple. Safe. Elegant.

1. Borrow friend's USB ✓
2. Flash Ubuntu installer ✓
3. Shrink Windows partition, install Linux alongside it ✓
4. Live happily ever after ✓

What could go wrong?

---

## What Went Wrong

Everything.

I got to the partitioning screen. Ubuntu's installer showed me the disk layout. I was supposed to click **"use the largest continuous free space"** — a clearly labeled, perfectly safe option sitting right there.

I clicked **"use entire disk"**.

The moment I hit continue, my HDD made a sound I will never forget. It started spinning like it was trying to achieve liftoff. The noise was so loud it wasn't just *my* concern — my roommates came out  with the look of people who thought the building was collapsing.

> "Bro what is happening to your laptop"
>
> "Nothing, everything is fine, go back to sleep"
>
> *(Windows: deleted. Ubuntu: also somehow not installed. USB: corrupted.)*

I had achieved the impossible. I had managed to lose both operating systems simultaneously while installing one of them.

---

## The Dark Ages (aka BIOS Purgatory)

Every time I opened my laptop: BIOS screen. Then shutdown.

No Windows. No Linux. Just a black screen judging me silently.

I genuinely considered holding a small funeral for the laptop. It had served me well. Three years of assignments, late night projects, and now this — killed by one misclick in a disk partitioning screen.

But then I thought — one more try.

---

## The Comeback Arc

New USB. Different ISO. Tried again.

Failed.

Tried again.

Failed differently (progress?).

Tried again.

BIOS laughed at me.

After **5-6 attempts across 3 days**, on what felt like a completely unhinged level of stubbornness — Ubuntu installed.

The login screen appeared. I stared at it for a solid 10 seconds before I believed it was real.

---

## The Moment Everything Changed

Within a few hours of using it, the difference was undeniable.

The laptop that used to struggle to unlock the screen was now... fast. Snappy. Responsive. Like it had been suffocating under Windows this whole time and finally took a breath.

A few months later I'm running **Ollama models locally** on the same machine that used to choke opening a PDF.

Same hardware. Different OS. Completely different machine.

---

## The SSD Upgrade Epilogue

I eventually took the laptop to a service centre to upgrade from HDD to SSD. Standard procedure. The technician installed Windows on the new SSD — as they do.

I got home, opened the laptop, and the first thing I did — before even booting into Windows once — was wipe it and install Linux.

Didn't even give Windows a chance to show me the setup screen.

The technician probably still thinks about it.

---

## Current Status

```bash
$ neofetch
OS: Ubuntu 22.04.5 LTS
Kernel: 6.8.0-111-generic
Shell: /bin/bash
Uptime: ~5 months and counting
Loyalty: Absolute
```

Ubuntu specifically — KDE Plasma is genuinely beautiful and I will die on this hill.

---

## What I Actually Learned

1. **Always read the partition screen twice.** Then read it again. Then read it one more time.
2. **HDD sounds are a form of communication.** Mine was saying goodbye.
3. **Linux doesn't just run on old hardware — it respects it.**
4. **Persistence matters.** 3 days, 5-6 failed attempts. Most people would've stopped at 2.
5. **The best way to commit to something is to accidentally make it your only option.**

---

I didn't plan to become a Linux user. I planned a safe, sensible dual boot.

But one wrong click, one corrupted USB, three days of BIOS purgatory, and a very loud HDD later — here I am. Running Ollama locally on a machine that Windows had given up on.

Sometimes the system failure is the feature.

And if I'm ever in a burning building where the only way out is Windows — I'm becoming kebab.

