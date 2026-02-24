# ❓ Frequently Asked Questions

> **Got questions? You're not alone.** Here are the most common things beginners ask.

[← Back to Home](./README.md)

---

## 🔒 Legal & Ethics

### "Is bug bounty hunting legal?"

**Yes — IF you have permission.** Bug bounty programs explicitly invite you to test their systems. The program's **scope** defines what you're allowed to test, and the **rules of engagement** tell you what methods are acceptable.

> ⚠️ Testing a website **without permission** is illegal in most countries, even if you find a real vulnerability.

**Rules to live by:**
- ✅ Only test targets listed in a bug bounty program's scope
- ✅ Read ALL the program rules before you start
- ✅ Never access, modify, or delete real user data
- ✅ Stop immediately if you access something you shouldn't have
- ❌ Never test on production systems unless the scope allows it
- ❌ Never use automated scanners unless the program explicitly permits them

### "What if I accidentally break something?"

Don't panic! If you're testing within a bug bounty scope:
1. **Stop** what you're doing immediately
2. **Document** exactly what happened
3. **Report it** to the program — be honest and transparent
4. Most programs have a **safe harbor** policy that protects good-faith researchers

### "Can I get in trouble for doing the workshop labs?"

**No.** All the platforms we use (PortSwigger, Juice Shop, TryHackMe, etc.) are **intentionally vulnerable** and designed for learning. You have explicit permission to "hack" them.

---

## 💻 Technical Questions

### "Do I need Kali Linux?"

**Not for this workshop!** Everything is browser-based. However, as you progress:
- **Beginner:** Your regular browser + DevTools is enough
- **Intermediate:** Install [Burp Suite Community Edition](https://portswigger.net/burp/communitydownload) (works on Windows, Mac, Linux)
- **Advanced:** Kali Linux has many pre-installed tools, but it's not required

### "Do I need to know programming?"

**Not to start!** Many vulnerabilities (IDOR, SSRF, misconfigurations) don't require coding. However, learning these will help long-term:

| Language | Why |
|----------|-----|
| **JavaScript** | Understanding XSS, DOM manipulation |
| **Python** | Writing automation scripts, custom tools |
| **SQL** | Understanding injection attacks deeper |
| **HTML/CSS** | Understanding how web pages work |
| **Bash** | Command-line and server-side concepts |

### "What browser should I use?"

**Chrome** or **Firefox** — both have excellent DevTools. Some tips:
- Use **Incognito/Private mode** for lab work (avoids cookie conflicts)
- Learn the **Network tab** (F12 → Network) — it shows every request your browser makes
- Learn the **Console tab** — useful for testing JavaScript and XSS

### "What is Burp Suite and do I need it?"

Burp Suite is an **HTTP proxy** — it sits between your browser and the website, letting you intercept, view, and modify every request. It's the industry-standard tool for web security testing.

- **Community Edition** (free) is enough for learning
- The workshop doesn't require it, but you'll want it within a month of practicing
- [Download here](https://portswigger.net/burp/communitydownload)

---

## 🐛 Bug Bounty Questions

### "How long until I find my first bug?"

It varies wildly, but here's a realistic expectation:

| Timeline | What to Expect |
|----------|---------------|
| **Week 1–2** | Doing labs, learning the basics |
| **Month 1** | Starting to look at real targets, doing recon |
| **Month 2–3** | Deep testing, getting close |
| **Month 3–6** | Most dedicated beginners find their first bug |
| **Month 6+** | Regular findings if you keep at it |

> **Don't get discouraged!** The first bug is the hardest. After that, you know what to look for.

### "What types of bugs should beginners look for?"

Start with these — they're the most beginner-friendly:

| Bug Type | Why It's Good for Beginners |
|----------|----------------------------|
| **IDOR** | Just change IDs in URLs/requests — no special payloads |
| **Information Disclosure** | Find exposed admin panels, debug pages, error messages |
| **Subdomain Takeover** | Find abandoned subdomains via DNS records |
| **Open Redirect** | Modify redirect URLs — easy to find and test |
| **Security Misconfigurations** | Default credentials, exposed files, verbose errors |

### "How much money can I make?"

It depends on the platform, program, and severity:

| Severity | Typical Range | Example |
|----------|--------------|---------|
| **Low** (Info) | $0 – $150 | Information disclosure, minor misconfig |
| **Medium** | $150 – $2,000 | Stored XSS, CSRF, open redirect |
| **High** | $2,000 – $10,000 | SQLi, SSRF, authentication bypass |
| **Critical** | $10,000 – $100,000+ | Remote code execution, admin access |

> 💡 **Don't chase money.** Focus on learning. The money follows skill.

### "Should I do VDP or paid programs?"

**Start with VDP (Vulnerability Disclosure Programs):**
- VDP = no bounty payment, but you get:
  - ✅ Less competition (most hunters skip non-paying programs)
  - ✅ Easier targets (often less tested)
  - ✅ Experience and reputation
  - ✅ Items for your resume/portfolio

Once you have 3–5 valid findings, move to paid bounty programs.

### "I found a bug but I'm not sure if it's valid. What do I do?"

1. **Test it thoroughly** — can you reliably reproduce it?
2. **Check the scope** — is this target and bug type in scope?
3. **Check for duplicates** — has this exact issue been reported?
4. **Write it up** — if you can clearly show impact, report it!
5. **When in doubt, report it** — the worst that happens is they mark it as informative or N/A. You still learn from the response.

---

## 🤔 Workshop-Specific Questions

### "I can't solve a lab. What should I do?"

1. **Read the hints** in the Day files (click the collapsible arrows)
2. **Re-read the explanation** above the lab
3. **Check the PortSwigger solution** — each lab has a detailed solution page
4. **Watch a YouTube walkthrough** — search "PortSwigger [lab name]"
5. **Ask a classmate** — explaining the problem often helps you solve it

### "The lab link doesn't work"

- Make sure you're **logged in** to PortSwigger Academy
- Some labs need to be **started** (click "Access the lab")
- Labs run for a limited time — if it expires, just start it again
- If the whole platform is down, use [OWASP Juice Shop](https://juice-shop.herokuapp.com) as a backup

### "I completed all the workshop labs. What next?"

Check out the [Resources & Roadmap](./RESOURCES.md) for a structured 90-day plan!

---

<p align="center">
  <a href="./README.md"><b>← Back to Home</b></a>
</p>
