import path from 'path';
import { app } from './config';
import User from './models/User';
import Product from './models/Product';
import Dirwatcher from './src/dirwatcher';
import Importer from './src/importer';
import dirController, { EVENTS } from './src/dirController';

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
        importer.import(path)
            .then(data => console.log(data, 'assync readed'));
        const files = importer.importSync(path);
        console.log(files, 'sync readed');
    });
});
