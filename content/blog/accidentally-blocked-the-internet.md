---
title: "How I Accidentally Blocked the Entire Internet During a Hackathon Demo"
date: "2026-04-24"
slug: "accidentally-blocked-the-internet"
excerpt: "We built a security system so aggressive that it decided the best way to prevent an attack was to disconnect the server from the entire universe."
hook: "If you build a firewall well enough, it might just lock you out of your own laptop."
tags: ["hackathon", "linux", "iptables", "devops", "story"]
---

# How I Accidentally Blocked the Entire Internet (And Fixed It Live)

**Incident Date:** Hackathon Day  
**Severity:** P0 — total internet loss, extreme panic, judge staring at me  
**Root Cause:** Automation being *too* good at its job  
**Resolution:** Frantically debugging `iptables` under extreme social pressure  

---

## The Setup: A Perfect Plan

We were at a hackathon building a self-hosting cloud monitoring and blocking system. The premise was simple: watch for threats, identify malicious IPs, and block them automatically.

To test it, I whipped out my phone, opened Termux, and sent a continuous barrage of brute-force requests at our laptop server.

The system worked! It detected the anomalous traffic, slapped down the hammer, and blocked my mobile IP. I couldn't SSH in anymore. We were thrilled. The product was flawless. We were going to win.

---

## The Incident: The Judge Arrives

Moments later, the hackathon judge walked up.

> "Show me the working product. Or if you have a working video, at least show it."

I went to load up our dashboard. 

*Loading...*  
*Loading...*  
Browser timeout.

Okay, weird. Let me just open `fast.com` to check the connection. No response. 

I quickly switched Wi-Fi networks, assuming the hackathon internet had crashed again. Still nothing.

The judge is just standing there. Waiting. Staring. The silence was deafening. Why was the laptop suddenly completely disconnected from the internet?

---

## The "Aha!" Moment

My DevOps survival instincts kicked in. It wasn't the Wi-Fi. It was the server. I dropped into the terminal and checked the firewall rules.

And there it was. The most horrifying, beautiful mistake I've ever made.

When our automated script detected my mobile’s brute-force attack, it didn't just block my specific IP. Our script was designed to dynamically update `iptables` when an attack was detected. Due to a bug in how it parsed the attacker's source IP from the Docker logs, a parsing failure returned an empty value, and our fallback logic silently substituted `0.0.0.0/0`. It then cheerfully injected this wildcard into the `INPUT` chain, effectively blocking all incoming traffic.

For those who don't speak networking, `0.0.0.0/0` is CIDR notation for "literally every IP address in existence."

Our security system was so determined to keep us safe that it decided the only way to prevent a brute-force attack was to disconnect the server from the entire universe. It was the digital equivalent of seeing a spider in your house and deciding to burn the house down.

I ran `iptables -L -n` and saw the smoking gun:

```text
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         
DROP       all  --  0.0.0.0/0            0.0.0.0/0
```

---

## The Fix: Debugging Under Fire

With the judge's eyes practically burning a hole in the side of my head, I had to act fast.

I quickly deleted the offending `iptables` rule (`iptables -D INPUT ...`), removing the block and restoring network connectivity. Instantly, the dashboard loaded, the internet returned, and I showed the working demo right then and there.

---

## What I Actually Learned

1. **Automation is ruthless.** It does exactly what you tell it to do, even if what you told it to do is block the entire planet.
2. **Blast Radius is a real thing.** When building automated defenses, always ask: *"If this script goes crazy, what is the maximum damage it can do?"*
3. **Never block `0.0.0.0/0` automatically.** Enterprise security systems have safeguards for a reason. They only target specific `/32` IPs and whitelist local subnets.
4. **Every automation system eventually becomes a production system.** The moment a script is allowed to take action without human approval, you have created an operator. Operators need guardrails.

The first change we made afterward was adding validation to reject any automated blocklist entry broader than a single host IP.

I walked away from that hackathon with a working project and a profound realization. Anyone can build an automated firewall, but it takes a true DevOps engineer to accidentally lock themselves out of it in front of a judge.

Sometimes, the system working *too well* is the biggest bug of all.
