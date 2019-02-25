import express from 'express';

const routes = express.Router();

routes.get('/parsedCookies', (req, res, next) => {
    try {
        res.json(req.parsedCookies);
    } catch (err) {
        next(err);
    }
});

routes.get('/parsedQuery', (req, res, next) => {
    try {
        res.json(req.parsedQuery);
    } catch (err) {
        next(err);
    }
});

export default routes;
