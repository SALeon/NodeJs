import express from 'express';
import productController from '../controllers/productController';


const routes = express.Router();
const mainRout = '/products';

routes.get(`${mainRout}`, async (req, res, next) => {
    try {
        const products = await productController.getProducts();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

routes.get(`${mainRout}/:id`, async (req, res, next) => {
    try {
        const product = await productController.getProductId(req.params.id);
        product ? res.json(product) : res.status(404).send('product not found');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

routes.get(`${mainRout}/:id/reviews`, async (req, res, next) => {
    try {
        const reviews = await productController.getReviews(req.params.id);
        reviews && reviews.length ? res.json(reviews) : res.status(404).send('product not found');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

routes.post(`${mainRout}/`, async (req, res, next) => {
    try {
        const product = await productController.setProduct(req.parsedQuery);
        product ? res.json(product) : res.status(400).send('product not added');
        res.json(product);
    } catch (err) {
        res.sendStatus(500);
    }
});


routes.delete(`${mainRout}/:id`, async (req, res, next) => {
    try {
        const product = await productController.deleteById(req.params.id);
        product ? res.json(product) : res.status(404).send('product not found');
    } catch (err) {
        res.sendStatus(500);
    }
});

export default routes;
