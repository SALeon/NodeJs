import express from 'express';
import ProductController, { EVENTS } from '../controllers/productController';

const routes = express.Router();
export const mainRout = '/products';

routes.get(`${mainRout}`, (req, res, next) => {
    const productController = new ProductController();
    productController.getProducts();
    productController.on(EVENTS.getProducts, (products) => {
        res.json(products);
    });

    productController.on('error', err => {
        console.error('GET products: ', err);
        res.sendStatus(500);
    });
});

    const productController = new ProductController();
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
    const productController = new ProductController();
    productController.getReviews(req.params.id);
    productController.on(EVENTS.reviews, (products) => {
        res.json(products);
    });

    productController.on('error', err => {
        console.error('GET product id reviews: ', err);
        res.sendStatus(500);
    });
});

routes.post(`${mainRout}/`, (req, res, next) => {
    const productController = new ProductController();
    productController.setProduct(req.body);
    productController.on(EVENTS.setProduct, products => {
        res.json(products);
    });

    productController.on('error', err => {
        console.error('POST product: ', err);
        res.sendStatus(500);
    });

});

export default routes;
