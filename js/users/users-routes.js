const users = require('./users.js');

//setup router
const express = require('express');
const router = express.Router();

router.post('/', users.registerUser);
router.get('/', users.get);

module.exports = router;