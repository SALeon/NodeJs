import path from 'path';
import { app } from './config';
import User from './models/User';
import Product from './models/Product';
import Dirwatcher from './Dirwatcher';
import Importer from './Importer';
import dirController, { EVENTS } from './dirController';

console.log(app);

const user = new User();
const product = new Product();

const dirDataName = path.resolve(__dirname, 'data');
const dirwatcher = new Dirwatcher();
dirwatcher.watch(dirDataName, 5000);

const importer = new Importer();
dirController.on(EVENTS.changedDirwatcher, (data) => {
    data.forEach(value => {
        const { path } = value;
        importer.import(path).then(data => console.log(data, 'from app'));
    });
});
