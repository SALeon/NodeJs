import express from 'express';
import userController, { EVENTS } from '../controllers/userController';

const routes = express.Router();
const mainRout = '/users';

routes.get(`${mainRout}`, (req, res, next) => {
    userController.getUsers();
    userController.on(EVENTS.getUsers, (products) => {
        res.json(products);
    });

    userController.on('error', err => {
        console.error('GET users: ', err);
        res.sendStatus(500);
    });
});

export default routes;
