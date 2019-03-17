import express from 'express';
import userController  from '../controllers/userController';

const routes = express.Router();
export const mainRout = '/users';

routes.get(`${mainRout}`, async (req, res, next) => {
    try {
        const users = await userController.getUsers();
        res.json(users);
    } catch (err) {
               console.error('GET users: ', err);
        res.sendStatus(500);
    }
});

export default routes;
