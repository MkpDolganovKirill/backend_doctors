const { hash } = require('../modules/services/service');
const { User, Doctor, Order } = require('./database');
const { Op } = require('sequelize');

/* Users requests */
module.exports.createUser = async (login, password) => {
  const result = await User.create({ login, password: hash(password) });
  return result;
};

module.exports.authUser = async (login) => {
  const result = await User.findOne({ where: { login } });
  return result;
};

module.exports.getUserById = async (id) => {
  const result = await User.findOne({ where: { id } });
  return result;
}

/* Work with tokens requests */
module.exports.updateUsersRefreshToken = async (id, refreshtoken) => {
  const result = await User.update({ refreshtoken }, {
    where: { id }
  });
  return result;
};

module.exports.deleteUsersRefreshToken = async (id) => {
  const result = await User.update({ refreshtoken: null }, {
    where: { id }
  });
  return result;
}

/* Doctors requests */
module.exports.getAllDoctorsRequest = async () => {
  const result = await Doctor.findAll();
  return result;
};

module.exports.createNewDoctorRequest = async (fullname) => {
  const result = await Doctor.create({ fullname });
  return result;
}

/* Orders requests */
module.exports.getAllUserOrdersRequest = async (user, sortMethod, sortType, dateWith, dateFor) => {
  let arr = []
  sortMethod === 'doctor' ? arr = [sortMethod, `fullname`, sortType] : arr = [sortMethod, sortType];
  const result = await Order.findAll({
    where: {
      userId: user.id,
      ordersdate: {
        [Op.between]: [dateWith, dateFor]
      }
    },
    order: [
      arr, [`ordersdate`, `asc`]
    ],
    include: {
      model: Doctor,
      attributes: ['fullname']
    }
  });
  return result;
};

module.exports.addNewOrderRequest = async (patient, ordersdate, complaints, user, doctorId) => {
  const result = Order.create({ patient, ordersdate, complaints, userId: user.id, doctorId });
  return result;
};

module.exports.updateUserOrderRequest = async (patient, ordersdate, complaints, doctorId, id) => {
  const result = await Order.update({ patient, ordersdate, complaints, doctorId }, {
    where: { id }
  });
  return result;
};

module.exports.deleteUsersOrderRequest = async (id) => {
  const result = await Order.destroy({ where: { id } });
  return result;
};