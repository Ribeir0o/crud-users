exports.up = function (knex) {
  return knex.schema.createTable("passwordTokens", (table) => {
    table.increments();
    table.string("token");
    table.boolean("used").defaultTo(false);
    table.integer("user_id").unsigned().notNullable();

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("passwordTokens");
};
