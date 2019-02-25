import app from '../app';

const requestParser = (req, res, next) => {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', () => {
        try {
            req.parsedQuery = data.length ? JSON.parse(data) : {};
            next();
        } catch (err) {
            console.error(err);
            next(err);
        }
    });
};

export default requestParser;
