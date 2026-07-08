---
title: "SSH vs. HTTPS: A Shared Machine Case Study"
date: "2026-07-09"
excerpt: "Why the standard HTTPS Git workflow breaks down in shared environments, and how SSH keys provide a cleaner, more secure alternative."
hook: "Right before my DevOps lab externals, I realized there was a huge issue with the standard HTTPS Git workflow on our shared college computers."
tags: ["devops-duels", "git", "ssh", "https", "security", "story"]
featured: true
series: "DevOps Duels"
---

# When SSH Beats HTTPS: A Shared Machine Case Study

I write a lot about DevOps tools, but today I want to talk about something basic that almost caused a disaster during my DevOps lab externals: Git authentication.

We were told we had to use the shared college computers for the exam. The standard way everyone learns to clone a repo is via HTTPS. You run `git clone`, a browser window pops up, you log in, and you're good to go.

But a few days before the exam, I realized a huge problem. That workflow works great for the first person. But what happens when the next student sits down at that exact same machine?

Their GitHub login wouldn't just replace mine. When you use HTTPS, Windows Credential Manager steps in and secretly caches your token so you don't have to keep typing it. So when I leave, my token stays right there in the system.

If the next student just sits down and types `git push`, they'll end up pushing code using *my* account. Even worse, they'd have full access to all my private repos. A lot of students don't even know how to get into the OS settings to remove cached credentials. It was an authentication mess waiting to happen.

I didn't want to deal with that, so I prepared a different approach: **SSH**.

I figured I could generate an SSH key just for that specific lab machine, add the public key to my GitHub, take the exam, and then just delete the key when I was done. The next student could do whatever they wanted, and my account would be safe.

Ironically, a few days before the externals, the college announced we could just bring our own laptops. So the whole disaster was prevented.

At that point, I already knew a lot about SSH. So this was just a practical workaround to avoid the authentication mess. What started as a practical workaround quickly turned into a deep dive into public-key cryptography, key exchange, and how Git authentication actually works.

## How Git actually authenticates

A lot of beginners think Git authenticates using your `user.name` config. It doesn't. You can set your name to Linus Torvalds and Git won't care.

What actually proves who you are is the method you use to connect:

**HTTPS:** You use a Personal Access Token (PAT) or log in through the browser. The OS saves this token in a background service (like Windows Credential Manager). This is what caused my shared machine case study.

**SSH:** You generate a cryptographic key pair. The private key stays on your machine, and you give GitHub the public key. When you connect, GitHub checks if you have the private key. No passwords are sent over the network, and the OS doesn't cache anything in the background.

## Why SSH is perfect for shared machines

With SSH, your authentication is tied to a literal file (the private key) in your `~/.ssh` folder.

When you're done using a shared computer, you don't have to hunt down hidden credential managers. You just delete the key file. You remove the public key from GitHub, and your access is instantly gone. It's explicit and easy to verify.

## When to use which?

Even though SSH saved me a lot of stress for the exam prep, they both have their place.

**Setup & Onboarding:** HTTPS is way easier for a brand new developer. You just click "Authorize" in a browser. Setting up SSH means opening a terminal, generating keys, and dealing with hidden files.

**Firewalls:** SSH uses Port 22, which gets blocked all the time on strict corporate networks or university Wi-Fi. HTTPS uses Port 443 (standard web traffic), so it almost always gets through.

**CI/CD Pipelines:** If you're setting up Jenkins or GitHub Actions, SSH is usually better. You can create a read-only "Deploy Key" for one specific server. If the server gets hacked, you just revoke that one key, instead of giving the server a token tied to your entire GitHub account.

## Clearing up some myths

While digging into this, I realized a lot of what people say about SSH isn't exactly true.

> ❌ **Myth:** SSH is more secure than HTTPS.

**Reality**: Honestly, both are incredibly secure in transit. The real difference is just how the credentials are stored on your computer.

---

> ❌ **Myth:** You should never share your public key.

**Reality**: The public key is literally designed to be shared. You can tweet it if you want. It's completely useless unless someone also steals your private key.

---

## My exam prep workflow

Just in case, if you ever get stuck on a shared machine, here is the exact workflow I practiced for the exam.

First, I generated a temporary key using the `ed25519` algorithm (it's faster and shorter than RSA):
```bash
ssh-keygen -t ed25519 -C "lab-computer-temp" -f ~/.ssh/id_lab_temp
```
*(I left the passphrase blank because I was going to delete it in two hours anyway).*

Then I printed the public key with `cat ~/.ssh/id_lab_temp.pub` and pasted it into GitHub, naming it "Lab External (Delete Today)".

I cloned my repo using the SSH URL:
```bash
git clone git@github.com:ganeshak11/devops-lab-project.git
```

When I was done, I cleaned up by simply deleting the key file:
```bash
rm ~/.ssh/id_lab_temp*
```
And deleted it from my GitHub settings. Zero trace left on the machine.

## The Verdict

If you're just coding on your own personal laptop, HTTPS is perfectly fine. But the second you have to touch a shared machine, a temporary environment, or an automated server, SSH gives you way more control over your access.

---

**Want to dive deeper into network protocols, or have a suggestion for the next tool battle?** 
Drop a comment or leave your email below! Let me know which tools you want to see face off next in the **[DevOps Duels series](/blog)**.