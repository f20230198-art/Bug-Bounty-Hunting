# 🗺️ Your 90-Day Bug Bounty Learning Roadmap

> **The workshop was just the beginning.** Here's your structured plan to go from workshop graduate to real bug bounty hunter.

[← Back to Home](./README.md)

---

## 📅 Month 1: Build the Foundation (Days 1–30)

### Week 1–2: Master the PortSwigger Labs

Complete **all Apprentice-level** labs in these categories:

| Category | Labs | Priority |
|----------|------|----------|
| [SQL Injection](https://portswigger.net/web-security/sql-injection) | ~5 Apprentice labs | 🔴 High |
| [XSS](https://portswigger.net/web-security/cross-site-scripting) | ~5 Apprentice labs | 🔴 High |
| [Path Traversal](https://portswigger.net/web-security/file-path-traversal) | ~3 Apprentice labs | 🟡 Medium |
| [OS Command Injection](https://portswigger.net/web-security/os-command-injection) | ~2 Apprentice labs | 🟡 Medium |
| [SSRF](https://portswigger.net/web-security/ssrf) | ~2 Apprentice labs | 🔴 High |
| [XXE](https://portswigger.net/web-security/xxe) | ~2 Apprentice labs | 🟡 Medium |
| [Access Control / IDOR](https://portswigger.net/web-security/access-control) | ~5 Apprentice labs | 🔴 High |
| [JWT](https://portswigger.net/web-security/jwt) | ~2 Apprentice labs | 🟡 Medium |

> 🎯 **Goal:** Complete 2–3 labs per day. Should take ~30 labs total.

### Week 3–4: Start Exploring Real Targets

1. **Create accounts** on all bug bounty platforms:
   - [HackerOne](https://hackerone.com)
   - [Bugcrowd](https://bugcrowd.com)
   - [Intigriti](https://intigriti.com)

2. **Read 10 disclosed bug reports** on [HackerOne Hacktivity](https://hackerone.com/hacktivity):
   - Filter by "Disclosed" and sort by "Most upvoted"
   - Study what they found, how they found it, and how they wrote the report

3. **Pick your first target:**
   - Choose a program with a **wide scope** (many domains)
   - Start with VDP (Vulnerability Disclosure Programs) — no bounty, but easier targets and less competitive
   - Do basic recon: subdomains (crt.sh), Google dorks, technology detection

---

## 📅 Month 2: Level Up (Days 31–60)

### Week 5–6: Tackle Practitioner Labs

Move to **Practitioner-level** PortSwigger labs:

| New Topics to Add | Why |
|-------------------|-----|
| [Authentication](https://portswigger.net/web-security/authentication) | Login bypasses pay well |
| [Business Logic](https://portswigger.net/web-security/logic-flaws) | Scanners can't find these |
| [CORS](https://portswigger.net/web-security/cors) | Common misconfiguration |
| [CSRF](https://portswigger.net/web-security/csrf) | Classic web vulnerability |
| [Clickjacking](https://portswigger.net/web-security/clickjacking) | Quick to test for |
| [WebSockets](https://portswigger.net/web-security/websockets) | Often overlooked |

### Week 7–8: Build Your Methodology

1. **Create your own recon workflow:**
   - Subdomain enumeration → Technology detection → Content discovery → Parameter mining
   - Document what works for you

2. **Start using Burp Suite Community Edition** (free):
   - [Download](https://portswigger.net/burp/communitydownload)
   - Learn to intercept, modify, and replay requests
   - Use it on PortSwigger labs first

3. **Try TryHackMe learning paths:**
   - [Web Fundamentals Path](https://tryhackme.com/paths) (free rooms available)
   - Complete 2–3 rooms per week

---

## 📅 Month 3: Go Hunting (Days 61–90)

### Week 9–10: Serious Bug Hunting

1. **Dedicate hunting time:** 1–2 hours per day on real targets
2. **Focus on one program** for at least a week — deep knowledge beats broad scanning
3. **Keep notes** on everything you find — even non-vulnerabilities help you understand the app
4. **Focus on logic bugs and IDORs** — they're the most common first finds

### Week 11–12: Submit Your First Report

1. **Found something?** Write a clear report:
   - Title: Specific and descriptive
   - Steps to reproduce: Anyone should be able to follow
   - Impact: What can an attacker do?
   - Proof: Screenshots, HTTP requests, video
   - Fix suggestion: Optional but appreciated

2. **Haven't found anything yet?** That's normal!
   - Switch to a different program
   - Try [Hacker101 CTF](https://ctf.hacker101.com) for confidence
   - Re-read disclosed reports for inspiration

> 🎯 **Month 3 Goal:** Submit at least 1 real bug report (even if it gets marked as informative — the experience is worth it)

---

## 📺 YouTube Channels to Subscribe To

| Channel | What You'll Learn | Link |
|---------|------------------|------|
| **NahamSec** | Bug bounty tips, live hunts, recon | [YouTube](https://youtube.com/@NahamSec) |
| **STÖK** | Bug bounty lifestyle, motivation | [YouTube](https://youtube.com/@STOKfredrik) |
| **John Hammond** | CTF walkthroughs, security concepts | [YouTube](https://youtube.com/@_JohnHammond) |
| **LiveOverflow** | Deep technical security research | [YouTube](https://youtube.com/@LiveOverflow) |
| **The Cyber Mentor** | Full ethical hacking courses | [YouTube](https://youtube.com/@TCMSecurityAcademy) |
| **InsiderPhD** | Bug bounty for beginners | [YouTube](https://youtube.com/@InsiderPhD) |
| **PwnFunction** | Animated vulnerability explanations | [YouTube](https://youtube.com/@PwnFunction) |
| **IppSec** | Hack The Box walkthroughs | [YouTube](https://youtube.com/@ippsec) |

---

## 📚 Free Courses and Platforms

| Platform | What It Offers | URL |
|----------|---------------|-----|
| **PortSwigger Academy** | Best structured web security labs | [portswigger.net/web-security](https://portswigger.net/web-security) |
| **TryHackMe** | Guided rooms and learning paths | [tryhackme.com](https://tryhackme.com) |
| **Hack The Box** | CTF-style challenges (more advanced) | [hackthebox.com](https://hackthebox.com) |
| **Hacker101** | Video lessons + CTF by HackerOne | [hacker101.com](https://hacker101.com) |
| **Bugcrowd University** | Free courses for beginners | [bugcrowd.com/university](https://www.bugcrowd.com/hackers/bugcrowd-university/) |
| **PentesterLab** | Progressive web security exercises | [pentesterlab.com](https://pentesterlab.com) |
| **OWASP Web Security Testing Guide** | Comprehensive testing methodology | [owasp.org/wstg](https://owasp.org/www-project-web-security-testing-guide/) |

---

## 📖 Essential Reading

| Resource | Type | URL |
|----------|------|-----|
| **OWASP Top 10** | Standard vulnerability list | [Link](https://owasp.org/www-project-top-ten/) |
| **PayloadsAllTheThings** | Massive payload repository | [GitHub](https://github.com/swisskyrepo/PayloadsAllTheThings) |
| **HackTricks** | Pentesting methodology wiki | [Link](https://book.hacktricks.xyz) |
| **Bug Bounty Bootcamp** (book) | Best beginner book | By Vickie Li |
| **The Web App Hacker's Handbook** (book) | Classic reference | By Dafydd Stuttard |

---

## 🏆 Milestones to Track

Use these checkboxes to track your progress:

- [ ] Completed all Apprentice labs on PortSwigger
- [ ] Read 10 disclosed bug reports
- [ ] Created accounts on HackerOne, Bugcrowd, and Intigriti
- [ ] Installed and used Burp Suite Community Edition
- [ ] Completed 5 Practitioner-level labs
- [ ] Did recon on a real bug bounty target
- [ ] Found a real vulnerability (any severity!)
- [ ] Submitted my first bug report
- [ ] Received a response on a bug report
- [ ] Earned my first bounty! 🎉

---

<p align="center">
  <a href="./README.md"><b>← Back to Home</b></a>
</p>
