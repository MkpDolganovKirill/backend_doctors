const db = require('./database');
const { hash } = require('../modules/services/service');

module.exports.createUser = async (login, password) => {
  const user = await db.query(`INSERT INTO users (login, password) values ('${login}', '${hash(password)}') RETURNING *`);
  return user.rows[0];
};

module.exports.authUser = async (login) => {
  const user = await db.query(`SELECT * FROM users WHERE login='${login}'`);
  return user.rows[0];
};

module.exports.getAllDoctorsRequest = async () => {
  const doctors = await db.query(`SELECT * FROM doctors`);
  return doctors.rows;
};

module.exports.getAllUsersRequest = async (user, sortMethod, sortType, dateWith, dateFor) => {
  const orders = await db.query(`
    select orders.*, doctors.fullname 
    from orders, doctors 
    where usersid = ${user.id} and doctorid = doctors.id and ordersdate between '${dateWith}' and '${dateFor}'
    order by ${sortMethod} ${sortType}, ordersdate ASC`
  );
  return orders;
};

module.exports.addNewOrderRequest = async (patient, ordersdate, complaints, user, doctorid) => {
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
  return result.rows[0];
};

module.exports.updateUserOrderRequest = async (patient, ordersdate, complaints, doctorid, id) => {
  const result = await db.query(`UPDATE orders SET 
      patient = '${patient}', 
      ordersdate = '${ordersdate}', 
      complaints = '${complaints}', 
      doctorid = ${doctorid} 
      WHERE id = ${id} RETURNING *`
  );
  return result.rows[0];
};

module.exports.deleteUsersOrderRequest = async (id) => {
  return await db.query(`DELETE FROM orders WHERE id = ${id}; `);
}