const sequelize = require('./src/db/dbConnect');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const userRoutes = require("./src/modules/routes/user.routes");
const ordersRoutes = require("./src/modules/routes/orders.routes");

app.use(express.json());
app.use(cors());

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

checkConnection();

app.use("/", userRoutes);
app.use("/", ordersRoutes);

app.listen(port, () => {
  console.log(`Doctor's server app listening on port ${port}`);
});
