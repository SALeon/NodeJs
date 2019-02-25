import express from 'express';
import productController, { EVENTS } from '../controllers/productController';


const routes = express.Router();
const mainRout = '/products';

routes.get(`${mainRout}`, (req, res, next) => {
    productController.getProducts();
    productController.on(EVENTS.getProducts, (products) => {
        res.json(products);
    });

    productController.on('error', err => {
        console.error('GET products: ', err);
        res.sendStatus(500);
    });
});

routes.get(`${mainRout}/:id`, (req, res, next) => {
    productController.getProductId(req.params.id);
    productController.on(EVENTS.getProductId, (products) => {
        res.json(products);
    });

    productController.on('error', err => {
        console.error('GET product id: ', err);
        res.sendStatus(500);
    });
});

routes.get(`${mainRout}/:id/reviews`, (req, res, next) => {
    productController.getReviews(req.params.id);
    productController.on(EVENTS.reviews, (products) => {
        res.json(products);
    });

    productController.on('error', err => {
        console.error('GET product id: ', err);
        res.sendStatus(500);
    });
});

routes.post(`${mainRout}/`, (req, res, next) => {
    productController.setProduct(req.parsedQuery);
    productController.on(EVENTS.setProduct, products => {
        res.json(products);
    });

    productController.on('error', err => {
        console.error('POST product: ', err);
        res.sendStatus(500);
    });

});

export default routes;
