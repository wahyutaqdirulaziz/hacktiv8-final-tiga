const express             = require('express');
const router              = express.Router();
const transactionHandler  = require('../controller/transactionController');
const verifyToken         = require('../middleware/verifyToken');

router.get('/user', verifyToken, transactionHandler.getAll);
router.get('/admin', verifyToken, transactionHandler.getAllAdmin);
router.get('/:transactionId', verifyToken, transactionHandler.getTransaction);
router.post('/',verifyToken, transactionHandler.create);

module.exports = router;