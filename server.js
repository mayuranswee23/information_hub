const path = require('path');
const express = require('express'); 
const routes = require('./routes'); 
const sequelize = require('./config/connection'); 

const exphbs = require('express-handlebars'); 
const session = require('express-session'); 

const helpers = require('./utils/helpers')

const SequelizeStore= require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret', 
    cookie: {}, 
    resave: false, 
    saveUninitialized: true, 
    store: new SequelizeStore({
        db: sequelize
    })
};

const hbs = exphbs.create({helpers}); 


const app = express();
const PORT = process.env.PORT||3001; 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars')
//turn on routes
app.use(routes); 

//set connection to db and server
sequelize.sync({ force: false }).then(()=>
app.listen(PORT, ()=> console.log(`Now listening on PORT ${PORT}`)))