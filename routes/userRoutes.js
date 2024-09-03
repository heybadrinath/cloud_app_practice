const express = require("express");
const router = express.Router();
const userController = require("../userControllers/userController");

router.get("/auth/:service", userController.authorizeUser);

// Endpoint to receive the authorization code and list users
router.get("/users", userController.listUsers);

router.post("/invite/:service", userController.inviteUserToService);

router.delete("/remove/:service", userController.removeUserFromService);

router.get("/", (req, res) => {
  res.json({
    message: "Routes are working",
  });
});

module.exports = router;