import express from 'express';
import productController from '../controllers/productController';

const routes = express.Router();
export const mainRout = '/products';

routes.get(`${mainRout}`, async (req, res, next) => {
    try {
        const products = await productController.getProducts();
        res.json(products);
    } catch (err) {
        console.error('GET products: ', err);
        res.sendStatus(500);
    }
});

routes.get(`${mainRout}/:id`, async (req, res, next) => {
    try {
        const product = await productController.getProduct(req.params.id);
        res.json(product);
    } catch (err) {
          console.error('GET product id: ', err);
        res.sendStatus(500);
    }
});

routes.get(`${mainRout}/:id/reviews`, async (req, res, next) => {
    try {
        const product = await productController.getReviews(req.params.id);
        res.json(product);
    } catch (err) {
        console.error('GET product id reviews: ', err);
        res.sendStatus(500);
    }
});

routes.post(`${mainRout}/`, async (req, res, next) => {
    try {
    const product = await productController.setProduct(req.body);
        res.json(product);
    } catch (err) {
       console.error('POST product: ', err);
       res.sendStatus(500);
    }
});

export default routes;
