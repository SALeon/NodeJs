export default {
    mongoUser: process.env.MONGO_USER || 'mongoadmin',
    mongoHost: process.env.MONGO_HOST || 'localhost',
    mongoDatabase: process.env.MONGO_DB || 'mongo_0',
    mongoPassword: process.env.MONGO_PASSWORD || 'password',
    mongoPort: process.env.MONGO_PORT || 27017,
};
