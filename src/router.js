const express = require("express");
const router = express.Router();

const UserController = require("./Controllers/UserController");

router.post("/user", UserController.postUser);

module.exports = router;
