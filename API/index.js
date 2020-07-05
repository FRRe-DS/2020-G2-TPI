const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const {MONGOURI} = require('./keys');
const sls = require('serverless-http');
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
    
})
//console.log(mongoose.connection)
app.use(require('./routes/index')); 

app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto",PORT);
})

module.exports.server = sls(app)

