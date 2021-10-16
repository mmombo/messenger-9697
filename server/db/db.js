const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(process.env.DB_NAME, process.env.PG_USER, process.env.PG_PASS, {
  host: "localhost",
  port: "5432",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
