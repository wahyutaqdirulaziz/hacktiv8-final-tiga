const express         = require('express');
const router          = express.Router();
const categoryHandler = require('../controller/categoryController');
const verifyToken     = require('../middleware/verifyToken');

router.get('/',verifyToken,categoryHandler.show);
router.post('/',verifyToken,categoryHandler.create);
router.patch('/:id', verifyToken, categoryHandler.patch);
router.delete('/:id', verifyToken, categoryHandler.delete);

module.exports = router;