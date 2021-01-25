const db = require("../../db/index");
const User = require("./User");
const uuid = require("uuid");

class PasswordToken {
  async generateToken(email) {
    const user = await User.findByEmail(email);

    if (user) {
      const token = uuid.v4();
      await db("passwordTokens").insert({
        token,
        user_id: user.id,
      });
      return { code: 201, token };
    }
    return { code: 404 };
  }
}

module.exports = new PasswordToken();
