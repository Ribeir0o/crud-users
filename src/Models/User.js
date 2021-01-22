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

  async findAll() {
    const users = await db("users").select("email", "id", "role", "name");

    return users;
  }

  async findById(id) {
    const user = await db("users")
      .select("email", "id", "role", "name")
      .where({ id })
      .first();

    return user;
  }

  async editUser(data, id) {
    await db("users").update(data).where({ id });
  }
}

module.exports = new User();
