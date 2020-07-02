const mongoose = require('mongoose');
const InformeHospitalMinisterio = require('../models/InformeHospitalAMinisterio');
var request = require('request');
const ciudades = require('../models/Ciudad');
const Peticion = require('../models/Peticion');

exports.registrarInformes = async (req,res,next) => {

  var options = {
    'method': 'GET',
    'url': 'https://6iubewzdng.execute-api.sa-east-1.amazonaws.com/dev/peticiones',
    'headers': {
      'x-api-key': 'FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR'
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

        try {
          let peticionTemporal = new Peticion(respuesta.Informes[item])
          await peticionTemporal.save(); 
          res.statusCode = 200;
          res.setHeader('content-type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.json({mensaje:"El informe se guardo en la base"});    
        } catch (error) {
            console.log(error);
            next();
        }
    
    }


}

