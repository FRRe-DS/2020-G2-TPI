const mongoose = require('mongoose');

const Aburrido = new mongoose.Schema(
    {
        activity:{
            type: String,
            required: true
        },
        type:{
            type: String,
            required: true
        },
        participants:{
            type: Number,
            required: true
        }

    }
);

module.exports = mongoose.model('Aburrido',Aburrido)