const express = require("express");
const router = express.Router();

const category = require("./Category");
const client = require('./Client');
const branch = require('./Branch');
const product = require('./Product');
const transportOrder = require('./TransportOrder');
const sellingUnits = require("./SellingUnit");

router.use('/client', client);
router.use('/branch', branch);
router.use('/product', product);
router.use("/categories",category);
router.use('/transport-order', transportOrder);
router.use("/selling-units",sellingUnits);

module.exports = router;