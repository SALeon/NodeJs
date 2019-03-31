import app from './app';
import middlewares from './middlewares';
import routes from './routes';
import mongoDb from './database/mongoDb';

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`App listen on port ${port}!`));

middlewares.forEach(middleware => {
    app.use(middleware);
});


routes.forEach(route => {
    app.use(route);
});
