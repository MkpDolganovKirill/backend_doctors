const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const salt = bcrypt.genSaltSync(15);

module.exports.hash = (password) => {
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};