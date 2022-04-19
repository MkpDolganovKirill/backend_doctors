const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const userRoutes = require("./src/modules/routes/user.routes");
const ordersRoutes = require("./src/modules/routes/orders.routes");

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/", ordersRoutes);

app.listen(port, () => {
  console.log(`Doctor's server app listening on port ${ port }`);
});
