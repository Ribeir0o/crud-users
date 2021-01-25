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
}

module.exports = new User();
