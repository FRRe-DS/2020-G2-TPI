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
            required:false
        },
        camillasOcupadas:{
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
    },
    createdAt:{
        type:String,
        required:true
    }
});


module.exports = mongoose.model('InformeHospitalAMinisterio',InformeHospitalAMinisterio );
