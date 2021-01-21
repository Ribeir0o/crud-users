const { name, email, password } = require("../../src/constants/user");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([{ name, email, password }]);
    });
};
