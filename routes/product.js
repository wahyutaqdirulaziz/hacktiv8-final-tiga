const express         = require('express');
const router          = express.Router();
const productHandler  = require('../controller/productController');
const verifyToken     = require('../middleware/verifyToken');

router.get('/', verifyToken, productHandler.getAll);
router.post('/',verifyToken, productHandler.create);
router.put('/:id', verifyToken, productHandler.update);
router.patch('/:id', verifyToken, productHandler.patchProduct);
router.delete('/:id', verifyToken, productHandler.destroy);

module.exports = router;