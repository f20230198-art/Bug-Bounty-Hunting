# 📦 Extra Topics & FAQ

> Advanced topics, bonus practice, and answers to the most common beginner questions — all in one place.

[← Back to Home](./README.md)

---

## 📖 Table of Contents

1. [What This Pack Is](#-what-this-pack-is)
2. [Bonus Practice — Day 1](#-bonus-practice--day-1)
3. [Bonus Practice — Day 2](#-bonus-practice--day-2)
4. [Bonus Practice — Day 3](#-bonus-practice--day-3)
5. [Topic A — XXE](#-topic-a-xxe-xml-external-entity-injection)
6. [Topic B — File Upload Vulnerabilities](#-topic-b-file-upload-vulnerabilities)
7. [Topic C — Insecure Deserialization](#-topic-c-insecure-deserialization)
8. [Topic D — WordPress Security](#-topic-d-wordpress-security-advanced-study)
9. [FAQ — Legal & Ethics](#-faq--legal--ethics)
10. [FAQ — Technical](#-faq--technical)
11. [FAQ — Bug Bounty](#-faq--bug-bounty)
12. [FAQ — Workshop](#-faq--workshop)
13. [Suggested Order](#-suggested-order)

---

## 🎯 What This Pack Is

For students who finish the core questions and want more. It contains:

- Extra labs for every Day 1/2/3 topic
- Four advanced topics not covered in the main workshop (XXE, File Upload, Deserialization, WordPress)
- Every FAQ we've been asked by beginners

Pick what interests you most. You don't have to do them in order.

---

## 🔁 Bonus Practice — Day 1

### SQL Injection

| # | Question | Link |
|---|----------|------|
| 1 | SQLi login bypass (`administrator'--`) | [🔗 Start Practice](https://portswigger.net/web-security/sql-injection/lab-login-bypass) |
| 2 | SQLi UNION attack — retrieving data from other tables | [🔗 Start Practice](https://portswigger.net/web-security/sql-injection/union-attacks/lab-retrieve-data-from-other-tables) |

### XSS

| # | Question | Link |
|---|----------|------|
| 1 | Google XSS Game — levels 1–3 (beginner friendly) | [🔗 Start Practice](https://xss-game.appspot.com) |
| 2 | XSS into HTML attribute context | [🔗 Start Practice](https://portswigger.net/web-security/cross-site-scripting/contexts/lab-attribute-angle-brackets-html-encoded) |

---

## 🔁 Bonus Practice — Day 2

| # | Question | What You'll Learn | Link |
|---|----------|------------------|------|
| 1 | Traversal filter bypass (`....//....//`) | Bypassing naive path filters | [🔗 Path Traversal Lab](https://portswigger.net/web-security/file-path-traversal/lab-sequences-stripped-non-recursively) |
| 2 | Blind command injection with time delay | Detection when output is hidden | [🔗 Command Injection Lab](https://portswigger.net/web-security/os-command-injection/lab-blind-time-delays) |
| 3 | SSRF backend host scan | Internal network discovery | [🔗 SSRF Lab](https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-backend-system) |

---

## 🔁 Bonus Practice — Day 3

| # | Question | What You'll Learn | Link |
|---|----------|------------------|------|
| 1 | IDOR — user ID in request parameter | Swap another user's ID to see their account | [🔗 IDOR Lab](https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter) |
| 2 | CSRF — token validation depends on method | Downgrade POST → GET to skip token check | [🔗 CSRF Lab](https://portswigger.net/web-security/csrf/bypassing-token-validation/lab-token-validation-depends-on-request-method) |
| 3 | JWT — `alg: "none"` bypass | Strip the signature entirely | [🔗 JWT Lab](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-flawed-signature-verification) |
| 4 | LLM — exploit excessive agency | Prompt-inject a model that can call APIs | [🔗 LLM Lab](https://portswigger.net/web-security/llm-attacks/lab-exploiting-llm-apis-with-excessive-agency) |

---

## 📄 Topic A: XXE (XML External Entity Injection)

### What It Is

XXE happens when XML input is parsed unsafely and external entities are allowed. An attacker can read local files, trigger SSRF, or cause denial-of-service — all by sending specially crafted XML.

### The Core Idea

```xml
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
<data>&xxe;</data>
```

The parser sees `&xxe;`, resolves it against `file:///etc/passwd`, and inlines the file contents into the response.

### Practice Questions

| # | Question | Link |
|---|----------|------|
| 1 | Exploit XXE to read `/etc/passwd` | [🔗 Start Lab](https://portswigger.net/web-security/xxe/lab-exploiting-xxe-to-retrieve-files) |
| 2 | Use XXE to perform SSRF | [🔗 Start Lab](https://portswigger.net/web-security/xxe/lab-exploiting-xxe-to-perform-ssrf) |

### 📖 Learn More
- [PortSwigger — XXE](https://portswigger.net/web-security/xxe)

---

## 📤 Topic B: File Upload Vulnerabilities

### What It Is

If upload validation is weak, attackers upload **executable scripts** (PHP, JSP, etc.) and get **remote code execution** by visiting the uploaded file's URL.

### Common Bypasses

| Bypass | Trick |
|--------|-------|
| **Extension** | Rename `shell.php` → `shell.php.jpg` or `shell.phtml` |
| **Content-Type** | Send `image/jpeg` in header, but the bytes are PHP |
| **Magic bytes** | Prefix the file with `GIF89a;` then append PHP code |
| **Double extension** | `shell.php.png` (if server uses first extension it finds) |
| **Null byte** | `shell.php%00.jpg` (older systems) |

### Practice Question

| # | Question | Link |
|---|----------|------|
| 1 | Upload a web shell and trigger execution | [🔗 Start Lab](https://portswigger.net/web-security/file-upload/lab-file-upload-remote-code-execution-via-web-shell-upload) |

### 📖 Learn More
- [PortSwigger — File Upload](https://portswigger.net/web-security/file-upload)

---

## 📦 Topic C: Insecure Deserialization

### What It Is

When a server takes a **serialized object** (PHP, Java, Python pickle) from the user and deserializes it without validation, you can tamper with the object's fields — or, worse, trigger arbitrary code execution during deserialization.

### Simple PHP Example

```
Before (in cookie, base64-decoded):
  O:4:"User":2:{s:8:"username";s:6:"wiener";s:5:"admin";b:0;}

After (flip admin to true):
  O:4:"User":2:{s:8:"username";s:6:"wiener";s:5:"admin";b:1;}
```

Re-encode → replace the cookie → you're admin.

### Practice Question

| # | Question | Link |
|---|----------|------|
| 1 | Modify serialized object to escalate privileges | [🔗 Start Lab](https://portswigger.net/web-security/deserialization/exploiting/lab-deserialization-modifying-serialized-objects) |

### 📖 Learn More
- [PortSwigger — Insecure Deserialization](https://portswigger.net/web-security/deserialization)

---

## 📝 Topic D: WordPress Security (Advanced Study)

WordPress powers ~40% of the web. Misconfigured plugins and exposed admin surfaces are a steady source of bounties.

### What to Check

| Check | Example Path |
|------|---------------|
| Version leak | `/readme.html` or page source meta generator |
| Login/admin surface | `/wp-login.php`, `/wp-admin` |
| User enumeration | `/?author=1`, `/?author=2` |
| Plugin/theme exposure | `/wp-content/plugins/`, `/wp-content/themes/` |
| XML-RPC exposure | `/xmlrpc.php` |
| REST API user list | `/wp-json/wp/v2/users` |

### 📖 Tools

- [WPScan Vulnerability Database](https://wpscan.com/wordpresses)
- [WPScan CLI](https://wpscan.com)

> ⚠️ Only test WordPress sites where you have explicit permission (your own, or a site explicitly in a bug bounty scope).

---

## 🔒 FAQ — Legal & Ethics

### "Is bug bounty hunting legal?"

**Yes — if you have permission.** Bug bounty programs explicitly invite you to test their systems. The program's **scope** defines what you're allowed to test, and the **rules of engagement** tell you what methods are acceptable.

> ⚠️ Testing a website **without permission** is illegal in most countries, even if you find a real vulnerability.

**Rules to live by:**
- ✅ Only test targets listed in a bug bounty program's scope
- ✅ Read ALL the program rules before you start
- ✅ Never access, modify, or delete real user data
- ✅ Stop immediately if you access something you shouldn't have
- ❌ Never test on production systems unless the scope allows it
- ❌ Never use automated scanners unless the program explicitly permits them

### "What if I accidentally break something?"

Don't panic. If you're testing within scope:
1. **Stop** what you're doing immediately
2. **Document** exactly what happened
3. **Report it** to the program — be honest and transparent
4. Most programs have a **safe harbor** policy that protects good-faith researchers

### "Can I get in trouble for doing the workshop labs?"

**No.** All the platforms we use (PortSwigger, Hacker101 CTF, TryHackMe, etc.) are intentionally vulnerable and designed for learning. You have explicit permission to "hack" them.

---

## 💻 FAQ — Technical

### "Do I need Kali Linux?"

**Not for this workshop.** Everything is browser-based. As you progress:
- **Beginner:** Regular browser + DevTools is enough
- **Intermediate:** Install [Burp Suite Community Edition](https://portswigger.net/burp/communitydownload) (Windows/Mac/Linux)
- **Advanced:** Kali Linux has many pre-installed tools — see the [Future Roadmap](./Future-Roadmap.md) for VM setup

### "Do I need to know programming?"

**Not to start.** Many vulnerabilities (IDOR, SSRF, misconfigurations) need no code. But these help long-term:

| Language | Why |
|----------|-----|
| **JavaScript** | Understanding XSS, DOM manipulation |
| **Python** | Writing automation scripts, custom tools |
| **SQL** | Understanding injection attacks deeper |
| **HTML/CSS** | Understanding how web pages work |
| **Bash** | Command-line and server-side concepts |

### "What browser should I use?"

**Chrome or Firefox** — both have excellent DevTools. Tips:
- Use **Incognito/Private mode** for lab work (avoids cookie conflicts)
- Learn the **Network tab** (F12 → Network) — it shows every request
- Learn the **Console tab** — useful for testing JavaScript and XSS

### "What is Burp Suite and do I need it?"

Burp is an **HTTP proxy** — it sits between your browser and the website, letting you intercept, view, and modify every request. It's the industry-standard tool for web testing.

- **Community Edition** (free) is enough for learning
- Not required for the workshop (core labs solve with browser DevTools)
- You'll want Burp within a month of regular practice
- [Download here](https://portswigger.net/burp/communitydownload)

---

## 🐛 FAQ — Bug Bounty

### "How long until I find my first bug?"

Varies wildly, but a realistic timeline:

| Timeline | What to Expect |
|----------|---------------|
| **Week 1–2** | Doing labs, learning basics |
| **Month 1** | Starting on real targets, doing recon |
| **Month 2–3** | Deep testing, getting close |
| **Month 3–6** | Most dedicated beginners find their first bug |
| **Month 6+** | Regular findings if you keep at it |

> The first bug is the hardest. After that, you know what to look for.

### "What types of bugs should beginners look for?"

The most beginner-friendly:

| Bug Type | Why It's Good for Beginners |
|----------|----------------------------|
| **IDOR** | Just change IDs — no special payloads |
| **Information Disclosure** | Find exposed admin panels, debug pages |
| **Subdomain Takeover** | Find abandoned subdomains via DNS records |
| **Open Redirect** | Modify redirect URLs — easy to test |
| **Security Misconfigurations** | Default credentials, exposed files, verbose errors |

### "How much money can I make?"

Depends on platform, program, and severity:

| Severity | Typical Range |
|----------|--------------|
| **Low** (Info) | $0 – $150 |
| **Medium** | $150 – $2,000 |
| **High** | $2,000 – $10,000 |
| **Critical** | $10,000 – $100,000+ |

> 💡 Don't chase money. Focus on learning. The money follows skill.

### "Should I do VDP or paid programs?"

**Start with VDP (Vulnerability Disclosure Programs):**
- No bounty payment, but:
  - ✅ Less competition
  - ✅ Easier targets (often less tested)
  - ✅ Experience and reputation
  - ✅ Items for your resume/portfolio

Once you have 3–5 valid findings, move to paid programs.

### "I found a bug but I'm not sure if it's valid."

1. **Test it thoroughly** — can you reliably reproduce it?
2. **Check the scope** — is this target/bug in scope?
3. **Check for duplicates** — has this exact issue been reported?
4. **Write it up** — if impact is clear, report it.
5. **When in doubt, report it** — worst case it's marked N/A; you still learn.

---

## 🤔 FAQ — Workshop

### "I can't solve a lab. What should I do?"

1. Read the **hints** in the Day files (click the collapsible arrows)
2. Re-read the **explanation** above the lab
3. Check the **PortSwigger solution** — each lab has a detailed writeup page
4. Watch a **YouTube walkthrough** — search "PortSwigger [lab name]"
5. **Explain the problem to a classmate** — often helps you solve it

### "The lab link doesn't work."

- Make sure you're **logged in** to PortSwigger Academy
- Some labs need to be **started** (click "Access the lab")
- Labs run for a limited time — restart if expired
- If one platform is down, try [Hacker101 CTF](https://ctf.hacker101.com) as a backup

### "I completed all the workshop labs. What next?"

- Work through topics A–D in this file
- Then follow the full [Future Roadmap](./Future-Roadmap.md)

---

## ✅ Suggested Order

1. Finish all core questions in Day 1, Day 2, and Day 3
2. Do one extra practice question per day from the "Bonus Practice" sections above
3. Pick **one** topic from A–D and solve its practice lab
4. Write a short report (title, steps, impact) for your solved extra lab
5. Move on to the [Future Roadmap](./Future-Roadmap.md)

---

<p align="center">
  <a href="./README.md"><b>← Back to Home</b></a>
</p>
