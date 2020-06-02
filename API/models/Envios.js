const mongoose = require('mongoose');

const Envio = new mongoose.Schema(
    {
        Envio:{
           idCentro:{
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
                    cantidad:{
                        type:Number,
                        required:true
                    },
                    especialidad:{
                        type:String,
                        required:true
                    }
                }
            ] 
        }
    }
);

module.exports = mongoose.model('Envio',Envio);