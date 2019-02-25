const http = require('http');

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: '99.99',
    options: [{
            color: 'blue',
        },
        {
            size: 'XL',
        },
    ],
};

const PORT = '8080';
const server = http.createServer((req, res) => {

    try {
        const data = JSON.stringify(product);
        res.setHeader('Content-Type', 'application/json');
        res.end(data);

    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.statusMessage = 'Internal Server Error';
        res.end();
    }
});

server.listen(PORT);
console.log(`server run on port:${PORT}\r\n`);

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n');
});
