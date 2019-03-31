import User from '../models/user'
class UserController {
    getUsers() {
        return User.find();
    }

    deleteById(id) {
        return User.findOneAndDelete({ id });
    }
}

const userController = new UserController();
export default userController;
