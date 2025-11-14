// Simple example - not for production use
function authenticate(username, password) {
  // demo: accept 'admin' / 'password123'
  if (username === 'admin' && password === 'password123') {
    return { ok: true, user: { username: 'admin', role: 'admin' } };
  }
  return { ok: false, error: 'Invalid credentials' };
}

module.exports = { authenticate };
