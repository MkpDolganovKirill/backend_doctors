const db = require('../../db/database');
const dotenv = require('dotenv');
dotenv.config();

module.exports.getAllUserOrders = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(422).send('Error! Params not found!');
    const result = await db.query(`SELECT * FROM orders WHERE usersid = ${user.id}`);
    return res.send(result.rows);
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};

module.exports.addNewOrder = async (req, res) => {
  try {
    const user = req.user;
    const { fullname, ordersdate, complaints, doctorid } = req.body;
    if (!(user && fullname && ordersdate && complaints && doctorid)) 
      return res.status(422).send('Error! Params not found!');
    const result = await db.query(`INSERT INTO orders 
    (
      fullname, 
      ordersdate, 
      complaints, 
      usersid, 
      doctorid
      ) values (
        '${fullname}', 
        '${ordersdate}', 
        '${complaints}', 
        ${user.id}, 
        ${doctorid}
      ) RETURNING *`);
      return res.send(result.rows[0]);
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};