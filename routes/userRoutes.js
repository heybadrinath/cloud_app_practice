const express = require("express");
const router = express.Router();
const userController  = require("../userControllers/userController");

// console.log(UserController.)

router.get("/auth/:service", userController.authorizeUser);

router.post("/users", userController.addUser);
router.get("/users", userController.listUsers);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
