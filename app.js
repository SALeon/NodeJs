import path from 'path';
import { app } from './config';
import User from './models/User';
import Product from './models/Product';
import Dirwatcher, { DIRWATCHER_EVENTS, ACTIONS } from './src/dirwatcher';
import Importer, { IMPORTER_EVENTS } from './src/importer';

console.log(app);

const user = new User();
const product = new Product();

const watchedDir = path.resolve(__dirname, 'data');
const importPath = path.resolve(__dirname, 'new');
const dirwatcher = new Dirwatcher();
const importer = new Importer();
importer.setPath(importPath);

dirwatcher.watch(watchedDir, 5000);
dirwatcher.on(DIRWATCHER_EVENTS.CHANGED, data => {
    const exceptDeleteChanges = data.filter(change =>
        change.action !== ACTIONS.DELETED);
    importer.emit(IMPORTER_EVENTS.CHANGED_DIRWATCHER, exceptDeleteChanges);
});
