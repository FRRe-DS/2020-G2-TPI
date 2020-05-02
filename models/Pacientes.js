const mongoose = require('mongoose');

const Pacientes = new mongoose.Schema({
    dni:{
        type:Int32Array,
        required:true
    },
    apellido:{
        type:String,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    fechaNac:{
        type:Date,
        required:true
    },
    estado:{
        type:String,
        required:true
    }

});
