const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../middleware/generateTokens.middleware');
const { createUser, authUser } = require('../../db/requests');

module.exports.createNewUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) return res.status(422).send('Error! Params not found!');
    const user = await createUser(login, password);
    const token = generateAccessToken({ id: user.id });
    return res.send({ token: token });
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};

module.exports.authorizationUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) return res.status(422).send('Error! Params not found!');
    const user = await authUser(login);
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateAccessToken({ id: user.id });
      return res.send({ token });
    } else {
      return res.status(404).send('Invalid username or password!');
    };
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};