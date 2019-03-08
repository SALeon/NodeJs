import { EventEmitter } from 'events';
import path from 'path';
import fileHelper from '../helpers/fileHelper';

const PATH_TO_USERS = path.resolve(__dirname, '../models/users.json');
export const EVENTS = {
    getUsers: 'getUsers',
    setUser: 'setUser',
    extractUser: 'extractUser',
    userRead: 'userRead',
    userWrite: 'userWrite',
}

class UserController extends EventEmitter {
    getUsers() {
        fileHelper.readFromFile(PATH_TO_USERS, this, EVENTS.getUsers);
    }

    setUser(user) {
        fileHelper.writeToFile(PATH_TO_USERS, user, this, EVENTS.userWrite)
        this.on(EVENTS.userWrite, user => {
            this.emit(EVENTS.setUser, user);
        });
    }

    extractUser(requiredUser) {
        if (requiredUser.email && requiredUser.password || requiredUser.id) {
            this.on(EVENTS.userRead, (users) => {
                const matchedUser = users.find(user =>
                    user.email === requiredUser.email && user.password === requiredUser.password
                    || user.id === requiredUser.id
                );

                matchedUser ? this.emit(EVENTS.extractUser, matchedUser) :
                    this.userNotFoundError();
            });
            fileHelper.readFromFile(PATH_TO_USERS, this, EVENTS.userRead);
        } else {
            this.userNotFoundError();
        }
    }

    userNotFoundError() {
        const err = {};
        err.status = 404;
        this.emit('error', err);
    }
}

export default UserController;
