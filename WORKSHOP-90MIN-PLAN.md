# 3-Day Workshop Plan (90 Minutes Per Day)

> Goal: keep each day to 90 minutes total, including a short break.

[← Back to Home](./README.md)

---

## Feasibility Check

Current day files are excellent for deep-dive learning, but they are not realistic for 90-minute delivery.

Estimated current duration (from instructor notes in day files):

- Day 1: ~200 minutes (Recon 40 + SQLi 90 + XSS 70)
- Day 2: ~185 minutes (Traversal 30 + Cmdi 40 + SSRF 45 + XXE 40 + Upload 30)
- Day 3: ~175 minutes (IDOR 45 + JWT 50 + Deserialization 30 + AI Topic 20 + Hunting 30)

Conclusion: full content cannot fit in 90 minutes/day, especially with breaks.

---

## Delivery Rule

Each day follows this structure:

- 80 to 82 minutes teaching + guided practice
- 8 to 10 minutes break
- Total = 90 minutes

---

## Day 1 (90-Minute Version)

### In-Session Plan

| Time | Topic | Mode |
|------|------|------|
| 0-10 min | Intro, legal scope, workflow | Talk |
| 10-25 min | Recon essentials (crt.sh + 2 useful dorks + Wayback) | Demo |
| 25-50 min | SQL Injection basics + 1 guided lab | Demo + hands-on |
| 50-58 min | Break | Pause |
| 58-83 min | XSS basics + 1 guided lab | Demo + hands-on |
| 83-90 min | Recap + homework briefing | Talk |

### Exclude for No Harm (Move to Homework)

- Shodan and SecurityTrails deep walkthrough
- SQLi extra labs (2 and 3)
- XSS extra challenge levels

Why safe to exclude: students still get core injection mindset and one successful lab in SQLi/XSS.

---

## Day 2 (90-Minute Version)

### In-Session Plan

| Time | Topic | Mode |
|------|------|------|
| 0-10 min | Recap from Day 1 + request anatomy | Talk |
| 10-30 min | Path Traversal + 1 lab | Demo + hands-on |
| 30-50 min | Command Injection + 1 lab | Demo + hands-on |
| 50-58 min | Break | Pause |
| 58-80 min | SSRF + 1 lab | Demo + hands-on |
| 80-90 min | Recap + homework briefing | Talk |

### Exclude for No Harm (Move to Homework)

- XXE (high context overhead for beginners)
- File Upload exploitation (best with dedicated environment and extra time)
- Second/advanced lab per topic

Why safe to exclude: Traversal + Cmdi + SSRF already teach core server-side thinking and impact.

---

## Day 3 (90-Minute Version, With AI Topic)

### Topic Replacement

Replace `WordPress` with `LLM Prompt Injection / Jailbreak Basics (Defensive)`.

### In-Session Plan

| Time | Topic | Mode |
|------|------|------|
| 0-10 min | Recap + hunting mindset | Talk |
| 10-32 min | IDOR + 1 lab | Demo + hands-on |
| 32-52 min | JWT basics + token tampering concept | Demo |
| 52-60 min | Break | Pause |
| 60-78 min | AI security: prompt injection/jailbreak basics + safe exercise | Demo + discussion |
| 78-90 min | Bug report writing + where to hunt next | Talk |

### Exclude for No Harm (Move to Homework)

- Insecure Deserialization (keep as optional advanced topic)
- Long platform comparison details

Why safe to exclude: students keep practical hunting flow (IDOR + JWT + reporting) and gain modern AI security awareness.

---

## AI Topic Ideas (Pick One)

1. LLM Prompt Injection/Jailbreak Basics (selected)
2. Sensitive Data Leakage in AI Chatbots
3. AI Agent Tool Abuse and Permission Boundaries

If you want just one AI topic for this workshop, option 1 is the easiest to teach in 15 to 20 minutes.

---

## Instructor Note

For this 3-day format, success is not "cover everything".
Success is: each student understands the bug class, completes at least one lab, and can explain impact clearly.
