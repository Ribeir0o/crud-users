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

  async findByEmail(email) {
    const user = await db("users")
      .select("email", "id", "role", "name")
      .where({ email })
      .first();
    return user;
  }
  async findById(id) {
    const user = await db("users")
      .select("email", "id", "role", "name")
      .where({ id })
      .first();
    return user;
  }

  async editUser(data, id) {
    const user = await this.findById(id);
    let HTTP_CODE;
    if (user) {
      await db("users").update(data).where({ id });
      HTTP_CODE = 200;
      return HTTP_CODE;
    }
    HTTP_CODE = 404;
    return HTTP_CODE;
  }

  async deleteUser(id) {
    const user = await this.findById(id);
    let HTTP_CODE;
    if (user) {
      await db("users").where({ id }).delete();
      HTTP_CODE = 200;
      return HTTP_CODE;
    }
    HTTP_CODE = 404;
    return HTTP_CODE;
  }

  async redefinePassword(password, id) {
    await db("users").update({ password }).where({ id });
  }
}

module.exports = new User();
