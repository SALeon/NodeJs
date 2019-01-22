import path from 'path';
import { app } from './config';
import User from './models/User';
import Product from './models/Product';
import DirWatcher, { DIRWATCHER_EVENTS } from './src/dirwatcher';
import Importer, { IMPORTER_EVENTS } from './src/importer';

console.log(app);

const user = new User();
const product = new Product();

const watchedDirPath = path.resolve(__dirname, 'data');
const file1Path = path.join(watchedDirPath, '1.csv');
const dirWatcher = new DirWatcher();
const importer = new Importer();

dirWatcher.watch(watchedDirPath, 5000);
dirWatcher.on(DIRWATCHER_EVENTS.CHANGED, data => {
    if (!data) {
        const err = new Error('No data!');
        dirWatcher.emit(DIRWATCHER_EVENTS.ERROR, err);
    } else {
        importer.emit(IMPORTER_EVENTS.CHANGED_DIRWATCHER, data);
    }
});
