const express = require("express");
const router = express.Router();

const UserController = require("./Controllers/UserController");

router.post("/user", UserController.postUser);
router.get("/user", UserController.getAllUsers);
router.get("/user/:id", UserController.getUserById);
router.put("/user/:id", UserController.putUser);

module.exports = router;
