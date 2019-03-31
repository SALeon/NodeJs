import express from 'express';
import userController from '../controllers/userController';

const routes = express.Router();
const mainRout = '/users';

routes.get(`${mainRout}`, async (req, res, next) => {
    try {
        const users = await userController.getUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

routes.delete(`${mainRout}/:id`, async (req, res, next) => {
    try {
        const user = await userController.deleteById(req.params.id);
        user ? res.json(user) : res.status(404).send('user not found');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default routes;
