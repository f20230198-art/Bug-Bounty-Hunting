// IDOR Profiles Demo — INTENTIONALLY VULNERABLE
// Do not expose on a public IP. Localhost only.

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ---------- "Database" ----------
// Starts with ONLY the admin seeded (so there's a juicy target at id 1).
// Students sign up to create user accounts — demonstrates a realistic app.
const users = {
  1: {
    id: 1,
    username: 'admin',
    password: 'SuperSecret@2026',
    bio: 'Site administrator. Full control over the platform.',
    email: 'admin@profilehub.internal',
    role: 'admin'
  }
};

// Auto-increment starts at 46 so the first signup is id 46, second is 47, etc.
// That's what makes the "change 47 → 1" jump feel meaningful — students can
// actually see the gap between their IDs and the admin's.
let nextId = 46;

// Trivially insecure session "tokens" — just the user id encoded.
function makeToken(userId) {
  return `sess-${userId}`;
}
function parseToken(token) {
  if (!token || !token.startsWith('sess-')) return null;
  const id = parseInt(token.slice(5), 10);
  return Number.isFinite(id) ? id : null;
}

function requireLogin(req, res, next) {
  const uid = parseToken(req.cookies.session);
  if (!uid || !users[uid]) return res.status(401).json({ error: 'Not logged in' });
  req.currentUserId = uid;
  next();
}

// ---------- Routes ----------

app.post('/api/signup', (req, res) => {
  const { username, password, bio, email } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  const taken = Object.values(users).some(u => u.username === username);
  if (taken) return res.status(409).json({ error: 'Username already taken' });

  const id = nextId++;
  users[id] = {
    id,
    username,
    password,
    bio: bio || '',
    email: email || '',
    role: 'user'
  };
  res.cookie('session', makeToken(id), { httpOnly: false });
  res.json({ ok: true, id, username });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = Object.values(users).find(
    u => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.cookie('session', makeToken(user.id), { httpOnly: false });
  res.json({ ok: true, id: user.id, username: user.username });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('session');
  res.json({ ok: true });
});

app.get('/api/me', requireLogin, (req, res) => {
  const u = users[req.currentUserId];
  res.json({ id: u.id, username: u.username, role: u.role });
});

// --- The vulnerable endpoints ---
// Checks: are you logged in? ✅
// Forgets: does user :id actually belong to you? ❌
app.get('/api/users/:id', requireLogin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const u = users[id];
  if (!u) return res.status(404).json({ error: 'User not found' });
  res.json({
    id: u.id,
    username: u.username,
    bio: u.bio,
    email: u.email,
    role: u.role
  });
});

app.patch('/api/users/:id', requireLogin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const u = users[id];
  if (!u) return res.status(404).json({ error: 'User not found' });

  // ❌ IDOR: no ownership check. Should be:
  //   if (id !== req.currentUserId) return res.status(403).json({ error: 'Forbidden' });

  if (typeof req.body.bio === 'string') u.bio = req.body.bio;
  if (typeof req.body.email === 'string') u.email = req.body.email;
  if (typeof req.body.password === 'string' && req.body.password.length > 0) {
    u.password = req.body.password;
  }
  // Return the full updated record so the attacker immediately sees the result
  // in the Console — this makes the bug visible without having to log out.
  res.json({
    ok: true,
    id: u.id,
    username: u.username,
    bio: u.bio,
    email: u.email,
    role: u.role
  });
});

// ---------- Views ----------
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'views', 'signup.html')));
app.get('/profile', (req, res) => res.sendFile(path.join(__dirname, 'views', 'profile.html')));

const PORT = 3001;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  IDOR Profiles Demo running at http://localhost:${PORT}`);
  console.log('  Only the admin is pre-seeded (id 1). Users must sign up.');
  console.log('  First signup → id 46. Second → id 47. And so on.\n');
});
