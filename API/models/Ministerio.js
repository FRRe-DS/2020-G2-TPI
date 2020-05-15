const mongoose = require("mongoose");

const Ministerio = new mongoose.Schema({

    
    Envios:{
        idCentro:{
            type:Number,
            required:true
        },
        camillas:{
            type:Number,
            required:true
        },
        jabonLitros:{
            type:Number,
            required:true
        },
        alcoholLitros:{
            type:Number,
            required:true
        },
        barbijos:{
            type:Number,
            required:true
        },
        jeringas:{
            type:Number,
            required:true
        },
        cofias:{
            type:Number,
            required:true
        }
    },
    Pacientes:{
        dni:{
            type:Number,
            required:true,
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
        },
        ultimaActualizacion:{
            type:Date,
            required:true
        }
    },
    InformacionCOVID:{
        totalEnfermos:{
            type:Number,
            required:true
        },
        totalFallecidos:{
            type:Number,
            required:true
        },
        totalRecuperados:{
            type:Number,
            required:true
        }
    }
});

module.exports = mongoose.model('Ministerio',Ministerio);