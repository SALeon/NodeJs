import cookieParser from './cookieParser';
import requestParser from './requestParser';

const middlewares = [
    cookieParser,
    requestParser
];

export default middlewares;
