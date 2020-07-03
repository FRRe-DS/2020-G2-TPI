const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const {MONGOURI} = require('./keys');
const sls = require('serverless-http');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const bodyParser = require('body-parser')
const {EXPRESS_SECRET} = require('./secrets');
require('./models/Ministerio');
require('./models/Peticion');
require('./models/CentrosHospitalarios');
require('./models/InformeHospitalAMinisterio');
require('./models/Recursos');
require('./models/Medicos');
app.use(express.json());

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));



let db;
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
    //console.log(mongoose.connection);
    var mongoStore = new MongoStore({
        mongooseConnection:mongoose.connection
    });
    app.use(
        session({
            secret:EXPRESS_SECRET,
            clear_interval: 900,
            cookie:{ maxAge: 86400},
            store: mongoStore
        })
    );
    app.use(require('./routes/index')); 

}
    )


app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto",PORT);
})

module.exports.server = sls(app)

