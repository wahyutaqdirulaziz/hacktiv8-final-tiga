const express         = require('express');
const router          = express.Router();
const productHandler  = require('../controller/productController');
const verifyToken     = require('../middleware/verifyToken');

router.get('/', verifyToken, productHandler.getAll);
router.post('/',verifyToken, productHandler.create);

module.exports = router;