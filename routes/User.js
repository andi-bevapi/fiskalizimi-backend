const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const Joivalidation = require("../validation/user");

router.get("/", userController.getAllUsers);
router.post("/create", Joivalidation, userController.createUser);
router.put("/update/:id", Joivalidation, userController.updateUser);
router.put("/delete/:id", userController.deleteUser);

module.exports = router;
