const express             = require('express');
const router              = express.Router();
const transactionHandler  = require('../controller/transactionController');
const verifyToken         = require('../middleware/verifyToken');

router.post('/',verifyToken, transactionHandler.create);

module.exports = router;