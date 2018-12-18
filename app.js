import { app } from './config';
import User from './models/User';
import Product from './models/Product';
import dirwatcher from './dirwatcher';

console.log(app);

const user = new User();
const product = new Product();
dirwatcher.watch('data');
