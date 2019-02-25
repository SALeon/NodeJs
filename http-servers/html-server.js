const http = require('http');
const fs = require('fs');
const path = require('path');
const through2 = require('through2');

const indexPath = path.resolve(__filename, '../index.html');
const PORT = 8081;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    const sourceVal = '{message}';
    const replacementVal = 'Any text of header'

    try {
        // Read file sync.
        // const data = fs.readFileSync(indexPath).toString()
        //     .replace(sourceVal, replacementVal);
        // res.end(data);

        // // Read file with stream
        fs.createReadStream(indexPath)
            .pipe(
                through2(function (chunk, enc, callback) {
                    this.push(chunk.toString()
                        .replace(sourceVal, replacementVal));
                    callback();
                })
            ).pipe(res);

    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.statusMessage = 'Internal Server Error';
        res.end();
    }
});

server.listen(PORT);

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n');
});

console.log(`server run on port:${PORT}\r\n`);
