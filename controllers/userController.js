import User from '../models/User';
import sequelize from '../models';
import Error from '../helpers/customError'
class UserController {
    getUsers() {
        return User.findAll();
    }

    async setUser(user) {
        delete user.id;
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await User.create({
                ...user
            }, {
                transaction
            });
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
        }
    }

    extractUser(requiredUser) {
        const { email, password } = requiredUser;
        if (email && password) {
            return User.findOne({
                where: {
                    email,
                    password
                }
            });

        } else if (email) {
            return User.findOne({
                where: { email }
            });
        } else {
            throw new Error(404, 'user not found');
        }
    }
}

export default new UserController();
