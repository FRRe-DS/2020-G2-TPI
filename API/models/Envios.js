const mongoose = require('mongoose');

const Envio = new mongoose.Schema(
    {
        Envio:{
           idCentro:{
               type:Number,
               required:true
           },
           idPeticion: {
                type:Number,
                required:false
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
    },{timestamps:true}
);

module.exports = mongoose.model('Envio',Envio);