import { EventEmitter } from 'events';
import path from 'path';
import fileHelper from '../helpers/fileHelper';

const PATH_TO_USERS = path.resolve(__dirname, '../models/users.json');
export const EVENTS = {
    getUsers: 'getUsers',
}

class ProductController extends EventEmitter {
    getUsers() {
        fileHelper.readFromFile(PATH_TO_USERS, this, EVENTS.getUsers);
    }
}

const productController = new ProductController();
export default productController;
