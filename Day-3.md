# 🔴 Day 3 — Real World Hunting

> **Topics:** IDOR → JWT Attacks → Insecure Deserialization → WordPress → Bug Bounty Platforms

[← Day 2](./Day-2.md) · [Back to Home](./README.md)

---

## 🗺️ Today's Roadmap

```mermaid
graph LR
    A["🔑 IDOR"] --> B["🎫 JWT Attacks"]
    B --> C["📦 Deserialization"]
    C --> D["📝 WordPress"]
    D --> E["🚀 Go Hunting!"]
    style A fill:#1a1a2e,stroke:#00ff88,color:#00ff88
    style B fill:#1a1a2e,stroke:#ff6b6b,color:#ff6b6b
    style C fill:#1a1a2e,stroke:#ffd93d,color:#ffd93d
    style D fill:#1a1a2e,stroke:#58a6ff,color:#58a6ff
    style E fill:#1a1a2e,stroke:#ff79c6,color:#ff79c6
```

### What Makes Today Different

| Day 1 & 2 | Day 3 |
|-----------|-------|
| Technical injection attacks | **Logic flaws** — no injection needed |
| Require special payloads | Require **creative thinking** |
| Scanners can sometimes find them | Usually require **manual testing** |

> **Logic bugs are the bread and butter of bug bounty hunting.** Automated scanners miss them, so human hunters have the edge!

---

---

<!-- ⏱️ INSTRUCTOR: ~45 min (15 min theory + 30 min labs) -->
## 🔑 Topic 1: IDOR (Insecure Direct Object Reference) 🟢 Easy

### What Is It?

IDOR happens when a website uses **predictable identifiers** (like numbers) to reference user data, and doesn't check if **you're allowed to access it**.

### How It Works

```
You're logged in as User #123.

Your profile:   GET /api/users/123/profile   ✅ (your data)
Someone else's: GET /api/users/124/profile   ❓ Should this work?

If yes → IDOR! You can see User #124's private data 💀
```

```
┌──────────────────────────────────────────────────────────────────┐
│                      IDOR — VISUALIZED                           │
│                                                                  │
│   You are User 123                                               │
│                                                                  │
│   ┌──────────────────────────────────────────┐                  │
│   │  Normal request:                         │                  │
│   │  GET /api/orders/1001    → Your order ✅  │                  │
│   │                                          │                  │
│   │  Changed ID:                             │                  │
│   │  GET /api/orders/1002    → John's order! │  ← IDOR!        │
│   │  GET /api/orders/1003    → Jane's order! │  ← IDOR!        │
│   │  GET /api/orders/1004    → Admin's order!│  ← IDOR!        │
│   └──────────────────────────────────────────┘                  │
│                                                                  │
│   The server never checks: "Does User 123 OWN Order 1002?"      │
│   It just returns whatever ID you ask for.                       │
└──────────────────────────────────────────────────────────────────┘
```

### Where to Look for IDOR

```mermaid
graph TD
    A["Look for IDs in..."] --> B["URL paths <br/> /user/123/profile"]
    A --> C["Query parameters <br/> ?id=123&action=view"]
    A --> D["Request body <br/> POST with userId=123"]
    A --> E["Cookies & headers <br/> X-User-Id: 123"]
    style A fill:#0d1117,stroke:#ffd93d,color:#ffd93d
```

### What to Try

1. **Change numeric IDs** — increment/decrement (123 → 124, 122)
2. **Change UUIDs** — if you can find another user's UUID
3. **Change HTTP method** — `GET` blocked? Try `PUT`, `DELETE`
4. **Check the response** — even if the page looks the same, check the JSON/HTML source

### 🧪 Hands-On Labs

| # | Lab | What You'll Learn | Link |
|---|-----|------------------|------|
| 1 | **Insecure direct object references** | Access other users' chat transcripts by changing a file ID | [🔗 Start Lab](https://portswigger.net/web-security/access-control/lab-insecure-direct-object-references) |
| 2 | **User ID controlled by request parameter** | View another user's account by changing the `id` parameter | [🔗 Start Lab](https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter) |

<details>
<summary>💡 Hint for Lab 1</summary>

Go to the "Live Chat" feature and click "View Transcript". It downloads a file like `2.txt`. Try downloading `1.txt` instead — it contains another user's chat with their password!
</details>

<details>
<summary>💡 Hint for Lab 2</summary>

Log in with `wiener:peter`. Go to "My Account" and notice the URL says `?id=wiener`. Change it to `?id=carlos` to see Carlos's account page and API key.
</details>

### 📖 Learn More
- [PortSwigger — Access Control](https://portswigger.net/web-security/access-control)

---

---

<!-- ⏱️ INSTRUCTOR: ~50 min (20 min theory + 30 min labs) -->
## 🎫 Topic 2: JWT Attacks (JSON Web Tokens) 🟡 Medium

### What Is JWT?

**JSON Web Token (JWT)** is a way for websites to manage authentication. When you log in, the server gives you a JWT token that proves who you are.

### JWT Structure

A JWT has **3 parts** separated by dots:

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwicm9sZSI6InVzZXIifQ.signature
╰──────── Header ────────╯╰────────────── Payload ──────────────╯╰─ Signature ─╯
```

Each part is **Base64 encoded**. Decode them:

```
Header:    {"alg": "HS256"}           ← Which algorithm is used
Payload:   {"sub": "user", "role": "user"}  ← WHO you are
Signature: (cryptographic verification)     ← Proves it wasn't tampered
```

```
┌──────────────────────────────────────────────────────────────────┐
│                    JWT ATTACK — VISUALIZED                        │
│                                                                  │
│   Normal Flow:                                                   │
│   ┌────────┐  login   ┌────────┐  JWT token  ┌────────┐        │
│   │  You   │ ───────► │ Server │ ──────────► │  You   │        │
│   │        │          │        │  role:user   │ (user) │        │
│   └────────┘          └────────┘             └────────┘        │
│                                                                  │
│   Attack — Change "none" algorithm:                              │
│   ┌────────┐  modified JWT  ┌────────┐                          │
│   │  You   │ ─────────────► │ Server │                          │
│   │        │  alg: "none"   │ skips  │                          │
│   │        │  role: "admin" │ verify!│                          │
│   └────────┘                └───┬────┘                          │
│                                 │                                │
│                                 ▼                                │
│                          ✅ Admin Access!                        │
└──────────────────────────────────────────────────────────────────┘
```

### Common JWT Attacks

| Attack | How It Works |
|--------|-------------|
| **`alg: "none"`** | Set algorithm to "none" → server skips signature verification |
| **Unverified signature** | Server doesn't check the signature at all |
| **Weak secret** | Brute-force the secret key (e.g., `secret`, `password123`) |
| **Change claims** | Modify `"role": "user"` → `"role": "admin"` |

### 🔧 Tool: jwt.io

Go to [**jwt.io**](https://jwt.io) to decode and inspect JWT tokens in real time. Paste any JWT and see its contents.

### 🧪 Hands-On Labs

| # | Lab | What You'll Learn | Link |
|---|-----|------------------|------|
| 1 | **JWT authentication bypass via unverified signature** | Modify the JWT payload to become admin | [🔗 Start Lab](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-unverified-signature) |
| 2 | **JWT authentication bypass via flawed signature verification** | Use the `alg: "none"` trick | [🔗 Start Lab](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-flawed-signature-verification) |

<details>
<summary>💡 Hint for Lab 1</summary>

1. Log in as `wiener:peter`
2. Open browser DevTools → Application tab → Cookies → copy the `session` JWT
3. Go to [jwt.io](https://jwt.io) and paste it
4. In the payload, change `"sub": "wiener"` to `"sub": "administrator"`
5. Copy the modified JWT back into your cookie
6. Visit `/admin`
</details>

<details>
<summary>💡 Hint for Lab 2</summary>

Same as above, but also:
1. Change the header's `"alg"` to `"none"`
2. **Remove the signature** (everything after the last dot, but keep the dot)
3. So your token looks like: `eyJhb...header.eyJsub...payload.`
</details>

### 📖 Learn More
- [PortSwigger — JWT Attacks](https://portswigger.net/web-security/jwt)

---

---

<!-- ⏱️ INSTRUCTOR: ~30 min (15 min theory + 15 min lab) -->
## 📦 Topic 3: Insecure Deserialization 🔴 Hard

### What Is It?

**Serialization** = Converting an object into a format that can be stored or sent (like a string).
**Deserialization** = Converting it back into an object.

If an application **deserializes user-controlled data without validation**, an attacker can modify the serialized object to change application logic or even execute code.

### How It Works — A Simple Example

```
Serialized cookie (PHP format):
O:4:"User":2:{s:8:"username";s:6:"wiener";s:5:"admin";b:0;}

What it means:
- Object of class "User"
- username = "wiener"
- admin = false (0)

Tampered:
O:4:"User":2:{s:8:"username";s:6:"wiener";s:5:"admin";b:1;}
                                                         ↑
                                                    Changed to 1 (true)!
```

```mermaid
graph LR
    A["Serialized Object <br/> admin: false"] --> B["Attacker modifies <br/> admin: true"]
    B --> C["Server deserializes <br/> trusts the data"]
    C --> D["🎉 Admin access!"]
    style A fill:#0d1117,stroke:#58a6ff,color:#58a6ff
    style B fill:#0d1117,stroke:#ff6b6b,color:#ff6b6b
    style C fill:#0d1117,stroke:#ffd93d,color:#ffd93d
    style D fill:#0d1117,stroke:#00ff88,color:#00ff88
```

### 🧪 Hands-On Lab

| # | Lab | What You'll Learn | Link |
|---|-----|------------------|------|
| 1 | **Modifying serialized objects** | Change a serialized cookie to escalate privileges | [🔗 Start Lab](https://portswigger.net/web-security/deserialization/exploiting/lab-deserialization-modifying-serialized-objects) |

<details>
<summary>💡 Hint</summary>

1. Log in as `wiener:peter`
2. Check your cookies — there's a serialized session cookie (Base64 encoded)
3. Decode it with [CyberChef](https://gchq.github.io/CyberChef) (From Base64)
4. You'll see a PHP serialized object — change `admin` value from `0` to `1`
5. Re-encode to Base64 and replace the cookie
6. Visit `/admin`
</details>

### 📖 Learn More
- [PortSwigger — Insecure Deserialization](https://portswigger.net/web-security/deserialization)

---

---

<!-- ⏱️ INSTRUCTOR: ~20 min (demo + discussion) -->
## 📝 Topic 4: Attacking WordPress 🟢 Easy

### Why WordPress?

WordPress powers **~43% of all websites** on the internet. It's a huge attack surface, and **most vulnerabilities come from plugins and themes**, not WordPress itself.

```
┌──────────────────────────────────────────────────────────────────┐
│                 WORDPRESS ATTACK SURFACE                         │
│                                                                  │
│   ┌──────────────┐                                              │
│   │  WordPress   │                                              │
│   │    Core      │  ← Rarely vulnerable (auto-updates)          │
│   └──────┬───────┘                                              │
│          │                                                       │
│   ┌──────┴───────┐                                              │
│   │   Plugins    │  ← 🎯 #1 attack vector!                     │
│   │  (60,000+)   │     Many are poorly coded                    │
│   └──────┬───────┘                                              │
│          │                                                       │
│   ┌──────┴───────┐                                              │
│   │   Themes     │  ← Also commonly vulnerable                  │
│   └──────┬───────┘                                              │
│          │                                                       │
│   ┌──────┴───────┐                                              │
│   │  Misconfig   │  ← Default creds, exposed files              │
│   └──────────────┘                                              │
└──────────────────────────────────────────────────────────────────┘
```

### Common WordPress Checks

| What to Check | How |
|--------------|-----|
| **WordPress version** | View page source → look for `<meta name="generator">` |
| **Login page** | Visit `/wp-admin` or `/wp-login.php` |
| **User enumeration** | Visit `/?author=1`, `/?author=2`, etc. |
| **Exposed files** | Visit `/wp-config.php.bak`, `/readme.html`, `/.htaccess` |
| **Plugin vulnerabilities** | Check installed plugins at `/wp-content/plugins/` |
| **XML-RPC** | Visit `/xmlrpc.php` — can be used for brute-force attacks |

### Tools

| Tool | What It Does | URL |
|------|-------------|-----|
| **WPScan** | Scans WordPress sites for vulnerabilities | [wpscan.com](https://wpscan.com) (free tier) |
| **WPSec** | Quick free online WordPress security check | [wpsec.com](https://wpsec.com) |

> ⚠️ **Only scan websites you have permission to test!**

### 📖 Learn More
- [WPScan Vulnerability Database](https://wpscan.com/wordpresses)

---

---

<!-- ⏱️ INSTRUCTOR: ~30 min (15 min platforms + 15 min report writing) -->
## 🚀 Topic 5: How to Start Bug Bounty Hunting for Real 🟢 Easy

### Step 1: Pick a Platform

| Platform | Best For | URL |
|----------|---------|-----|
| **HackerOne** | Largest platform, most programs | [hackerone.com](https://hackerone.com) |
| **Bugcrowd** | Great for beginners | [bugcrowd.com](https://bugcrowd.com) |
| **Intigriti** | European focus | [intigriti.com](https://intigriti.com) |
| **YesWeHack** | Growing community | [yeswehack.com](https://yeswehack.com) |

### Step 2: Choose a Target

```mermaid
graph TD
    A["Pick a Bug Bounty Program"] --> B["Read the Scope"]
    B --> C["What's IN scope?"]
    B --> D["What's OUT of scope?"]
    C --> E["Start Recon on in-scope targets"]
    E --> F["Test for vulnerabilities from Days 1-3"]
    F --> G["Found a Bug? → Write a Report!"]
    style A fill:#0d1117,stroke:#58a6ff,color:#58a6ff
    style G fill:#0d1117,stroke:#00ff88,color:#00ff88
```

### Step 3: Write a Good Bug Report

A great report has 5 parts:

```
┌──────────────────────────────────────────────────────────────────┐
│                   ANATOMY OF A BUG REPORT                        │
│                                                                  │
│   1. 📌 TITLE                                                   │
│      Clear, specific — e.g., "IDOR allows any user              │
│      to view other users' invoices via /api/invoices/{id}"      │
│                                                                  │
│   2. 📝 DESCRIPTION                                             │
│      What the vulnerability is and where it exists               │
│                                                                  │
│   3. 🔄 STEPS TO REPRODUCE                                      │
│      Step-by-step instructions anyone can follow:                │
│      1. Log in as user A                                        │
│      2. Navigate to /api/invoices/1001                          │
│      3. Change 1001 to 1002                                     │
│      4. Observe: User B's invoice is returned                    │
│                                                                  │
│   4. 💥 IMPACT                                                  │
│      What an attacker could do with this                        │
│      (e.g., "Access any user's financial data")                 │
│                                                                  │
│   5. 🛠️ SUGGESTED FIX                                           │
│      Optional but appreciated                                   │
│      (e.g., "Add authorization check on /api/invoices/{id}")    │
└──────────────────────────────────────────────────────────────────┘
```

### Step 4: Keep Learning!

| Resource | What It Is |
|----------|-----------|
| [PortSwigger Academy](https://portswigger.net/web-security) | Complete every topic and lab |
| [TryHackMe](https://tryhackme.com) | "Web Fundamentals" path |
| [Hacker101](https://hacker101.com) | Free video lessons + CTF |
| [HackerOne Hacktivity](https://hackerone.com/hacktivity) | Read real bug reports |
| [Bugcrowd University](https://www.bugcrowd.com/hackers/bugcrowd-university/) | Free courses |

---

---

## 🏆 Final Challenge — Mini CTF!

Let's put everything together! Head to [**Hacker101 CTF**](https://ctf.hacker101.com) and try the **Trivial** difficulty challenges.

> **Your mission:** Find the hidden flag 🚩
>
> Use everything you've learned:
> - Check the page source
> - Look at cookies and headers
> - Try changing IDs and parameters
> - Think like a hacker!

---

---

## 📚 Real Bug Report Example

Here's what a **real** submitted bug report looks like (anonymized):

---

**Title:** IDOR in `/api/v2/invoices/{id}` allows any authenticated user to download other users' invoices

**Severity:** High (P2)

**Description:**
The endpoint `GET /api/v2/invoices/{id}` does not verify that the authenticated user owns the requested invoice. Any logged-in user can access any other user's invoice by iterating the invoice ID.

**Steps to Reproduce:**
1. Create two accounts: `attacker@test.com` and `victim@test.com`
2. Log in as `victim@test.com` and create an invoice (note the invoice ID, e.g., `5847`)
3. Log in as `attacker@test.com`
4. Send the request: `GET /api/v2/invoices/5847` with attacker's session cookie
5. **Result:** The victim's full invoice is returned (name, address, payment details)

**Impact:**
An attacker can enumerate all invoice IDs and download every user's financial information, including names, addresses, and payment history. This affects all ~50,000 users on the platform.

**Suggested Fix:**
Add server-side authorization check: verify that the authenticated user's `user_id` matches the `owner_id` of the requested invoice before returning data.

---

> 💡 **Key takeaways from this report:**
> - The title is specific (includes endpoint and vulnerability type)
> - Steps are clear enough for anyone to reproduce
> - Impact explains **why** this matters (not just what happens)
> - A fix suggestion is included (optional but helps)

---

## ⚠️ Common Mistakes to Avoid

| Mistake | Fix |
|---------|-----|
| Only changing IDs in the URL | Also check **POST body**, **cookies**, and **headers** for IDs |
| Not testing JWT properly | Always decode at [jwt.io](https://jwt.io) first — understand the structure before modifying |
| Forgetting to re-encode after modifying serialized data | Always Base64 encode the modified cookie before replacing it |
| Submitting poorly written bug reports | A good report = more likely to be accepted. Follow the template above |
| Testing out-of-scope targets | Always read the program's scope — testing out-of-scope targets can get you banned |
| Giving up too early | The first bug is the hardest. Stay consistent, hunt 1–2 hours daily |

---

## 📝 Day 3 — Summary

```
✅ IDOR                    — Access other users' data by changing IDs
✅ JWT Attacks              — Modify authentication tokens to escalate privileges
✅ Insecure Deserialization — Tamper with serialized objects
✅ WordPress Security       — Find vulnerabilities in the web's most popular CMS
✅ Bug Bounty Platforms     — How to start hunting for real bugs
```

---

## 🎓 Workshop Complete!

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   🎉  CONGRATULATIONS!  🎉                                      │
│                                                                  │
│   You've completed the Bug Bounty Hunting Workshop!              │
│                                                                  │
│   Over 3 days you learned:                                       │
│   ✅ Day 1: Recon, SQL Injection, XSS                            │
│   ✅ Day 2: Path Traversal, Cmd Injection, SSRF, XXE, Upload     │
│   ✅ Day 3: IDOR, JWT, Deserialization, WordPress, Hunting       │
│                                                                  │
│   What's next?                                                   │
│   → Complete more labs on PortSwigger Academy                    │
│   → Sign up on HackerOne or Bugcrowd                            │
│   → Find your first real bug!                                    │
│   → Join the bug bounty community on Twitter/Discord             │
│                                                                  │
│   "The only way to learn security is by breaking things."        │
│                                                                  │
│   Happy Hunting! 🐛🔍                                            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

<p align="center">
  <a href="./README.md"><b>← Back to Home</b></a>
</p>
