const Sequelize = require("sequelize");

const connection = new Sequelize("uploads", "root", "root", {
  host: "172.17.0.2",
  dialect: "mysql",
});

module.exports = connection;
