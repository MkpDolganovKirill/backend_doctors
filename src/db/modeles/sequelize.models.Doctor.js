const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

const Doctor = sequelize.define('doctors', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  fullname: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  freezeTableName: true
});



module.exports = Doctor;