const db = require('../../db/database');
const dotenv = require('dotenv');
dotenv.config();

module.exports.getAllUserOrders = async (req, res) => {
  try {
    const user = req.user;
    let { sortMethod, sortType, dateWith, dateFor } = req.query;
    if (!dateWith) dateWith = '01/01/0001';
    if (!dateFor) dateFor = '31/12/9999';
    if (!user) return res.status(422).send('Error! Params not found!');
    const ordersTest = await db.query(`
    select orders.*, doctors.fullname 
    from orders, doctors 
    where usersid = ${user.id} and doctorid = doctors.id and ordersdate between '${dateWith}' and '${dateFor}'
    order by ${sortMethod} ${sortType}, ordersdate ASC`
    )
    const doctors = await db.query(`SELECT * FROM doctors`);
    const sortingDoctors = doctors.rows.sort((a, b) => {
      return a.fullname < b.fullname ? -1 : 1;
    })
    return res.send({ orders: ordersTest, doctors: sortingDoctors });
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};

module.exports.addNewOrder = async (req, res) => {
  try {
    const user = req.user;
    const { patient, ordersdate, complaints, doctorid } = req.body;
    if (!(user && patient && ordersdate && complaints && doctorid))
      return res.status(422).send('Error! Params not found!');
    const result = await db.query(`INSERT INTO orders 
    (
      patient, 
      ordersdate, 
      complaints, 
      usersid, 
      doctorid
      ) values (
        '${patient}', 
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

module.exports.updateUserOrder = async (req, res) => {
  try {
    const user = req.user;
    const { id, patient, ordersdate, complaints, doctorid } = req.body;
    if (!(user && id && patient && ordersdate && complaints && doctorid))
      return res.status(422).send('Error! Params not found!');
    const result = await db.query(`UPDATE orders SET 
      patient = '${patient}', 
      ordersdate = '${ordersdate}', 
      complaints = '${complaints}', 
      doctorid = ${doctorid} 
      WHERE id = ${id} RETURNING *`
    );
    return res.send(result.rows[0]);
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};

module.exports.deleteUsersOrder = async (req, res) => {
  try {
    const user = req.user;
    const id = req.query.id;
    if (!(user && id)) return res.status(422).send('Error! Params not found!');
    const result = await db.query(`DELETE FROM orders WHERE id = ${id}; `);
    return result.rowCount ? res.send('Task deleted!') : res.status(404).send('Task not found');
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};