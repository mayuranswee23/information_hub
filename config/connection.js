// importing Sequelize constructor from Library
const Sequelize = require ('sequelize'); 

require('dotenv').config();

//create connection to db
const sequelize = new Sequelize('information_hub', 'username', 'password', {
    host: 'localhost', 
    dialect: 'mysql', 
    port: 3306
})



module.exports = sequelize;