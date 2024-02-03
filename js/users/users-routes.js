const users = require('./users.js');

//setup router
const express = require('express');
const router = express.Router();

router.post('/register', users.registerUser);
router.get('/get', users.get);

module.exports = router;