const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const {MONGOURI} = require('./keys');
const sls = require('serverless-http');
require('./models/Ministerio');
require('./models/Peticion');
require('./models/CentrosHospitalarios')

app.use(express.json());
app.use(require('./routes/index'));

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('connected',()=>{
    console.log('Me conecte a mongo! :D');
});
mongoose.connection.on('error',(error)=>{
    console.log('Error de conexion',error);
});

app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto",PORT);
})

module.exports.server = sls(app)