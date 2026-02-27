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

This is the source repo for my **DevOps Engineer portfolio** — a terminal-styled, dark-by-default site built to reflect how I think: systems-first, failure-aware, explicitly designed.

No magic. No handwaving. Every design decision is deliberate.

---

## $ systemctl status portfolio.service

```
● portfolio.service — Ganesh Angadi Personal Portfolio
     Loaded: loaded (/home/ganeshak11/dev/PortFolio)
     Active: active (running)
    Version: Next.js 16 + Tailwind CSS + Framer Motion
   Features: Boot animation, dual-color hover, comet cursor trail,
             animated stat counters, progress bars, terminal typewriter
```

---

## $ ls -la src/

```
drwxr-xr-x  components/
  ├── Hero.tsx              # Boot sequence + dual-color radial mask hover
  ├── About.tsx             # Profile + core competencies
  ├── FeaturedProject.tsx   # Pinned project with live metrics
  ├── DevOpsStack.tsx       # 3D tilt tech badges
  ├── SystemThinking.tsx    # Animated stat counters + principles grid
  ├── FailureLog.tsx        # Failure retrospectives with glitch badges
  ├── CurrentlyBuilding.tsx # Animated build progress bars
  ├── Contact.tsx           # Typewriter terminal prompt
  ├── ParticleField.tsx     # Canvas comet-tail cursor trail
  ├── Navbar.tsx            # Theme toggle + terminal mode trigger
  ├── TerminalMode.tsx      # Full-screen interactive terminal overlay
  └── ThemeProvider.tsx     # Dark / light mode context
```

---

## $ git clone && npm run dev

```bash
# Clone the repo
git clone https://github.com/ganeshak11/PortFolio.git
cd PortFolio

# Install dependencies
npm install

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
canvas      = Canvas API (cursor trail)
fonts       = Inter + JetBrains Mono

[design]
dark_mode   = #000000 base, cyan-teal accent
light_mode  = warm off-white base, neon-orange accent
cursor      = comet trail (lerp-smoothed, aura dot cloud)
grid_bg     = CSS linear-gradient 50px grid overlay
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
