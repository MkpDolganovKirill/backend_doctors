const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const salt = bcrypt.genSaltSync(15);

module.exports.generateAccessToken = (user) => {
  return jwt.sign(user, process.env.TOKEN);
};

module.exports.hash = (password) => {
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};