const router = require('express').Router(); 
const { Post, User, Vote, Comment } = require('../../models'); 
const sequelize = require('../../config/connection');

//get all users
router.get('/', (req, res)=> {
    console.log("===================="); 
    Post.findAll({
        //query configuration
        attributes: ['id', 'post_url', 'title', 'created_at', 
        [sequelize.literal('(SELECT COUNT (*) FROM vote where post.id = vote.post_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment, 
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'], 
                include: {
                    model: User, 
                    attributes: ['username']
                } 
            },
            {
                model: User, 
                attributes: ['username']
            }
        ]
    }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res)=> {
    Post.findOne({
        where: {
            id: req.params.id
        }, 
        attributes: ['id', 'post_url', 'title', 'created_at', 
        [sequelize.literal('(SELECT COUNT (*) FROM vote where post.id = vote.post_id)'), 'vote_count']
    ],
        include: [
            {
                model: Comment, 
                // attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'], 
                attributes: {exclude: ['updatedAt']},
                include: {
                    model: User, 
                    attributes: ['username']
                } 
            },
            {
                model: User, 
                attributes: ['username']
            }
        ]
    }).then(dbPostData => {
        if (!dbPostData){
            res.status(404).json({ message: 'No post was found with this ID'});
            return;
        }
        res.json(dbPostData);
    }).catch(err=> {
        console.log(err); 
        res.status(500).json(err);
    });
});

router.post('/', (req, res)=> {
    //expects title, post_url, user_id
    Post.create({
        title: req.body.title, 
        post_url: req.body.post_url, 
        // user_id: req.body.user_id
        user_id: req.session.user_id
    }).then(dbPostData => res.json(dbPostData))
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

//PUT /api/post/upvote
router.put('/upvote', (req, res)=> {
//custom statis method created in models/Post.js
// Post.upvote(req.body, { Vote })
// .then(updatedPostData => res.json(updatedPostData))
// .catch(err => {
//     console.log(err); 
//     res.status(400).json(err);
// })
//make sure the session exists first
if (req.session){
    //pass session id along with all destructured properites on req.body
    Post.upvote({...req.body, user_id: req.session.user_id}, 
        { Vote, Comment, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    })
}
})

router.put('/:id', (req, res)=> {
    Post.update({
        title: req.body.title
    }, 
    {
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post foud with this ID'});
            return;
        }
        res.json(dbPostData)
    }).catch(err=>{
        console.log(err); 
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res)=> {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData){
            res.status(404).json({ message: 'No post found with that ID'});
            return;
        }
        res.json(dbPostData);    
    }).catch(err => {
        console.log(err); 
        res.status(500).json(err);
    });
});

module.exports = router; 