# 🐛 Bug Bounty Hunting Workshop

> A hands-on 3-day introduction to web application security — from zero experience to filing your first bug report.

---

## 🚀 Start Here

Pick the day you're on. Each file is self-contained with theory, hints, and links to live labs.

| Day | Focus | File |
|-----|-------|------|
| 🟢 **Day 1** | The Hacker Mindset — Recon → SQLi → XSS | [Day-1.md](./Day-1.md) |
| 🟡 **Day 2** | Server-Side Attacks — Traversal → Command Injection → SSRF | [Day-2.md](./Day-2.md) |
| 🔴 **Day 3** | Real-World Hunting — IDOR → CSRF → JWT → LLM → Bug Bounty | [Day-3.md](./Day-3.md) |

---

## 🧰 Reference Material

| Resource | What It Is |
|----------|------------|
| 🧪 [Demo Apps](./demos/) | Four vulnerable mini-apps you can run and break locally |
| 🗂️ [Cheat Sheet](./CHEATSHEET.md) | Every payload, tool, and technique from the workshop on one page |
| 📦 [Extra Topics & FAQ](./EXTRA-TOPICS.md) | XXE, file upload, deserialization, WordPress + every common question |
| 🗺️ [Future Roadmap](./Future-Roadmap.md) | Step-by-step path from workshop graduate to finding your first bug |

---

## ✅ Accounts to Create (All Free)

Sign up before Day 1. Each takes under 3 minutes.

| # | Platform | Why | Link |
|---|----------|-----|------|
| 1 | **PortSwigger Web Security Academy** | Main hands-on lab platform (used every day) | [Sign Up](https://portswigger.net/web-security) |
| 2 | **TryHackMe** | Rooms for Linux + networking fundamentals (see [Future Roadmap](./Future-Roadmap.md)) | [Sign Up](https://tryhackme.com/signup) |
| 3 | **HackerOne** | Where you'll eventually hunt for real bugs | [Sign Up](https://hackerone.com/users/sign_up) |

---

## 🛠️ Tools Used in the Workshop

All browser-based or free. No Kali required to complete the core labs.

| Tool | Purpose |
|------|---------|
| **Browser DevTools** (F12) | Inspect requests, cookies, DOM |
| [crt.sh](https://crt.sh) | Find subdomains via certificate transparency |
| [Wayback Machine](https://web.archive.org) | Historical snapshots of websites |
| [Shodan](https://shodan.io) | Search engine for internet-connected devices |
| [Wappalyzer](https://www.wappalyzer.com) | Detect a site's tech stack |
| [jwt.io](https://jwt.io) | Decode and inspect JWT tokens |
| [PortSwigger Academy](https://portswigger.net/web-security) | Vulnerable labs for every topic |
| [Google XSS Game](https://xss-game.appspot.com) | Gamified XSS challenges |

---

## 🎯 What You'll Learn

By the end of Day 3, you'll be able to:

- Identify and exploit the **OWASP Top 10** most common web vulnerabilities
- Recon a target to find hidden subdomains, endpoints, and technologies
- Read and write a clear, reproducible **bug report**
- Navigate real bug bounty platforms and pick your first target
- Know exactly what to learn next — see the [Future Roadmap](./Future-Roadmap.md)

---

> ⚠️ **Ethics first.** Only ever test systems you own or that are explicitly in a bug bounty program's scope. Unauthorized testing is illegal in most jurisdictions — even when nothing breaks. See the [FAQ](./EXTRA-TOPICS.md#-faq--legal--ethics) for details.

---

<p align="center">
  <b>Ready? → <a href="./Day-1.md">Start with Day 1</a></b>
</p>
