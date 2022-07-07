const { Model, DataTypes } = require('sequelize'); 
const sequelize = require('../config/connection'); 

//create User model 
class User extends Model{}

//define tables columns and configuration 
User.init(
    {
    //Table column definitions
    //define ID colum
    id:{
        // use Sequalize DataTypes object to provide what type of data it is
        types: DataTypes.INTEGER, 
        //MySQL NOT NULL equivalent
        allowNull: false, 
        //instruct that this is the primaryKey
        primaryKey: true,
        //turn on auto increment
        autoIncrement: true
    },
    //define username column
    username: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    //define email
    email:{
        type:DataTypes.STRING, 
        allowNull: false,
        //cannot be duplicate emails
        unique: true, 
        //if allowNull is false, run data thru validators before creating table data
        validate: {
            isEmail: true
        }
    }, 
    //define password
    password:{
        type: DataTypes.STRING, 
        allowNull: false, 
        validate:{
            //password must be atleast 6 characters long
            lens: [6]
        }
    }
}, 
{
    //Table configurations options
    //pass imported sequelize connection (direct connection to db)
    sequelize, 
    // dont automatically create createdAt/ updatedAt timestamp fields
    timestamps: false, 
    //define table name
    freezeTableName: true, 
    //use underscore (snake_case) instead of camelCase
    underscored: true, 
    //name of the model
    modelName: 'user'
});

module.exports = User; 