# 📁 traversal-megacorp — Directory Traversal Demo

> A fake corporate website ("MegaCorp") that loads pages via `?file=<name>`. Walk up the simulated filesystem, find `/etc/passwd`, recover the admin password, and log in.

**Maps to:** [Day 2 → Directory Traversal](../../Day-2.md#-topic-1-directory-traversal-path-traversal--easy)

---

## ▶️ How to Run

Double-click `index.html`, or open it in any browser. No install.

---

## 🎯 The Vulnerability

The page reads `?file=` from the URL and looks up the matching "file" from a fake filesystem:

```js
var params = new URLSearchParams(window.location.search);
var file = params.get("file") || "home";
document.getElementById("content").innerHTML = pages[file];
```

There's no validation — any path you supply is honored. This mirrors a real backend that does:

```php
$file = $_GET['file'];
echo file_get_contents("/var/www/html/pages/" . $file);
```

…without checking that the resolved path stays inside `/var/www/html/pages/`.

---

## 🧪 The Walkthrough

Do these **in order** — each step peels one directory off the stack.

| Step | URL Parameter | What You See |
|------|---------------|--------------|
| 1 | (none — just the page) | Normal MegaCorp homepage |
| 2 | `?file=about` | About page (normal link) |
| 3 | `?file=../` | Directory listing of `/var/www/html/` 🫢 |
| 4 | `?file=../../` | `/var/www/` — you can see logs and backups |
| 5 | `?file=../../../` | `/var/` |
| 6 | `?file=../../../../` | `/` — filesystem root |
| 7 | `?file=../../../../etc/` | `/etc/` — system config files |
| 8 | `?file=../../../../etc/passwd` | 🎯 **`/etc/passwd` with the admin password in a comment** |

After step 8, scroll back to the homepage, click "Home", and log in with:

- **Username:** `megacorp-admin`
- **Password:** `Megacorp@2024!`

You just chained **Directory Traversal → Credential Disclosure → Authentication Bypass** — a real attack path you'll see in bounty reports.

---

## 🧠 What to Observe

1. **Each `../` is one step up.** Visualize the filesystem tree every time you add one — this mental model is non-negotiable for real hunting.
2. **The passwd file** contains a realistic mix of system users (`root`, `daemon`, `www-data`) and a developer comment leaking the admin password. Real `/etc/passwd` files don't usually contain passwords (that's `/etc/shadow`), but **developers leave secrets in comments all the time** — in configs, git history, and `.env` files.
3. **Open `index.html` in a text editor** and read the `pages` object. Notice how the vulnerability is **literally that `pages["../../../../etc/passwd"]` is a real key**. Real backends do the exact same thing conceptually — they trust the path string.

---

## 🛡️ How to Fix It

Two complementary defenses:

**1. Resolve the path and check it's still inside your allowed directory:**

```js
const path = require('path');
const BASE = '/var/www/html/pages';
const safe = path.resolve(BASE, req.query.file);
if (!safe.startsWith(BASE)) throw new Error('Traversal blocked');
```

**2. Use an allow-list of filenames instead of raw paths:**

```js
const allowed = ['home', 'about', 'products', 'team'];
if (!allowed.includes(req.query.file)) return res.sendStatus(404);
```

Never just strip `../` — attackers will bypass with `....//`, `..%2f..%2f`, or `..%252f..%252f`.

---

## 🔗 Next

- Try [PortSwigger's simple traversal lab](https://portswigger.net/web-security/file-path-traversal/lab-simple)
- Then the [filter-bypass lab](https://portswigger.net/web-security/file-path-traversal/lab-sequences-stripped-non-recursively) — `....//` trick
- Read the [Directory Traversal Cheat Sheet](../../CHEATSHEET.md#-directory-traversal)

[← Back to demos index](../README.md)
