const db = require("../../db/index");

class User {
  async create(data) {
    await db("users").insert(data);
  }

  async checkIfEmailIsRegistered(email) {
    const data = await db("users").select().where({ email }).first();

    if (data) {
      return true;
    }
    return false;
  }
}

module.exports = new User();
