const users = require('./users.js');

//setup router
const express = require('express');
const router = express.Router();

router.get('/', users.getUsersWithRegisteredCard);

module.exports = router;