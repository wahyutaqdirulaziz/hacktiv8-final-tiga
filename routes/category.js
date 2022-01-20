const express         = require('express');
const router          = express.Router();
const categoryHandler = require('../controller/categoryController');
const verifyToken     = require('../middleware/verifyToken');

router.get('/',verifyToken,categoryHandler.index);
router.post('/',verifyToken,categoryHandler.create);
router.put('/:id', verifyToken, categoryHandler.update);
router.delete('/:id', verifyToken, categoryHandler.destroy);

module.exports = router;