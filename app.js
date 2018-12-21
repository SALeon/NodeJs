import path from 'path';
import { app } from './config';
import User from './models/User';
import Product from './models/Product';
import Dirwatcher, { DIRWATCHER_EVENTS, ACTIONS } from './src/dirwatcher';
import Importer, { IMPORTER_EVENTS } from './src/importer';

console.log(app);

const user = new User();
const product = new Product();

const watchedDirPath = path.resolve(__dirname, 'data');
const file1Path = path.join(watchedDirPath, '1.csv');
const dirwatcher = new Dirwatcher();
const importer = new Importer();

dirwatcher.watch(watchedDirPath, 5000);
dirwatcher.on(DIRWATCHER_EVENTS.CHANGED, data => {
    const exceptDeleteChanges = data.filter(change =>
        change.action !== ACTIONS.DELETED);
    importer.listenChanges(exceptDeleteChanges);
});

importer.import(file1Path).then(data => 
    console.log(data, ' ====> imports async first time'));
console.log(importer.importSync(file1Path), ' ====> imports sync first time');   
