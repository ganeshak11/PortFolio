# portfolio.service — Active (running)

```bash
$ whoami
ganeshak11 — DevOps Engineer | System Thinker

$ uptime
portfolio  up indefinitely  |  status: ONLINE  |  load: intentional

$ cat /etc/motd
  ____                        _     
 / ___| __ _ _ __   ___  ___| |__  
| |  _ / _` | '_ \ / _ \/ __| '_ \ 
| |_| | (_| | | | |  __/\__ \ | | |
 \____|\__,_|_| |_|\___||___/_| |_/
                                                     
 Ganesh — ganeshak11
 Status: Building reliable systems. Questioning fragile architecture.
```

---

## $ cat README.md

This is the source repo for my **DevOps Engineer portfolio** — a terminal-inspired, editorially designed site built to reflect how I think: systems-first, failure-aware, explicitly designed.

No magic. No handwaving. Every design decision is deliberate.

---

## $ systemctl status portfolio.service

```
● portfolio.service — Ganesh Angadi Personal Portfolio
     Loaded: loaded (/home/ganeshak11/dev/PortFolio)
     Active: active (running)
    Version: Next.js 16 + Tailwind CSS v4 + Framer Motion
   Features: Boot animation, dual-color radial mask hero, floating dock navbar,
             rotating tech carousel, accordion projects, hover-depth cards,
             interactive terminal overlay, FAB action menu, blog with comments,
             Supabase-backed comments, hide-on-scroll blog navbar
   Sections: Hero → About → Awards → Projects → Stack → Thinking →
             Services → Contact → Blog
```

---

## $ ls -la src/

```
drwxr-xr-x  components/
  ├── hero/
  │   ├── BootSequence.tsx      # Boot sequence with scroll lock
  │   └── HeroContent.tsx       # Dual-color radial mask hover headline
  ├── navbar/
  │   ├── DesktopNav.tsx        # Floating pill navbar with active indicator
  │   ├── MobileNav.tsx         # Hamburger with staggered link reveal
  │   └── navData.ts            # Nav links config
  ├── About.tsx                 # Profile photo, bio, social icons, status badges
  ├── Achievements.tsx          # Awards + internship experience cards
  ├── BlogComments.tsx          # Supabase comment form
  ├── BlogList.tsx              # Featured + list blog layout with reading time
  ├── BlogPostContent.tsx       # Editorial reading layout, hide-on-scroll navbar
  ├── Contact.tsx               # Typewriter heading, links, human closure panel
  ├── CurrentlyBuilding.tsx     # CI/CD Sentinel accordion (merged into Projects)
  ├── DevOpsStack.tsx           # 3D rotating circular tech carousel
  ├── FAB.tsx                   # WhatsApp-style floating action button
  ├── Footer.tsx                # Minimal footer
  ├── Hero.tsx                  # Boot → Hero transition
  ├── HomeClient.tsx            # Page composition
  ├── Navbar.tsx                # Floating dock with scroll-aware active pill
  ├── Projects.tsx              # Accordion list with status, stack, highlights
  ├── Services.tsx              # Hover-depth service cards
  ├── SystemThinking.tsx        # Philosophy cards with hover story reveal
  ├── TerminalMode.tsx          # Full-screen interactive terminal overlay
  └── ThemeProvider.tsx         # Dark / light mode context

drwxr-xr-x  app/
  ├── blog/
  │   ├── [slug]/page.tsx       # Dynamic blog post page
  │   └── page.tsx              # Blog index
  ├── api/
  │   ├── comments/[slug]/      # Supabase comments API
  │   └── likes/[slug]/         # Supabase likes API
  ├── globals.css               # Design tokens, animations, mobile utilities
  └── layout.tsx                # Root layout with SEO + JSON-LD

drwxr-xr-x  content/blog/
  ├── How_I_Became_Linux_User.md    # Featured post
  └── My_First_Hackathon_Win.md
```

---

## $ git clone && npm run dev

```bash
# Clone the repo
git clone https://github.com/ganeshak11/PortFolio.git
cd PortFolio

# Install dependencies
npm install

# Copy env and fill in Supabase credentials
cp .env.example .env.local

# Start dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build
```

> **Requires:** Node.js 18+, npm 9+

---

## $ cat stack.conf

```ini
[runtime]
framework   = Next.js 16 (App Router, Turbopack)
language    = TypeScript
styling     = Tailwind CSS v4
animation   = Framer Motion
fonts       = Inter + JetBrains Mono
icons       = Lucide React + React Icons

[design]
dark_mode   = #020818 navy base, red #e53935 accent, gold #c9a84c secondary
light_mode  = #f8f6f0 warm base, navy #001489 text, gold #c9a84c accent
navbar      = floating centered pill, scroll-aware active indicator
blog        = editorial reading mode, hide-on-scroll navbar, 680px max-width

[backend]
comments    = Supabase (PostgreSQL)
blog        = markdown files in /content/blog (version-controlled)
deploy      = Vercel
```

---

## $ cat failure_log.md | grep -i lesson

```
[P1] 2024-08 — Cron job silently failed for 11 days
  → Lesson: Exit codes are not enough. Add health checks + alerting on absence-of-signal.

[P2] 2024-05 — Nginx upgrade wiped custom config
  → Lesson: If it is not in version control, it does not exist.

[P1] 2023-11 — No rollback plan caused 3h downtime
  → Lesson: A deploy without a tested rollback is a gamble.

[P3] 2023-07 — Disk filled: logs rotated but not compressed
  → Lesson: Log rotation ≠ disk capacity planning. Both are needed.
```

---

## $ ping ganesh

```bash
GitHub   →  https://github.com/ganeshak11
LinkedIn →  https://linkedin.com/in/ganeshangadi1301
Email    →  ganeshangadi13012006@gmail.com
Website  →  https://ganeshangadi.online
```

---

## $ shutdown -h now

```
[  OK  ] Stopped portfolio.service
[  OK  ] All systems nominal.

// Infrastructure is not magic — it is decisions with trade-offs.
// I make those decisions explicit.
```

---

<sub>Built with intent. Deployed with a rollback plan.</sub>
