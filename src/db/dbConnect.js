const dotenv = require('dotenv');
dotenv.config();
const { Sequelize, } = require('sequelize');
const sequelize = new Sequelize(process.env.CONNECTION_LINK);

module.exports = sequelize;