const mongoose = require('mongoose');

const reporteHospitalario = new mongoose.Schema({
    cantidadMuertos:{
        type:Int32Array,
        required:true
    },
    testRealizados:{
        positivos:{
            type:Int32Array,
            required:true
        },
        negativos:{
            type:Int32Array,
            required:true
        }
    },
    pacientesCurados:{
        type:Int32Array,
        required:true
    },
    totalPacientes:{
        type:Int32Array,
        required:true
    }

});
