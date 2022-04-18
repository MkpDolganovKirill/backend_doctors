const db = require('../../db/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const salt = bcrypt.genSaltSync(15);

const generateAccessToken = (login) => {
  return jwt.sign(login, process.env.TOKEN);
}

const hash = (password) => {
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
} 

module.exports.createNewUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) return res.status(422).send('Error! Params not found!');
    await db.query(`INSERT INTO users (login, password) values ($1, $2) RETURNING *`, [login, hash(password)]);
    const token = generateAccessToken(login);
    res.send(token);
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  }
}