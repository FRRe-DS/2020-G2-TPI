const mongoose = require('mongoose');

const InformeHospitalAMinisterio = new mongoose.Schema({
    cuitHospital:{
        type:Number,
        required:true,
    },
    nombreHospital:{
        type:String,
        required:true
    },
    idCiudad:{
        type:Number,
        required:true
    },
    nombreCiudad:{
        type:String,
        required:true
    },
    resumenCasos:{
            cantidadMuertos:{
                type:Number,
                required:true
            },
            cantidadCurados:{
                type:Number,
                required:true
            },
            cantidadEnfermos:{
                type:Number,
                required:true
            },
        },
        pruebasRealizadas:{
            realizadas:{
                type:Number,
                required:true
            },
            sinResultado:{
                type:Number,
                required:true
            },
            positivas:{
                type:Number,
                required:true
            },
            negativas:{
                type:Number,
                required:true,
            }
        },
    Recursos:{
        camillasDisponibles:{
            type:Number,
            required:true
        },
        camillasOcupadas:{
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
        },
        medicos:[{
			cantidad: {
				type:Number,
				required:false
			},
			especialidad: {
				type:String,
				required:false
			}
		}]

    },
    impactadoEnEstadisticas:{
        type: Boolean,
        required: false
    }
});


module.exports = mongoose.model('InformeHospitalAMinisterio',InformeHospitalAMinisterio );
