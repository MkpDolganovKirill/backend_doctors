// const { Pool } = require('pg');
// const pool = new Pool({
//   user: 'postgres',
//   password: 'user123',
//   host: 'localhost',
//   port: 5432,
//   database: 'doctor'
// });

// module.exports = pool; 

const { DataTypes } = require('sequelize');
const sequelize = require('./dbConnect');
const User = require('./modeles/sequelize.models.User');
const Doctor = require('./modeles/sequelize.models.Doctor');
const Order = require('./modeles/sequelize.models.Order');

Doctor.hasMany(Order, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false
  }
});
Order.belongsTo(Doctor);

User.hasMany(Order, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false
  }
});
Order.belongsTo(User);

sequelize.sync({ alter: true }).then(res => {
  console.log('DataBase updated!');
}).catch(err => {
  console.log({ error: err, message: 'DataBase not updated' });
});


module.exports = {
  User,
  Order,
  Doctor
};