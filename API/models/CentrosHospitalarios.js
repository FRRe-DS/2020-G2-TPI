const mongoose = require('mongoose')

const CentrosHospitalarios = new mongoose.Schema({
   
        idCentro:{
            type:Number,
            required:true
        },
        nombre:{
            type:String,
            required:true
        },
        provincia:{
            type:String,
            required:true
        },
        ciudad:{
            type:String,
            required:true
        },
        direccion:{
            type:String,
            required:true
        },
        tipo:{
            type:String,
            required:true
        }
    

});

module.exports = mongoose.model('CentrosHospitalarios',CentrosHospitalarios );