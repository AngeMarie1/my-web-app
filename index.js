const http = require('http');
const { authenticate } = require('./Auth');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {

  // --------------------------
  //  /login  (POST)
  // --------------------------
  if (req.url === '/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { username, password } = JSON.parse(body || '{}');
        const result = authenticate(username, password);

        res.statusCode = result.ok ? 200 : 401;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));

      } catch (e) {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, error: 'Bad request' }));
      }
    });
    return;
  }

  // --------------------------
  //  /about  (GET)
  // --------------------------
  if (req.url === '/about') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>About Page</h1>');
    return;
  }

  // --------------------------
  //  Default route
  // --------------------------
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello from My Simple Node.js Web Server!</h1>');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

