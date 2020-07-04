const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const {MONGOURI} = require('./keys');
const sls = require('serverless-http');
const session = require('express-session');



require('./models/Ministerio');
require('./models/Peticion');
require('./models/CentrosHospitalarios');
require('./models/InformeHospitalAMinisterio');
require('./models/Recursos');
require('./models/Medicos');






let db;
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:false
})
.catch(err=>{
    console.log('Error de conexion',err);
})
.then(()=> {
    console.log("Me conecte a mongo")
    app.use(require('./routes/index')); 

})


app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto",PORT);
})

module.exports.server = sls(app)

