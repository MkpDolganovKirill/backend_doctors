const db = require('../../db/database');
const bcrypt = require('bcryptjs');
const { generateAccessToken, hash } = require('../services/service');

module.exports.createNewUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) return res.status(422).send('Error! Params not found!');
    const user = await db.query(`INSERT INTO users (login, password) values ($1, $2) RETURNING *`, [login, hash(password)]);
    const token = generateAccessToken({ id: user.id });
    res.send({ token: token });
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};

module.exports.authorizationUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) return res.status(422).send('Error! Params not found!');
    const result = await db.query(`SELECT * FROM users WHERE login='${login}'`);
    const user = result.rows[0];
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateAccessToken({ id: user.id });
      res.send({ token: token });
    } else {
      res.status(404).send('Invalid username or password!');
    };
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};