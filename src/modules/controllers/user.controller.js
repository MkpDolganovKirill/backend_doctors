const db = require('../../db/database');

module.exports.createNewUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) return res.status(422).send('Error! Params not found!');
    const newUser = await db.query(`INSERT INTO users (login, password) values ($1, $2) RETURNING *`, [login, password]);
    res.send(newUser.rows[0]);
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  }
}