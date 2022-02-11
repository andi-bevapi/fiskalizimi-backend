const express = require("express");
const router = express.Router();

const category = require("./Category");
const client = require('./Client');
const branch = require('./Branch');
const product = require('./Product');
const transportOrder = require('./TransportOrder');
const supplier = require("./Supplier");

router.use("/categories",category);
router.use('/client', client);
router.use('/branch', branch);
router.use('/product', product);
router.use('/transport-order', transportOrder);
router.use("/supplier",supplier);

module.exports = router;