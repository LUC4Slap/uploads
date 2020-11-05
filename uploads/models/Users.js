const Sequelize = require("sequelize");
const connection = require("../database/database");

const Users = connection.define("users", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  usuario: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha_original: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Users.sync();

module.exports = Users;
