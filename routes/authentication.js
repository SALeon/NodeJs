import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import session from 'express-session';
import userController from '../controllers/userController';
import { DEFAULT } from '../config/defaultSetting';

const routes = express.Router();
export const mainRout = '/auth';
const key = process.env.SECRET_KEY || DEFAULT.key;
const tokenLive = process.env.TOKEN_LIVE || DEFAULT.tokenLive;

routes.post(`${mainRout}`, (req, res, next) => {
    authenticatedRes(res, req.body, (user, token) => {
        res.send({
            code: 200,
            message: 'OK',
            data: {
                user: {
                    email: user.email,
                    username: user.name,
                },
            },
            token,
        });
    });
});

routes.get(`${mainRout}/facebook`,
    passport.authenticate('facebook', {
        session: false,
        scope: ['email']
    })
);

routes.get(
    `${mainRout}/facebook/callback`,
    passport.authenticate('facebook', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        authenticatedRes(res, res.req.user, (user, token) => {
            res.send({
                code: 200,
                message: "OK",
                data: {
                    user: {
                        email: user.email,
                        username: user.name
                    }
                },
                token,
                facebookToken: user.facebookToken
            });
        });
    }
);

routes.get(`${mainRout}/google`,
    passport.authenticate('google', {
        session: false,
        scope: ['email']
    })
);

routes.get(`${mainRout}/google/callback`,
    passport.authenticate('google', {
        scope: ['profile'],
        failureRedirect: `/`,
        session: false,
    }),
    (req, res) => {

        authenticatedRes(res, res.req.user, (user, token) => {
            res.send({
                code: 200,
                message: 'OK',
                data: {
                    user: {
                        email: user.email,
                        username: user.name,
                    },
                },
                token,
                googleToken: user.googleToken
            })
        });
    }
);

routes.use(`${mainRout}/twitter`, session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

routes.get(`${mainRout}/twitter`,
    passport.authenticate('twitter', {
        session: false,
        scope: ['email']
    })
);

routes.get(`${mainRout}/twitter/callback`,
    passport.authenticate('twitter', {
        scope: ['profile'],
        failureRedirect: `/`,
        session: false,
    }),
    (req, res) => {

        authenticatedRes(res, res.req.user, (user, token) => {
            res.send({
                code: 200,
                message: 'OK',
                data: {
                    user: {
                        email: user.email,
                        username: user.name,
                    },
                },
                token,
                twitterToken: user.twitterToken
            })
        });
    }
);

const authenticatedRes = async (res, body, withTokenRes) => {
    const { email, password } = body;
    try {
        const user = await userController.extractUser({
            email,
            password
        });
        jwt.sign({
            sub: user.id,
            username: user.name
        }, key, {
            expiresIn: tokenLive
        }, (err, token) => {
            if (err) {
                res.status(500).send({
                    code: 500,
                    message: 'Inner Error',
                });
            } else {
                withTokenRes(user, token);
            }
        });
    } catch (err) {
        userNotFoundRes(err, res)
    }
}

const userNotFoundRes = (err, res) => {
    if (err.status && err.status === 404) {
        res.status(404).send({
            code: 404,
            message: 'Not Found',
            data: {
                additionalMessage: 'Invalid user',
            },
        });
    } else {
        res.status(500).send({
            code: 500,
            message: 'Inner Server Error',
            data: {
                additionalMessage: 'Inner Server Error',
            },
        });
    }
};

export default routes;
