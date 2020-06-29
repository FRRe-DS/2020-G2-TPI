const mongoose = require('mongoose');

const Ciudad = new mongoose.Schema({
    
    Ciudades:[{
        idCiudad:{
            type: Number,
            required: true
        },
        nombreCiudad:{
            type: String,
            required: true
        },
        latitud:{
            type: Number,
            required: true
        },
        longitud:{
            type: Number,
            required: true
        }
    }]
                

});

module.exports = mongoose.model('Ciudad',Ciudad)