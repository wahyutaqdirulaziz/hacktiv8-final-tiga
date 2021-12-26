const express         = require('express');
const router          = express.Router();
const productHandler  = require('../controller/productController');

router.get('/');

module.exports = router;