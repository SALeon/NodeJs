import app from '../app';

const cookieParser = (req, res, next) => {
    try {
        const cookies = req.headers.cookie ? req.headers.cookie.split(';') : [];
        req.parsedCookies = cookies.reduce((cookiesObj, cookie) => {
            cookie = cookie.trim();
            const [key, value] = cookie.split('=');
            cookiesObj[key] = value;
            return cookiesObj;
        }, {});

        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export default cookieParser;
