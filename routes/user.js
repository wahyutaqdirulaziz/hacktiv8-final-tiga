const express       = require('express');
const router        = express.Router();
const userHandler   = require('../controller/userController');

router.get('/');

module.exports = router;