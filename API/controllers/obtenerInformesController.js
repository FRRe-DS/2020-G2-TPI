const mongoose = require('mongoose');
const InformeHospitalMinisterio = require('../models/InformeHospitalAMinisterio');
var request = require('request');
const ciudades = require('../models/Ciudad');

exports.registrarInformes = async (req,res,next) => {

  var options = {
    'method': 'GET',
    'url': 'http://localhost:5000/informes',
    'headers': {
    }
  };

  var respuesta = null;

  request(options, function (error, response) {
    
    if (error) throw new Error(error);

    respuesta = JSON.parse(response.body);
  
  });

    // console.log(JSON.parse(response.body)); 
    // const respuesta = JSON.parse(response.body);

    for( item in respuesta.Informes){

      console.log(respuesta.Informes[item])
      
      if(respuesta.Informes[item].pruebasRealizadas.realizadas == (respuesta.Informes[item].pruebasRealizadas.sinResultado + respuesta.Informes[item].pruebasRealizadas.positivas +respuesta.Informes[item].pruebasRealizadas.negativas)){

        const nuevoInforme = new InformeHospitalMinisterio(respuesta.Informes[item]);
        const ciudad = (await ciudades.find().limit(1))[0].Ciudades;
        var ciudadValida = false;
        
        // control de ciudad valida
        ciudad.forEach(element => {
            if(element.idCiudad==nuevoInforme.idCiudad){
                ciudadValida = true;
            }
        });

        try {
            if(ciudadValida){   
                await nuevoInforme.save(); 
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.json({mensaje:"El informe se guardo en la base"});
            } else{
                res.json({mensaje:"La ciudad NO es valida"});
            }     
        } catch (error) {
            console.log(error);
            next();
        }
    } else{
        res.json({mensaje:"Errores en las cantidades de tests realizados del informe"});
    }

    
    }


}

