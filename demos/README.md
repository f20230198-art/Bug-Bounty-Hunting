# 🧪 Vulnerable Demo Apps

> Five tiny, self-contained vulnerable apps that let you **practice the attacks hands-on, on your own machine** — without any lab server or internet connection.
>
> Every demo maps directly to a Day 1 or Day 2 topic.

[← Back to Home](../README.md)

---

## ⚠️ Safety First

These apps are **intentionally vulnerable**. They are safe to run because:

- They only bind to **`localhost` / `127.0.0.1`** (not reachable from the internet)
- They contain **fake data** — no real users, no real files, nothing real is ever touched
- They have **no network calls** to the outside world

**Do not expose them on a public IP.** Run them on your laptop, break them, then close the tab.

---

## 📚 Index

| # | Demo | Day | Topic | How to Run |
|---|------|-----|-------|------------|
| 1 | [sqli-login](./sqli-login/) | Day 1 | SQL Injection | Open `index.html` in browser |
| 2 | [xss-search](./xss-search/) | Day 1 | Cross-Site Scripting | Open `index.html` in browser |
| 3 | [traversal-megacorp](./traversal-megacorp/) | Day 2 | Directory Traversal | Open `index.html` in browser |
| 4 | [command-injection](./command-injection/) | Day 2 | OS Command Injection | `npm install && node server.js` |
| 5 | [idor-profiles](./idor-profiles/) | Day 3 | IDOR (Broken Access Control) | `npm install && node server.js` |

The first three are **pure HTML + JS** — zero setup, just double-click the file.
The last two are tiny **Node.js** apps with a real backend so DevTools → Network shows real requests you can intercept and replay.

---

## 🎯 How to Use These Demos

For each demo:

1. **Read the app's README** first (e.g., [sqli-login/README.md](./sqli-login/README.md))
2. **Run it** following the instructions
3. **Try the intended attack** — payloads are in the per-demo README
4. **Break it in a different way** — the real learning is in experimenting
5. **Read the source** afterwards — see exactly why the vulnerability exists

---

## 1️⃣ sqli-login — SQL Injection

**Covers:** [Day 1 → SQL Injection](../Day-1.md#-topic-2-sql-injection-sqli--medium)

A tiny login form that builds a raw SQL query from your input and shows you the query in real time. Type `admin'--` as the username, leave password blank, and watch the `WHERE` clause get neutered live.

**What's unique:** you can **see** the SQL as you type — most beginners have never visualized what their payload actually does to the query.

👉 [Open sqli-login demo →](./sqli-login/)

---

## 2️⃣ xss-search — Cross-Site Scripting

**Covers:** [Day 1 → XSS](../Day-1.md#-topic-3-cross-site-scripting-xss--medium)

A search page that echoes your input back using `innerHTML`. Shows both what the browser renders and the fake "backend code" that built the HTML.

**Gotcha (intentional):** modern browsers block `<script>` tags inserted via `innerHTML`. Use `<img src=x onerror=alert(1)>` instead — this mirrors real-world behavior and teaches an important lesson.

👉 [Open xss-search demo →](./xss-search/)

---

## 3️⃣ traversal-megacorp — Directory Traversal

**Covers:** [Day 2 → Directory Traversal](../Day-2.md#-topic-1-directory-traversal-path-traversal--easy)

A fake corporate site called "MegaCorp" with Home / About / Products / etc. Change the `?file=` parameter to `../`, `../../`, `../../../../etc/`, and finally `../../../../etc/passwd` — each step takes you one directory up the fake file system.

The hidden `/etc/passwd` file contains the admin password. Go back to the login form on the home page and try it out.

**What's unique:** the whole flow is self-contained — you hack it, recover credentials, and then use them to "log in", all in one browser tab.

👉 [Open traversal-megacorp demo →](./traversal-megacorp/)

---

## 4️⃣ command-injection — OS Command Injection

**Covers:** [Day 2 → OS Command Injection](../Day-2.md#%EF%B8%8F-topic-2-os-command-injection--medium)

A real Node.js server that takes your input and runs it via `exec()` — the classic command injection footgun. Three progressively-defended endpoints let you practice bypass techniques:

| Endpoint | Defense | Your Job |
|----------|---------|----------|
| `Execute 1` | None | Straight injection with `;`, `\|\|`, `&&` |
| `Execute 2` | Allow-list of keywords | Sneak your command past a weak filter |
| `Execute 3` | Block-list of special characters | Find a way to execute without using filtered chars |

**What's unique:** this is the only demo with a **real backend** — you're actually popping shells, not simulating them. The `server.js` is 70 lines; read it when you're done.

👉 [Open command-injection demo →](./command-injection/)

---

## 5️⃣ idor-profiles — IDOR (Broken Access Control)

**Covers:** [Day 3 → IDOR](../Day-3.md#-topic-1-idor-insecure-direct-object-reference--easy)

A tiny profile site (ProfileHub) with three pre-seeded accounts — including an admin at ID 1. Log in as a normal user, intercept your own "save profile" request, **Copy as fetch**, paste in Console, change the ID to the admin's, rewrite the admin's password, and log in as admin.

**What's unique:** this is the "professional" way to demo IDOR — no URL-bar tampering. Students see the exact DevTools → Network → Copy as fetch → Console workflow real hunters use on targets where the ID isn't even in the URL.

👉 [Open idor-profiles demo →](./idor-profiles/)

---

## 💡 Why These Demos Exist

PortSwigger labs are excellent, but they're remote, time-limited, and hide the backend. These local demos:

- **Never expire** — hack them at 3 AM, offline, on a plane
- **Show the backend code** — you see exactly why the vulnerability exists
- **Let you modify them** — break the fix, add a new bug, turn it into a mini-CTF for a friend

Treat them as a **sandbox**. Break them in ways we didn't anticipate. That's where the real learning happens.

---

## 🙏 Credits

- `command-injection/` is adapted from [AppSecExplained/ctf-commandinjection](https://github.com/AppSecExplained/ctf-commandinjection) by Alex Olsen (MIT licensed — see [LICENSE](./command-injection/LICENSE))
- The other three demos are workshop-original

---

<p align="center">
  <a href="../README.md"><b>← Back to Home</b></a>
</p>
