import express from 'express';
import passport from 'passport';
import app from './app';
import middlewares from './middlewares';
import routes from './routes';
import { DEFAULT } from './config/defaultSetting';
import { passportSetup } from './config/passport-setup';
import { initDb } from './models';

const port = process.env.PORT || DEFAULT.port;
app.listen(port, () => console.log(`App listen on port ${port}!`));

passportSetup(passport);

initDb();

app.use(express.json());

middlewares.forEach(middleware => {
    app.use(middleware);
});

routes.forEach(route => {
    app.use(route);
});
