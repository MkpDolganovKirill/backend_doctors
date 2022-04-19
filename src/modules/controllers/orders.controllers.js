const db = require('../../db/database');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports.getAllUserOrders = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(422).send('Error! Params not found!');
    const result = await db.query(`SELECT * FROM orders WHERE usersid = ${user.id}`);
    res.send(result.rows);
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};