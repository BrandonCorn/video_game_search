const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const config = require('./config/keys'); 
const session = require('express-session'); 
const client = require('./controllers/redis')

app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + '/public')); 
app.use(express.static(__dirname + '/public/scripts')); 
app.use((req,res,next) => {
    req.client = require('./controllers/redis')
    next()
}) 

app.use(session({secret: config.SESSION_SECRET, saveUninitialized: true, resave: true }))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()); 

app.use(require('./routes')); 

app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`)
})