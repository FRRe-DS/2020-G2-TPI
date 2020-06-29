const mongoose = require('mongoose');

const Stat = new mongoose.Schema(
    {
    dataCiudades:[
            {
                nombreCiudad:{
                    type: String,
                    required: true
                },
                poblacion:{
                    type: Number,
                    required: true
                },
                cantidades:{
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
    },
    {timestamps:true}
)

module.exports = mongoose.model('Stat',Stat);