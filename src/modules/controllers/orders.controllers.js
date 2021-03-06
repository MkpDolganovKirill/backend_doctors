const dotenv = require('dotenv');
const {
  getAllUserOrdersRequest,
  getAllDoctorsRequest,
  createNewDoctorRequest,
  addNewOrderRequest,
  updateUserOrderRequest,
  deleteUsersOrderRequest
} = require('../../db/requests');
dotenv.config();

module.exports.createNewDoctor = async (req, res) => {
  try {
    const { fullname } = req.body;
    if (!fullname) return res.status(422).send('Error! Params not found!');
    const doctor = await createNewDoctorRequest(fullname);
    return res.status(200).send({ doctor });
  } catch (e) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  }
}

module.exports.getAllUserOrders = async (req, res) => {
  try {
    const user = req.user;
    let { sortMethod, sortType, dateWith, dateFor } = req.query;
    if (!dateWith) dateWith = '0001-01-01';
    if (!dateFor) dateFor = '9999-12-31';
    if (!user) return res.status(422).send('Error! Params not found!');
    const orders = await getAllUserOrdersRequest(user, sortMethod, sortType, dateWith, dateFor);
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
    const { patient, ordersdate, complaints, doctorId } = req.body;
    if (!(user && patient && ordersdate && complaints && doctorId))
      return res.status(422).send('Error! Params not found!');
    const result = await addNewOrderRequest(patient, ordersdate, complaints, user, doctorId);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};

module.exports.updateUserOrder = async (req, res) => {
  try {
    const user = req.user;
    const { id, patient, ordersdate, complaints, doctorId } = req.body;
    if (!(user && id && patient && ordersdate && complaints && doctorId))
      return res.status(422).send('Error! Params not found!');
    const result = await updateUserOrderRequest(patient, ordersdate, complaints, doctorId, id);
    return result ? res.status(200).send('Order update!') : res.status(404).send('Order not found!');
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
    return result ? res.status(200).send('Order deleted!') : res.status(404).send('Order not found');
  } catch (error) {
    return res.status(422).send({ error, message: 'Error! Params not correct!' });
  };
};