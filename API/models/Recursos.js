const mongoose = require('mongoose');

const Recursos = new mongoose.Schema({

	Recursos:{
		camillasDisponible:{
			type:Number,
			required:false
		},
		jabonLitrosDisponible:{
			type:Number,
			required:false
		},
		alcoholLitrosDisponible:{
			type:Number,
			required:false
		},
		barbijosDisponible:{
			type:Number,
			required:false
		},
		jeringasDisponible:{
			type:Number,
			required:false
		},
		cofiasDisponible:{
			type:Number,
			required:false
		}
	}
});

module.exports = mongoose.model('Recursos',Recursos);