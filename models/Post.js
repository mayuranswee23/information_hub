const { Model, DataTypes } =  require("sequelize");
const sequelize = require('../config/connection')

class Post extends Model {
    static upvote(body, models){
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        })
        .then(()=> {
            // find post that had been voted on
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id', 
                    'post_url', 
                    'title', 
                    'created_at', 
                    //use MYSQL agregrate fxn query to get count of votes the post has and return it under 'vote_count'
                [
                    sequelize.literal(`(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)`),
                    'vote_count'
                ]
                ]
            })
        })
    }
}

//create the fields and columns for the Post Model

Post.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        post_url: {
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: {
                isURL: true
            }
        }, 
        user_id: {
            type: DataTypes.INTEGER, 
            references: {
                model: 'user', 
                key: 'id'
            }
        }
    }, 
    {
        sequelize, 
        freezeTableName: true, 
        underscored: true, 
        modelName: 'post'
    }
);

module.exports = Post; 