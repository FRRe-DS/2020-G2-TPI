const mongoose = require('mongoose');

const Stat = new mongoose.Schema(
    {
    dataCiudades:[
            {
                idCiudad:{
                    type: Number,
                    required: true
                },
                nombreCiudad:{
                    type: String,
                    required: true
                },
                poblacion:{
                    type: Number,
                    required: true
                },
                cantidades:{
                    sospecha:{
                        type: Number,
                        required: true
                    },
                    enfermos:{
                        type: Number,
                        required: true
                    },
                    recuperados:{
                        type: Number,
                        required: true
                    },
                    muertos:{
                        type: Number,
                        required: true
                    }
                }
            }
        ],
    totales:{
            poblacionTotal:{
                type: Number,
                required:true
            },
            sospecha:{
                type: Number,
                required: true
            },
            enfermos:{
                type: Number,
                required: true
            },
            recuperados:{
                type: Number,
                required: true
            },
            muertos:{
                type: Number,
                required: true
            }
        }
    }
)

module.exports = mongoose.model('Stat',Stat);