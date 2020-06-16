const mongoose = require('mongoose');

const Medicos = new mongoose.Schema({
	Medicos:{
			cantidad: {
				type:Number,
				required:false
			},
			especialidad: {
				type:String,
				required:false
			}
		}
});
module.exports = mongoose.model('Medicos',Medicos);