const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { generateAccessToken, generateRefreshToken } = require('../middleware/generateTokens.middleware');
const { createUser, authUser, updateUsersRefreshToken, deleteUsersRefreshToken } = require('../../db/requests');

module.exports.createNewUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) return res.status(422).send('Error! Params not found!');
    const user = await createUser(login, password);
    const accesstoken = generateAccessToken({ id: user.id });
    const refreshtoken = generateRefreshToken({ id: user.id });
    updateUsersRefreshToken(user.id, refreshtoken);
    return res.status(200).send({ accesstoken, refreshtoken });
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};

module.exports.authorizationUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) return res.status(422).send('Error! Params not found!');
    const user = await authUser(login);
    if (bcrypt.compare(password, user.password)) {
      const accesstoken = generateAccessToken({ id: user.id });
      const refreshtoken = generateRefreshToken({ id: user.id });
      updateUsersRefreshToken(user.id, refreshtoken);
      return res.status(200).send({ accesstoken, refreshtoken });
    } else {
      return res.status(404).send('Invalid username or password!');
    };
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};

module.exports.deleteRefreshToken = (req, res) => {
  try {
    const token = req.headers.refreshtoken;
    const data = jwt.decode(token);
    console.log(data);
    deleteUsersRefreshToken(data.id);
    return res.status(200).send('Token deleted');
  } catch (err) {
    return res.status(422).send({ err, message: 'Token can not delete' });
  };
};