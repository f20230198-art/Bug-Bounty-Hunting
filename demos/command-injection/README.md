# ⌨️ command-injection — OS Command Injection Demo

> A real Node.js server that passes your input directly to `exec()` — with three levels of (broken) defense for you to bypass.

**Maps to:** [Day 2 → OS Command Injection](../../Day-2.md#%EF%B8%8F-topic-2-os-command-injection--medium)

> Based on [AppSecExplained/ctf-commandinjection](https://github.com/AppSecExplained/ctf-commandinjection) by Alex Olsen (MIT, see [LICENSE](./LICENSE)).

---

## ▶️ How to Run

You need **Node.js** installed (tested with Node 18+).

```bash
cd demos/command-injection
npm install
node server.js
```

Then open [http://localhost:3000](http://localhost:3000).

**Don't expose this on a public IP.** It executes arbitrary shell commands. Localhost only.

---

## 🎯 The Three Endpoints

The app has one input and three buttons that hit different endpoints:

| Button | Endpoint | Defense | Your Job |
|--------|----------|---------|----------|
| **Execute 1** | `/execute` | None | Straight command injection |
| **Execute 2** | `/executeCheckWords` | Allow-list: must contain `date`, `ping`, or `uptime` | Bypass the weak keyword filter |
| **Execute 3** | `/executeCheckChars` | Block-list: rejects `& \| ; $ < \` \\ ! " ' ( )` | Execute something useful without any banned chars |

Input goes straight to Node's `exec()` — which invokes a real shell, so any shell operator works when it isn't filtered.

---

## 🧪 Payloads to Try

### Execute 1 — No defense

| Payload | What It Does |
|---------|--------------|
| `whoami` | Prints the server user — baseline |
| `ls` | Lists the working directory |
| `ls; cat server.js` | Chains two commands |
| `whoami && uname -a` | Run second only if first succeeds |
| `ls \| wc -l` | Pipe one command's output into another |

### Execute 2 — Keyword allow-list

The regex `(date|ping|uptime)` must match *somewhere* in your input. It doesn't have to be a standalone command.

| Payload | How It Bypasses |
|---------|-----------------|
| `date; whoami` | Passes filter because it contains `date`, but `;` lets you tack on any command |
| `uptime && cat server.js` | Same trick, different allow-list word |
| `ping -c 1 127.0.0.1; id` | Contains `ping`, then injects |

**Lesson:** An allow-list that only checks "does the string contain X?" is trivially defeated. The filter has to **restrict the whole string structure**, not just "includes a safe word."

### Execute 3 — Character block-list

The filter rejects `& | ; $ < \` \ ! " ' ( )`. This blocks most shell operators. But notice what **isn't** blocked.

| Payload | Why It Works |
|---------|--------------|
| `ls` | Single command — no operators needed |
| `cat server.js` | Still works — just a command with one argument |
| `ls -la /etc` | Spaces and slashes are fine |
| `whoami{,}` | Brace expansion — `{,}` isn't in the block-list |

The block-list also misses:
- **Newlines** (`%0a` URL-encoded) — on many shells, newline ends one command and starts another
- **`>`** (redirection out — *not in the block-list, only `<` is*) — you can write files

Try: `ls > /tmp/pwn` — if writes succeed, so could dropping a shell script.

**Lesson:** Block-lists are almost never complete. The safer path is (a) don't build shell commands from user input at all, or (b) use a language-native API (`execFile` with array args) that never invokes a shell.

---

## 🧠 Read the Source

Open [`server.js`](./server.js) — it's 75 lines total. The key lines:

```js
// Execute 1 — textbook vulnerable
exec(userCommand, (error, stdout, stderr) => { ... });
```

`exec()` spawns **`sh -c <userCommand>`**, which means every shell operator is live. If you want to run a binary safely, use `execFile('whoami')` — no shell, no operators.

```js
// Execute 2 — regex allow-list (trivial bypass)
if (/(date|ping|uptime)/.test(userCommand)) { exec(userCommand, ...); }
```

This only checks "is the substring present?" — it doesn't parse the command.

```js
// Execute 3 — character block-list (incomplete)
if (/[&|;$<`\\!"'()]/.test(userCommand)) return res.send('...detected.');
```

Blocks most operators, but missing: `>`, newline, `{}`, `*`, `?`, `~`, `#`…

---

## 🛡️ How to Fix It (Really)

1. **Don't invoke a shell.** Use `child_process.execFile('ls', ['-la', userPath])` — arguments are passed as an array, not parsed as a shell command.
2. **If you must take user input**, restrict it to a strict allow-list of *values* (not substrings): `if (!['info', 'status', 'uptime'].includes(userCommand)) reject();`.
3. **Run the process with minimal privileges.** Even a successful RCE in a container with no network and no filesystem write is much less useful to an attacker.

---

## 🔗 Next

- Try [PortSwigger's simple command injection lab](https://portswigger.net/web-security/os-command-injection/lab-simple)
- Then the [blind time-delay variant](https://portswigger.net/web-security/os-command-injection/lab-blind-time-delays)
- Read the [Command Injection Cheat Sheet](../../CHEATSHEET.md#%EF%B8%8F-command-injection)

[← Back to demos index](../README.md)
