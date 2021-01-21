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
}
module.exports = new UserController();
