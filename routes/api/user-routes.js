const router = require('express').Router(); 
const { User } = require('../../models'); 

//GET api/users
router.get('/', (req, res)=>{
//access user model and run .findAll() method
User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err=> {
        console.log(err); 
        res.status(500).json(err);
    })
})

//GET api/users/1
router.get('/:id', (req, res)=> {
User.findOne({
    where:{
        id: req.params.id
    }
}).then(dbUserData =>{
    if(!dbUserData){
        res.status(404).json({message: 'No user found with this ID'});
        return;
    }
    res.json(dbUserData);
}).catch(err=>{
    console.log(err); 
    res.status(500).json(err);
    })
})

//POST api/users
router.post('/', (req, res)=>{
//expects {username: 'username', email: 'email', password: 'password'}
User.create({
    username: req.body.username, 
    email: req.body.email, 
    password: req.body.password
}).then(dbUserData => res.json(dbUserData))
.catch(err=>{
    console.log(err); 
    res.status(500).json(err)
});
});

//UPDATE /api/users/1
router.put('/:id', (req, res)=> {
//expects {username: 'username', email:'email', password:'password'}
//if req.body has exact key/value pairs to match the model, you can use 'req.body' instead
User.update(req.body, {
    where: {
        id: req.params.id
    }
}).then(dbUserData => {
    if(!dbUserData[0]){
        res.status(404).json({ message: 'No user found with this ID'});
        return;
    }
    res.json(dbUserData);
})
.catch(err=>{
    console.log(err); 
    res.status(500).json(err);
});
});

//DELETE /api/users/1
router.delete('/:id', (req, res)=>{
User.destroy({
    where: {
        id: req.params.id
    }
}).then(dbUserData => {
    if(!dbUserData){
        res.status(404).json({ message: 'No user found with this ID'});
        return;
    }
    res.json(dbUserData)
})
.catch(err=>{
    console.log(err);
    res.status(500).json(err);
})
})

module.exports = router; 