import Product from '../models/Product';
import sequelize from '../models';

class ProductController {

    getProducts() {
        return Product.findAll();
    }

   getProduct(id) {
        return Product.findByPk(id);
    }

    getReviews(id) {
       return Product.findOne({
            where: { id },
            attributes: ['reviews']
        });
    }

    async setProduct(productData) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await Product.create({...productData}, {
                transaction
            });
            await transaction.commit();
            return transaction.afterCommit = await Product.findByPk(productData.id);
        } catch (err) {
            await transaction.rollback();
        }
    }
}

export default new ProductController();
