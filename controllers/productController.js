import Product from '../models/product';

class ProductController {

    getProducts() {
       return Product.find();
    }

    getProductId(id) {
        return Product.findOne({ id });
    }

    async getReviews(id) {
        const product = await Product.findOne({ id });
        return product.reviews;
    }

    setProduct(productData) {
        return new Product({ ...productData }).save();
    }

    deleteById(id) {
        return Product.findOneAndDelete({ id });
    }
}

const productController = new ProductController();

export default productController;
