const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Doctor's server app listening on port ${ port }`);
});
