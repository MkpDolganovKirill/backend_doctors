const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  login: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  refreshtoken: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  freezeTableName: true
});

module.exports = User;