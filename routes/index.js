const express = require("express");
const router = express.Router();

const client = require('./client.routes');
const branch = require('./branch.routes');
const product = require('./product.routes');
const transportOrder = require('./transportOrder.routes');

router.use('/client', client);
router.use('/branch', branch);
router.use('/product', product);
router.use('/transport-order', transportOrder);

module.exports = router;