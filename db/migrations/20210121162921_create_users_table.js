exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();

    table.string("name");

    table.string("email");

    table.string("password");

    table.integer("role");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
