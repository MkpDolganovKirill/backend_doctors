const db = require('../../db/database');
const dotenv = require('dotenv');
const {
  getAllUsersRequest,
  getAllDoctorsRequest,
  addNewOrderRequest,
  updateUserOrderRequest,
  deleteUsersOrderRequest
} = require('../../db/requests');
dotenv.config();

module.exports.getAllUserOrders = async (req, res) => {
  try {
    const user = req.user;
    let { sortMethod, sortType, dateWith, dateFor } = req.query;
    if (!dateWith) dateWith = '01/01/0001';
    if (!dateFor) dateFor = '31/12/9999';
    if (!user) return res.status(422).send('Error! Params not found!');
    const orders = await getAllUsersRequest(user, sortMethod, sortType, dateWith, dateFor);
    const doctors = await getAllDoctorsRequest();
    const sortingDoctors = doctors.sort((a, b) => {
      return a.fullname < b.fullname ? -1 : 1;
    })
    return res.send({ orders: orders, doctors: sortingDoctors });
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
    const result = await addNewOrderRequest(patient, ordersdate, complaints, user, doctorid);
    return res.send(result);
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
    const result = await updateUserOrderRequest(patient, ordersdate, complaints, doctorid, id);
    return res.send(result);
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};

module.exports.deleteUsersOrder = async (req, res) => {
  try {
    const user = req.user;
    const id = req.query.id;
    if (!(user && id)) return res.status(422).send('Error! Params not found!');
    const result = await deleteUsersOrderRequest(id);
    return result.rowCount ? res.send('Task deleted!') : res.status(404).send('Task not found');
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};