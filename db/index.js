const knex = require('knex');

const knexFile = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';

const knexConfig = knexFile[environment];

const connection = knex(knexConfig);

module.exports = connection;
