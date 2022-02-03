const express = require("express");
const app = express();
const router = express.Router();
const categoryController  = require("../../controllers/category/category");


router.get("/", categoryController.getAllCategory);
router.post("/create", categoryController.createCategory);
router.put("/update/:id",categoryController.updateCategory);
router.put("/delete/:id",categoryController.deleteCategory);

module.exports =  router;