import express from 'express';
import CitiesController from '../controllers/citiesController';

const routes = express.Router();
const mainRout = '/cities';
const citiesController = new CitiesController();

routes.get(`${mainRout}`, async (req, res, next) => {
    try {
        const cities = await citiesController.getRandomCity();
        res.json(cities);
    } catch (err) {
        res.sendStatus(500);
    }
});

routes.get(`${mainRout}/:id`, async (req, res, next) => {
    try {
        const city = await citiesController.getCityById(req.params.id);
        city ? res.json(city) : res.status(404).send('city not found');
    } catch (err) {
        res.sendStatus(500);
    }
});

routes.post(`${mainRout}`, async (req, res, next) => {
    try {
        const city = await citiesController.setCity(req.parsedQuery);
        city ? res.json(city) : res.status(400).send('city not added');
    } catch (err) {
        res.sendStatus(500);
    }
});

routes.delete(`${mainRout}/:id`, async (req, res, next) => {
    try {
        const city = await citiesController.deleteCityById(req.params.id);
        city ? res.json(city) : res.status(404).send('city not found');
    } catch (err) {
        res.sendStatus(500);
    }
});

routes.put(`${mainRout}/:id`, async (req, res, next) => {
    try {
        const city = await citiesController.updateCityById(req.params.id, req.parsedQuery);
        city ? res.json(city) : res.status(400).send('city not update');
    } catch (err) {
        res.sendStatus(500);
    }
});

export default routes;
