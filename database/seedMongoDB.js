import mongoose from 'mongoose';
import mongoDB from './mongoDB';
import City from '../models/city';
import User from '../models/user';
import Product from '../models/product';
import cities from '../database/mockData/cities.json';
import users from '../database/mockData/users.json';
import products from '../database/mockData/products.json';

const addCities = async () => {
    try {
        await City.deleteMany({}, () => {
            cities.forEach(city => {
                new City({...city}).save();
            });
        });
    } catch (err) {
        console.log('error while seeding cities with mongoDB');
    }
};

const addUsers = async () => {
    try {
        await User.deleteMany({}, () => {
            users.forEach(user => {
                new User({ ...user }).save();
            });
        });
    } catch (err) {
        console.log('error while seeding users with mongoDB');
    }
};

const addProducts = async () => {
    try {
        await Product.deleteMany({}, () => {
            products.forEach(product => {
                new Product({ ...product }).save();
            });
        });
    } catch (err) {
        console.log('error while seeding products with mongoDB');
    }
};

const seedMongoDB = async() => {
    await addCities();
    await addUsers();
    await addProducts();
    await mongoose.connection.close();
};

try {
    seedMongoDB();
} catch (err) {
    console.log('error while closing connection with mongoDB');
}
