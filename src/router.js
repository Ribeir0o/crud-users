const express = require("express");
const router = express.Router();

const UserController = require("./Controllers/UserController");
const Auth = require("./Middlewares/Auth");

router.post("/user", Auth, UserController.postUser);
router.get("/user", UserController.getAllUsers);
router.get("/user/:id", UserController.getUserById);
router.put("/user/:id", Auth, UserController.putUser);
router.delete("/user/:id", Auth, UserController.deleteUser);
router.post("/user/recovery", UserController.postRecoverPassword);
router.post("/user/recovery/:id", UserController.postChangePassword);
router.post("/auth", UserController.postLogin);

module.exports = router;
