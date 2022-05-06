const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

const Order = sequelize.define('orders', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  patient: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ordersdate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  complaints: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  freezeTableName: true
});

module.exports = Order;