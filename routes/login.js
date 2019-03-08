import express from 'express';
import passport from 'passport';
import { mainRout as authRout } from './authentication';

const routes = express.Router();
export const mainRout = '/login';

routes.post(`${mainRout}`,
    passport.authenticate('local', {
        failureRedirect: `${mainRout}`,
        session: false
    }),
    function (req, res, next)  {
        res.redirect(307, `${authRout}`);
});

export default routes;
