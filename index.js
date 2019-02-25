import app from './app';
import middlewares from './middlewares';
import routes from './routes';

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`App listen on port ${port}!`));

middlewares.forEach(middleware => {
    app.use(middleware);
});


routes.forEach(route => {
    app.use(route);
});
