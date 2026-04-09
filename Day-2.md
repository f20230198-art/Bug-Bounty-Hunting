# 🟡 Day 2 — Server-Side Attacks

> **Topics:** Directory Traversal → Command Injection → SSRF

[← Day 1](./Day-1.md) · [Back to Home](./README.md) · [Day 3 →](./Day-3.md)

---

## 🗺️ Today's Roadmap

```mermaid
graph LR
    A["📁 Directory Traversal"] --> B["⌨️ Command Injection"]
    B --> C["🔄 SSRF"]
    style A fill:#1a1a2e,stroke:#00ff88,color:#00ff88
    style B fill:#1a1a2e,stroke:#ff6b6b,color:#ff6b6b
    style C fill:#1a1a2e,stroke:#ffd93d,color:#ffd93d
```

### Yesterday vs. Today

| Day 1 | Day 2 |
|-------|-------|
| Attacked the **client side** (browser) | Attacking the **server side** |
| Injected into SQL queries and HTML | Making the server read files, run commands, send requests |
| Impact: Data theft, account hijacking | Impact: Full server compromise 💀 |

> Server-side bugs are typically **higher severity** = **higher bounty payouts** 💰

---

## 📁 Topic 1: Directory Traversal (Path Traversal) 🟢 Easy

### What Is It?

When a website loads a file (like an image or document), it uses a file path on the server. If it doesn't **validate** the path properly, you can navigate to files **outside** the intended directory.

### How It Works

```
Normal Request:
GET /image?file=photo.jpg
Server reads: /var/www/images/photo.jpg  ✅

Malicious Request:
GET /image?file=../../../etc/passwd
Server reads: /var/www/images/../../../etc/passwd
           = /etc/passwd  💀
```

```
┌──────────────────────────────────────────────────────────────────┐
│              DIRECTORY TRAVERSAL — VISUALIZED                    │
│                                                                  │
│   Server File System:                                            │
│                                                                  │
│   /                                                              │
│   ├── etc/                                                       │
│   │   └── passwd         ◄─── 🎯 Attacker wants this!           │
│   ├── var/                                                       │
│   │   └── www/                                                   │
│   │       └── images/    ◄─── 📂 Website reads from here         │
│   │           ├── cat.jpg                                        │
│   │           └── dog.jpg                                        │
│   └── ...                                                        │
│                                                                  │
│   ../../../etc/passwd                                            │
│   ─┬─ ─┬─ ─┬─                                                   │
│    │   │   └── Go up from images/ to www/                        │
│    │   └────── Go up from www/ to var/                            │
│    └────────── Go up from var/ to /                               │
│                Then go into etc/ and read passwd                  │
└──────────────────────────────────────────────────────────────────┘
```

### Common Payloads

| Payload | Target |
|---------|--------|
| `../../../etc/passwd` | Linux user file |
| `..\..\..\..\windows\win.ini` | Windows system file |
| `....//....//....//etc/passwd` | Bypass basic `../` stripping |
| `%2e%2e%2f%2e%2e%2f` | URL-encoded version of `../../` |

### 🧪 Core Questions

| # | Question | What You'll Learn | Link |
|---|----------|------------------|------|
| 1 | **File path traversal, simple case** | Use `../` to read `/etc/passwd` | [🔗 Start Lab](https://portswigger.net/web-security/file-path-traversal/lab-simple) |

<details>
<summary>💡 Hint for Question 1</summary>

Click on any product image. Look at the `GET` request in your browser's Network tab — you'll see something like `?filename=image.jpg`. Replace the filename with:
```
../../../etc/passwd
```
</details>

### ➕ Extra Questions for Practice

| # | Question | What You'll Learn | Link |
|---|----------|------------------|------|
| 1 | **Traversal sequences stripped non-recursively** | Bypass a basic filter | [🔗 Start Lab](https://portswigger.net/web-security/file-path-traversal/lab-sequences-stripped-non-recursively) |

<details>
<summary>💡 Hint for Extra Question 1</summary>

The server strips `../` from your input, but only once! So use:
```
....//....//....//etc/passwd
```
When the server removes `../`, what's left is still `../../../etc/passwd` 🧠
</details>

### 📖 Learn More
- [PortSwigger — Path Traversal](https://portswigger.net/web-security/file-path-traversal)

---

## ⌨️ Topic 2: OS Command Injection 🟡 Medium

### What Is It?

Some websites run **operating system commands** on the server based on user input. If the input isn't properly sanitized, you can **inject additional commands**.

### How It Works

Imagine a website with a "Check Stock" feature that runs a lookup command on the server.

If you inject `; whoami` into the store ID field, the server runs **two commands**: the stock check AND `whoami` (which reveals the server's username)!

```mermaid
graph LR
    A["User Input: <br/> storeId=1;whoami"] --> B["Server runs <br/> both commands"]
    B --> C["Output: <br/> Stock: 54 <br/> root"]
    style A fill:#0d1117,stroke:#ff6b6b,color:#ff6b6b
    style B fill:#0d1117,stroke:#ffd93d,color:#ffd93d
    style C fill:#0d1117,stroke:#00ff88,color:#00ff88
```

### Command Injection Operators

| Operator | How It Works |
|----------|-------------|
| `;` | Run both commands sequentially |
| `\|` | Pipe output of first command to second |
| `&&` | Run second command only if first succeeds |
| `\|\|` | Run second command only if first fails |
| `$()` | Execute command inside parentheses first |

### 🧪 Core Questions

| # | Question | What You'll Learn | Link |
|---|----------|------------------|------|
| 1 | **OS command injection, simple case** | Inject a command via a product stock checker | [🔗 Start Lab](https://portswigger.net/web-security/os-command-injection/lab-simple) |

<details>
<summary>💡 Hint for Question 1</summary>

Open a product, click "Check Stock", and intercept the request. The `storeId` parameter is vulnerable. Append a command separator followed by `whoami` to the storeId value.
</details>

### ➕ Extra Questions for Practice

| # | Question | What You'll Learn | Link |
|---|----------|------------------|------|
| 1 | **Blind OS command injection with time delays** | Detect injection via ping time delay | [🔗 Start Lab](https://portswigger.net/web-security/os-command-injection/lab-blind-time-delays) |

<details>
<summary>💡 Hint for Extra Question 1 (Blind)</summary>

You won't see output directly. Instead, cause a **time delay** to prove the injection works. Use a ping command with a 10-second count. If the response takes ~10 seconds, you've confirmed command injection!
</details>

### 📖 Learn More
- [PortSwigger — OS Command Injection](https://portswigger.net/web-security/os-command-injection)

---

## 🔄 Topic 3: Server-Side Request Forgery (SSRF) 🟡 Medium

### What Is It?

SSRF tricks the **server** into making HTTP requests on your behalf. This lets you:
- Access **internal services** that are not exposed to the internet
- Read **cloud metadata** (AWS keys, configs)
- Scan the **internal network**

### How It Works

```
Normal:
You ──► Server ──► external-api.com    (intended behavior)

SSRF:
You ──► Server ──► localhost:8080/admin  (accessing internal admin panel!)
You ──► Server ──► 169.254.169.254      (reading cloud credentials!)
```

```
┌──────────────────────────────────────────────────────────────────┐
│                     SSRF — VISUALIZED                            │
│                                                                  │
│   Internet                 │           Internal Network          │
│   ─────────                │          ─────────────────          │
│                            │                                     │
│   ┌───────┐    request     │  ┌─────────┐     ┌──────────┐     │
│   │  You  │ ─────────────► │  │  Web    │ ──► │  Admin   │     │
│   │       │    "check      │  │  Server │     │  Panel   │     │
│   └───────┘   this URL"    │  └─────────┘     │ (secret!)│     │
│                            │       │          └──────────┘     │
│   🔒 You can't access     │       │                            │
│   the admin panel directly │       ▼                            │
│                            │  ┌──────────┐                      │
│   But the SERVER can! ──── │  │ Database │                      │
│   And you control what     │  │ (secret!)│                      │
│   URL it visits! 😈        │  └──────────┘                      │
└──────────────────────────────────────────────────────────────────┘
```

### Common SSRF Targets

| Target URL | What You Get |
|-----------|-------------|
| `http://localhost/admin` | Internal admin panel |
| `http://127.0.0.1:8080` | Internal services on the same machine |
| `http://192.168.0.x` | Other machines on the internal network |
| `http://169.254.169.254/latest/meta-data/` | AWS cloud credentials ☁️ |

### 🧪 Core Questions

| # | Question | What You'll Learn | Link |
|---|----------|------------------|------|
| 1 | **Basic SSRF against the local server** | Access admin panel via localhost | [🔗 Start Lab](https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-localhost) |

<details>
<summary>💡 Hint for Question 1</summary>

Click "Check Stock" on any product and intercept the request. You'll see a `stockApi` parameter with a URL. Replace it with `http://localhost/admin` — you'll access the admin panel that's normally hidden!
</details>

### ➕ Extra Questions for Practice

| # | Question | What You'll Learn | Link |
|---|----------|------------------|------|
| 1 | **Basic SSRF against another back-end system** | Scan internal IP range to find hidden services | [🔗 Start Lab](https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-backend-system) |

<details>
<summary>💡 Hint for Extra Question 1</summary>

Same idea, but the admin panel is on a different internal machine. You need to scan the `192.168.0.X` range (change X from 1 to 255) to find which IP has the admin panel on port 8080. Keep changing the last number until you get a response!
</details>

### 📖 Learn More
- [PortSwigger — SSRF](https://portswigger.net/web-security/ssrf)

---

## ⚠️ Common Mistakes to Avoid

| Mistake | Fix |
|---------|-----|
| Trying too many advanced labs at once | Start with the core questions first, then continue with extra practice |
| Only trying `../` without encoding | Try URL-encoding (`%2e%2e%2f`), double-encoding, and `....//` variants |
| Forgetting to try all command separators | Don't just try `;` — also try `|`, `&&`, `||`, and `$()` |
| Using wrong IP for SSRF | `localhost` and `127.0.0.1` are treated differently by some filters — try both |
| Not intercepting the actual request | Use browser DevTools Network tab to see the real parameters being sent |
| Skipping advanced topics forever | Use [EXTRA-TOPICS.md](./EXTRA-TOPICS.md) after finishing core questions |

---

## 📝 Day 2 — Summary

```
✅ Directory Traversal   — Read sensitive files using `../`
✅ Command Injection     — Execute OS commands on the server
✅ SSRF                  — Make the server send requests to internal systems
✅ Advanced Track        — Continue with XXE/File Upload in EXTRA-TOPICS.md
```

### 🏠 Homework

1. Complete the **extra questions** for Traversal, Command Injection, and SSRF.
2. Pick **one topic** from [EXTRA-TOPICS.md](./EXTRA-TOPICS.md) and solve one practice question.
3. Write a short 5-line report for one lab: vulnerability, steps, and impact.

---

<p align="center">
  <a href="./Day-3.md"><b>Continue to Day 3 → Real-World Hunting</b></a>
</p>
