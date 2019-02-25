const http = require('http');

const PORT = 8080;
http.createServer((req, res) => {

    req.on('error', err => {
        console.error(err);
        res.statusCode = 400;
        res.statusMessage = 'Bad Request';
        res.end();
    });

    res.on('error', err => {
        console.error(err);
    });

    req.pipe(res);

}).listen(PORT);

console.log(`server run on port:${PORT}\r\n`);
