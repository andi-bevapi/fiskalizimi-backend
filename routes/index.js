const express = require("express");
const router = express.Router();

const category = require("./Category");
const client = require('./Client');
const branch = require('./Branch');
const product = require('./Product');
const transportOrder = require('./TransportOrder');
const supplier = require("./Supplier");
const sellingUnits = require("./SellingUnit");

const Joivalidation = require("../validation/category");

router.use("/categories",Joivalidation,category);
router.use('/client', client);
router.use('/branch', branch);
router.use('/product', product);
router.use('/transport-order', transportOrder);
router.use("/supplier",supplier);
router.use("/selling-units",sellingUnits);

module.exports = router;