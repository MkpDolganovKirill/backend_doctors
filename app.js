const express = require('express');
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Doctor's server app listening on port ${ port }`);
});
