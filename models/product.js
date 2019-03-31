import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    detail: String,
    price: Number,
    offer: String,
    image: String,
    reviews: [String]
});

const Product = mongoose.model('Product', productSchema);

export default Product;
