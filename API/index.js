const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const {MONGOURI} = require('./keys');
const sls = require('serverless-http');
const session = require('express-session');
const mongoSessionStore  = require('connect-mongo');
const bodyParser = require('body-parser')

const {EXPRESS_SECRET}= require('./secrets')

app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var mongoS = null;

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
.catch(err=>{
    console.log('Error de conexion',err);
})
.then(()=> {
    console.log("Me conecte a mongo")
    console.log(mongoose.connection)
    try{
        const MongoStore = mongoSessionStore(session);
        const sess={
            name: 'idk',
            secret: EXPRESS_SECRET,
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                ttl: 14*24*60*60,
            }),
            resave: false,
            saveUninitialized: false,
            cookie:{
                httpOnly: true,
                maxAge: 14*24*60*60*1000
            },
        };
        app.use(session(sess))
        app.use(require('./routes/index')); 
    }
    catch(error)
    {
        console.log(error)
    }
    app.listen(PORT,()=>{
        console.log("Servidor corriendo en el puerto",PORT);
    })
})


module.exports.server = sls(app)

