import Sequelize from 'sequelize';
import DB_SETTINGS from '../config/dbSetting';

const sequelize = new Sequelize(DB_SETTINGS.pgDatabase, DB_SETTINGS.pgUser, DB_SETTINGS.pgPassword, {
    host: DB_SETTINGS.pgHost,
    port: DB_SETTINGS.pgPort,
    dialect: 'postgres',
    operatorsAliases: false,
});

export const initDb= () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
};

export default sequelize;
