# 💉 sqli-login — SQL Injection Demo

> A tiny vulnerable login form that builds a raw SQL query from your input — and shows you the query **live, as you type**.

**Maps to:** [Day 1 → SQL Injection](../../Day-1.md#-topic-2-sql-injection-sqli--medium)

---

## ▶️ How to Run

Double-click `index.html`, or open it in any browser.

No server, no install. That's it.

---

## 🎯 The Vulnerability

The form simulates this backend SQL query:

```sql
SELECT * FROM users WHERE username = 'YOUR_INPUT' AND password = 'YOUR_INPUT'
```

The legitimate credentials (for reference only) are `admin` / `secret123`. Your job is to log in **without** knowing the password.

---

## 🧪 Try These Attacks

Type each payload in the **Username** field. Leave password blank or fill with garbage. Watch the `SELECT * FROM users ...` query update live under the form.

| # | Username Payload | What It Does |
|---|------------------|--------------|
| 1 | `admin'--` | Closes the string, comments out the password check |
| 2 | `' OR 1=1 --` | Makes the `WHERE` clause always true |
| 3 | `' OR '1'='1` | Same trick without needing to comment |
| 4 | `admin'#` | Same as `--` but with MySQL's `#` comment |

Each of these should display **"Logged in as admin."**

---

## 🧠 What to Observe

1. **Watch the live query** — the red string quotes shift position as you type. That's the core mental model of SQL injection.
2. **Compare the normal case** — type `admin` / `secret123` and see the safe query vs. the injected one.
3. **Read the source** — `index.html` is 60 lines. The "vulnerability" is on line 34 where strings are concatenated directly:
   ```js
   `SELECT * FROM users WHERE username = '${user}' AND password = '${pass}'`
   ```
   A real backend using this pattern (no parameterization) is trivially exploitable.

---

## 🛡️ How to Fix It (Real Backend)

Never concatenate user input into SQL. Use **parameterized queries**:

```js
// Vulnerable
const q = `SELECT * FROM users WHERE username = '${user}'`;

// Safe
const q = `SELECT * FROM users WHERE username = ?`;
db.query(q, [user]);
```

The parameterized form treats `user` as **data**, never as SQL syntax — so `'--` is just a weird username, not a query escape.

---

## 🔗 Next

- Try [PortSwigger's login bypass lab](https://portswigger.net/web-security/sql-injection/lab-login-bypass) — same attack, real server
- Read the [SQL Injection Cheat Sheet](../../CHEATSHEET.md#-sql-injection)

[← Back to demos index](../README.md)
