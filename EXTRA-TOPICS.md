# 📦 Extra Topics Pack

> This file contains advanced or removed topics from the main day-wise student handouts.

[← Back to Home](./README.md)

---

## What Is This?

This pack is for students who finish core questions and want more depth.

It includes:

- XXE
- File Upload Vulnerabilities
- Insecure Deserialization
- WordPress Security
- Extra practice tasks moved from the main day files

---

## 🔁 Extra Practice from Day 1

### SQL Injection Bonus

| # | Question | Link |
|---|----------|------|
| 1 | SQLi login bypass (`administrator'--`) | [🔗 Start Practice](https://portswigger.net/web-security/sql-injection/lab-login-bypass) |

### XSS Bonus

| # | Question | Link |
|---|----------|------|
| 1 | Complete Google XSS Game levels 1-3 | [🔗 Start Practice](https://xss-game.appspot.com) |

---

## 🔁 Extra Practice from Day 2

| # | Question | What You'll Learn | Link |
|---|----------|------------------|------|
| 1 | Traversal filter bypass (`....//....//`) | Bypassing naive path filters | [🔗 Path Traversal Lab](https://portswigger.net/web-security/file-path-traversal/lab-sequences-stripped-non-recursively) |
| 2 | Blind command injection with time delay | Detection when output is hidden | [🔗 Command Injection Lab](https://portswigger.net/web-security/os-command-injection/lab-blind-time-delays) |
| 3 | SSRF backend host scan | Internal network discovery | [🔗 SSRF Lab](https://portswigger.net/web-security/ssrf/lab-basic-ssrf-against-backend-system) |

---

## 📄 Topic A: XXE (XML External Entity Injection)

### What It Is

XXE happens when XML input is parsed unsafely and external entities are allowed.

### Practice Questions

| # | Question | Link |
|---|----------|------|
| 1 | Exploit XXE to read `/etc/passwd` | [🔗 Start Lab](https://portswigger.net/web-security/xxe/lab-exploiting-xxe-to-retrieve-files) |
| 2 | Use XXE to perform SSRF | [🔗 Start Lab](https://portswigger.net/web-security/xxe/lab-exploiting-xxe-to-perform-ssrf) |

### Study Link

- [PortSwigger — XXE](https://portswigger.net/web-security/xxe)

---

## 📤 Topic B: File Upload Vulnerabilities

### What It Is

If upload validation is weak, attackers can upload executable scripts and get code execution.

### Practice Question

| # | Question | Link |
|---|----------|------|
| 1 | Upload a web shell and trigger execution | [🔗 Start Lab](https://portswigger.net/web-security/file-upload/lab-file-upload-remote-code-execution-via-web-shell-upload) |

### Study Link

- [PortSwigger — File Upload](https://portswigger.net/web-security/file-upload)

---

## 📦 Topic C: Insecure Deserialization

### What It Is

Tampering with serialized objects can change logic or privileges when the server deserializes unsafe user-controlled data.

### Practice Question

| # | Question | Link |
|---|----------|------|
| 1 | Modify serialized object to escalate privileges | [🔗 Start Lab](https://portswigger.net/web-security/deserialization/exploiting/lab-deserialization-modifying-serialized-objects) |

### Study Link

- [PortSwigger — Insecure Deserialization](https://portswigger.net/web-security/deserialization)

---

## 📝 Topic D: WordPress Security (Advanced Study)

### What to Check

| Check | Example Path |
|------|---------------|
| Version leak | `/readme.html` or page source meta generator |
| Login/admin surface | `/wp-login.php`, `/wp-admin` |
| User enumeration | `/?author=1` |
| Plugin/theme exposure | `/wp-content/plugins/`, `/wp-content/themes/` |
| XML-RPC exposure | `/xmlrpc.php` |

### Study Links

- [WPScan Vulnerability Database](https://wpscan.com/wordpresses)
- [WPScan Tool](https://wpscan.com)

> Only test websites where you have explicit permission.

---

## ✅ Suggested Order

1. Finish all core questions in Day 1, Day 2, and Day 3.
2. Do one extra practice question from this file.
3. Write a short report (title, steps, impact) for your solved extra lab.

---

<p align="center">
  <a href="./README.md"><b>← Back to Home</b></a>
</p>
