const express = require('express');
const usersRoutes = require('./users/users-routes.js');
const paymentsRoutes = require('./payments/payments-routes.js');

//configure express and listen on port
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/users', usersRoutes);
app.use('/payments', paymentsRoutes);
app.listen(PORT, () => {
    console.log("Server Listening on port:", port);
  });