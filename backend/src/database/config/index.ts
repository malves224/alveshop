import { Sequelize } from 'sequelize';

const databaseConfig = require('./database');

export default new Sequelize(databaseConfig);