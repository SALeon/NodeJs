const http = require('http');

const PORT = 8082;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    res.end('Hello Word');
});

server.listen(PORT);

console.log(`server run on port:${PORT}\r\n`);

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n');
});
