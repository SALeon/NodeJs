import express from 'express';
import parsedCookies from './parsed';
import products from './products';
import users from './users';
import auth from './authentication';
import login from './login';

const unableRoutes = express.Router()
    .get('*', (req, res) => {
        res.sendStatus(404);
    })


const routes = [
    parsedCookies,
    products,
    users,
    auth,
    login,
    unableRoutes
];

export default routes;
