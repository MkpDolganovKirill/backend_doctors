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

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).send("User don't authenticate");

  jwt.verify(token, process.env.TOKEN, (err, user) => {
    if (err) return res.status(403).send("Uncorrect token!")

    req.user = user;

    next();
  });
};