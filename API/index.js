const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const {MONGOURI} = require('./keys');
const sls = require('serverless-http');
require('./models/Ministerio');
require('./models/Peticion');
require('./models/CentrosHospitalarios');
require('./models/InformeHospitalAMinisterio');

app.use(express.json());
app.use(require('./routes/index'));

let db;
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
.catch(err=>{
    console.log('Error de conexion',err);
})
.then(()=> console.log("Me conecte a mongo"))


app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto",PORT);
})

module.exports.server = sls(app)

