const express = require('express');
const middleware = require('./middleware.js');
const users = require('./users.js');
const payments = require('./payments.js');

//configure express to listen on port
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.listen(PORT, () => {
    console.log("Server Listening on port:", port);
  });
