import { EventEmitter } from 'events';
import path from 'path';
import fileHelper from '../helpers/fileHelper';

const PATH_TO_PRODUCTS = path.resolve(__dirname, '../models/products.json');
export const EVENTS = {
    getProducts: 'getProducts',
    setProduct: 'setProduct',
    getProductId: 'getProductId',
    reviews: 'reviews',
    productRead: 'productRead',
    productWrite: 'productWrite',
}

class ProductController extends EventEmitter {

    getProducts() {
        fileHelper.readFromFile(PATH_TO_PRODUCTS, this, EVENTS.getProducts);
    }

    getProductId(id) {
        fileHelper.readFromFile(PATH_TO_PRODUCTS, this, EVENTS.productRead);
        this.on(EVENTS.productRead, (products) => {
            products.some(product => {
                if (product.id === id) {
                    this.emit(EVENTS.getProductId, product);
                    return true;
                }
                return false;
            });
        });
    }

    getReviews(id) {
        fileHelper.readFromFile(PATH_TO_PRODUCTS, this, EVENTS.productRead);
        this.on(EVENTS.productRead, (products) => {
            products.some(product => {
                if (product.id === id) {
                    this.emit(EVENTS.reviews, product.reviews);
                    return true;
                }
                return false;
            });
        });
    }

    setProduct(productData) {
        fileHelper.writeToFile(PATH_TO_PRODUCTS, productData, this, EVENTS.productWrite);
        this.on(EVENTS.productWrite, (product) => {
            this.emit(EVENTS.setProduct, product);
        });
    }
}

export default ProductController;
