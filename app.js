import path from 'path';
import {
    app
} from './config';
import User from './models/User';
import Product from './models/Product';
import Dirwatcher from './Dirwatcher';
import Importer from './Importer';

console.log(app);

const user = new User();
const product = new Product();
const dirwatcher = new Dirwatcher();
const dirDataName = path.resolve(__dirname, 'data');
dirwatcher.watch(dirDataName, 100000);
const importer = new Importer();
importer.import(dirDataName)
    .then(data => console.log(data, 'from app'));
