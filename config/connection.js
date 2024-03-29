// importing Sequelize constructor from Library
const Sequelize = require ('sequelize'); 

require('dotenv').config();

//create connection to db
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost', 
    dialect: 'mysql', 
    port: 3306
})



module.exports = sequelize;