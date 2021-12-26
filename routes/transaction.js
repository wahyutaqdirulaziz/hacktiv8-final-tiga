const express             = require('express');
const router              = express.Router();
const transactionHandler  = require('../controller/transactionController');

router.get('/');

module.exports = router;