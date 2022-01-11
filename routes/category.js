const express         = require('express');
const router          = express.Router();
const categoryHandler = require('../controller/categoryController');

router.get('/');
router.post('/',categoryHandler.create);

module.exports = router;