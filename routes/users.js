import express from 'express';
import UserController, { EVENTS } from '../controllers/userController';

const routes = express.Router();
export const mainRout = '/users';

routes.get(`${mainRout}`, (req, res, next) => {
    const userController = new UserController();
    userController.getUsers();
    userController.on(EVENTS.getUsers, (products) => {
        res.json(products);
    });

    userController.on(EVENTS.getUsersError, err => {
        console.error('GET users: ', err);
        res.sendStatus(500);
    });
});

export default routes;
