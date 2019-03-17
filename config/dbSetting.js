export default {
    pgUser: process.env.POSTGRES_USER || 'user',
    pgHost: process.env.POSTGRES_HOST || 'localhost',
    pgDatabase: process.env.POSTGRES_DB || 'postgres-0',
    pgPassword: process.env.POSTGRES_PASSWORD || 'password',
    pgPort: process.env.POSTGRES_PORT || 5430,
};
