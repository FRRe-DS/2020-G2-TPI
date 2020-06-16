const mongoose = require('mongoose');

const Estadisticas = new mongoose.Schema({
	Estadisticas:{
			dataCiudades:[
				{
					"ciudad": {
						type:String,
						required:true
					},
					"poblacion":{
						type:Number,
						required:true
					},
					"cantidades":{
						"sospecha":{
							type:Number,
							required:true
						},
						"enfermos":{
							type:Number,
							required:true
						},
						"recuperados":{
							type:Number,
							required:true
						},
						"muertos":{
							type:Number,
							required:true
						}
	
					}
				}
			],
			totales:{
				"poblacion":{
					type:Number,
					required:true
				},
				"sospecha":{
					type:Number,
					required:true
				},
				"enfermos":{
					type:Number,
					required:true
				},
				"recuperados":{
					type:Number,
					required:true
				},
				"muertos":{
					type:Number,
					required:true
				}	
			}	
		}
});
module.exports = mongoose.model('Estadisticas',Estadisticas);