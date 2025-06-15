const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const fileName = parsedUrl.query.name || 'myfile.txt';
    const filePath = path.join(__dirname, fileName);

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (pathname === '/create') {
      fs.writeFile(filePath, 'Hello from Node.js \n', (err) => {
        if (err) throw err;
        res.end('File created');
      });
    }

    else if (pathname === '/read') {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    }

    else if (pathname === '/delete') {
      fs.unlink(filePath, (err) => {
        if (err) throw err;
        res.end('File deleted');
      });
    }

    else {
      res.end('Use /create /read /delete');
    }

  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error: ' + error.message);
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
