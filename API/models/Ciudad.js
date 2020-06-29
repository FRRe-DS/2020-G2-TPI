const mongoose = require('mongoose');

const Ciudad = new mongoose.Schema({
                idCiudad:{
                    type: Number,
                    required: true
                },
                nombreCiudad:{
                    type: String,
                    required: true
                }

            });

module.exports = mongoose.model('Ciudad',Ciudad);