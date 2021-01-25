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

  async validateToken(token, id) {
    const token_stats = await db("passwordTokens")
      .select()
      .where({ token })
      .first();

    if (!token_stats || token_stats.used || token_stats.user_id != id) {
      return false;
    }
    return true;
  }

  async setUsed(token) {
    await db("passwordTokens").update({ used: true }).where({ token });
  }
}

module.exports = new PasswordToken();
