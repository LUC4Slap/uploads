const Sequelize = require("sequelize");

const connection = new Sequelize("uploads", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
