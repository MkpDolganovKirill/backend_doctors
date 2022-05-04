const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports.authenticateToken = (req, res, next) => {
  const token = req.headers.accesstoken;
  if (token == null) return res.status(401).send("User don't authenticate");

  jwt.verify(token, process.env.TOKEN, (err, user) => {
    if (err) return res.status(403).send("Uncorrect token!")

    req.user = user;

    next();
  });
};