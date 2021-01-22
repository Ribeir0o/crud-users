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
    const { id } = req.params;

    if (isNaN(id)) return res.sendStatus(400);

    const user = await User.findById(id);

    if (!user) return res.sendStatus(404);

    return res.status(200).json(user);
  }

  async putUser(req, res) {
    const { id } = req.params;

    if (isNaN(id)) return res.sendStatus(400);

    const user = await User.findById(id);

    if (!user) return res.sendStatus(404);

    const { email, name, role } = req.body;

    let data = { email, name, role };

    let propsToChange = [];

    for (let prop in data) {
      if (data[prop] != undefined) propsToChange.push(prop);
    }

    if (propsToChange.length === 0) return res.sendStatus(400);

    let changesToMake = {};

    propsToChange.forEach((prop) => {
      changesToMake[prop] = data[prop];
    });

    try {
      await User.editUser(changesToMake, id);

      return res.sendStatus(204);
    } catch (e) {
      return res.sendStatus(500);
    }
  }
}
module.exports = new UserController();
