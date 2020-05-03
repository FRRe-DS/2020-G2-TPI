const mongoose = require('mongoose');

const Peticion = new mongoose.Schema({

    Peticion:{
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
    }

});

module.exports = mongoose.Model('Peticion',Peticion);