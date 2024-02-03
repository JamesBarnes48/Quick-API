const payments = require('./payments.js');

//setup router
const express = require('express');
const router = express.Router();

router.post('/post', payments.post);

module.exports = router;