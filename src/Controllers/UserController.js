const User = require("../Models/User");

class UserController {
  async postUser(req, res) {
    const { email, name, password } = req.body;

    if (!email || !name || !password) return res.sendStatus(400);

    const isRegistered = await User.checkIfEmailIsRegistered(email);

    if (isRegistered) return res.sendStatus(422);

    try {
      await User.create({ email, name, password });

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
    const id = req.params.id;

    if (isNaN(id)) return res.sendStatus(400);

    const user = await User.findById(id);

    if (!user) return res.sendStatus(404);

    return res.status(200).json(user);
  }
}
module.exports = new UserController();
