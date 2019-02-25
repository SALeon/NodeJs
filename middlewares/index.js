import passport from 'passport';
import cookieParser from './cookieParser';
import tokenVerificator from './tokenVerificator';

const middlewares = [
    cookieParser,
    tokenVerificator,
    passport.initialize()
];

export default middlewares;
