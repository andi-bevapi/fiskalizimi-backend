const express = require("express");
const router = express.Router();

const category = require("./Category");
const client = require('./Client');
const branch = require('./Branch');
const product = require('./Product');
const transportOrder = require('./TransportOrder');
const supplier = require("./Supplier");
const sellingUnits = require("./SellingUnit");
const user = require("./User");
const permission = require("./Permission");
const invoice = require('./Invoice');
const configuration = require('./Configuration');
const reports = require('./Reports');
const arkat = require('./Arka');
const arkaHistory = require('./ArkaHistory');
const shiftHistory = require("./ShiftHistory");

router.use("/categories",category);
router.use('/client', client);
router.use('/branch', branch);
router.use('/product', product);
router.use('/transport-order', transportOrder);
router.use("/supplier",supplier);
router.use("/selling-units",sellingUnits);
router.use("/user", user);
router.use("/permission", permission);
router.use("/invoice", invoice);
router.use("/configuration", configuration);
router.use("/reports", reports);
router.use("/arkat", arkat);
router.use("/arka-history", arkaHistory);
router.use("/shift-history", shiftHistory);

module.exports = router;
















