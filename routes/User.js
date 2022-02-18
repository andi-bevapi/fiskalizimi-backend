const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.get("/", userController.getAllUsers);
router.post("/create", userController.createUser);
router.put("/update/:id", userController.updateUser);
router.put("/delete/:id", userController.deleteUser);

module.exports = router;

