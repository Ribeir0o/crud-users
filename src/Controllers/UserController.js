const { sendMail } = require("../lib/nodemailer");
const PasswordToken = require("../Models/PasswordToken");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("../lib/jwt");

class UserController {
  async postUser(req, res) {
    const { email, name, password } = req.body;

    if (!email || !name || !password) return res.sendStatus(400);

    const isRegistered = await User.checkIfEmailIsRegistered(email);
    if (isRegistered) return res.sendStatus(422);

    try {
      const hash = await bcrypt.hash(password, 10);
      await User.create({ email, name, password: hash });
      res.sendStatus(201);
    } catch (e) {
      res.sendStatus(500);
    }
  }

  async getAllUsers(req, res) {
    const users = await User.findAll();
    return res.status(200).json(users);
  }

  async getUserById(req, res) {
    const { id } = req.params;

    if (isNaN(id)) return res.sendStatus(400);

    const user = await User.findById(id);
    if (!user) return res.sendStatus(404);

    return res.status(200).json(user);
  }

  async putUser(req, res) {
    const { id } = req.params;

    if (isNaN(id)) return res.sendStatus(400);

    const { email, name, role } = req.body;
    let data = { email, name, role };
    let changesToMake = {};
    for (let prop in data) {
      if (data[prop] != undefined) changesToMake[prop] = data[prop];
    }

    const propsToChange = Object.keys(changesToMake);
    if (propsToChange.length === 0) return res.sendStatus(400);

    try {
      const code = await User.editUser(changesToMake, id);
      return res.sendStatus(code);
    } catch (e) {
      return res.sendStatus(500);
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    if (isNaN(id)) return res.sendStatus(400);

    try {
      const code = await User.deleteUser(id);
      return res.sendStatus(code);
    } catch (e) {
      return res.sendStatus(500);
    }
  }

  async postRecoverPassword(req, res) {
    const { email } = req.body;

    if (!email) return res.sendStatus(400);
    try {
      const { code, token } = await PasswordToken.generateToken(email);
      if (!token) return res.sendStatus(code);
      sendMail(email, token);
      res.sendStatus(code);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  }

  async postChangePassword(req, res) {
    const { id } = req.params;
    const { password, token } = req.body;
    if (!id || !password || !token) return res.sendStatus(400);

    const isValid = await PasswordToken.validateToken(token, id);

    if (isValid) {
      const hash = await bcrypt.hash(password, 10);
      await User.redefinePassword(hash, id);
      await PasswordToken.setUsed(token);
      return res.sendStatus(200);
    }
    res.sendStatus(400);
  }

  async postLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);

    const user = await User.findByEmail(email);
    if (!user) return res.sendStatus(404);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.sendStatus(401);

    const token = await jwt.sign({ email: user.email, role: user.role });
    return res.status(200).json({ token });
  }
}
module.exports = new UserController();
