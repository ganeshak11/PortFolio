---
title: "From Blank Screens to a Pseudo-OS: How Vibe Coding Accidentally Made Me an Engineer"
date: "2026-11-10"
slug: "from-cursor-prompts-to-pseudo-os"
excerpt: "Two years ago I asked an AI to 'build me an API key'. Today I'm designing an OS layer that makes all my devices behave like one machine. This is everything in between."
hook: "The AI wrote the code. The failures wrote the engineer."
tags: ["personal", "vibe-coding", "hackathon", "linux", "systems-engineering", "story"]
---

# From Blank Screens to a Pseudo-OS

Right now, my notebook is full of diagrams for something I call **Fortis**: a pseudo-OS layer that sits above your existing hardware and operating systems, and makes every device you own behave like one machine. Before that, I built the **[Fortis Ecosystem](/blog/fortis-ecosystem)**, a smaller version of the same dream that ties Linux and Android together with remote workspace control, clipboard sync, backups, media controls, PAM integration, and a handful of other features that exist mostly because I can't resist a good flex.

I'm proud of both. But neither of them is where I started.

I started by asking an AI to build me an API key.

---

## Chapter 1: The Disaster Management System That Became a Disaster

**Event:** My first hackathon, ~2 years ago
**Problem Statement:** Build a disaster management system
**My Knowledge of APIs, Backends, and Databases:** None
**My Confidence:** Unreasonably high

Our idea was simple. Two pages: one where a user reports a disaster, and one where the response team views and responds to it. Easy enough. I had zero idea how to build any of it, but I had something better. I had **Cursor**.

My development workflow at the time looked like this:

1. Explain what I want in half-broken English
2. Let Cursor guess what I meant
3. Accept everything
4. Repeat until something appears on screen

Cursor built the website, asked me a few questions I answered without understanding, and announced it was done. One problem: there was no map. Cursor told me it needed a **Google Maps API key**.

Now, a reasonable person would have asked, *"What is an API key?"* I asked ChatGPT something far more fundamental: *"Explain what an API is like I'm 5."*

It gave me the classic analogy. You're the customer, the menu is the documentation, the kitchen is the server, and the waiter is the API carrying requests back and forth. It clicked instantly. Armed with this brand-new understanding, I marched back to Cursor and typed:

> "Build the API key."

Basically, I asked the kitchen to cook the waiter.

To this day, I have no idea what Cursor interpreted that as, or what it changed. All I know is the entire website went blank. Nothing rendered. Nothing worked. And there were **3 hours left** before final submission.

---

### The Greatest Prompt of My Life

With the clock ticking, I typed what I still consider my finest piece of prompt engineering:

> "I don't know what you are going to do, build me a website from scratch instead of a webapp."

At the time, I genuinely believed websites and webapps were two different species. Cursor, bless it, didn't argue. It handed me three files:

```text
index.html
style.css
script.js
```

The code was a mess. But I double-clicked `index.html`, the browser opened, and it *worked*.

My exact internal monologue: *"REAL MADRID DNA flows through my blood. We did the remontada. I am a developer."*

It was cringe. I meant every word of it.

---

## Chapter 2: The Judge Who Asked Too Many Questions

High on my first comeback, I made a decision: I would enter every hackathon and win all of them.

**Event:** Hackathon #2, new team
**Problem Statement:** A city issue reporter app
**Improvement Since Last Time:** I now knew the difference between an API endpoint and an API key

The architecture was suspiciously familiar: a user page to report potholes and broken roads, and an admin page to view reports and update their status (*In Progress*, *Resolved*, and so on). This time, I told Cursor to use a map that didn't need a key, and more importantly, I started **actually reading** what Cursor told me after every prompt. Small change. It mattered more than I realized.

By the end of the night, we had a working prototype backed by **Firebase**. Then a judge walked over and asked to see it. I proudly started the demo, uploaded a photo, and got this:

```text
Error in uploading image
```

Thanks. Very helpful. I knew the error happened *while uploading the image*. What I didn't know was *what the error actually was*. Cursor and I went back and forth for a while and landed on converting images to **base64 URLs**, because the Firebase free tier wasn't letting us store raw image files.

Was it the right fix? No idea. Did it work? Yes. Moving on.

---

### The Interrogation

Two of the three judges were impressed. The third one could smell vibe code from three tables away, and he started asking questions.

> **Judge:** Which database did you use?
> **Me:** Firebase.
>
> **Judge:** Why Firebase?
> **Me:** It was easy to use and set up.
>
> **Judge:** MySQL is also easy to use and set up, right?
> **Me:** Yes sir, but I thought Firebase was better.
>
> **Judge:** Why?
> **Me:** :)
>
> **Judge:** Okay. Open the README.md.
> **Me:** Done.
>
> **Judge:** It says "Deploy on Vercel". Tell me how to deploy on Vercel.
> **Me:** Ahhh..... Ahhh..... I.. I don't know sir.
>
> **Judge:** Okay. Great work.
> **Me:** *smiles in shame*

That `:)` was the most honest answer I gave all day.

We thought we'd win, or at least make the top 5. We didn't place at all. And that loss taught me something the first win couldn't: **the code running is not the same as you understanding it.** The judge didn't care that the app worked. He cared whether *I* knew why it worked.

---

## Chapter 3: MY(suru) Bus, the Project That Out-Taught My College

Two hackathons. One comeback. One working prototype. I was now convinced I could build anything. So I picked something real:

**MY(suru) Bus**: a transport management system for Mysore city.

```text
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│    Driver App    │      │  Passenger App   │      │ Admin Dashboard  │
│ Streams live bus │ ───► │ Shows live bus + │ ◄─── │ Manages buses &  │
│    location      │      │       ETA        │      │      routes      │
└──────────────────┘      └──────────────────┘      └──────────────────┘
```

I started without knowing a single framework. I spent **3 months** pair-programming with **Amazon Q**, a brand-new AI assistant at the time. By the end of it, Amazon Q probably knew more about the project than my teammates did.

But something different happened this time. The project was too big to vibe through blindly. Live locations meant I had to understand APIs for real. Three separate apps meant I had to understand how they talk to each other. Shipping to phones meant learning **Expo**, the difference between websites and native apps, and how Android apps actually get built. Databases, cloud, backends: all the words I had been nodding along to finally started meaning something.

That one project taught me more than my college did in four years.

And my confidence hit an all-time high. I told my friends I was thinking of building an operating system. They laughed.

Joke's on them. I'm now designing a pseudo one. Half an OS is still an OS... right?

---

## Chapter 4: The Learning Arc (and the Accidental Linux Conversion)

After MY(suru) Bus, I finally had a mental model of how software works: how modules talk to each other and what happens under the hood. Around the same time, I got hooked on **system thinking, system design, and DevOps**.

Then, as a cherry on top, I [accidentally wiped Windows](/blog/how-i-became-a-linux-user) and entered the Linux era.

Linux rewired the way I think. Suddenly I wasn't just asking *"does it work?"* I was asking *"what path does this request take?"* I started tracing everything.

The next few months were a blur of learning, building, and more hackathons (I [finally won one](/blog/my-first-hackathon-win), by the way). Then came my biggest project yet: **CI-CD Sentinel**. This was the first time I traced every flow myself and wrote the architecture by hand before a single line of code existed. The AI was no longer the architect. It was the contractor.

Along the way:

- I vibe-coded my portfolio, hosted it, and learned about domains, namespaces, and cloud hosting in the process
- I got into **AWS**
- I started spinning up a **Minecraft server on an EC2 instance**, just to play single-player worlds

Yes. A cloud server. For single player. My AWS bill was not as excited as I was.

---

## Chapter 5: The Flex Era

Thinking in systems led to the **Fortis Ecosystem**. It was going great until one thought ruined everything: *"Can I run this on a Raspberry Pi?"*

Sure, why not.

It was all fun until real-world problems started hitting me one after another. I solved them one by one, built the first working prototype, and shipped an app alongside it.

Then I landed an internship, and the training wheels came off:

- Built an **AI pipeline for live call suggestions** with **sub-100ms latency** using Groq's caching
- Handled a difficult **production deployment pipeline** entirely on my own

And through all of it, I kept building things, partly to understand how everything works, and partly (mostly) to flex:

| Tool | What it does |
|------|--------------|
| **mechkeys** | Makes my laptop keyboard sound like a mechanical keyboard (my roommates hate this one) |
| **3-stage backup system** | My own Git-like backup system |
| **CLI portfolio** | `npx ganeshak11`, my portfolio right in your terminal |
| **CLI utilities** | Timer, task manager, website health checker, and more |

---

## Where I Am Now

Today, I'm designing Fortis, working on bigger projects, and still learning in parallel.

And here's the honest part: a majority of everything I've built still involved AI-generated code. Vibe coding never left. **What changed is me.** Now I know what each module should do, how each module talks to the others, and why the system is shaped the way it is.

```bash
# 2 years ago
$ cursor "build the API key"
# website goes blank

# today
$ cat fortis-architecture.md
# 5 pages of diagrams I actually understand
```

---

## What I Actually Learned

1. **Vibe coding is a starting point, not a destination.** It gets you on the field. It won't teach you the game.
2. **Read what the AI tells you.** The day I started reading Cursor's responses was the day I started learning.
3. **"It works" is not an answer.** One judge asking "why?" taught me more than a working demo ever did.
4. **Build something too big to fake.** MY(suru) Bus forced me to understand things I could have skipped on a two-page website.
5. **Failures are the curriculum.** Blank screens, upload errors, wiped hard drives: every one of them taught me something a tutorial never did.

The AI still writes a lot of my code. But now I'm the one who knows when it's lying.

And the journey is still going on...
