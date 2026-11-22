---
title: "My Journey as a Developer: From a Vibe-Coded App to a Pseudo-OS"
date: "2026-11-10"
slug: "my-journey-as-a-developer"
excerpt: "The journey of a guy who once thought vibe coding makes you a developer to actually building a pseudo-os that treats all your devices as one computer."
hook: "It all started with a hackathon where I didn't even know what Git was."
tags: ["philosophy", "linux", "systems-engineering", "dream-vs-reality"]
---

# From a Vibe-Coded App to a Pseudo-OS

Right now, my notebook is full of diagrams for something I call **Fortis**. It's basically a pseudo OS layer above the existing hardware and OS. And that makes all your devices look like one machine...

And I also built something called **Fortis Ecosystem**. Basically the same thing but with limited tech... It connects just Linux and Android: you can control your Linux workspace from your mobile, clipboard sharing, backups, media controls, PAM (Pluggable Authentication Module), remote control and a few more flashy ideas... And I am proud of these 2...

But that's where the *architecture* started. That's not where *I* started.

I started with a vibe-coded app.

---

## The Not Knowing Anything Yet Building Era

Let me tell you how my journey as a developer started. It started with me telling what I wanted in half broken English, and Cursor trying to understand my English while in the meantime working overnight to build something that even I didn't have an idea what it was... (Respect to Cursor, honestly. It tried its best.)

It all started 2 years back when I attended my first hackathon. The task was simple: build a disaster management system. And our idea was even simpler: build a 2 page website, one page for the user to record and submit a disaster and the other for the response team to view and respond to it.. And I was like, I will do this (Btw without the knowledge of API, backend, database etc)... And then entered Cursor....

The prompt was to build a website... So I gave Cursor a prompt to build a website, and Cursor built one for me...

It started building, asked me a few questions, and I was just answering... After a few minutes it said I'm done. I asked where is the map, and it told me I need a Google Maps API key. Instead of asking ChatGPT what an API key is, I asked it to explain what an API is like I am 5, and it gave me the famous example of a restaurant kitchen, waiter, menu, customers.. That clicked for me. And I went back to Cursor with my brand new understanding of an API and told Cursor to build the API key (I still laugh at myself remembering this). Basically I asked the kitchen to cook the waiter. And till today I don't know what Cursor thought I was saying and what it changed, but the whole website went blank, it was not working... and only 3 hrs were left before the final submission. I went to Cursor and gave one of the greatest prompts of my life... "I don't know what you are going to do, build me a website from scratch instead of a webapp." (Back then I genuinely thought these were two different species.) And it gave me 3 files (1 HTML, 1 CSS and 1 JS).

It was a mess, but when I opened the HTML file it was working and we were happy, and I was like, "Yeah, REAL MADRID DNA flows through my blood, we did a remontada! And I am a developer" (I know it's cringe but I meant it).

And then comes my second hackathon.

---

## The First Fully Working Vibe-Coded Application

I was so proud of my vibe-coded app that I now decided to enter every hackathon and win... (Confidence: 100. Knowledge: still loading.)

So, I registered for my 2nd hackathon with a new team. And the problem statement was a city reporter app.

The idea was to build the same 2 page website, a user page and an admin page... The user can report city issues like potholes, broken roads, etc. and the admin can view, respond and change the status of the work like work in progress, resolved etc. And this time I knew never to tell Cursor to build an API key (I know the difference between an API endpoint and a key now) and told it to use any map that doesn't require one. But this time, after every prompt I read Cursor's response and what it was telling me, and by the end of the night we somehow built a working prototype. But there was one issue: we were using Firebase for the backend. Then a judge told me, if you have some working prototype show me, and I was excited to show them. But when uploading a photo I got an error, and the error was **Error in uploading image**. I know the error came while uploading the photo, but what the hell is the error? Me and Cursor discussed a lot regarding this and ended up converting the image into a base64 URL (The issue was the Firebase free tier doesn't store raw images). Was it the right fix? No idea. Did it work? Yes. Moving on.

And it worked, and I was happy with it... The judges came, I showed them how everything worked and 2 of the 3 judges were impressed, and the other guy suspected it was vibe coded and started asking questions.

Q: Which database did you use?
A: Firebase

Q: Why did you use Firebase?
A: It was easy to use and set up

Q: Even MySQL is easy to use and set up, right?
A: Yes sir, but I thought Firebase is better than MySQL

Q: Why?
A: :)

Q: Ok fine, open that README.md
A: Done

Q: It says deploy on Vercel. Tell me how to deploy on Vercel
A: Ahhhh..... Ahhh..... I.. I don't know sir

Q: Ok, great work
A: *Smiling with shame*

(That ":)" was the most honest answer I gave that entire day.)

And we thought we might win, or at least be in the top 5, but ended up losing... Lesson learned: some judges can smell vibe code from 3 tables away.

---

## The Pinnacle of Vibe-Coding

After 2 hackathons, 1 comeback, 1 working prototype, I was convinced I could build anything I wanted... I started to think about what to build and stumbled across an idea that taught me more than my college did in 4 years...

The project was MY(suru) Bus: a transport management system for our Mysore city.

The system had 3 main entities: 1. The Driver App 2. The Passenger App 3. The Admin Dashboard

The Driver App is used to track the live location of a bus,
The Passenger App is used to show the live location of a bus and get the ETA of the bus,
The Admin Dashboard is used to manage the buses and routes.

The best part is I started building this without the knowledge of a single framework and ended with an understanding of how the actual software ecosystem works: cloud, database, API, Expo, the difference between websites and apps, Android apps and a lot more...

I spent 3 months talking with Amazon Q (a new AI assistant back then) to build this, and it was working... Working great... At this point Amazon Q knew more about my project than my own teammates did.

And now my confidence was at its peak. I even told my friends I was thinking of building an OS. They laughed. Joke's on them, now I'm designing a pseudo one. Half an OS is still an OS... right?

---

## The Learning Arc

After building this I got a proper understanding of how software works, how each module talks to the others, what happens under the hood, and it was a great feeling. At the exact same time I grew my interest in system thinking, system design and DevOps... and just like a cherry on top, I lost my Windows by mistake and entered the Linux era ([full story here](/blog/how-i-became-a-linux-user)).. and Linux changed the way I think. Now I started to trace every request...

And then I spent my next few months learning, building, attending a few more hackathons (I finally [won 1](/blog/my-first-hackathon-win) BTW) and built some pretty good projects, and then came the pinnacle of everything.

CI-CD Sentinel: This one was a major project. I traced everything, wrote the architecture by myself and started building. And then I vibe coded my portfolio and hosted it, and during that I learnt about domains, namespaces, hosting and cloud. Then I started with AWS, and at some point, just to flex, I used to start a Minecraft server on an AWS EC2 instance to play single player worlds... Yes, a cloud server. For single player. My AWS bill was not as excited as I was.

---

## The Flex Era

I started thinking in systems and started building the Fortis Ecosystem. It was good until I started to think, can I run this on an RPi? And I was like, sure why not, and started working on it.. It was all fun until I got hit by real world problems..
And then I solved each of them one by one and built a first working prototype and an app. Then I got an internship and worked there, showed my system design skills by building an AI pipeline for live call suggestions with sub 100ms latency using Groq's caching... and then handled a difficult production deployment pipeline all by myself. And in between all of this I was obsessed with building things, understanding how everything works and, most importantly, flexing...

Then I built quite a lot of software tools:
- built mechkeys: mechanical keyboard like sounds for my laptop's keyboard (my roommates hate this one)
- built my own 3 stage Git-like backup system
- built my CLI portfolio `npx ganeshak11`
- built a CLI timer, a CLI task manager, a health check tool for websites and a lot more

---

## The Real World

And then my thinking went beyond my imagination. I started designing Fortis, working on some big projects and learning in parallel...
And a majority of all of these came because of vibe coding, but the difference is this time I know what I want in each module and how each module talks to the others.

The AI still writes a lot of the code. But now I'm the one who knows when it's lying to me.

And the journey is still going on...
