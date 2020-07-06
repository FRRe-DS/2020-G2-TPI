const mongoose = require('mongoose');

const FechaInformes = new mongoose.Schema({
    fecha:{
        type:Date,
        required:true
    }

});
module.exports = mongoose.model('FechaInformes',FechaInformes);