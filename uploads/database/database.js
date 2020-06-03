const Sequelize = require("sequelize");

const connection = new Sequelize('uploads', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
})

//Exemplo de como hospedar os campos que tem que mudar
// const connection = new Sequelize('hugo75_ionic', 'hugocu75_ionic', 'testeionic', {
//     host: 'br534.hostgator.com.br',
//     dialect: 'mysql'
// })

module.exports = connection;