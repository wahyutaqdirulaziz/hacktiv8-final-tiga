const express       = require('express');
const router        = express.Router();
const userHandler   = require('../controller/userController');

router.post('/', userHandler.register);

module.exports = router;