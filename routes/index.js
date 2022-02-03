const express = require("express");
const router = express.Router();

const client = require('./client');
const branch = require('./branch');
const transportOrder = require('./transportOrder');
const product = require('./product');
const categoryRouter = require("./Categories");

router.use('/client', client);
router.use('/branch', branch);
router.use('/transport-order', transportOrder);
router.use('/product', product);
router.use("/categories",categoryRouter);

module.exports = router;