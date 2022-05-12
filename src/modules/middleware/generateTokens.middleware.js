const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports.generateAccessToken = (user) => {
  return jwt.sign(user, process.env.TOKEN, { expiresIn: '15m' });
};

module.exports.generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.TOKEN, { expiresIn: '10d' });
}