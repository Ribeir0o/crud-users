// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      user: 'root',
      password: process.env.MYSQL_PASSWORD,
      database: 'crudUsers',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './test.sqlite',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
