const express       = require('express');
const router        = express.Router();
const userHandler   = require('../controller/userController');
const verifytoken   = require('../middleware/verifyToken');

router.post('/register', userHandler.register);
router.post('/login', userHandler.login);

router.put('/:id', verifytoken, userHandler.update);
router.patch('/topup', verifytoken, userHandler.topup);

router.delete('/:id',verifytoken, userHandler.delete);

module.exports = router;