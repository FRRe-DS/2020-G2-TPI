const mongoose = require('mongoose');

const Peticion = new mongoose.Schema({

    Peticion:{
        idCentro: {
            type:Number,
            required:true
        },
        camillas:{
            type:Number,
            required:false
        },
        jabonLitros:{
            type:Number,
            required:false
        },
        alcoholLitros:{
            type:Number,
            required:false
        },
        barbijos:{
            type:Number,
            required:false
        },
        jeringas:{
            type:Number,
            required:false
        },
        cofias:{
            type:Number,
            required:false
        },
        medicos:[
            {
                cantidad: {
                    type:Number,
                    required:false
                },
                especialidad: {
                    type:String,
                    required:false
                },
                required:false
            }
        ],
        respondidaCompletamente: {
            type:Boolean,
            required:false
        }
    }

});

module.exports = mongoose.model('Peticion',Peticion);